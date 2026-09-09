"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { cn } from "./lib/cn";

interface ImageFrameProps
  extends Omit<ComponentPropsWithoutRef<typeof Image>, "onLoad"> {
  ratio?: string;
}

export const ImageFrame = forwardRef<HTMLDivElement, ImageFrameProps>(
  ({ className, ratio = "3/4", alt, blurDataURL, style, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden bg-paper-sunk", className)}
        style={{ aspectRatio: ratio, ...style }}
      >
        {/* Directional shimmer while loading */}
        {!loaded && (
          <div
            className={cn(
              "absolute inset-0 -translate-x-full",
              "bg-gradient-to-r from-transparent via-paper-raised/60 to-transparent",
              "animate-[shimmer_1.6s_ease-in-out_infinite]",
            )}
          />
        )}

        <Image
          alt={alt}
          className={cn(
            "size-full rounded-none object-cover",
            "transition-[opacity,transform] duration-[400ms] ease-[var(--ease-out-expo)]",
            loaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
          )}
          onLoad={() => setLoaded(true)}
          {...(blurDataURL ? { blurDataURL, placeholder: "blur" } : {})}
          {...props}
        />
      </div>
    );
  },
);
ImageFrame.displayName = "ImageFrame";
