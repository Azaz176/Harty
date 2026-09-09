"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "../lib/cn";

type TextGenerateEffectProps = {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const wordVariantsNoFilter: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const wordArray = words.split(" ");
  const variants = filter ? wordVariants : wordVariantsNoFilter;

  return (
    <div ref={ref} className={cn("font-display", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.08 }}
        className="inline"
      >
        {wordArray.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-block">
            <motion.span
              variants={variants}
              transition={{ duration, ease: "easeOut" }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {idx < wordArray.length - 1 && <span className="inline-block w-[0.3em]" />}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
