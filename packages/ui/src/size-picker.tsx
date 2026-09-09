"use client";

import { forwardRef, useCallback, useState } from "react";
import { cn } from "./lib/cn";

interface SizeOption {
  label: string;
  value: string;
  available: boolean;
}

interface FitStats {
  label: string;
  percentage: number;
  totalBuyers: number;
}

interface SizePickerProps {
  sizes: SizeOption[];
  selected?: string;
  onSelect?: (value: string) => void;
  fitStats?: FitStats;
  onNotifyMe?: (size: string) => void;
  className?: string;
}

export const SizePicker = forwardRef<HTMLDivElement, SizePickerProps>(
  ({ sizes, selected, onSelect, fitStats, onNotifyMe, className }, ref) => {
    const [focused, setFocused] = useState<string | null>(null);
    const showFit = fitStats && (focused !== null || selected !== undefined);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, idx: number) => {
        let nextIdx = idx;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          nextIdx = (idx + 1) % sizes.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          nextIdx = (idx - 1 + sizes.length) % sizes.length;
        }

        if (nextIdx !== idx) {
          const nextSize = sizes[nextIdx];
          if (nextSize?.available) onSelect?.(nextSize.value);
          const btn = e.currentTarget
            .closest('[role="radiogroup"]')
            ?.querySelectorAll('[role="radio"]')[nextIdx] as HTMLElement | undefined;
          btn?.focus();
        }
      },
      [sizes, onSelect],
    );

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-2">
          {sizes.map((size, idx) => (
            <button
              key={size.value}
              type="button"
              role="radio"
              aria-checked={selected === size.value}
              aria-label={`${size.label}${size.available ? "" : " — out of stock"}`}
              tabIndex={selected === size.value || (!selected && idx === 0) ? 0 : -1}
              disabled={!size.available && !onNotifyMe}
              onClick={() => {
                if (size.available) {
                  onSelect?.(size.value);
                } else if (onNotifyMe) {
                  onNotifyMe(size.value);
                }
              }}
              onFocus={() => setFocused(size.value)}
              onMouseEnter={() => setFocused(size.value)}
              onBlur={() => setFocused(null)}
              onMouseLeave={() => setFocused(null)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "relative min-w-[44px] px-3.5 py-2",
                "rounded-[var(--radius-pill)] border border-hairline",
                "text-[length:var(--text-meta)] font-medium tabular-nums",
                "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
                selected === size.value
                  ? "border-transparent bg-ink text-paper"
                  : "bg-paper text-ink hover:border-ink/20",
                !size.available && [
                  "cursor-not-allowed text-ink-faint",
                  "after:absolute after:inset-[6px]",
                  "after:border-t after:border-ink-faint/50",
                  "after:rotate-[-20deg]",
                  "after:top-1/2 after:-translate-y-1/2",
                ],
              )}
            >
              {size.label}
              {!size.available && onNotifyMe && (
                <span className="sr-only"> — tap to get notified</span>
              )}
            </button>
          ))}
        </div>

        {/* SI-09 Fit Confidence bar */}
        {fitStats && (
          <div
            className={cn(
              "overflow-hidden transition-opacity duration-[var(--dur-micro)]",
              showFit ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius-pill)] bg-paper-sunk">
                <div
                  className="h-full rounded-[var(--radius-pill)] bg-success transition-[width] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]"
                  style={{
                    width: showFit ? `${fitStats.percentage}%` : "0%",
                  }}
                />
              </div>
              <span className="shrink-0 text-[length:var(--text-micro)] text-ink-muted">
                {fitStats.label} — {fitStats.percentage}% of{" "}
                {fitStats.totalBuyers.toLocaleString("en-IN")} buyers
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);
SizePicker.displayName = "SizePicker";
