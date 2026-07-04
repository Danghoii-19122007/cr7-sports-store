import { NextRequest, NextResponse } from "next/server";
import { momoClient } from "@/lib/momo";
import { orderDatabase } from "@/lib/database";
import { emailService } from "@/lib/email";
import { invoiceService } from "@/lib/invoice";

interface MomoCallback {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  orderInfo: string;
  orderType: string;
  transId: string;
  resultCode: number;
  message: string;
  payType: string;
  responseTime: number;
  extraData: string;
  signature: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MomoCallback = await request.json();

    console.log("📩 Momo Callback received:", {
      orderId: body.orderId,
      amount: body.amount,
      resultCode: body.resultCode,
    });

    // Verify signature
    const messageVerify = `accessKey=${process.env.MOMO_ACCESS_KEY || "F8590061"}&amount=${body.amount}&extraData=${body.extraData}&message=${body.message}&orderId=${body.orderId}&orderInfo=${body.orderInfo}&orderType=${body.orderType}&partnerCode=${body.partnerCode}&payType=${body.payType}&requestId=${body.requestId}&responseTime=${body.responseTime}&resultCode=${body.resultCode}&transId=${body.transId}`;

    const isSignatureValid = momoClient.verifySignature(
      messageVerify,
      body.signature
    );

    if (!isSignatureValid) {
      console.error("❌ Invalid signature from Momo");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Get order from database
    const order = await orderDatabase.getOrderByMomoId(body.orderId);
    if (!order) {
      console.error(`❌ Order not found: ${body.orderId}`);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Process payment callback
    if (body.resultCode === 0) {
      console.log("✅ Payment successful:", {
        orderId: body.orderId,
        amount: body.amount,
        transId: body.transId,
      });

      // Update order status to PAID
      await orderDatabase.updateOrderStatus(body.orderId, "paid", body.transId);

      // Send confirmation emails
      await emailService.sendConfirmationEmail(order.customerEmail, order);
      await emailService.sendPaymentSuccessEmail(order.customerEmail, order);

      // Generate and send invoice
      await invoiceService.sendInvoice(order.customerEmail, {
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        totalAmount: order.totalAmount,
        paymentDate: new Date(),
        paymentMethod: order.paymentMethod,
      });

      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
        orderId: body.orderId,
        transId: body.transId,
      });
    } else {
      console.log("❌ Payment failed:", {
        orderId: body.orderId,
        resultCode: body.resultCode,
        message: body.message,
      });

      // Update order status to FAILED
      await orderDatabase.updateOrderStatus(body.orderId, "failed");

      // Send failure notification
      await emailService.sendPaymentFailedEmail(order.customerEmail, body.orderId);

      return NextResponse.json({
        success: false,
        message: body.message,
        orderId: body.orderId,
        resultCode: body.resultCode,
      });
    }
  } catch (error) {
    console.error("❌ Momo callback error:", error);
    return NextResponse.json(
      {
        error: "Callback processing failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
