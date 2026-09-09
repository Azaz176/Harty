"use client";

import { useEffect, useState, useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/cn";

type Sparkle = {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
};

type SparklesTextProps = {
  children: ReactNode;
  className?: string;
  sparklesCount?: number;
  colors?: string[];
};

function generateSparkle(colors: string[]): Sparkle {
  return {
    id: `sparkle-${Math.random().toString(36).slice(2, 9)}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)]!,
    createdAt: Date.now(),
  };
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
        fill={color}
      />
    </svg>
  );
}

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
  colors = ["var(--color-yellow, #FFC107)", "var(--color-volt, #E53935)"],
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const prefixId = useId();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const initial = Array.from({ length: sparklesCount }, () =>
      generateSparkle(colors),
    );
    setSparkles(initial);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const now = Date.now();
        const alive = prev.filter((s) => now - s.createdAt < 1000);
        if (alive.length < sparklesCount) {
          return [...alive, generateSparkle(colors)];
        }
        return alive;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [sparklesCount, colors]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={`${prefixId}-${sparkle.id}`}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 180 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SparkleIcon size={sparkle.size} color={sparkle.color} />
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="relative z-20">{children}</span>
    </span>
  );
}
