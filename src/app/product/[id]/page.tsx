"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Truck, ShoppingCart, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const id = params.id as string;

  // Retrieve matching product
  const product = products.find((p) => p.id === id);

  // States
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="font-display font-black text-2xl text-white uppercase">SẢN PHẨM KHÔNG TỒN TẠI</h2>
        <p className="text-gray-400 text-sm">Vui lòng quay lại danh sách cửa hàng để tìm kiếm.</p>
        <Link href="/shop" className="bg-cr7Green text-obsidian px-6 py-3 font-display font-black tracking-widest text-xs rounded hover:opacity-90 transition-opacity">
          QUAY LẠI CỬA HÀNG
        </Link>
      </div>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, selectedSize);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      
      {/* Back to Shop Nav */}
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase font-display"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>QUAY LẠI</span>
      </button>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Premium Image Container */}
        <div className="relative aspect-square w-full bg-slateDark border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 shadow-xl">
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 z-20 text-[9px] font-display font-black tracking-widest text-obsidian bg-cr7Green px-3 py-1.5 rounded-sm uppercase">
              {product.badge}
            </span>
          )}

          {/* Core Graphic Visual Backdrop */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-6 bg-gradient-to-br from-slateDark to-obsidian">
            <svg className="w-24 h-24 opacity-10 text-cr7Green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.73-8.029-2.018m16.058 0a12.017 12.017 0 010 6.036m0 0a8.997 8.997 0 01-7.843 4.582M3.633 14.582a8.997 8.997 0 007.843 4.582m0 0a12.017 12.017 0 010-6.036" />
            </svg>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest">CR7 ATHENTIC PRODUCT</span>
          </div>

          {/* Real Product Image */}
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10"
            />
          )}

          <div className="absolute bottom-4 inset-x-6 text-center z-20">
            <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider">
              CR7 AUTHENTIC GEAR DESIGNED IN PORTUGAL
            </p>
          </div>
        </div>

        {/* Right Side: Product Custom Details */}
        <div className="space-y-8">
          
          {/* Header metadata */}
          <div className="space-y-2">
            <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase bg-cr7Green/10 border border-cr7Green/20 px-3 py-1 rounded">
              {product.category.toUpperCase()}
            </span>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase italic tracking-tight pt-2">
              {product.name}
            </h1>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-1 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-cr7Gold fill-cr7Gold" : "text-gray-600"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 font-bold ml-2">
                {product.rating.toFixed(1)} / 5.0 ({product.reviewsCount} Đánh giá từ khách hàng)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-4 border-y border-white/5 py-4">
            <span className="font-display font-black text-3xl text-cr7Green">${product.price}</span>
            <span className="text-xs text-gray-500">Mã hàng: CR7-{product.id.toUpperCase()}</span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Specs */}
          <div className="space-y-3">
            <h3 className="text-xs font-display font-bold tracking-wider text-white">THÔNG SỐ CÔNG NGHỆ:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-400">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-cr7Gold flex-shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Controls: Size selection & Add quantity */}
          <div className="space-y-6 pt-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-display font-bold tracking-wider text-white">CHỌN KÍCH CỠ:</label>
                {sizeError && (
                  <span className="text-xs font-bold text-cr7Red">Vui lòng chọn kích cỡ!</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`text-xs font-bold font-display tracking-wider py-2.5 px-5 rounded border transition-all duration-150 ${
                        isSelected
                          ? "bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian border-transparent font-black"
                          : "bg-slateDark border-white/5 text-white hover:border-white/15"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity select & Checkout buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center border border-white/10 rounded-lg bg-slateDark h-14 w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-gray-400 hover:text-white transition-colors h-full"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-6 text-sm font-bold text-white min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-gray-400 hover:text-white transition-colors h-full"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-cr7Red to-red-600 text-white font-display font-black tracking-widest text-xs py-4 px-8 rounded-lg flex items-center justify-center space-x-3 glow-red-hover hover:opacity-95 transition-all uppercase h-14"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>THÊM VÀO GIỎ HÀNG</span>
              </button>
            </div>

            {/* Feedback message */}
            <AnimatePresence>
              {addedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-cr7Green/10 border border-cr7Green/20 text-cr7Green text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-between"
                >
                  <span>Đã thêm {quantity} sản phẩm (Size: {selectedSize}) vào giỏ hàng thành công!</span>
                  <button onClick={() => setAddedMessage(false)} className="text-[10px] underline hover:no-underline">Đóng</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-cr7Green" />
              <span>Giao hàng nhanh từ 1-2 ngày</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-cr7Gold" />
              <span>Sản phẩm chính hãng CR7</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 border-t border-white/5 pt-16">
          <div className="space-y-1">
            <span className="text-[10px] text-cr7Gold font-bold tracking-widest uppercase">Gợi ý khác</span>
            <h2 className="font-display font-black text-2xl text-white uppercase italic tracking-tight">
              SẢN PHẨM LIÊN QUAN
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailPage;
