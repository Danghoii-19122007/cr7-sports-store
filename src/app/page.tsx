"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
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
      
      <Marquee />

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
      <section className="max-w-7xl mx-auto px-6 space-y-10 relative">
        {/* Giant Outline Text Background */}
        <motion.span
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-8 -left-4 font-display font-black text-[8rem] md:text-[12rem] leading-none italic tracking-tighter text-transparent pointer-events-none select-none z-0"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}
        >
          SIGNATURE
        </motion.span>

        <div className="flex items-end justify-between border-b border-white/5 pb-4 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] text-cr7Green font-bold tracking-widest uppercase">
              Sản phẩm nổi bật
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white italic tracking-tight">
              {"BỘ SƯU TẬP ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="text-cr7Red">
                {"SIGNATURE".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center space-x-1 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase font-display"
            data-cursor="SHOP"
          >
            <span>TẤT CẢ SẢN PHẨM</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Category quick navigator */}
      <section className="max-w-7xl mx-auto px-6 space-y-8 relative">
        {/* Giant Outline Text Background */}
        <motion.span
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-6 -right-4 font-display font-black text-[7rem] md:text-[10rem] leading-none italic tracking-tighter text-transparent pointer-events-none select-none z-0"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}
        >
          EQUIP
        </motion.span>

        <div className="text-center space-y-2 relative z-10">
          <span className="text-[10px] text-cr7Gold font-bold tracking-widest uppercase">Phân loại</span>
          <h2 className="font-display font-black text-3xl text-white uppercase italic tracking-tight">
            TRANG BỊ CHO MỌI THỬ THÁCH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Footwear Card - Large */}
          <Link
            href="/shop?category=footwear"
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl block min-h-[300px]"
          >
            <img src="/images/product-mercurial.jpg" alt="Giày thể thao" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-br from-cr7GreenDark/80 to-obsidian/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
              <span className="text-[10px] text-cr7Green font-black tracking-widest uppercase mb-2">FOOTWEAR</span>
              <h3 className="font-display font-black text-4xl text-white italic tracking-tight relative z-10">GIÀY THỂ THAO</h3>
              <p className="text-gray-300 text-sm mt-2 max-w-sm relative z-10">Đế bám đa hướng, tăng tốc vượt bậc. Trải nghiệm công nghệ bứt tốc độc quyền của CR7.</p>
            </div>
          </Link>

          {/* Apparel Card - Top Right */}
          <Link
            href="/shop?category=apparel"
            className="md:col-span-1 md:row-span-1 group relative rounded-3xl overflow-hidden border border-white/10 shadow-xl block min-h-[250px]"
          >
            <img src="/images/product-jersey.png" alt="Quần áo đấu" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-br from-cr7Red/60 to-obsidian/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-[9px] text-cr7Red font-black tracking-widest uppercase mb-1">APPAREL</span>
              <h3 className="font-display font-black text-2xl text-white italic tracking-tight relative z-10">QUẦN ÁO ĐẤU</h3>
              <p className="text-gray-400 text-xs mt-1 relative z-10">Vải siêu nhẹ, tối ưu hóa thoát nhiệt.</p>
            </div>
          </Link>

          {/* Accessories Card - Bottom Right */}
          <Link
            href="/shop?category=accessories"
            className="md:col-span-1 md:row-span-1 group relative rounded-3xl overflow-hidden border border-white/10 shadow-xl block min-h-[250px]"
          >
            <img src="/images/product-ball.png" alt="Phụ kiện" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-br from-cr7Gold/50 to-obsidian/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-[9px] text-cr7Gold font-black tracking-widest uppercase mb-1">ACCESSORIES</span>
              <h3 className="font-display font-black text-2xl text-white italic tracking-tight relative z-10">PHỤ KIỆN</h3>
              <p className="text-gray-400 text-xs mt-1 relative z-10">Băng đội trưởng, tất ma sát & thiết bị.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. CR7 Cinematic Banner */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Image with Parallax feel */}
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/images/cr7-trophy.jpg"
            alt="Cristiano Ronaldo - Champion"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-7xl mx-auto px-6 w-full"
          >
            <span className="text-[10px] text-cr7Gold font-display font-black tracking-[0.3em] uppercase block mb-3">THE LEGEND</span>
            <h2 className="font-display font-black text-4xl md:text-7xl text-white italic tracking-tighter leading-none">
              BORN TO <span className="text-cr7Gold">WIN</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-lg mt-4 leading-relaxed">
              Mỗi giọt mồ hôi, mỗi bàn thắng, mỗi danh hiệu — tất cả đều là minh chứng cho sự vĩ đại không có giới hạn.
            </p>

            {/* Stats row */}
            <div className="flex space-x-10 mt-8">
              <div>
                <span className="font-display font-black text-3xl md:text-4xl text-cr7Green block">900+</span>
                <span className="text-[9px] text-gray-400 font-display font-bold tracking-widest uppercase">Bàn Thắng</span>
              </div>
              <div>
                <span className="font-display font-black text-3xl md:text-4xl text-cr7Gold block">5×</span>
                <span className="text-[9px] text-gray-400 font-display font-bold tracking-widest uppercase">Quả Bóng Vàng</span>
              </div>
              <div>
                <span className="font-display font-black text-3xl md:text-4xl text-cr7Red block">35+</span>
                <span className="text-[9px] text-gray-400 font-display font-bold tracking-widest uppercase">Danh Hiệu</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Large Quote Block */}
      <section className="bg-slateDark/20 border-y border-white/5 py-32 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cr7Green/10 rounded-full filter blur-[150px] pointer-events-none" 
        />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10"
        >
          <span className="font-display font-black text-cr7Green text-6xl md:text-8xl italic opacity-50 block leading-none">"</span>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white leading-relaxed italic">
            Tôi không cần phải chứng minh bất kỳ điều gì với ai nữa. Tôi tự chứng minh điều đó bằng thành quả trên sân cỏ và những chiếc cúp vô địch.
          </h2>
          <div className="space-y-2 pt-4">
            <h4 className="font-display font-black text-base tracking-widest text-white">CRISTIANO RONALDO</h4>
            <p className="text-xs text-cr7Red font-black tracking-widest uppercase">Siêu sao bóng đá / Huyền thoại Bồ Đào Nha</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;
