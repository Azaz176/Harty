"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ImageFrame } from "@harty/ui";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  blurhash: string;
  width: number;
  height: number;
  alt: string;
}

export function ProductGallery({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToImage = useCallback((idx: number) => {
    imageRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveIdx(idx);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!isNaN(idx)) setActiveIdx(idx);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    for (const ref of imageRefs.current) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, [media.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.max(0, activeIdx - 1);
        scrollToImage(next);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(media.length - 1, activeIdx + 1);
        scrollToImage(next);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setLightboxOpen(true);
      }
    },
    [activeIdx, media.length, scrollToImage],
  );

  return (
    <>
      <div className="flex gap-3" role="region" aria-label={`${title} images`}>
        {/* Thumbnail rail — desktop only */}
        <div className="hidden lg:flex flex-col gap-2 shrink-0 w-16">
          {media.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => scrollToImage(idx)}
              className="relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
              aria-label={`View image ${idx + 1}`}
            >
              <ImageFrame
                src={m.url}
                alt=""
                width={64}
                height={85}
                ratio="3/4"
                sizes="64px"
              />
              {/* Active indicator */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-volt transition-opacity duration-[var(--dur-micro)]"
                style={{ opacity: activeIdx === idx ? 1 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* Main images — scrollable stack on desktop, swipe on mobile */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto lg:max-h-[85vh] space-y-2 scrollbar-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="listbox"
          aria-label="Product images"
        >
          {media.map((m, idx) => (
            <div
              key={m.id}
              ref={(el) => { imageRefs.current[idx] = el; }}
              data-idx={idx}
              role="option"
              aria-selected={activeIdx === idx}
              className="cursor-zoom-in"
              data-cursor="view"
              onClick={() => {
                setActiveIdx(idx);
                setLightboxOpen(true);
              }}
            >
              <ImageFrame
                src={m.url}
                alt={m.alt}
                width={m.width}
                height={m.height}
                ratio="3/4"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile swipe indicator */}
        <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {media.map((_, idx) => (
            <div
              key={idx}
              className="size-1.5 rounded-full transition-colors duration-[var(--dur-micro)]"
              style={{
                backgroundColor:
                  activeIdx === idx
                    ? "#0A0A0A"
                    : "rgba(10,10,10,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[var(--z-sheet)] flex items-center justify-center bg-ink/90"
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors duration-[var(--dur-micro)] hover:bg-paper/20 focus-visible:outline-2 focus-visible:outline-volt"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="absolute left-4 z-10 flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors duration-[var(--dur-micro)] hover:bg-paper/20 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-volt"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="max-h-[90vh] max-w-[90vw]">
            <ImageFrame
              src={media[activeIdx].url}
              alt={media[activeIdx].alt}
              width={media[activeIdx].width}
              height={media[activeIdx].height}
              sizes="90vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveIdx(Math.min(media.length - 1, activeIdx + 1))
            }
            disabled={activeIdx === media.length - 1}
            className="absolute right-4 z-10 flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors duration-[var(--dur-micro)] hover:bg-paper/20 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-volt"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[length:var(--text-meta)] text-paper/60 tabular-nums">
            {activeIdx + 1} / {media.length}
          </div>
        </div>
      )}
    </>
  );
}
