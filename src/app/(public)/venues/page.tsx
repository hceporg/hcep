import { Suspense } from "react";
import { getVenueCities, getVenues } from "@/lib/data";
import { VenueFilters } from "@/components/venues/VenueFilters";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Wedding Venues | Highlight Creations",
  description:
    "Search wedding venues across our destination cities. Filter by city, budget, and capacity with Highlight Creations.",
  path: "/venues",
  keywords: [
    "wedding venues",
    "destination wedding venues",
    "palace venues",
    "fort venues",
    "haveli wedding venues",
  ],
});

export default async function VenuesPage() {
  const [venues, cities] = await Promise.all([getVenues(), getVenueCities()]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
        ])}
      />
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
              Wedding Venues
            </h1>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Search venues across every city we manage — filter by location,
              budget, and guest capacity.
            </p>
          </div>
          <Suspense
            fallback={
              <p className="text-center text-sm text-muted py-8">Loading venues…</p>
            }
          >
            <VenueFilters venues={venues} cities={cities} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
