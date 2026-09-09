"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./lib/cn";

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
      "fixed inset-0 z-[var(--z-sheet)] bg-ink/40 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
Overlay.displayName = "Dialog.Overlay";

const Content = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <Overlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-1/2 left-1/2 z-[var(--z-sheet)] w-full max-w-lg",
        "-translate-x-1/2 -translate-y-1/2",
        "rounded-[var(--radius-md)] bg-paper p-6 shadow-[var(--shadow-pop)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.96]",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.96]",
        "duration-[var(--dur-fast)]",
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
));
Content.displayName = "Dialog.Content";

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
Title.displayName = "Dialog.Title";

const Description = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-2 text-[length:var(--text-meta)] text-ink-muted", className)}
    {...props}
  />
));
Description.displayName = "Dialog.Description";

function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex justify-end gap-3", className)}
      {...props}
    />
  );
}

export const Dialog = {
  Root,
  Trigger,
  Content,
  Close,
  Title,
  Description,
  Footer,
};
