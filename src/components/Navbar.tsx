"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "SẢN PHẨM", path: "/shop" },
    { name: "ABOUT ME", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-1">
          <span className="font-display font-black text-3xl tracking-tighter italic text-white hover:opacity-90 transition-opacity">
            CR7
            <span className="text-cr7Green text-3xl font-extrabold">.</span>
            <span className="text-cr7Red text-3xl font-extrabold">S</span>
            <span className="text-white text-3xl font-normal not-italic">PORT</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative font-display text-sm font-bold tracking-widest text-silverLight hover:text-white transition-colors py-2"
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cr7Green to-cr7Red"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Icons Area */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-silverLight hover:text-cr7Green transition-colors duration-200"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-cr7Red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-obsidian"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* User Signin/Signout */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="flex items-center space-x-2 text-sm font-bold text-silverLight hover:text-cr7Green transition-colors">
                <User className="w-5 h-5 text-cr7Gold" />
                <span>Hi, {user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-cr7Red transition-colors duration-200"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-2 text-sm font-bold hover:text-cr7Green transition-colors text-silverLight"
            >
              <User className="w-5 h-5" />
              <span>ĐĂNG NHẬP</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburguer Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-silverLight hover:text-cr7Green transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cr7Red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-obsidian">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-silverLight hover:text-cr7Green transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-obsidian/95 border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden shadow-2xl backdrop-blur-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-display text-base font-bold tracking-wider py-2 border-b border-white/5 ${
                  pathname === link.path ? "text-cr7Green" : "text-silverLight"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-cr7Gold font-bold">
                  <User className="w-5 h-5" />
                  <span>Xin chào, {user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-left py-2 text-cr7Red font-bold border-b border-white/5"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ĐĂNG XUẤT</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 font-display text-base font-bold py-2 text-silverLight"
              >
                <User className="w-5 h-5" />
                <span>ĐĂNG NHẬP</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
