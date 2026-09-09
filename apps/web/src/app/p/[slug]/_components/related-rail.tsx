import Link from "next/link";
import { ImageFrame, PriceTicker } from "@harty/ui";
import { Reveal } from "@harty/motion";
import { api } from "@/lib/trpc/server";

export async function RelatedRail({
  productId,
  kind,
}: {
  productId: string;
  kind: "similar" | "complete-the-look" | "also-viewed";
}) {
  const items = await api.catalog.related({ productId, kind });

  if (!items.length) return null;

  const heading =
    kind === "complete-the-look"
      ? "Complete the Look"
      : kind === "similar"
        ? "Similar Styles"
        : "You May Also Like";

  return (
    <Reveal dir="up" className="py-[var(--space-section)]">
      <section aria-labelledby={`rail-${kind}`}>
        <h2
          id={`rail-${kind}`}
          className="font-display text-[length:var(--text-title)] tracking-[var(--tracking-hero)] text-ink mb-6"
        >
          {heading}
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 lg:-mx-0 lg:px-0">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/p/${item.slug}`}
              className="w-[180px] shrink-0 lg:w-[220px] group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt"
              data-cursor="view"
            >
              <div className="overflow-hidden">
                <ImageFrame
                  src={item.image?.url ?? "/placeholder.jpg"}
                  alt={item.title}
                  width={item.image?.width ?? 640}
                  height={item.image?.height ?? 853}
                  ratio="3/4"
                  sizes="220px"
                  className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-2 space-y-0.5">
                {item.brand && (
                  <p className="font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted truncate">
                    {item.brand.name}
                  </p>
                )}
                <p className="font-sans text-[length:var(--text-meta)] text-ink truncate">
                  {item.title}
                </p>
                <PriceTicker
                  value={item.price}
                  mrp={item.mrp > item.price ? item.mrp : undefined}
                  className="text-[length:var(--text-meta)]"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
