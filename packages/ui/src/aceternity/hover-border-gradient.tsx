"use client";

import { motion } from "motion/react";
import { type ElementType, type ReactNode, useState } from "react";
import { cn } from "../lib/cn";

type HoverBorderGradientProps = {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  as?: ElementType;
  duration?: number;
  clockwise?: boolean;
};

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 2,
  clockwise = true,
}: HoverBorderGradientProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tag
      className={cn("relative overflow-hidden rounded-md p-[2px]", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? "conic-gradient(from 0deg, var(--color-volt, #E53935), var(--color-yellow, #FFC107), var(--color-volt, #E53935))"
            : "conic-gradient(from 0deg, var(--color-hairline, rgba(0,0,0,0.08)), var(--color-hairline, rgba(0,0,0,0.08)))",
        }}
        animate={{ rotate: clockwise ? 360 : -360 }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div className={cn("relative z-10 rounded-[6px] bg-paper transition-colors", className)}>
        {children}
      </div>
    </Tag>
  );
}
