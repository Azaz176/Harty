"use client";

import Link from "next/link";
import { Spotlight, TextGenerateEffect, SparklesText } from "@harty/ui";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-ink md:min-h-[60vh]">
      <Spotlight className="top-0 left-0 md:left-60" fill="white" />

      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="h-full w-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <span className="mb-6 inline-block rounded-pill bg-volt/10 px-4 py-1.5 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-volt">
          New Season 2026
        </span>

        <TextGenerateEffect
          words="Fashion Redefined"
          className="font-display text-[length:var(--text-hero)] leading-[0.95] tracking-[var(--tracking-hero)] text-paper md:text-[4.5rem]"
        />

        <p className="mt-6 max-w-xl font-sans text-[length:var(--text-lead)] leading-relaxed text-paper/60">
          Premium brands. Unbeatable deals. Discover your next favorite look
          from the world&apos;s finest fashion houses.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/men"
            className="inline-flex h-12 items-center rounded-md bg-volt px-8 font-sans text-[length:var(--text-body)] font-semibold text-volt-ink transition-transform duration-[var(--dur-micro)] hover:scale-105"
          >
            Shop Men
          </Link>
          <Link
            href="/women"
            className="inline-flex h-12 items-center rounded-md border border-paper/30 px-8 font-sans text-[length:var(--text-body)] font-semibold text-paper transition-colors duration-[var(--dur-micro)] hover:border-paper hover:bg-paper hover:text-ink"
          >
            Shop Women
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full border-t border-paper/10 bg-ink/50 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <SparklesText className="font-sans text-[length:var(--text-meta)] font-bold uppercase tracking-[var(--tracking-caps)] text-yellow">
            UP TO 70% OFF — END OF SEASON SALE
          </SparklesText>
        </div>
      </div>
    </section>
  );
}
