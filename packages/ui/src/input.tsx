"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "./lib/cn";

const inputVariants = cva(
  [
    "w-full font-sans text-ink bg-paper-sunk placeholder:text-ink-faint",
    "border border-hairline",
    "transition-[border-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "rounded-[var(--radius-sm)]",
        ghost: "border-transparent bg-transparent rounded-none focus-visible:border-hairline",
      },
      inputSize: {
        sm: "h-8 px-3 text-[length:var(--text-meta)]",
        md: "h-10 px-4 text-[length:var(--text-body)]",
        lg: "h-12 px-5 text-[length:var(--text-lead)]",
      },
      error: {
        true: "border-sale focus-visible:ring-sale",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      error: false,
    },
  },
);

export type InputProps = Omit<ComponentPropsWithoutRef<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    error?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, inputSize, error }), className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
