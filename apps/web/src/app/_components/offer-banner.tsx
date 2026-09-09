"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const OFFERS = [
  "FLAT 50% OFF on First Purchase | Use Code: HARTY50",
  "Free Delivery on orders above ₹999 | Shop Now →",
  "New Season Collection Just Dropped | Explore Now",
  "Extra 10% Cashback with Harty Pay | Limited Time",
];

export function OfferBanner() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissed(sessionStorage.getItem("harty-offer-dismissed") === "true");
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="relative z-50 flex h-10 items-center justify-center bg-yellow px-10 text-yellow-ink">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-center text-xs font-bold tracking-wide sm:text-sm"
        >
          {OFFERS[index]}
        </motion.p>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          sessionStorage.setItem("harty-offer-dismissed", "true");
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-yellow-ink/70 transition-colors hover:text-yellow-ink"
        aria-label="Dismiss offer banner"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
