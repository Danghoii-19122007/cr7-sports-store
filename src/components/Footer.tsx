"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Twitter, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-obsidian border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* About & Inspirational Quote */}
        <div className="md:col-span-2 space-y-6">
          <span className="font-display font-black text-2xl tracking-tighter italic text-white">
            CR7<span className="text-cr7Green font-black">.</span><span className="text-cr7Red font-black">S</span>PORT
          </span>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Thương hiệu đồ thể thao cao cấp lấy cảm hứng từ tinh thần rèn luyện kỷ luật, ý chí vô địch và phong cách sống đẳng cấp của huyền thoại Cristiano Ronaldo.
          </p>
          <div className="border-l-4 border-cr7Red pl-4 py-1">
            <p className="text-white font-display italic text-sm font-semibold">
              "Your love makes me strong, your hate makes me unstoppable."
            </p>
            <span className="text-cr7Green font-display text-[10px] tracking-wider font-bold">— CRISTIANO RONALDO</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold tracking-widest text-white">DANH MỤC</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/shop" className="hover:text-cr7Green transition-colors duration-200">Giày Thể Thao (Footwear)</Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-cr7Green transition-colors duration-200">Quần Áo (Apparel)</Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-cr7Green transition-colors duration-200">Phụ Kiện (Accessories)</Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-cr7Green transition-colors duration-200">Limited CR7 Series</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold tracking-widest text-white">BẢN TIN</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Đăng ký để nhận thông tin về các bộ sưu tập giới hạn sớm nhất.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="bg-slateDark text-white px-4 py-2 rounded-l-md border border-white/10 focus:border-cr7Green focus:outline-none text-sm w-full"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cr7GreenDark to-cr7Green text-obsidian font-bold px-4 rounded-r-md hover:opacity-90 transition-opacity"
              aria-label="Subscribe"
            >
              <Mail className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <a href="mailto:lehieudang123123@gmail.com" className="flex items-center space-x-3 text-gray-400 hover:text-cr7Green transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cr7Green/50 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-display font-bold tracking-widest text-gray-500 uppercase">Email</span>
              <span className="text-sm text-white">lehieudang123123@gmail.com</span>
            </div>
          </a>
          <a href="tel:0858208886" className="flex items-center space-x-3 text-gray-400 hover:text-cr7Green transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cr7Green/50 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-display font-bold tracking-widest text-gray-500 uppercase">Hotline</span>
              <span className="text-sm text-white">0858 208 886</span>
            </div>
          </a>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} CR7 Sport Store. Designed & Developed by <a href="/about" className="text-cr7Green hover:text-white transition-colors font-display font-bold">DangH_oii</a>.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com/Danghoii191207" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cr7Green transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/dangh_oii/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cr7Green transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-cr7Green transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-cr7Gold transition-colors" aria-label="Awards">
            <Award className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
