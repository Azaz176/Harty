"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavCategory } from "./nav-data";

export function MegaMenu({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const groupCount = category.groups.length;
  const hasFeatured = !!category.featuredImage;
  const cols = hasFeatured ? Math.min(groupCount + 1, 6) : Math.min(groupCount, 5);

  return (
    <div
      className="absolute top-full left-0 right-0 z-[var(--z-nav)] border-t border-hairline bg-white/98 backdrop-blur-md shadow-[var(--shadow-drawer)]"
      onMouseLeave={onClose}
    >
      <div
        className="mx-auto max-w-[1440px] gap-8 px-8 py-8"
        style={{
          display: "grid",
          gridTemplateColumns: hasFeatured
            ? `repeat(${cols - 1}, 1fr) 200px`
            : `repeat(${cols}, 1fr)`,
        }}
      >
        {category.groups.map((group) => (
          <div
            key={group.title}
            onMouseEnter={() => setHoveredGroup(group.title)}
          >
            <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-volt">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block font-sans text-sm text-ink-muted transition-colors duration-150 hover:text-ink hover:translate-x-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {category.featuredImage && (
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={category.featuredImage}
              alt={`${category.label} collection`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <span className="absolute bottom-3 left-3 font-sans text-xs font-bold uppercase tracking-wider text-white">
              {category.label} Collection
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
