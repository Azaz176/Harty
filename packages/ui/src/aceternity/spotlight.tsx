"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { type MouseEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "../lib/cn";

type SpotlightProps = {
  children?: ReactNode;
  className?: string;
  fill?: string;
};

export function Spotlight({
  children,
  className,
  fill = "rgba(229, 57, 53, 0.15)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${fill}, transparent 80%)`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{ background, opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </div>
  );
}
