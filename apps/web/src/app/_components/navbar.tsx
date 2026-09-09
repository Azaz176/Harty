"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Heart, Menu, X, Bell, User, ChevronDown } from "lucide-react";
import { NAV_CATEGORIES, BRAND_LINKS } from "./nav-data";
import { MegaMenu } from "./mega-menu";
import { BagBadge } from "./bag-badge";
import { LanguageSelector } from "./language-selector";
import { OfferBanner } from "./offer-banner";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";

export function Navbar({
  onSearchOpen,
  onAuthOpen,
  onNotificationsOpen,
}: {
  onSearchOpen: () => void;
  onAuthOpen: () => void;
  onNotificationsOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setScrollDir(y > lastY && y > 56 ? "down" : "up");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeCategory = NAV_CATEGORIES.find((c) => c.label === hoveredCategory);
  const hidden = scrollDir === "down" && scrolled;

  return (
    <header
      className="fixed top-0 right-0 left-0 z-[var(--z-nav)] transition-transform duration-[var(--dur-fast)]"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      <OfferBanner />
      {/* Main nav bar */}
      <nav
        className="relative border-b border-hairline transition-all duration-[var(--dur-fast)]"
        style={{
          height: scrolled ? 56 : 72,
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "#FFFFFF",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 lg:px-8">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md hover:bg-paper-sunk transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Link
              href="/"
              className="font-display font-extrabold tracking-tight transition-all duration-[var(--dur-fast)]"
              style={{
                fontSize: scrolled ? "1.375rem" : "1.625rem",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              <span className="text-volt">H</span>arty
            </Link>
          </div>

          {/* Center: category links (desktop) */}
          <div
            ref={navScrollRef}
            className="hidden lg:flex items-center gap-6 overflow-x-auto scrollbar-hide"
          >
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => setHoveredCategory(cat.label)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={cat.href}
                  className="whitespace-nowrap font-sans text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ink transition-colors duration-150 hover:text-volt"
                >
                  {cat.label}
                </Link>
              </div>
            ))}
            <Link
              href="/brands"
              className="whitespace-nowrap font-sans text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ink transition-colors duration-150 hover:text-volt"
            >
              Brands
            </Link>
          </div>

          {/* Right: search + icons */}
          <div className="flex items-center gap-0.5">
            {/* Search button */}
            <button
              type="button"
              onClick={onSearchOpen}
              className="flex items-center gap-2 rounded-full border border-hairline bg-paper-sunk px-3 py-1.5 text-ink-faint transition-colors hover:border-ink-faint sm:min-w-[180px]"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline text-sm">Search...</span>
            </button>

            <div className="flex items-center ml-2">
              {/* Language selector */}
              <div className="hidden md:block">
                <LanguageSelector />
              </div>

              {/* Notifications */}
              <button
                type="button"
                onClick={onNotificationsOpen}
                className="relative p-2 rounded-md transition-colors hover:bg-paper-sunk"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-volt text-[10px] font-bold text-volt-ink">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:inline-flex p-2 rounded-md transition-colors hover:bg-paper-sunk"
                aria-label="Wishlist"
              >
                <Heart className="size-5" />
              </Link>

              {/* Bag */}
              <BagBadge count={0} />

              {/* Auth */}
              <button
                type="button"
                onClick={onAuthOpen}
                className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-paper-sunk"
                aria-label={isAuthenticated ? "Account" : "Login"}
              >
                {isAuthenticated && user ? (
                  <>
                    <div className="size-6 rounded-full bg-volt flex items-center justify-center text-volt-ink text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                  </>
                ) : (
                  <>
                    <User className="size-5" />
                    <span className="hidden lg:inline">Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega menu (desktop) */}
      {activeCategory && (
        <MegaMenu
          category={activeCategory}
          onClose={() => setHoveredCategory(null)}
        />
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[56px] z-[var(--z-drawer)] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full max-w-sm w-[85vw] overflow-y-auto bg-paper shadow-[var(--shadow-drawer)]">
            {/* Mobile auth section */}
            <div className="border-b border-hairline p-4">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-volt flex items-center justify-center text-volt-ink font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm">{user.name}</p>
                    <p className="font-sans text-xs text-ink-muted">{user.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onAuthOpen();
                  }}
                  className="flex items-center gap-3 w-full"
                >
                  <div className="size-10 rounded-full bg-paper-sunk flex items-center justify-center">
                    <User className="size-5 text-ink-muted" />
                  </div>
                  <div className="text-left">
                    <p className="font-sans font-semibold text-sm">Login / Sign Up</p>
                    <p className="font-sans text-xs text-ink-muted">Access your account</p>
                  </div>
                </button>
              )}
            </div>

            {/* Mobile categories */}
            <div className="p-4 space-y-1">
              {NAV_CATEGORIES.map((cat) => (
                <div key={cat.label} className="border-b border-hairline last:border-0">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMobileCategory(
                        expandedMobileCategory === cat.label ? null : cat.label
                      )
                    }
                    className="flex w-full items-center justify-between py-3 font-sans text-[0.9375rem] font-semibold text-ink"
                  >
                    {cat.label}
                    <ChevronDown
                      className={`size-4 text-ink-muted transition-transform duration-200 ${
                        expandedMobileCategory === cat.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedMobileCategory === cat.label && (
                    <div className="pb-3 space-y-3">
                      {cat.groups.map((group) => (
                        <div key={group.title} className="pl-3">
                          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint mb-1.5">
                            {group.title}
                          </p>
                          <ul className="space-y-1.5">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block font-sans text-sm text-ink-muted transition-colors hover:text-volt"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Brands in mobile */}
              <div className="border-b border-hairline">
                <Link
                  href="/brands"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center py-3 font-sans text-[0.9375rem] font-semibold text-ink"
                >
                  Shop by Brand
                </Link>
              </div>
            </div>

            {/* Mobile bottom links */}
            <div className="border-t border-hairline p-4 space-y-3">
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm text-ink-muted">
                <Heart className="size-4" /> Wishlist
              </Link>
              <button
                type="button"
                onClick={() => { setMobileOpen(false); onNotificationsOpen(); }}
                className="flex items-center gap-3 text-sm text-ink-muted"
              >
                <Bell className="size-4" /> Notifications
                {unreadCount > 0 && (
                  <span className="ml-auto bg-volt text-volt-ink text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
