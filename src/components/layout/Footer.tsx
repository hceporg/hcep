import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { FooterReveal } from "@/components/layout/FooterReveal";
import { SITE } from "@/lib/seo/site";
import { FOOTER_CITIES, FOOTER_EXPLORE } from "@/lib/nav";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream-dark border-t border-border mt-auto">
      <FooterReveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <p className="font-serif text-xl text-maroon mb-3">
                {settings.site_name}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Full-service destination wedding planning across Agra, Goa,
                Bharatpur, Jaipur, and Udaipur — palaces, forts, beaches, and
                heritage venues.
              </p>
              <p className="text-xs text-muted mt-4 leading-relaxed">
                {SITE.addressFull}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Cities</p>
              <ul className="space-y-2 text-sm text-muted">
                {FOOTER_CITIES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-maroon">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Explore</p>
              <ul className="space-y-2 text-sm text-muted">
                {FOOTER_EXPLORE.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-maroon">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Contact</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href={`tel:${settings.phone}`} className="hover:text-maroon">
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-maroon"
                  >
                    {settings.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/highlightcreations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-maroon"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-maroon">
                    Contact form
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-maroon">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-maroon">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-maroon">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-maroon">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>
              © {year} {settings.site_name}. All rights reserved.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/award-weddingwire-2024.png"
                alt="WeddingWire.in Wedding Awards 2024"
                width={56}
                height={56}
                className="h-10 w-auto object-contain"
              />
              <Image
                src="/images/award-weddingwire-2026.png"
                alt="WeddingWire.in Wedding Awards 2026"
                width={56}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
