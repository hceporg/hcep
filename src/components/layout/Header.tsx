"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

function Logo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <svg
        viewBox="0 0 40 40"
        className="size-8 text-maroon"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20 2c1.5 6 6 10.5 12 12-6 1.5-10.5 6-12 12-1.5-6-6-10.5-12-12 6-1.5 10.5-6 12-12z" />
        <path
          d="M20 10c.8 3.2 3.2 5.6 6.4 6.4-3.2.8-5.6 3.2-6.4 6.4-.8-3.2-3.2-5.6-6.4-6.4 3.2-.8 5.6-3.2 6.4-6.4z"
          opacity="0.7"
        />
      </svg>
      <span className="font-serif text-lg sm:text-xl text-maroon tracking-tight group-hover:text-maroon-dark transition-colors">
        {name}
      </span>
    </Link>
  );
}

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="header-animate sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-4">
          <Logo name={settings.site_name} />

          <nav className="hidden md:flex items-center gap-8">
            {settings.nav_items.map((item) =>
              item.children?.length ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-maroon hover:text-maroon-dark cursor-pointer"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 top-full pt-2">
                      <div className="min-w-[200px] rounded-xl bg-white border border-border shadow-lg py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-ink hover:bg-cream hover:text-maroon"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-maroon hover:text-maroon-dark transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-maroon cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-cream">
          <nav className="px-4 py-4 space-y-1">
            {settings.nav_items.map((item) => (
              <div key={item.label}>
                {item.children?.length ? (
                  <>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium text-maroon rounded-lg hover:bg-cream-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-maroon rounded-lg hover:bg-cream-dark"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
