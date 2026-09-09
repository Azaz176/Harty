"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "./lib/cn";

export const Root = TabsPrimitive.Root;

export const List = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex items-center gap-0 border-b border-hairline", className)}
      {...props}
    />
  ),
);
List.displayName = "Tabs.List";

export const Trigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative px-4 py-2.5 font-sans text-[length:var(--text-meta)] font-medium text-ink-muted",
      "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
      "hover:text-ink",
      "data-[state=active]:text-ink",
      "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0",
      "after:bg-volt after:transition-transform after:duration-[var(--dur-fast)] after:ease-[var(--ease-out-expo)]",
      "data-[state=active]:after:scale-x-100",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
      className,
    )}
    {...props}
  />
));
Trigger.displayName = "Tabs.Trigger";

export const Content = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-[var(--dur-fast)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
      className,
    )}
    {...props}
  />
));
Content.displayName = "Tabs.Content";
