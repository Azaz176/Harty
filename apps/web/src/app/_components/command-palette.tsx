"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, ArrowRight, TrendingUp } from "lucide-react";

type SuggestionResult = {
  brands: Array<{ name: string; slug: string }>;
  categories: Array<{ name: string; slug: string; gender: string }>;
  products: Array<{
    id: string;
    title: string;
    brand: string;
    slug: string;
    price: number;
    imageUrl?: string;
  }>;
  queries: string[];
};

function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SuggestionResult | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/trpc/search.suggest?input=${encodeURIComponent(
            JSON.stringify({ json: { q: query } })
          )}`
        );
        const data = await res.json();
        if (data?.result?.data?.json) {
          setResults(data.result.data.json);
        }
      } catch {
        // silently fail
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      setQuery("");
      router.push(href);
    },
    [router, onOpenChange]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-sheet)]">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-full max-w-xl px-4">
        <Command
          className="overflow-hidden rounded-t-[var(--radius-md)] bg-paper shadow-[var(--shadow-drawer)]"
          shouldFilter={false}
        >
          <div className="flex items-center gap-3 border-b border-hairline px-4">
            <Search className="size-4 text-ink-muted shrink-0" strokeWidth={1.5} />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search brands, categories, products..."
              className="flex-1 bg-transparent py-4 font-sans text-[length:var(--text-body)] text-ink placeholder:text-ink-faint outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-[var(--radius-sm)] border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {!query && (
              <Command.Group
                heading={
                  <span className="px-2 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    Trending
                  </span>
                }
              >
                {["Summer dresses", "Linen shirts", "Wide leg jeans", "Oversized blazers"].map(
                  (term) => (
                    <Command.Item
                      key={term}
                      value={term}
                      onSelect={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 font-sans text-[length:var(--text-body)] text-ink data-[selected=true]:bg-paper-sunk"
                    >
                      <TrendingUp className="size-3.5 text-ink-faint" strokeWidth={1.5} />
                      {term}
                    </Command.Item>
                  )
                )}
              </Command.Group>
            )}

            {results?.brands && results.brands.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    Brands
                  </span>
                }
              >
                {results.brands.map((b) => (
                  <Command.Item
                    key={b.slug}
                    value={`brand-${b.slug}`}
                    onSelect={() => navigate(`/brands/${b.slug}`)}
                    className="flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5 font-sans text-[length:var(--text-body)] text-ink data-[selected=true]:bg-paper-sunk"
                  >
                    <span className="font-medium">{b.name}</span>
                    <ArrowRight className="size-3.5 text-ink-faint" strokeWidth={1.5} />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results?.categories && results.categories.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    Categories
                  </span>
                }
              >
                {results.categories.map((c) => (
                  <Command.Item
                    key={c.slug}
                    value={`cat-${c.slug}`}
                    onSelect={() => navigate(`/${c.gender}/${c.slug}`)}
                    className="flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5 font-sans text-[length:var(--text-body)] text-ink data-[selected=true]:bg-paper-sunk"
                  >
                    <span>{c.name}</span>
                    <span className="font-sans text-[length:var(--text-micro)] text-ink-faint capitalize">
                      {c.gender}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results?.products && results.products.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    Products
                  </span>
                }
              >
                {results.products.map((p) => (
                  <Command.Item
                    key={p.id}
                    value={`product-${p.id}`}
                    onSelect={() => navigate(`/p/${p.slug}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 data-[selected=true]:bg-paper-sunk"
                  >
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt=""
                        className="size-10 object-cover bg-paper-sunk"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-sans text-[length:var(--text-body)] text-ink">
                        {p.title}
                      </div>
                      <div className="font-sans text-[length:var(--text-micro)] text-ink-muted">
                        {p.brand} · {formatPrice(p.price)}
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Empty className="px-3 py-8 text-center font-sans text-[length:var(--text-body)] text-ink-muted">
              {query ? "No results found" : "Start typing to search"}
            </Command.Empty>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
