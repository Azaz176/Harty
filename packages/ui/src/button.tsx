"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "./lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-sans font-medium",
    "transition-[background-color,border-color,opacity] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97] select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink/90",
        ghost: "bg-transparent border border-hairline text-ink hover:bg-paper-sunk",
        link: "bg-transparent text-ink underline underline-offset-4 hover:text-ink-muted",
        volt: "bg-volt text-volt-ink hover:bg-volt/90",
        secondary: "bg-yellow text-yellow-ink hover:bg-yellow/90",
      },
      size: {
        sm: "h-8 px-3 text-[length:var(--text-meta)] rounded-[var(--radius-sm)]",
        md: "h-10 px-5 text-[length:var(--text-body)] rounded-[var(--radius-md)]",
        lg: "h-12 px-7 text-[length:var(--text-lead)] rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";
