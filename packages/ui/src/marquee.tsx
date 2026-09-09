"use client";

import { forwardRef } from "react";
import { cn } from "./lib/cn";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ children, speed = 30, pauseOnHover = true, className }, ref) => {
    const duration = `${speed}s`;

    return (
      <div
        ref={ref}
        className={cn(
          "group flex overflow-hidden",
          "motion-reduce:flex-wrap motion-reduce:justify-center",
          className,
        )}
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={cn(
              "flex shrink-0 items-center gap-8",
              "animate-[marquee_var(--marquee-dur)_linear_infinite]",
              "motion-reduce:animate-none",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
            )}
            style={{ "--marquee-dur": duration } as React.CSSProperties}
          >
            {children}
          </div>
        ))}
      </div>
    );
  },
);
Marquee.displayName = "Marquee";
