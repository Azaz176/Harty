"use client";

import { forwardRef } from "react";
import { cn } from "./lib/cn";

function formatMoney(paise: number, currency = "INR", locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function discountPct(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

interface PriceTickerProps {
  value: number;
  mrp?: number;
  currency?: string;
  locale?: string;
  className?: string;
}

export const PriceTicker = forwardRef<HTMLDivElement, PriceTickerProps>(
  ({ value, mrp, currency = "INR", locale = "en-IN", className }, ref) => {
    const formatted = formatMoney(value, currency, locale);
    const hasMrp = mrp !== undefined && mrp > value;

    return (
      <div ref={ref} className={cn("flex items-baseline gap-2", className)}>
        <span className="font-semibold text-ink tabular-nums">{formatted}</span>

        {hasMrp && (
          <>
            <span className="text-[length:var(--text-meta)] text-ink-faint line-through tabular-nums">
              {formatMoney(mrp, currency, locale)}
            </span>
            <span className="text-[length:var(--text-micro)] font-medium text-sale">
              {discountPct(mrp, value)}% off
            </span>
          </>
        )}
      </div>
    );
  },
);
PriceTicker.displayName = "PriceTicker";
