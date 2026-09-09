"use client";

import { Toaster as SonnerToaster, toast } from "sonner";

function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: [
            "flex items-start gap-3 w-full p-4",
            "rounded-[var(--radius-md)] border border-hairline",
            "bg-paper-raised shadow-[var(--shadow-pop)]",
            "text-[length:var(--text-meta)]",
          ].join(" "),
          title: "font-medium text-ink",
          description: "text-ink-muted mt-0.5",
          success: "border-l-2 border-l-volt",
          error: "border-l-2 border-l-sale",
          closeButton: [
            "absolute top-2 right-2 size-6 inline-flex items-center justify-center",
            "text-ink-faint hover:text-ink",
            "rounded-[var(--radius-sm)]",
            "transition-colors duration-[var(--dur-micro)]",
          ].join(" "),
        },
      }}
      className="!z-[var(--z-toast)]"
      offset={16}
      gap={8}
      closeButton
      richColors={false}
    />
  );
}

export { Toaster, toast };
