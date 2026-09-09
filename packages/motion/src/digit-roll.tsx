"use client";
import { motion, useReducedMotion } from "motion/react";
import { spring } from "./springs";

/** Rolling-digit money display. Never re-render a price as plain text. */
export function DigitRoll({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{value}</span>;

  return (
    <span className={className} aria-label={value}>
      {value.split("").map((ch, i) => (
        <span key={`${i}-${ch}`} className="inline-block overflow-hidden" style={{ lineHeight: 1 }}>
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ...spring.bouncy, delay: i * 0.025 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
