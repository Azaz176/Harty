"use client";

import { createContext, type MouseEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "../lib/cn";

type CardContextValue = {
  rotateX: number;
  rotateY: number;
};

const CardContext = createContext<CardContextValue>({ rotateX: 0, rotateY: 0 });

type CardContainerProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function CardContainer({ children, className, containerClassName }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    setRotate({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  return (
    <CardContext.Provider value={{ rotateX: rotate.x, rotateY: rotate.y }}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative transition-transform duration-200 ease-out [transform-style:preserve-3d]",
            className,
          )}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
}

type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("[transform-style:preserve-3d]", className)}>{children}</div>;
}

type CardItemProps = {
  children: ReactNode;
  className?: string;
  translateZ?: number;
  as?: React.ElementType;
};

export function CardItem({ children, className, translateZ = 0, as: Tag = "div" }: CardItemProps) {
  return (
    <Tag
      className={cn("transition-transform duration-200 ease-out", className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
      }}
    >
      {children}
    </Tag>
  );
}
