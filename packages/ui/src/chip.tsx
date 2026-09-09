"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "./lib/cn";

const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-sans font-medium select-none",
    "rounded-[var(--radius-pill)]",
    "transition-[background-color,border-color,transform] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border border-hairline bg-transparent text-ink hover:bg-paper-sunk",
        active: "border border-ink bg-ink text-paper",
        removable: "border border-hairline bg-transparent text-ink hover:bg-paper-sunk",
      },
      size: {
        sm: "h-7 px-2.5 text-[length:var(--text-micro)]",
        md: "h-8 px-3.5 text-[length:var(--text-meta)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ChipProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof chipVariants> & {
    onRemove?: () => void;
  };

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, onRemove, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {variant === "removable" && (
          <span
            role="img"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-0.5 flex size-4 items-center justify-center rounded-full hover:bg-ink/10"
          >
            <X className="size-3" />
          </span>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";
