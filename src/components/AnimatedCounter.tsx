"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: string;
  label: string;
  color?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, label, color = "text-cr7Green" }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Extract numeric portion
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(target);
      return;
    }

    const numericTarget = parseFloat(numericMatch[0]);
    const prefix = target.replace(/[\d.]+.*/, "");
    const suffix = target.replace(/^[^0-9]*[\d.]+/, "");
    const isDecimal = target.includes(".");
    const duration = 1500;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numericTarget);
      const formatted = isDecimal ? current.toFixed(2) : Math.floor(current).toString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(target);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref}>
      <span className={`block font-display font-black text-2xl md:text-3xl ${color} tabular-nums`}>
        {displayValue}
      </span>
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default AnimatedCounter;
