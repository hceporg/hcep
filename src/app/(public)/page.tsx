import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { ReelsSection } from "@/components/home/ReelsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { VenueCtaSection } from "@/components/home/VenueCtaSection";
import {
  getBanners,
  getReels,
  getReviews,
  getSettings,
  getStats,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Best Destination Wedding Planner in Rajasthan | Highlight Creations",
  description:
    "Luxury destination wedding planner for Agra, Jaipur, Udaipur & Bharatpur. Palace, fort & heritage weddings — venues, décor, logistics. Free quote.",
  path: "/",
  keywords: [
    "best destination wedding planner in Rajasthan",
    "luxury wedding planner Rajasthan",
    "top wedding planner Agra Jaipur Udaipur",
  ],
});

export default async function HomePage() {
  const [banners, reels, reviews, stats, settings] = await Promise.all([
    getBanners(),
    getReels(),
    getReviews(),
    getStats(),
    getSettings(),
  ]);

  return (
    <>
      <HeroSection banners={banners} stats={stats} settings={settings} />
      <ReelsSection reels={reels} settings={settings} />
      <ReviewsSection reviews={reviews} settings={settings} />
      <VenueCtaSection settings={settings} />

      <section className="bg-cream border-t border-border py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-maroon text-center">
            Destination wedding planning across Agra &amp; Rajasthan
          </h2>
          <p className="mt-3 text-center text-muted text-sm max-w-2xl mx-auto">
            Explore dedicated planning guides for each city we serve — unique
            venues, seasons, and logistics for your celebration.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { href: "/agra-wedding-planner", label: "Wedding planner in Agra" },
              {
                href: "/jaipur-wedding-planner",
                label: "Destination wedding planner Jaipur",
              },
              {
                href: "/udaipur-wedding-planner",
                label: "Destination wedding planner Udaipur",
              },
              {
                href: "/bharatpur-wedding-planner",
                label: "Wedding planner in Bharatpur",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-border bg-white px-4 py-5 text-sm font-medium text-maroon hover:border-maroon/40 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm">
            <Link
              href="/destination-wedding-packages"
              className="text-maroon hover:underline"
            >
              View destination wedding packages
            </Link>
            {" · "}
            <Link href="/venues" className="text-maroon hover:underline">
              Browse wedding venues
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
