"use client";

import { forwardRef, useCallback, useState } from "react";
import { cn } from "./lib/cn";

const SIZES = { sm: 14, md: 18, lg: 24 } as const;

function StarIcon({ size, fill }: { size: number; fill: "full" | "half" | "empty" }) {
  const id = `star-clip-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {fill === "half" && (
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      )}

      {/* Empty star background */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        className="fill-ink-faint/30"
      />

      {/* Filled overlay */}
      {fill !== "empty" && (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          className="fill-volt"
          clipPath={fill === "half" ? `url(#${id})` : undefined}
        />
      )}
    </svg>
  );
}

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value, count, size = "md", interactive = false, onChange, className }, ref) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const displayValue = hoverValue ?? value;
    const px = SIZES[size];

    const handleClick = useCallback(
      (star: number) => {
        if (interactive && onChange) onChange(star);
      },
      [interactive, onChange],
    );

    const stars = Array.from({ length: 5 }, (_, i) => {
      const starNum = i + 1;
      const fill: "full" | "half" | "empty" =
        displayValue >= starNum ? "full" : displayValue >= starNum - 0.5 ? "half" : "empty";

      if (interactive) {
        return (
          <button
            key={i}
            type="button"
            className="cursor-pointer p-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-volt"
            onClick={() => handleClick(starNum)}
            onMouseEnter={() => setHoverValue(starNum)}
            onMouseLeave={() => setHoverValue(null)}
            aria-label={`Rate ${starNum} star${starNum > 1 ? "s" : ""}`}
          >
            <StarIcon size={px} fill={fill} />
          </button>
        );
      }

      return <StarIcon key={i} size={px} fill={fill} />;
    });

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-0.5", className)}
        role={interactive ? "radiogroup" : "img"}
        aria-label={interactive ? "Rating selector" : `${value} out of 5 stars`}
      >
        {stars}
        {count !== undefined && (
          <span className="ml-1.5 text-[length:var(--text-meta)] text-ink-muted tabular-nums">
            ({count.toLocaleString("en-IN")})
          </span>
        )}
      </div>
    );
  },
);
Rating.displayName = "Rating";
