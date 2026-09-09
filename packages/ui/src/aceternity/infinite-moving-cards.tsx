"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

type InfiniteMovingCardsProps = {
  items: { quote?: string; name: string; title?: string; image?: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  renderItem?: (item: InfiniteMovingCardsProps["items"][number]) => ReactNode;
};

const SPEED_MAP = { fast: "20s", normal: "40s", slow: "80s" };

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  renderItem,
}: InfiniteMovingCardsProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current || started) return;
    const scroller = scrollerRef.current;
    const children = Array.from(scroller.children);
    children.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scroller.appendChild(clone);
    });
    setStarted(true);
  }, [started]);

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4",
          started && "animate-[scroll_var(--scroll-duration)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={
          {
            "--scroll-duration": SPEED_MAP[speed],
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {items.map((item, idx) => (
          <li key={`${item.name}-${idx}`} className="flex-shrink-0">
            {renderItem ? (
              renderItem(item)
            ) : (
              <div className="flex items-center gap-3 rounded-md border border-hairline bg-paper-raised px-6 py-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-display font-semibold text-ink">{item.name}</p>
                  {item.title && <p className="text-sm text-ink-muted">{item.title}</p>}
                  {item.quote && <p className="mt-1 text-sm text-ink-faint">{item.quote}</p>}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
