"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type LampContainerProps = {
  children: ReactNode;
  className?: string;
};

export function LampContainer({ children, className }: LampContainerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={
            {
              backgroundImage:
                "conic-gradient(var(--conic-position), var(--color-volt, #E53935) 0%, transparent 60%)",
              "--conic-position": "from 70deg at center top",
            } as React.CSSProperties
          }
          className="bg-gradient-conic absolute inset-auto right-1/2 h-40 w-[20rem] overflow-visible [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-32 w-full bg-paper [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-10 bg-paper" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={
            {
              backgroundImage:
                "conic-gradient(var(--conic-position), transparent 60%, var(--color-volt, #E53935) 100%)",
              "--conic-position": "from 290deg at center top",
            } as React.CSSProperties
          }
          className="bg-gradient-conic absolute inset-auto left-1/2 h-40 w-[20rem] overflow-visible [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-10 bg-paper" />
          <div className="absolute bottom-0 right-0 z-20 h-32 w-full bg-paper [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-32 w-full translate-y-8 bg-paper blur-2xl" />
        <div className="absolute top-1/2 z-50 h-32 w-full bg-transparent opacity-10 backdrop-blur-md" />

        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-[3px] -translate-y-[4.5rem] rounded-full bg-volt"
        />

        <motion.div
          initial={{ width: "10rem", opacity: 0.3 }}
          whileInView={{ width: "24rem", opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-40 h-28 -translate-y-[6rem] rounded-full bg-volt/20 blur-3xl"
        />
      </div>

      <div className="relative z-50 -mt-20">{children}</div>
    </div>
  );
}

type LampEffectProps = {
  children: ReactNode;
  className?: string;
};

export function LampEffect({ children, className }: LampEffectProps) {
  return <LampContainer className={className}>{children}</LampContainer>;
}
