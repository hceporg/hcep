import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { FooterReveal } from "@/components/layout/FooterReveal";
import { SITE } from "@/lib/seo/site";

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
                Full-service destination wedding planning across Agra,
                Bharatpur, Jaipur, and Udaipur — palaces, forts, and heritage
                venues.
              </p>
              <p className="text-xs text-muted mt-4 leading-relaxed">
                {SITE.addressFull}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Cities</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/agra-wedding-planner" className="hover:text-maroon">
                    Agra wedding planner
                  </Link>
                </li>
                <li>
                  <Link href="/jaipur-wedding-planner" className="hover:text-maroon">
                    Jaipur wedding planner
                  </Link>
                </li>
                <li>
                  <Link href="/udaipur-wedding-planner" className="hover:text-maroon">
                    Udaipur wedding planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bharatpur-wedding-planner"
                    className="hover:text-maroon"
                  >
                    Bharatpur wedding planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destination-wedding-packages"
                    className="hover:text-maroon"
                  >
                    Wedding packages
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink mb-3">Explore</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/venues" className="hover:text-maroon">
                    Wedding venues
                  </Link>
                </li>
                <li>
                  <Link href="/real-weddings" className="hover:text-maroon">
                    Real weddings
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-maroon">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-maroon">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/price-beat-challenge" className="hover:text-maroon">
                    Price Beat Challenge
                  </Link>
                </li>
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

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted">
            <p>
              © {year} {settings.site_name}. All rights reserved.
            </p>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
