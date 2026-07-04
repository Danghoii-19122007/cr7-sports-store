"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const HomePage = () => {
  // Highlight top 4 products
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-cr7Green" />,
      title: "VẬN CHUYỂN SIÊU TỐC",
      description: "Giao hàng nhanh chóng trong 24-48 giờ trên toàn quốc.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cr7Gold" />,
      title: "CHẤT LƯỢNG CHỨNG NHẬN CR7",
      description: "Mọi sản phẩm đều đạt tiêu chuẩn thi đấu khắt khe nhất.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cr7Red" />,
      title: "THIẾT KẾ GIỚI HẠN",
      description: "Sản phẩm độc quyền có in chữ ký và dấu ấn Ronaldo.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-white" />,
      title: "ĐỔI TRẢ TRONG 30 NGÀY",
      description: "Cam kết đổi trả dễ dàng nếu sản phẩm không vừa kích cỡ.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Landing Banner */}
      <Hero />

      {/* 2. Brand Value Props / Features */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-slateDark border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors"
          >
            <div className="mb-4">{feat.icon}</div>
            <h3 className="font-display font-bold text-sm tracking-wider text-white mb-2">{feat.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{feat.description}</p>
          </motion.div>
        ))}
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase">
              Sản phẩm nổi bật
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white italic tracking-tight">
              BỘ SƯU TẬP <span className="text-cr7Red">SIGNATURE</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center space-x-1 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase font-display"
          >
            <span>TẤT CẢ SẢN PHẨM</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Category quick navigator */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-cr7Gold font-bold tracking-widest uppercase">Phân loại</span>
          <h2 className="font-display font-black text-3xl text-white uppercase italic tracking-tight">
            TRANG BỊ CHO MỌI THỬ THÁCH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Footwear Card */}
          <Link
            href="/shop?category=footwear"
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 shadow-lg block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cr7GreenDark/60 to-obsidian/90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[9px] text-cr7Green font-black tracking-widest uppercase mb-1">FOOTWEAR</span>
              <h3 className="font-display font-black text-xl text-white italic tracking-tight">GIÀY THỂ THAO</h3>
              <p className="text-gray-400 text-xs mt-1">Đế bám đa hướng, tăng tốc vượt bậc.</p>
            </div>
          </Link>

          {/* Apparel Card */}
          <Link
            href="/shop?category=apparel"
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 shadow-lg block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cr7Red/40 to-obsidian/90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[9px] text-cr7Red font-black tracking-widest uppercase mb-1">APPAREL</span>
              <h3 className="font-display font-black text-xl text-white italic tracking-tight">QUẦN ÁO ĐẤU</h3>
              <p className="text-gray-400 text-xs mt-1">Vải siêu nhẹ, tối ưu hóa thoát nhiệt.</p>
            </div>
          </Link>

          {/* Accessories Card */}
          <Link
            href="/shop?category=accessories"
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 shadow-lg block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cr7Gold/30 to-obsidian/90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[9px] text-cr7Gold font-black tracking-widest uppercase mb-1">ACCESSORIES</span>
              <h3 className="font-display font-black text-xl text-white italic tracking-tight">PHỤ KIỆN</h3>
              <p className="text-gray-400 text-xs mt-1">Băng đội trưởng, tất ma sát & thiết bị.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Large Quote Block */}
      <section className="bg-slateDark/40 border-y border-white/5 py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-cr7Green/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="font-display font-black text-cr7Green text-4xl italic">"</span>
          <h2 className="font-display font-bold text-xl md:text-3xl text-white leading-relaxed italic">
            Tôi không cần phải chứng minh bất kỳ điều gì với ai nữa. Tôi tự chứng minh điều đó bằng thành quả trên sân cỏ và những chiếc cúp vô địch.
          </h2>
          <div className="space-y-1">
            <h4 className="font-display font-black text-sm tracking-wider text-white">CRISTIANO RONALDO</h4>
            <p className="text-[10px] text-cr7Red font-black tracking-widest">SIÊU SAO BÓNG ĐÁ / HUYỀN THOẠI BỒ ĐÀO NHA</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
