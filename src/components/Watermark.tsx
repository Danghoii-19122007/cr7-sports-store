"use client";

import React from "react";

const Watermark = () => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] pointer-events-none opacity-20 hover:opacity-100 transition-opacity duration-500">
      <div className="flex items-center space-x-2">
        <img src="/images/dangh-oii-logo.png" alt="DH Logo" className="w-8 h-8 rounded-full border border-cr7Green/50" />
        <span className="font-display font-black text-[10px] tracking-widest text-cr7Green uppercase">DangH_oii</span>
      </div>
    </div>
  );
};

export default Watermark;
