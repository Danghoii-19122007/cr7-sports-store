"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, Receipt, CheckCircle, Smartphone, ShieldCheck, QrCode } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("hanoi");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo" | "vnpay" | "cod">("card");

  // Credit Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Control Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    setIsSubmitting(true);
    setPaymentError("");

    // Generate Order ID
    const randomId = "CR7-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    // Handle different payment methods
    if (paymentMethod === "momo") {
      try {
        // Call Momo checkout API
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(cartTotal),
            orderId: randomId,
            customerEmail: email,
            customerName: name,
            phone: phone,
            address: address,
            city: city,
            paymentMethod: "momo",
            items: cartItems.map((item) => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Payment creation failed");
        }

        // Redirect to Momo payment URL
        if (result.payUrl) {
          setPaymentUrl(result.payUrl);
          setIsSubmitting(false);
          setIsSuccess(true);
        } else {
          throw new Error("No payment URL returned");
        }
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Payment request failed";
        setPaymentError(errorMsg);
        setIsSubmitting(false);
      }
    } else {
      // Simulate payment processing for other methods
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleFinish = () => {
    clearCart();
    router.push("/");
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Receipt className="w-16 h-16 text-gray-600" />
        <h2 className="font-display font-black text-2xl text-white uppercase">GIỎ HÀNG TRỐNG</h2>
        <p className="text-gray-400 text-sm">Bạn không có sản phẩm nào để thanh toán.</p>
        <button
          onClick={() => router.push("/shop")}
          className="bg-cr7Green text-obsidian px-6 py-3 font-display font-black tracking-widest text-xs rounded hover:opacity-90 transition-opacity"
        >
          MUA SẮM NGAY
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen relative">
      {/* 1. Header */}
      <div className="space-y-2 border-b border-white/5 pb-6 mb-10">
        <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase">Thanh toán đơn hàng</span>
        <h1 className="font-display font-black text-4xl text-white italic uppercase tracking-tight">
          THỦ TỤC THANH TOÁN
        </h1>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left 7 Columns: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">

          <form onSubmit={handlePaymentSubmit} className="space-y-8">
            {/* Step 1: Shipping Info */}
            <div className="bg-slateDark border border-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <Truck className="w-5 h-5 text-cr7Green" />
                <h3 className="font-display font-bold text-sm tracking-wider text-white">1. THÔNG TIN GIAO HÀNG</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">HỌ VÀ TÊN NGƯỜI NHẬN</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">SỐ ĐIỆN THOẠI</label>
                  <input
                    type="tel"
                    required
                    placeholder="0987654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">ĐỊA CHỈ NHẬN HÀNG</label>
                  <input
                    type="text"
                    required
                    placeholder="Số 123, Đường ABC, Phường X, Quận Y"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">TỈNH / THÀNH PHỐ</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-cr7Green transition-colors cursor-pointer"
                  >
                    <option value="hanoi">Hà Nội</option>
                    <option value="tphcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="haiphong">Hải Phòng</option>
                    <option value="cantho">Cần Thơ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Select */}
            <div className="bg-slateDark border border-white/5 rounded-xl p-6 space-y-6">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <CreditCard className="w-5 h-5 text-cr7Gold" />
                <h3 className="font-display font-bold text-sm tracking-wider text-white">2. PHƯƠNG THỨC THANH TOÁN</h3>
              </div>

              {/* Payment Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "card"
                    ? "bg-cr7Green/5 border-cr7Green text-cr7Green"
                    : "bg-obsidian border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="text-[10px] font-display font-black tracking-wider uppercase text-center">Thẻ Visa/Master</span>
                </button>

                {/* Momo */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("momo")}
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "momo"
                    ? "bg-cr7Red/5 border-cr7Red text-cr7Red"
                    : "bg-obsidian border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="text-[10px] font-display font-black tracking-wider uppercase text-center">Ví MoMo</span>
                </button>

                {/* VNPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("vnpay")}
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "vnpay"
                    ? "bg-blue-500/5 border-blue-500 text-blue-500"
                    : "bg-obsidian border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                >
                  <QrCode className="w-6 h-6" />
                  <span className="text-[10px] font-display font-black tracking-wider uppercase text-center">VNPAY QR</span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "cod"
                    ? "bg-white/5 border-white text-white"
                    : "bg-obsidian border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                >
                  <Truck className="w-6 h-6" />
                  <span className="text-[10px] font-display font-black tracking-wider uppercase text-center">Ship COD</span>
                </button>
              </div>

              {/* Dynamic Inputs Based on Choice */}
              <div className="bg-obsidian p-4 rounded-lg border border-white/5">

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white font-display tracking-wider">THÔNG TIN THẺ CỦA BẠN</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-gray-500 tracking-wider">SỐ THẺ (CARD NUMBER)</label>
                        <input
                          type="text"
                          required={paymentMethod === "card"}
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slateDark border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cr7Green transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-gray-500 tracking-wider">HẠN DÙNG (MM/YY)</label>
                          <input
                            type="text"
                            required={paymentMethod === "card"}
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slateDark border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cr7Green transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-gray-500 tracking-wider">MÃ BẢO MẬT (CVV)</label>
                          <input
                            type="password"
                            required={paymentMethod === "card"}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-slateDark border border-white/10 rounded p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cr7Green transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "momo" && (
                  <div className="text-center py-4 space-y-4 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-cr7Red font-display tracking-wider">QUÉT MÃ QR MOMO ĐỂ THANH TOÁN</h4>
                    {/* Simulated QR Code box */}
                    <div className="w-40 h-40 bg-white p-3 rounded-lg border-4 border-cr7Red relative flex items-center justify-center">
                      {/* Fake QR lines block */}
                      <div className="absolute inset-2 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-obsidian" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 leading-normal">
                        Mở App MoMo của bạn và quét mã trên để thanh toán số tiền:
                      </p>
                      <p className="text-sm font-display font-black text-white">đ{(cartTotal * 23000).toLocaleString("vi-VN")}</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "vnpay" && (
                  <div className="text-center py-4 space-y-4 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-blue-500 font-display tracking-wider">QUÉT MÃ VNPAY QR</h4>
                    <div className="w-40 h-40 bg-white p-3 rounded-lg border-4 border-blue-500 relative flex items-center justify-center">
                      <div className="absolute inset-2 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-obsidian" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 leading-normal">
                        Sử dụng Mobile Banking quét mã VNPay để chuyển khoản thanh toán:
                      </p>
                      <p className="text-sm font-display font-black text-white">${cartTotal}</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="py-4 space-y-2 text-center">
                    <h4 className="text-xs font-bold text-white font-display tracking-wider">THANH TOÁN KHI NHẬN HÀNG (COD)</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Đơn hàng sẽ được chuyển đến địa chỉ của bạn. Bạn vui lòng thanh toán trực tiếp số tiền <span className="text-white font-bold">${cartTotal}</span> cho nhân viên giao hàng khi nhận sản phẩm.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Show Payment Error if Any */}
            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cr7Red/10 border border-cr7Red text-cr7Red rounded-lg p-4"
              >
                <p className="text-xs font-bold">❌ Lỗi: {paymentError}</p>
              </motion.div>
            )}

            {/* Submit checkout CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cr7GreenDark to-cr7Green disabled:opacity-50 text-obsidian font-display font-black tracking-widest text-xs py-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-95 transition-all shadow-lg uppercase"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-obsidian" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>XÁC NHẬN THANH TOÁN (${cartTotal})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right 5 Columns: Order Summary Card */}
        <div className="lg:col-span-5 bg-slateDark border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <Receipt className="w-5 h-5 text-gray-400" />
            <h3 className="font-display font-bold text-sm tracking-wider text-white">ĐƠN HÀNG CỦA BẠN</h3>
          </div>

          {/* Cart Item Rows */}
          <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2">
            {cartItems.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="flex space-x-3 pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                <div className="w-12 h-12 bg-obsidian rounded border border-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow space-y-0.5 text-left">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold">
                    Size: <span className="text-cr7Green">{item.selectedSize}</span> | SL: <span className="text-white">{item.quantity}</span>
                  </p>
                </div>
                <span className="text-xs font-display font-bold text-white mt-1">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals Summary */}
          <div className="border-t border-white/5 pt-4 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Tạm tính:</span>
              <span className="text-white font-bold">${cartTotal}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Phí giao hàng:</span>
              <span className="text-cr7Green font-bold">Miễn phí</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/5 pt-4">
              <span className="text-sm font-bold text-white">TỔNG CỘNG:</span>
              <span className="text-lg font-display font-black text-cr7Green">${cartTotal}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Success Modal Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-slateDark border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-cr7Green/10 border border-cr7Green/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-cr7Green" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase">Thanh toán hoàn tất</span>
                <h2 className="font-display font-black text-2xl text-white uppercase italic tracking-tight">ĐẶT HÀNG THÀNH CÔNG!</h2>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Cảm ơn bạn đã lựa chọn mua sắm tại CR7 Store. Đơn hàng của bạn đã được xác nhận thành công.
                </p>
              </div>

              <div className="bg-obsidian border border-white/5 rounded-lg p-5 text-left text-xs space-y-3.5 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-white/5 pb-2 text-gray-400">
                  <span>MÃ ĐƠN HÀNG:</span>
                  <span className="text-white font-bold">{orderId}</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-gray-500 font-bold">THÔNG TIN GIAO NHẬN:</p>
                  <p className="text-white"><span className="text-gray-400">Khách hàng:</span> {name}</p>
                  <p className="text-white"><span className="text-gray-400">Số điện thoại:</span> {phone}</p>
                  <p className="text-white"><span className="text-gray-400">Địa chỉ:</span> {address}</p>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3.5">
                  <span className="font-bold text-gray-400">ĐÃ THANH TOÁN:</span>
                  <span className="text-sm font-display font-black text-cr7Green">${cartTotal}</span>
                </div>
              </div>

              {paymentMethod === "momo" && paymentUrl ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cr7Red/10 border border-cr7Red/20 rounded-lg p-4 space-y-3"
                >
                  <p className="text-xs text-cr7Red font-bold tracking-wider">🔒 HOÀN TẤT THANH TOÁN MOMO</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Nhấn nút bên dưới để hoàn tất thanh toán qua MoMo. Bạn sẽ được chuyển hướng đến cổng thanh toán MoMo.
                  </p>
                  <button
                    onClick={() => window.open(paymentUrl, "_blank")}
                    className="w-full bg-cr7Red hover:bg-cr7Red/90 text-white font-display font-black tracking-widest text-xs py-2.5 rounded transition-colors"
                  >
                    HOÀN TẤT THANH TOÁN MOMO
                  </button>
                </motion.div>
              ) : null}

              <button
                onClick={handleFinish}
                className="bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian font-display font-black tracking-widest text-xs py-3.5 px-8 rounded hover:opacity-95 transition-opacity uppercase"
              >
                QUAY LẠI TRANG CHỦ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;
