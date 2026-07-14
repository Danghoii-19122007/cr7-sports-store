"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Gamepad2, Trophy, Github, Facebook, Instagram, Mail, ArrowLeft, Zap, Heart } from "lucide-react";

const AboutPage = () => {
  const skills = [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React / Next.js", level: 80 },
    { name: "UI/UX Design", level: 75 },
  ];

  const passions = [
    { icon: <Code2 className="w-6 h-6" />, title: "Lập Trình Web", desc: "Đam mê xây dựng các trang web hiện đại, đẹp mắt và tối ưu hiệu năng." },
    { icon: <Trophy className="w-6 h-6" />, title: "Thể Thao", desc: "Fan cuồng nhiệt của CR7 và bóng đá. Thể thao là nguồn cảm hứng sáng tạo." },
    { icon: <Gamepad2 className="w-6 h-6" />, title: "Công Nghệ", desc: "Luôn theo dõi và áp dụng những xu hướng công nghệ mới nhất vào dự án." },
    { icon: <Heart className="w-6 h-6" />, title: "Sáng Tạo", desc: "Mỗi dòng code là một tác phẩm nghệ thuật, mỗi pixel đều có ý nghĩa." },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-cr7Green transition-colors text-sm font-display font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>QUAY LẠI TRANG CHỦ</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow behind avatar */}
              <div className="absolute inset-0 bg-cr7Green/20 rounded-full filter blur-[80px] scale-110" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cr7Green/30 shadow-2xl">
                <img
                  src="/images/dangh-oii-avatar.png"
                  alt="DangH_oii Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 bg-slateDark border border-cr7Green/30 rounded-xl px-4 py-2 shadow-lg"
              >
                <span className="text-cr7Green font-display font-black text-xs tracking-widest">CREATOR</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] text-cr7Green font-display font-black tracking-widest uppercase">Người sáng tạo</span>
              <h1 className="font-display font-black text-5xl md:text-6xl text-white italic tracking-tight">
                DangH<span className="text-cr7Green">_</span>oii
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed pt-2">
                Sinh viên đam mê công nghệ và thể thao. Mình tin rằng mỗi dòng code đều có thể tạo ra điều kỳ diệu — giống như cách CR7 biến mỗi trận đấu thành một kiệt tác.
              </p>
            </div>

            <div className="border-l-4 border-cr7Red pl-4 py-2">
              <p className="text-white font-display italic text-sm font-semibold">
                "Code is poetry. Design is emotion. Together, they create magic."
              </p>
              <span className="text-cr7Green font-display text-[10px] tracking-wider font-bold">— DANGH_OII</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/Danghoii191207" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cr7Green hover:border-cr7Green/50 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/dangh_oii/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cr7Green hover:border-cr7Green/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:lehieudang123123@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cr7Green hover:border-cr7Green/50 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Passions Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-2"
        >
          <span className="text-[10px] text-cr7Gold font-display font-black tracking-widest uppercase">Đam mê</span>
          <h2 className="font-display font-black text-3xl text-white italic tracking-tight">NHỮNG ĐIỀU MÌNH YÊU THÍCH</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slateDark/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-cr7Green/20 transition-all duration-300 group text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-cr7Green/10 flex items-center justify-center text-cr7Green mb-4 mx-auto group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-2 tracking-wider">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-2"
        >
          <span className="text-[10px] text-cr7Red font-display font-black tracking-widest uppercase">Kỹ năng</span>
          <h2 className="font-display font-black text-3xl text-white italic tracking-tight">TECH STACK</h2>
        </motion.div>

        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-sm text-white tracking-wider">{skill.name}</span>
                <span className="text-cr7Green font-display font-black text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slateDark rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cr7GreenDark to-cr7Green"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slateDark to-obsidian border border-white/10 rounded-3xl p-12 space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cr7Green/5 rounded-full filter blur-[100px] scale-50" />
          <Zap className="w-8 h-8 text-cr7Gold mx-auto relative z-10" />
          <h3 className="font-display font-black text-2xl text-white italic tracking-tight relative z-10">
            CÙNG NHAU TẠO RA ĐIỀU TUYỆT VỜI
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto relative z-10">
            Nếu bạn thích những gì bạn thấy ở đây, hãy kết nối với mình qua mạng xã hội nhé!
          </p>
          <div className="flex justify-center space-x-4 relative z-10">
            <a href="https://www.facebook.com/Danghoii191207" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian font-display font-black tracking-widest text-xs py-3 px-6 rounded flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Facebook className="w-4 h-4" />
              <span>FACEBOOK</span>
            </a>
            <a href="https://www.instagram.com/dangh_oii/" target="_blank" rel="noopener noreferrer" className="bg-slateDark border border-white/10 hover:border-white/20 text-white font-display font-bold tracking-wider text-xs py-3 px-6 rounded flex items-center space-x-2 transition-colors">
              <Instagram className="w-4 h-4" />
              <span>INSTAGRAM</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
