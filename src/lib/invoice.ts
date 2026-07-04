// Invoice generation service

export interface InvoiceData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentDate?: Date;
  paymentMethod: string;
}

class InvoiceService {
  /**
   * Generate invoice PDF or HTML
   * TODO: Implement PDF generation with PDFKit or html2pdf
   */
  async generateInvoice(data: InvoiceData): Promise<string> {
    console.log(`📄 Generating invoice for order ${data.orderId}`);

    // Simple HTML invoice template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${data.orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #e74c3c; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { color: #e74c3c; font-size: 24px; font-weight: bold; }
          .order-info { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .total { font-size: 18px; font-weight: bold; color: #e74c3c; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚽ CR7 SPORTS STORE</div>
            <p>Chuyên bán áo bóng đá chất lượng cao</p>
          </div>

          <h2>HÓA ĐƠN / INVOICE</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>

          <div class="order-info">
            <div>
              <h4>Thông tin khách hàng:</h4>
              <p><strong>${data.customerName}</strong></p>
              <p>📧 ${data.customerEmail}</p>
            </div>
            <div>
              <h4>Thông tin thanh toán:</h4>
              <p><strong>Phương thức:</strong> ${data.paymentMethod}</p>
              <p><strong>Ngày:</strong> ${data.paymentDate?.toLocaleDateString("vi-VN") || new Date().toLocaleDateString("vi-VN")}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th style="text-align: center;">Số lượng</th>
                <th style="text-align: right;">Giá</th>
                <th style="text-align: right;">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${data.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                  <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div style="text-align: right; margin-bottom: 20px;">
            <p class="total">Tổng cộng: $${data.totalAmount.toFixed(2)}</p>
          </div>

          <div class="footer">
            <p>Cảm ơn bạn đã mua sắm tại CR7 Sports Store!</p>
            <p>Mọi thắc mắc vui lòng liên hệ: support@cr7store.com | Hotline: 1900-xxxx</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return html;
  }

  /**
   * Send invoice to customer
   * TODO: Send generated invoice via email
   */
  async sendInvoice(email: string, invoiceData: InvoiceData): Promise<boolean> {
    console.log(`📄 Sending invoice to ${email}`);
    const invoiceHtml = await this.generateInvoice(invoiceData);
    // TODO: Use emailService to send invoice attachment
    return true;
  }
}

export const invoiceService = new InvoiceService();
