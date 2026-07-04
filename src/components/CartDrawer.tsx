"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slateDark border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-cr7Green" />
                <h2 className="font-display font-bold text-lg text-white">GIỎ HÀNG CỦA BẠN</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-obsidian flex items-center justify-center border border-white/5 text-gray-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">Giỏ hàng đang trống</h3>
                    <p className="text-gray-400 text-xs mt-1">Hãy khám phá bộ sưu tập của chúng tôi.</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian font-display font-black tracking-widest text-[10px] py-3 px-6 rounded hover:opacity-95 transition-opacity"
                  >
                    TIẾP TỤC MUA SẮM
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex space-x-4 pb-6 border-b border-white/5 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-obsidian rounded-lg border border-white/5 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <svg className="w-6 h-6 opacity-10 text-cr7Green absolute" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.73-8.029-2.018m16.058 0a12.017 12.017 0 010 6.036m0 0a8.997 8.997 0 01-7.843 4.582M3.633 14.582a8.997 8.997 0 007.843 4.582m0 0a12.017 12.017 0 010-6.036" />
                      </svg>
                    </div>

                    {/* Product Metadata */}
                    <div className="flex-grow space-y-1">
                      <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-bold">
                        Size: <span className="text-cr7Green">{item.selectedSize}</span>
                      </p>
                      
                      {/* Controls Row */}
                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-white/10 rounded bg-obsidian">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-display font-extrabold text-white">
                            ${item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-gray-500 hover:text-cr7Red transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary (Checkout Area) */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-obsidian space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-bold">TỔNG CỘNG:</span>
                  <span className="text-xl font-display font-black text-white">${cartTotal}</span>
                </div>
                <p className="text-[10px] text-gray-500 text-center leading-normal">
                  Chính sách vận chuyển miễn phí được áp dụng cho mọi đơn hàng Ronaldo Premium Edition.
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-gradient-to-r from-cr7Red to-red-600 text-white font-display font-black tracking-widest text-xs py-3.5 rounded glow-red-hover hover:opacity-95 transition-all text-center uppercase block"
                  >
                    TIẾN HÀNH THANH TOÁN
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-slateDark border border-white/10 hover:border-white/20 text-white font-display font-bold text-xs py-3.5 rounded transition-colors text-center"
                  >
                    TIẾP TỤC MUA SẮM
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
