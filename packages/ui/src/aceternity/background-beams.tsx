"use client";

import { motion } from "motion/react";
import { cn } from "../lib/cn";

type BackgroundBeamsProps = {
  className?: string;
};

const BEAM_PATHS = [
  "M-100 0C-100 0 -50 200 100 400C250 600 400 350 600 500",
  "M-50 -100C-50 -100 50 150 200 300C350 450 500 200 700 400",
  "M0 -50C0 -50 150 100 250 350C350 600 600 300 800 500",
  "M100 -100C100 -100 200 200 350 400C500 600 650 250 900 450",
  "M-200 100C-200 100 0 300 200 450C400 600 550 350 750 550",
  "M-150 -50C-150 -50 100 250 300 350C500 450 700 200 950 400",
];

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-volt, #E53935)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-volt, #E53935)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-volt, #E53935)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {BEAM_PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#beam-gradient)"
            strokeWidth={1 + Math.random()}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
            transition={{
              pathLength: { duration: 3 + i * 0.5, ease: "easeInOut" },
              opacity: { duration: 3 + i * 0.5, ease: "easeInOut" },
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
