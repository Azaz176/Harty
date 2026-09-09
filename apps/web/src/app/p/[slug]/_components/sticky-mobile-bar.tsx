"use client";

import { Button, PriceTicker } from "@harty/ui";

export function StickyMobileBar({
  price,
  mrp,
  onAddToBag,
  disabled,
}: {
  price: number;
  mrp?: number;
  onAddToBag: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] flex items-center gap-4 border-t border-hairline bg-paper/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <PriceTicker
        value={price}
        mrp={mrp && mrp > price ? mrp : undefined}
        className="flex-1 text-[length:var(--text-body)]"
      />
      <Button
        variant="primary"
        size="md"
        onClick={onAddToBag}
        disabled={disabled}
        className="shrink-0 px-8"
      >
        Add to Bag
      </Button>
    </div>
  );
}
