"use client";

import { motion } from "motion/react";
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode, useRef } from "react";
import { cn } from "../lib/cn";

type MovingBorderProps<T extends ElementType = "div"> = {
  children: ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function MovingBorder<T extends ElementType = "div">({
  children,
  duration = 3,
  className,
  containerClassName,
  borderRadius = "8px",
  as,
  ...props
}: MovingBorderProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden p-[2px]", containerClassName)}
      style={{ borderRadius }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius,
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-volt, #E53935) 10%, transparent 20%)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div
        className={cn("relative z-10 bg-paper", className)}
        style={{ borderRadius }}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </div>
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
  borderRadius?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  className,
  containerClassName,
  duration = 3,
  borderRadius = "8px",
  ...props
}: ButtonProps) {
  return (
    <MovingBorder
      containerClassName={cn("inline-block", containerClassName)}
      duration={duration}
      borderRadius={borderRadius}
      className={cn(
        "px-6 py-3 font-display font-semibold text-ink transition-colors hover:bg-paper-sunk",
        className,
      )}
    >
      <button {...props}>{children}</button>
    </MovingBorder>
  );
}
