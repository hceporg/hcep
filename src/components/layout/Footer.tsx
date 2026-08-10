import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { FooterReveal } from "@/components/layout/FooterReveal";

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
                Crafting memorable weddings across India and beyond. Based in
                Agra.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Explore</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/venues" className="hover:text-maroon">
                    Wedding Venues
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-maroon">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-maroon">
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/price-beat-challenge"
                    className="hover:text-maroon"
                  >
                    Price Beat Challenge
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-maroon">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Company</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/about" className="hover:text-maroon">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-maroon">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-maroon">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-maroon">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-maroon">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Get in touch</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:text-maroon"
                  >
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
                <li>{settings.address}</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted">
            <p>
              © {year} {settings.site_name}. All rights reserved.
            </p>
            <p>Designed for unforgettable celebrations.</p>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
