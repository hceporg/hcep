import { getVenues } from "@/lib/data";
import { VenueFilters } from "@/components/venues/VenueFilters";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Venues in Rajasthan and Agra | Highlight Creations",
  description:
    "Discover palace, fort, and haveli wedding venues across Rajasthan and Agra. Filter by city, budget, and capacity with Highlight Creations.",
  path: "/venues",
  keywords: [
    "wedding venues in Rajasthan and Agra",
    "palace venues",
    "fort venues",
    "haveli wedding venues",
  ],
});

export default async function VenuesPage() {
  const venues = await getVenues();

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
              Wedding Venues in Rajasthan and Agra
            </h1>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Palace, fort, and heritage venues for destination celebrations —
              shortlisted for capacity, hospitality, and décor potential.
            </p>
            <p className="mt-3 text-sm text-muted">
              Planning a city-specific celebration?{" "}
              <Link href="/jaipur-wedding-planner" className="text-maroon hover:underline">
                Jaipur
              </Link>
              ,{" "}
              <Link href="/udaipur-wedding-planner" className="text-maroon hover:underline">
                Udaipur
              </Link>
              ,{" "}
              <Link href="/agra-wedding-planner" className="text-maroon hover:underline">
                Agra
              </Link>
              , or{" "}
              <Link
                href="/bharatpur-wedding-planner"
                className="text-maroon hover:underline"
              >
                Bharatpur
              </Link>
              .
            </p>
          </div>
          <VenueFilters venues={venues} />
        </div>
      </div>
    </>
  );
}
