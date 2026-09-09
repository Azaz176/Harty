"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "./lib/cn";

export const Provider = TooltipPrimitive.Provider;
export const Root = TooltipPrimitive.Root;
export const Trigger = TooltipPrimitive.Trigger;

export const Content = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[var(--z-toast)] overflow-hidden rounded-[var(--radius-sm)]",
        "bg-ink px-3 py-1.5 font-sans text-[length:var(--text-micro)] text-paper",
        "shadow-[var(--shadow-pop)]",
        "animate-in fade-in-0 zoom-in-[0.96] duration-[var(--dur-micro)]",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.96]",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
Content.displayName = "Tooltip.Content";

export const Arrow = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow ref={ref} className={cn("fill-ink", className)} {...props} />
));
Arrow.displayName = "Tooltip.Arrow";
