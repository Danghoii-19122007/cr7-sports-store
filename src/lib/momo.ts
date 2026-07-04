import crypto from "crypto";

interface MomoPaymentRequest {
  amount: number;
  orderId: string;
  orderInfo: string;
  returnUrl: string;
  notifyUrl: string;
  requestId?: string;
  extraData?: string;
}

interface MomoPaymentResponse {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink?: string;
  qrCodeUrl?: string;
}

export class MomoClient {
  private partnerCode: string;
  private accessKey: string;
  private secretKey: string;
  private momoEndpoint: string;

  constructor() {
    this.partnerCode = process.env.MOMO_PARTNER_CODE || "MOMO_PARTNER_TEST";
    this.accessKey = process.env.MOMO_ACCESS_KEY || "F8590061";
    this.secretKey = process.env.MOMO_SECRET_KEY || "fa6ce01160c2098eb7e02068c09e38f5";
    this.momoEndpoint =
      process.env.MOMO_ENDPOINT ||
      "https://test-payment.momo.vn/v2/gateway/api/create";
  }

  /**
   * Create payment signature
   */
  private createSignature(
    accessKey: string,
    secretKey: string,
    requestBody: string
  ): string {
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(requestBody)
      .digest("hex");
    return hash;
  }

  /**
   * Create Momo payment request
   */
  async createPayment(
    paymentData: MomoPaymentRequest
  ): Promise<MomoPaymentResponse> {
    const requestId = paymentData.requestId || Date.now().toString();
    const timestamp = Date.now();

    // Signature string format per Momo API spec
    const signatureString = `accessKey=${this.accessKey}&amount=${paymentData.amount}&extraData=${paymentData.extraData || ""}&orderId=${paymentData.orderId}&orderInfo=${paymentData.orderInfo}&partnerCode=${this.partnerCode}&requestId=${requestId}&requestType=captureWallet&returnUrl=${paymentData.returnUrl}&notifyUrl=${paymentData.notifyUrl}&timestamp=${timestamp}`;

    const signature = this.createSignature(
      this.accessKey,
      this.secretKey,
      signatureString
    );

    const requestBody = {
      partnerCode: this.partnerCode,
      partnerName: "CR7 Sports Store",
      requestId: requestId,
      amount: paymentData.amount,
      orderId: paymentData.orderId,
      orderInfo: paymentData.orderInfo,
      returnUrl: paymentData.returnUrl,
      notifyUrl: paymentData.notifyUrl,
      requestType: "captureWallet",
      signature: signature,
      extraData: paymentData.extraData || "",
      items: null,
      userInfo: null,
      timestamp: timestamp,
    };

    try {
      const response = await fetch(this.momoEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      return result as MomoPaymentResponse;
    } catch (error) {
      console.error("Momo payment error:", error);
      throw new Error(`Momo payment creation failed: ${error}`);
    }
  }

  /**
   * Verify Momo webhook signature
   */
  verifySignature(
    message: string,
    signature: string
  ): boolean {
    const hash = crypto
      .createHmac("sha256", this.secretKey)
      .update(message)
      .digest("hex");
    return hash === signature;
  }
}

export const momoClient = new MomoClient();
