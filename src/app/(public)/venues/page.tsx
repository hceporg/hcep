import { getVenues } from "@/lib/data";
import { VenueFilters } from "@/components/venues/VenueFilters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Venues",
  description:
    "Browse curated wedding venues across India — filter by city, budget, and capacity.",
};

export default async function VenuesPage() {
  const venues = await getVenues();

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
            Wedding Venues
          </h1>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Discover handpicked venues for every style and budget — from beach
            villas to heritage palaces.
          </p>
        </div>
        <VenueFilters venues={venues} />
      </div>
    </div>
  );
}
