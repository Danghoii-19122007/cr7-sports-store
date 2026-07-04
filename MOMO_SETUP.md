# 🎯 CR7 Sports Store - Hướng Dẫn Tích Hợp Momo Payment

## ✅ Tính Năng Mới Đã Thêm

### 1. 📸 Ảnh Sản Phẩm Từ Trên Mạng
- ✅ Tất cả 8 sản phẩm đều có ảnh từ Unsplash
- ✅ Hình ảnh hiển thị trên product cards
- ✅ Hình ảnh hiển thị trên giỏ hàng
- ✅ Hình ảnh hiển thị trên trang checkout

**File đã cập nhật:**
- `src/data/products.ts` - 8 product images

### 2. 🖼️ Hero Banner Với Ảnh
- ✅ Banner chính có ảnh nền CR7 player
- ✅ Hiệu ứng overlay gradient
- ✅ Responsive design

**File đã cập nhật:**
- `src/components/Hero.tsx` - Hero image

### 3. 💳 Hệ Thống Thanh Toán Momo Tự Động
- ✅ Integration với Momo Payment API
- ✅ Tự động tạo payment link & QR code
- ✅ Callback webhook để xác nhận thanh toán
- ✅ Test mode (Sandbox)
- ✅ Sẵn sàng cho Production

**Files đã tạo:**
- `src/lib/momo.ts` - Momo API client
- `src/app/api/checkout/route.ts` - Checkout endpoint
- `src/app/api/momo-callback/route.ts` - Webhook callback
- `.env.local` - Configuration

## 🚀 Cách Sử Dụng

### Khởi Chạy Dev Server

```bash
npm run dev
```

Truy cập: `http://localhost:3000`

### Quy Trình Thanh Toán

1. **Vào Shop** → Xem sản phẩm với ảnh
2. **Thêm vào giỏ hàng** → Click "MUA NGAY" hoặc icon giỏ
3. **Xem giỏ hàng** → Nhấn nút "Thanh Toán"
4. **Điền thông tin** → Tên, SĐT, Địa chỉ giao hàng
5. **Chọn Momo** → Click vào button Momo ở phần thanh toán
6. **Xác nhận đơn hàng** → Nhấn "XÁC NHẬN THANH TOÁN"
7. **Chuyển hướng Momo** → Hệ thống sẽ mở cổng thanh toán Momo

## ⚙️ Cấu Hình Momo

### Test Mode (Hiện Tại)

`.env.local` đã có sẵn test credentials:

```env
MOMO_PARTNER_CODE=MOMO_PARTNER_TEST
MOMO_ACCESS_KEY=F8590061
MOMO_SECRET_KEY=fa6ce01160c2098eb7e02068c09e38f5
MOMO_ENDPOINT=https://test-payment.momo.vn/v2/gateway/api/create
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production Mode

Để chuyển sang production:

1. **Đăng ký tài khoản Momo Business**
   - Truy cập: https://business.momo.vn/
   - Hoàn tất KYC/verify tài khoản

2. **Lấy Production Credentials**
   - Partner Code
   - Access Key
   - Secret Key

3. **Cập nhật `.env.local`:**
   ```env
   MOMO_PARTNER_CODE=your_production_partner_code
   MOMO_ACCESS_KEY=your_production_access_key
   MOMO_SECRET_KEY=your_production_secret_key
   MOMO_ENDPOINT=https://payment.momo.vn/v2/gateway/api/create
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

## 📋 API Endpoints

### 1. POST `/api/checkout`

Tạo payment request

**Request Body:**
```json
{
  "amount": 250,
  "orderId": "CR7-123456",
  "customerEmail": "customer@example.com",
  "customerName": "Nguyễn Văn A",
  "items": [
    {
      "name": "CR7 Mercurial Superfly 9 Elite FG",
      "quantity": 1,
      "price": 279
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "CR7-123456",
  "payUrl": "https://payment.momo.vn/...",
  "deeplink": "momo://payment/...",
  "qrCodeUrl": "...",
  "amount": 250,
  "message": "Payment request created successfully"
}
```

### 2. POST `/api/momo-callback`

Nhận thông báo từ Momo (Webhook)

**Momo gửi:**
```json
{
  "partnerCode": "MOMO_PARTNER_TEST",
  "orderId": "CR7-123456",
  "requestId": "1234567890",
  "amount": 250,
  "orderInfo": "Thanh toán đơn hàng CR7-123456: ...",
  "orderType": "momo_wallet",
  "transId": "2104...",
  "resultCode": 0,
  "message": "Success",
  "payType": "qrcode",
  "responseTime": 1234567890,
  "extraData": "{...}",
  "signature": "..."
}
```

## 🔧 Các Tính Năng Cần Hoàn Thiện

> **TODO Items:**
> 
> Các tính năng sau cần được thêm vào để hoàn chỉnh hệ thống:
>
> 1. **Database Integration**
>    - [ ] Lưu đơn hàng vào database
>    - [ ] Lưu transaction history
>    - [ ] Update order status khi thanh toán
>
> 2. **Email Notifications**
>    - [ ] Gửi confirmation email khi đặt hàng
>    - [ ] Gửi payment success email
>    - [ ] Gửi payment failure email
>
> 3. **Order Management**
>    - [ ] Tạo admin panel để xem đơn hàng
>    - [ ] Thay đổi trạng thái đơn hàng
>    - [ ] Theo dõi giao hàng
>
> 4. **Additional Payment Methods**
>    - [ ] Hoàn thiện VNPay integration
>    - [ ] Hoàn thiện Credit Card payment
>    - [ ] Thêm e-wallet khác
>
> 5. **Security**
>    - [ ] Rate limiting trên API
>    - [ ] CSRF protection
>    - [ ] Input validation & sanitization

## 🧪 Testing

### Test Momo Payment Flow

1. Chạy dev server: `npm run dev`
2. Thêm sản phẩm vào giỏ
3. Vào checkout, điền thông tin
4. Chọn Momo payment
5. Nhấn "XÁC NHẬN THANH TOÁN"
6. Hệ thống sẽ mở Momo payment page

### Check API Responses

```bash
# Test checkout endpoint
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "orderId": "TEST-001",
    "customerName": "Test User"
  }'
```

## 📚 Tài Liệu Tham Khảo

- **Momo Developer**: https://developers.momo.vn/
- **Momo Payment API**: https://developers.momo.vn/v3/docs/payment/
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **Next.js App Router**: https://nextjs.org/docs/app

## 📞 Support

- 📧 Momo Support: https://help.momo.vn/
- 🐛 Report Issues: GitHub Issues
- 💬 Community: Discord/Slack

## ✅ Checklist

- [x] Thêm ảnh sản phẩm từ Unsplash
- [x] Thêm hero banner image
- [x] Tạo Momo API client
- [x] Tạo checkout endpoint
- [x] Tạo webhook callback endpoint
- [x] Cập nhật checkout page UI
- [x] Thêm payment link button
- [x] Setup .env.local
- [ ] Database integration (NEXT: Implement)
- [ ] Email notifications (NEXT: Implement)
- [ ] Order management (NEXT: Implement)
- [ ] Admin panel (FUTURE)
- [ ] Production deployment (FUTURE)

---

**Cập nhật lần cuối**: 09/06/2026
**Version**: 1.0.0
