"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Award } from "lucide-react";
import ParticleField from "./ParticleField";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-obsidian overflow-hidden border-b border-white/5 py-12 md:py-0">
      
      {/* Particles Background Layer */}
      <ParticleField />

      {/* Background Premium Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cr7Green/10 filter blur-[120px] pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cr7Red/10 filter blur-[150px] pulse-glow pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

        {/* Left Text Detail */}
        <div className="space-y-8 flex flex-col items-start text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 bg-slateDark border border-white/10 px-4 py-1.5 rounded-full"
          >
            <Award className="w-4 h-4 text-cr7Gold" />
            <span className="text-[10px] font-display font-black tracking-widest text-silverLight uppercase">
              BỘ SƯU TẬP GIỚI HẠN SIÊU SAO (CR7 STRIKE EXCLUSIVE)
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-display font-black text-5xl md:text-7xl leading-none italic tracking-tighter text-white">
              WEAR
              <br />
              <span className="text-speed-gradient">GREATNESS</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed pt-4">
              Khám phá dòng sản phẩm trang phục và giày bóng đá cao cấp được thiết kế chuyên biệt để hỗ trợ tối đa tốc độ, lực sút và sức bật nhảy. Được lấy cảm hứng từ chính tinh thần vượt giới hạn của Cristiano Ronaldo.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/shop"
              className="bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian font-display font-black tracking-widest text-xs py-4 px-8 rounded flex items-center justify-center space-x-2 group glow-hover transition-all duration-300"
            >
              <span>MUA NGAY BÂY GIỜ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/shop"
              className="bg-slateDark border border-white/10 hover:border-white/20 text-white font-display font-bold tracking-wider text-xs py-4 px-8 rounded flex items-center justify-center space-x-2 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>XEM BỘ SƯU TẬP</span>
            </Link>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 w-full max-w-md"
          >
            <AnimatedCounter target="#07" label="Số Áo Huyền Thoại" color="text-cr7Green" />
            <AnimatedCounter target="100%" label="Vật Liệu Cao Cấp" color="text-white" />
            <AnimatedCounter target="2.93m" label="Sức Bật Kỷ Lục" color="text-cr7Red" />
          </motion.div>
        </div>

        {/* Right Dynamic Card Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center cursor-pointer group"
          style={{ perspective: 1000 }}
        >
          {/* Main Visual Box */}
          <div className="w-full max-w-[420px] aspect-[4/5] bg-gradient-to-tr from-slateDark to-obsidian border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group-hover:border-cr7Green/20 transition-all duration-300">
            {/* Glowing borders hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cr7Green/5 to-cr7Red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hero Image Background */}
            <div className="absolute inset-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1584735934672-e4630079266f?w=500&h=650&fit=crop"
                alt="CR7 Football Hero"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
              <span className="text-cr7Gold font-display font-black text-xs tracking-widest">CR7 SPECIAL EDITION</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">07 // 999</span>
            </div>

            {/* Silhouette / Graphic container */}
            <div className="flex-grow flex items-center justify-center py-6 relative z-10">
              {/* Dynamic abstract vector art of player scoring a overhead kick */}
              <svg className="w-48 h-48 text-white/5 absolute pulse-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div className="text-center space-y-4">
                <span className="block text-cr7Red font-display font-black text-8xl md:text-9xl leading-none italic tracking-tighter opacity-15">07</span>
                <span className="absolute inset-0 flex items-center justify-center font-display font-black text-lg text-white group-hover:scale-105 transition-transform duration-300 tracking-widest uppercase">
                  MERCURIAL SHIELD
                </span>
              </div>
            </div>

            {/* Footer detail */}
            <div className="border-t border-white/5 pt-4 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Giày bóng đá thế hệ mới</span>
                  <span className="font-display font-extrabold text-white text-base">CR7 Superfly 9 Gold</span>
                </div>
                <span className="text-cr7Green font-display font-black text-lg">$279</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
