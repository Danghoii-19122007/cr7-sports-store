import { NextRequest, NextResponse } from "next/server";
import { momoClient } from "@/lib/momo";
import { orderDatabase } from "@/lib/database";
import { emailService } from "@/lib/email";

interface CheckoutRequest {
  amount: number;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  city?: string;
  paymentMethod?: "card" | "momo" | "vnpay" | "cod";
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate request
    if (!body.amount || !body.orderId) {
      return NextResponse.json(
        { error: "Missing amount or orderId" },
        { status: 400 }
      );
    }

    // Calculate total amount in VND (if needed, otherwise use direct amount)
    const totalAmount = Math.round(body.amount);

    // Prepare order info
    const itemNames = body.items
      ?.map((item) => `${item.name}(x${item.quantity})`)
      .join(", ") || "CR7 Sports Products";

    // Save order to database
    if (body.customerName && body.customerEmail) {
      await orderDatabase.createOrder({
        orderId: body.orderId,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        phone: body.phone || "",
        address: body.address || "",
        city: body.city || "hanoi",
        items: body.items || [],
        totalAmount: totalAmount,
        paymentMethod: body.paymentMethod || "momo",
      });

      // Send order confirmation email
      await emailService.sendConfirmationEmail(body.customerEmail, {
        orderId: body.orderId,
        customerName: body.customerName,
        items: body.items,
        totalAmount: totalAmount,
      });
    }

    // Create payment request
    const paymentRequest = {
      amount: totalAmount,
      orderId: body.orderId,
      orderInfo: `Thanh toán đơn hàng ${body.orderId}: ${itemNames}`,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success`,
      notifyUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/momo-callback`,
      extraData: JSON.stringify({
        email: body.customerEmail || "",
        name: body.customerName || "",
        orderId: body.orderId,
      }),
    };

    // Call Momo API
    const momoResponse = await momoClient.createPayment(paymentRequest);

    // Check if payment creation was successful
    if (momoResponse.resultCode !== 0) {
      return NextResponse.json(
        {
          error: "Payment creation failed",
          message: momoResponse.message,
          resultCode: momoResponse.resultCode,
        },
        { status: 400 }
      );
    }

    // Return payment URL to client
    return NextResponse.json({
      success: true,
      orderId: body.orderId,
      payUrl: momoResponse.payUrl,
      deeplink: momoResponse.deeplink,
      qrCodeUrl: momoResponse.qrCodeUrl,
      amount: totalAmount,
      message: "Payment request created successfully",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error: "Checkout failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
