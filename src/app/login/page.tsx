"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, LogIn, Award, Sparkles, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const { user, login, signup, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // Form Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visual feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic Validation
    if (!email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (activeTab === "signup") {
      if (!name) {
        setErrorMsg("Vui lòng điền họ và tên.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Mật khẩu nhập lại không khớp.");
        return;
      }

      const success = await signup(name, email, password);
      if (success) {
        setSuccessMsg("Đăng ký tài khoản thành công! Chào mừng bạn.");
      } else {
        setErrorMsg("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
      }
    } else {
      const success = await login(email, password);
      if (success) {
        setSuccessMsg("Đăng nhập thành công! Chúc bạn mua sắm vui vẻ.");
      } else {
        setErrorMsg("Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-[80vh] flex items-center justify-center">
      <div className="w-full bg-slateDark border border-white/5 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Ronaldo Inspiration Quote Visual */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-cr7Red/20 via-obsidian to-cr7Green/10 relative overflow-hidden border-r border-white/5">
          {/* Ambient Glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-cr7Red/25 filter blur-[60px] rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cr7Green/20 filter blur-[60px] rounded-full" />

          {/* Top Branding */}
          <div className="flex items-center space-x-2 relative z-10">
            <span className="font-display font-black text-xl italic text-white">
              CR7<span className="text-cr7Green">.</span>SPORT
            </span>
          </div>

          {/* Inspirational quotes */}
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-[2px] bg-cr7Green" />
            <h2 className="font-display font-black text-2xl lg:text-3xl leading-snug italic text-white tracking-tight uppercase">
              HÃY BẮT ĐẦU
              <br />
              <span className="text-cr7Green">HÀNH TRÌNH</span> VÔ ĐỊCH
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Đăng ký tài khoản VIP để có cơ hội mua sớm các bộ sưu tập giới hạn, nhận chiết khấu độc quyền và lưu trữ lịch sử luyện tập cùng CR7.
            </p>
          </div>

          {/* Footer certification badge */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 relative z-10">
            <Award className="w-5 h-5 text-cr7Gold" />
            <span>CR7 VIP CLUB MEMBER SYNC</span>
          </div>
        </div>

        {/* Right Side: Tab Forms */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {user ? (
            /* Logged In screen */
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-cr7Green/10 border border-cr7Green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-cr7Green" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-black text-xl text-white">XIN CHÀO, {user.name.toUpperCase()}!</h2>
                <p className="text-gray-400 text-xs">Bạn hiện đang đăng nhập với email: {user.email}</p>
              </div>
              <div className="pt-4 flex flex-col gap-2.5 max-w-xs mx-auto">
                <button
                  onClick={logout}
                  className="w-full bg-slate-800 border border-white/10 hover:border-white/20 text-white font-display font-bold text-xs py-3 rounded-lg transition-colors"
                >
                  ĐĂNG XUẤT TÀI KHOẢN
                </button>
              </div>
            </div>
          ) : (
            /* Tabs form screen */
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-obsidian rounded-lg border border-white/5">
                <button
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`text-xs font-display font-bold py-2.5 rounded transition-all duration-200 ${
                    activeTab === "login"
                      ? "bg-slateDark text-white shadow-sm"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  ĐĂNG NHẬP
                </button>
                <button
                  onClick={() => {
                    setActiveTab("signup");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`text-xs font-display font-bold py-2.5 rounded transition-all duration-200 ${
                    activeTab === "signup"
                      ? "bg-slateDark text-white shadow-sm"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  ĐĂNG KÝ
                </button>
              </div>

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-cr7Red/10 border border-cr7Red/20 rounded text-xs text-cr7Red font-bold text-center"
                  >
                    {errorMsg}
                  </motion.div>
                )}
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-cr7Green/10 border border-cr7Green/20 rounded text-xs text-cr7Green font-bold text-center"
                  >
                    {successMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-wider">HỌ VÀ TÊN</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-obsidian border border-white/15 rounded py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                        required
                      />
                      <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">EMAIL CỦA BẠN</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="ronaldo7@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-obsidian border border-white/15 rounded py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                      required
                    />
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider">MẬT KHẨU</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-obsidian border border-white/15 rounded py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                      required
                    />
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {activeTab === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-wider">NHẬP LẠI MẬT KHẨU</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-obsidian border border-white/15 rounded py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cr7Green transition-colors"
                        required
                      />
                      <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cr7GreenDark to-cr7Green disabled:opacity-50 text-obsidian font-display font-black tracking-widest text-xs py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-95 transition-all mt-6 uppercase shadow-md"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-obsidian" />
                  ) : activeTab === "login" ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>ĐĂNG NHẬP NGAY</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>ĐĂNG KÝ VIP</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
