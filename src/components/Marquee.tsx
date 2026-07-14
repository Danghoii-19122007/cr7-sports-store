"use client";

import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  const items = [
    "CR7 COLLECTION",
    "✦",
    "PREMIUM SPORTSWEAR",
    "✦",
    "UNLEASH YOUR POTENTIAL",
    "✦",
    "FAST SHIPPING",
    "✦",
  ];

  return (
    <div className="w-full overflow-hidden bg-cr7Green text-obsidian py-3 border-y border-white/10 relative z-20">
      <div className="flex w-[200%]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15,
          }}
          className="flex whitespace-nowrap"
        >
          {/* Duplicate the array twice to ensure seamless loop */}
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span
              key={index}
              className="mx-4 font-display font-black tracking-widest text-sm uppercase"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
