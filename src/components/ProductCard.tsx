"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleQuickAdd = (size: string) => {
    addToCart(product, 1, size);
    setShowSizes(false);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <motion.div
      className="bg-slateDark border border-white/5 rounded-xl overflow-hidden shadow-lg relative group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-obsidian flex items-center justify-center cursor-pointer">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[9px] font-display font-black tracking-widest text-obsidian bg-cr7Green px-2.5 py-1 rounded-sm uppercase shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Fallback visual wrapper */}
        <div className="absolute inset-0 bg-gradient-to-br from-slateDark to-obsidian flex flex-col items-center justify-center p-4">
          <svg className="w-16 h-16 opacity-10 text-cr7Green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.73-8.029-2.018m16.058 0a12.017 12.017 0 010 6.036m0 0a8.997 8.997 0 01-7.843 4.582M3.633 14.582a8.997 8.997 0 007.843 4.582m0 0a12.017 12.017 0 010-6.036" />
          </svg>
          <span className="text-[8px] text-gray-600 uppercase tracking-widest mt-1">Loading...</span>
        </div>

        {/* Real Product Image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              // Hide image if failed to load
              e.currentTarget.style.opacity = '0';
            }}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 relative z-10"
          />
        )}

        {/* Hover overlay icons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-obsidian/75 flex items-center justify-center space-x-4 z-25"
            >
              <Link href={`/product/${product.id}`} className="p-3 bg-white text-obsidian rounded-full hover:bg-cr7Green hover:text-obsidian transition-colors shadow-lg" title="Xem chi tiết">
                <Eye className="w-5 h-5" />
              </Link>
              
              <button
                onClick={() => setShowSizes(true)}
                className="p-3 bg-cr7Red text-white rounded-full hover:bg-white hover:text-obsidian transition-colors shadow-lg"
                title="Thêm vào giỏ"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size Selection Overlay (Inside Card) */}
        <AnimatePresence>
          {showSizes && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 bg-slateDark border-t border-white/10 p-3 z-30 flex flex-col justify-end"
            >
              <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 text-center">CHỌN KÍCH CỠ:</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="text-xs font-bold text-white bg-obsidian hover:bg-cr7Green hover:text-obsidian border border-white/10 py-1 px-2.5 rounded transition-all duration-150"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Added To Cart message */}
        <AnimatePresence>
          {addedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-4 top-4 bg-cr7Green text-obsidian text-xs font-bold py-2 px-3 rounded shadow-md text-center z-30"
            >
              Đã thêm vào giỏ hàng thành công!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating) ? "text-cr7Gold fill-cr7Gold" : "text-gray-600"
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 font-bold ml-1">({product.reviewsCount})</span>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="hover:text-cr7Green transition-colors flex-grow">
          <h3 className="font-display font-bold text-base leading-snug tracking-tight text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price and Action Bar */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          <span className="font-display font-extrabold text-lg text-white">
            ${product.price}
          </span>
          <button
            onClick={() => setShowSizes(true)}
            className="text-[10px] font-display font-black tracking-widest text-white hover:text-cr7Green flex items-center space-x-1 uppercase group/btn"
          >
            <span>MUA NGAY</span>
            <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
