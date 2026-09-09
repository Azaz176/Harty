"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";
import { cn } from "./lib/cn";

type Side = "left" | "right" | "top" | "bottom";

const TRANSLATE: Record<Side, { open: string; closed: string }> = {
  right: { open: "translate-x-0", closed: "translate-x-full" },
  left: { open: "translate-x-0", closed: "-translate-x-full" },
  top: { open: "translate-y-0", closed: "-translate-y-full" },
  bottom: { open: "translate-y-0", closed: "translate-y-full" },
};

const POSITION: Record<Side, string> = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const SIZE: Record<Side, string> = {
  right: "h-full w-full max-w-md",
  left: "h-full w-full max-w-md",
  top: "w-full",
  bottom: "w-full",
};

function Root(props: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props} />;
}

const Trigger = DialogPrimitive.Trigger;

const Overlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[var(--z-drawer)] bg-ink/40 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
Overlay.displayName = "Sheet.Overlay";

interface ContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: Side;
}

const Content = forwardRef<ElementRef<typeof DialogPrimitive.Content>, ContentProps>(
  ({ className, children, side = "right", ...props }, ref) => (
    <DialogPrimitive.Portal>
      <Overlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-[var(--z-drawer)] bg-paper shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
          "data-[state=open]:duration-[var(--dur-base)]",
          "data-[state=closed]:duration-[var(--dur-fast)]",
          POSITION[side],
          SIZE[side],
          `data-[state=open]:${TRANSLATE[side].open}`,
          `data-[state=closed]:${TRANSLATE[side].closed}`,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            "absolute top-4 right-4 inline-flex size-8 items-center justify-center",
            "rounded-[var(--radius-sm)] text-ink-muted",
            "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
            "hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
Content.displayName = "Sheet.Content";

const Close = DialogPrimitive.Close;

const Title = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-[length:var(--text-lead)] font-semibold text-ink", className)}
    {...props}
  />
));
Title.displayName = "Sheet.Title";

const Description = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[length:var(--text-meta)] text-ink-muted", className)}
    {...props}
  />
));
Description.displayName = "Sheet.Description";

export const Sheet = {
  Root,
  Trigger,
  Content,
  Close,
  Title,
  Description,
};
