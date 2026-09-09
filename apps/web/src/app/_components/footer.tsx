import Link from "next/link";

const FOOTER_LINKS = {
  Shop: [
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Kids", href: "/kids" },
    { label: "Beautify", href: "/beautify" },
    { label: "Accessories", href: "/accessories" },
    { label: "Brands", href: "/brands" },
  ],
  Help: [
    { label: "Contact Us", href: "/support/contact" },
    { label: "Returns & Exchanges", href: "/support/returns" },
    { label: "Size Guide", href: "/support/size-guide" },
    { label: "FAQ", href: "/support/faq" },
    { label: "Track Order", href: "/account/orders" },
  ],
  Company: [
    { label: "About Harty", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Sustainability", href: "/sustainability" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & newsletter */}
          <div className="col-span-2 mb-8 md:col-span-4 lg:col-span-1 lg:mb-0">
            <Link
              href="/"
              className="font-display text-[length:var(--text-title)] tracking-[var(--tracking-hero)] text-paper"
            >
              Harty
            </Link>
            <p className="mt-4 max-w-xs font-sans text-[length:var(--text-meta)] leading-relaxed text-paper/60">
              Curated fashion from the brands redefining modern wardrobe essentials.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-paper/40">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-[length:var(--text-meta)] text-paper/70 transition-colors duration-[var(--dur-micro)] hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-paper/10 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-sans text-[length:var(--text-body)] font-medium text-paper">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 font-sans text-[length:var(--text-meta)] text-paper/60">
                New arrivals, exclusive offers, and style inspiration.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-10 w-64 rounded-[var(--radius-sm)] border border-paper/20 bg-transparent px-4 font-sans text-[length:var(--text-body)] text-paper placeholder:text-paper/40 outline-none transition-[border-color] duration-[var(--dur-micro)] focus:border-paper/50"
              />
              <button
                type="submit"
                className="h-10 rounded-[var(--radius-sm)] bg-paper px-5 font-sans text-[length:var(--text-body)] font-medium text-ink transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-center md:flex-row md:text-left">
          <p className="font-sans text-[length:var(--text-micro)] text-paper/40">
            © 2026 Harty. All rights reserved.
          </p>
          <p className="font-sans text-[length:var(--text-micro)] text-paper/40">
            Secure payments via Razorpay & Stripe
          </p>
        </div>
      </div>
    </footer>
  );
}
