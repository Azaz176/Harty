"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { spring } from "./springs";

type Dir = "up" | "down" | "left" | "right" | "none";
const OFFSET: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/** SI-16 · Directional entrance. Motion Law #2: enter from intent direction. */
export function Reveal({
  children,
  dir = "up",
  delay = 0,
  once = true,
  className,
}: {
  children: React.ReactNode;
  dir?: Dir;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.12 } } }
    : {
        hidden: { opacity: 0, ...OFFSET[dir], filter: "blur(4px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { ...spring.smooth, delay },
        },
      };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any Reveal/motion children. */
export function StaggerGroup({
  children,
  stagger = 0.045,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5%" }}
      transition={reduce ? {} : { staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
