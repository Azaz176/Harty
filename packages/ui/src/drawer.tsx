"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { X } from "lucide-react";
import { cn } from "./lib/cn";

function Root({
  snapPoints = [0.5, 0.92],
  ...props
}: ComponentPropsWithoutRef<typeof VaulDrawer.Root> & {
  snapPoints?: (number | string)[];
}) {
  return <VaulDrawer.Root snapPoints={snapPoints} {...props} />;
}

const Trigger = VaulDrawer.Trigger;

const Overlay = forwardRef<
  ElementRef<typeof VaulDrawer.Overlay>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Overlay>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-[var(--z-drawer)] bg-ink/40", className)}
    {...props}
  />
));
Overlay.displayName = "Drawer.Overlay";

function Handle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-center pt-3 pb-2", className)} {...props}>
      <div className="h-1 w-10 rounded-[var(--radius-pill)] bg-ink-faint" />
    </div>
  );
}

const Content = forwardRef<
  ElementRef<typeof VaulDrawer.Content>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Content>
>(({ className, children, ...props }, ref) => (
  <VaulDrawer.Portal>
    <Overlay />
    <VaulDrawer.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-drawer)]",
        "rounded-t-[var(--radius-md)] bg-paper shadow-[var(--shadow-drawer)]",
        "max-h-[96dvh]",
        className,
      )}
      {...props}
    >
      <Handle />
      <div className="overflow-y-auto px-4 pb-6">{children}</div>
    </VaulDrawer.Content>
  </VaulDrawer.Portal>
));
Content.displayName = "Drawer.Content";

const Close = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Close asChild>
    <button
      ref={ref}
      className={cn(
        "absolute top-4 right-4 inline-flex size-8 items-center justify-center",
        "rounded-[var(--radius-sm)] text-ink-muted",
        "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
        "hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
        className,
      )}
      {...props}
    >
      <X className="size-4" />
      <span className="sr-only">Close</span>
    </button>
  </VaulDrawer.Close>
));
Close.displayName = "Drawer.Close";

const Title = VaulDrawer.Title;

export const Drawer = {
  Root,
  Trigger,
  Content,
  Close,
  Title,
  Handle,
};
