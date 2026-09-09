"use client";

import { Grid2X2, Grid3X3 } from "lucide-react";
import { cn } from "@harty/ui";

interface DensityToggleProps {
  density: "comfort" | "compact";
  onChange: (density: "comfort" | "compact") => void;
}

export function DensityToggle({ density, onChange }: DensityToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-[var(--radius-pill)] border border-hairline p-0.5">
      <button
        type="button"
        onClick={() => onChange("comfort")}
        className={cn(
          "flex size-7 items-center justify-center rounded-[var(--radius-pill)] transition-colors duration-[var(--dur-micro)]",
          density === "comfort" ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
        )}
        aria-label="Comfort view"
        aria-pressed={density === "comfort"}
      >
        <Grid2X2 className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onChange("compact")}
        className={cn(
          "flex size-7 items-center justify-center rounded-[var(--radius-pill)] transition-colors duration-[var(--dur-micro)]",
          density === "compact" ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
        )}
        aria-label="Compact view"
        aria-pressed={density === "compact"}
      >
        <Grid3X3 className="size-3.5" />
      </button>
    </div>
  );
}
