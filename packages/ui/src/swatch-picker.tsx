"use client";

import { forwardRef, useCallback } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "./lib/cn";

interface Swatch {
  name: string;
  hex: string;
  available: boolean;
}

interface SwatchPickerProps {
  swatches: Swatch[];
  selected?: string;
  onSelect?: (hex: string) => void;
  className?: string;
}

export const SwatchPicker = forwardRef<HTMLDivElement, SwatchPickerProps>(
  ({ swatches, selected, onSelect, className }, ref) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, idx: number) => {
        const availableSwatches = swatches.filter((s) => s.available);
        const currentAvailableIdx = availableSwatches.findIndex(
          (s) => s.hex === swatches[idx]?.hex,
        );

        let next: Swatch | undefined;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          next =
            availableSwatches[
              (currentAvailableIdx + 1) % availableSwatches.length
            ];
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          next =
            availableSwatches[
              (currentAvailableIdx - 1 + availableSwatches.length) %
                availableSwatches.length
            ];
        }

        if (next && onSelect) {
          onSelect(next.hex);
          const btn = e.currentTarget
            .closest('[role="radiogroup"]')
            ?.querySelector(`[data-hex="${next.hex}"]`) as HTMLElement | null;
          btn?.focus();
        }
      },
      [swatches, onSelect],
    );

    return (
      <TooltipPrimitive.Provider delayDuration={200}>
        <div
          ref={ref}
          role="radiogroup"
          aria-label="Color"
          className={cn("flex flex-wrap gap-2", className)}
        >
          {swatches.map((swatch, idx) => (
            <TooltipPrimitive.Root key={swatch.hex}>
              <TooltipPrimitive.Trigger asChild>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected === swatch.hex}
                  aria-label={`${swatch.name}${swatch.available ? "" : " (unavailable)"}`}
                  data-hex={swatch.hex}
                  disabled={!swatch.available}
                  tabIndex={
                    selected === swatch.hex || (!selected && idx === 0) ? 0 : -1
                  }
                  onClick={() => swatch.available && onSelect?.(swatch.hex)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={cn(
                    "relative size-7 rounded-[var(--radius-pill)]",
                    "transition-shadow duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
                    selected === swatch.hex &&
                      "ring-2 ring-volt ring-offset-2 ring-offset-paper",
                    !swatch.available && "cursor-not-allowed opacity-50",
                  )}
                  style={{ backgroundColor: swatch.hex }}
                >
                  {/* Unavailable diagonal strike */}
                  {!swatch.available && (
                    <svg
                      className="absolute inset-0 size-full"
                      viewBox="0 0 28 28"
                      aria-hidden="true"
                    >
                      <line
                        x1="4"
                        y1="4"
                        x2="24"
                        y2="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-ink/60"
                      />
                    </svg>
                  )}
                </button>
              </TooltipPrimitive.Trigger>
              <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                  sideOffset={6}
                  className={cn(
                    "z-[var(--z-toast)] px-2.5 py-1.5",
                    "rounded-[var(--radius-sm)] bg-ink text-paper",
                    "text-[length:var(--text-micro)] font-medium",
                    "animate-in fade-in-0 zoom-in-95 duration-[var(--dur-micro)]",
                  )}
                >
                  {swatch.name}
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
          ))}
        </div>
      </TooltipPrimitive.Provider>
    );
  },
);
SwatchPicker.displayName = "SwatchPicker";
