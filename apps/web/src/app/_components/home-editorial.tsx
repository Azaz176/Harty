"use client";

import Link from "next/link";
import { Reveal } from "@harty/motion";

export function HomeEditorial() {
  return (
    <section className="bg-paper-sunk py-[var(--space-section)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal dir="left">
            <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=900&fit=crop&q=80"
                alt="The Harty Edit — curated luxury fashion"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5">
          <Reveal dir="up" delay={0.1}>
            <span className="mb-4 inline-block font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-volt">
              Curated Collections
            </span>
          </Reveal>
          <Reveal dir="up" delay={0.2}>
            <h2 className="mb-6 font-display text-[length:var(--text-display)] leading-[1.05] tracking-tight text-ink">
              The Harty<br />Edit
            </h2>
          </Reveal>
          <Reveal dir="up" delay={0.3}>
            <p className="mb-8 max-w-sm font-sans text-[length:var(--text-lead)] leading-relaxed text-ink-muted">
              Where luxury meets accessibility. Discover pieces handpicked from
              the world&apos;s finest brands, styled for the modern you.
            </p>
          </Reveal>
          <Reveal dir="up" delay={0.4}>
            <Link
              href="/women"
              className="inline-flex w-fit items-center rounded-md bg-volt px-6 py-3 font-sans text-[length:var(--text-body)] font-semibold text-volt-ink transition-transform duration-[var(--dur-micro)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper-sunk"
            >
              Explore Collections
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
