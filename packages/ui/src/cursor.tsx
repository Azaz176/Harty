"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./lib/cn";

type CursorMode = "default" | "view" | "drag" | "interact";

const LABELS: Record<CursorMode, string> = {
  default: "",
  view: "VIEW",
  drag: "DRAG ↔",
  interact: "",
};

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const tick = useCallback(() => {
    const lerp = 0.15;
    posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || mqMotion.matches) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el instanceof HTMLElement) {
        const attr = el.closest("[data-cursor]")?.getAttribute("data-cursor");
        const nextMode: CursorMode =
          attr === "view"
            ? "view"
            : attr === "drag"
              ? "drag"
              : el.closest("a, button, input, select, textarea, [role=button]")
                ? "interact"
                : "default";
        setMode(nextMode);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick, visible]);

  const isExpanded = mode === "view" || mode === "drag";
  const isRing = mode === "interact";

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)]",
          "hidden [@media(pointer:fine)]:block",
          "motion-reduce:hidden",
          !visible && "opacity-0",
        )}
        style={{ willChange: "transform" }}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-[var(--radius-pill)]",
            "transition-[width,height,background-color,border] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
            isExpanded && "size-14 bg-ink text-paper",
            isRing && "size-10 border-2 border-ink bg-transparent",
            !isExpanded && !isRing && "size-2.5 bg-ink",
          )}
        >
          {isExpanded && (
            <span
              ref={labelRef}
              className="text-[length:var(--text-micro)] font-semibold tracking-[var(--tracking-caps)] uppercase"
            >
              {LABELS[mode]}
            </span>
          )}
        </div>
      </div>
      <div className="[@media(pointer:fine)]:cursor-none">{children}</div>
    </>
  );
}
