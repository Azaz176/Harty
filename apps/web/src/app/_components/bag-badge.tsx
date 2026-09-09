"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function BagBadge({ count = 0 }: { count?: number }) {
  return (
    <Link
      href="/bag"
      className="relative inline-flex items-center justify-center p-2 transition-opacity duration-[var(--dur-micro)] hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
      aria-label={`Shopping bag${count > 0 ? `, ${count} items` : ""}`}
    >
      <ShoppingBag className="size-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-[18px] items-center justify-center rounded-full bg-ink text-paper text-[10px] font-semibold leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
