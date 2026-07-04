// Email service - currently mock, integrate with SendGrid/Mailgun/AWS SES in production

export interface EmailData {
  to: string;
  subject: string;
  type: "confirmation" | "payment_success" | "payment_failed" | "shipped" | "delivered";
  data: Record<string, any>;
}

class EmailService {
  async sendConfirmationEmail(email: string, orderData: any): Promise<boolean> {
    console.log(`📧 Sending confirmation email to ${email}`, orderData);
    // TODO: Integrate with real email service (SendGrid, Mailgun, etc)
    // Example:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: 'noreply@cr7store.com',
    //   subject: `Xác nhận đơn hàng #${orderData.orderId}`,
    //   html: `<h1>Cảm ơn bạn</h1>...`
    // });
    return true;
  }

  async sendPaymentSuccessEmail(email: string, orderData: any): Promise<boolean> {
    console.log(`📧 Sending payment success email to ${email}`, orderData);
    // TODO: Send invoice and tracking link
    return true;
  }

  async sendPaymentFailedEmail(email: string, orderId: string): Promise<boolean> {
    console.log(`📧 Sending payment failed email to ${email} for order ${orderId}`);
    // TODO: Suggest retry or alternative payment methods
    return true;
  }

  async sendShippedEmail(email: string, orderData: any, trackingLink?: string): Promise<boolean> {
    console.log(`📧 Sending shipped email to ${email}`, { orderData, trackingLink });
    // TODO: Include tracking number and estimated delivery
    return true;
  }

  async sendDeliveredEmail(email: string, orderData: any): Promise<boolean> {
    console.log(`📧 Sending delivered email to ${email}`, orderData);
    // TODO: Ask for review, offer loyalty points
    return true;
  }
}

export const emailService = new EmailService();
