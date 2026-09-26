import Link from "next/link";
import type { Venue, VenueCity } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  cities: VenueCity[];
  venues: Venue[];
};

export function CityVenuesSection({ cities, venues }: Props) {
  if (!cities.length) return null;

  return (
    <section className="bg-cream-dark/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="arise" className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-maroon">
            City-wise wedding venues
          </h2>
          <p className="mt-3 text-muted text-sm sm:text-base max-w-xl mx-auto">
            Explore venues by city — curated for capacity, style, and destination
            celebrations.
          </p>
        </Reveal>

        <div className="space-y-14">
          {cities.map((city, idx) => {
            const list = venues
              .filter(
                (v) =>
                  v.city_id === city.id ||
                  (!v.city_id &&
                    v.city.toLowerCase() === city.name.toLowerCase())
              )
              .slice(0, 3);
            if (!list.length) return null;

            return (
              <Reveal key={city.id} variant="arise" delay={idx * 60}>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-maroon">
                      {city.heading || city.name}
                    </h3>
                    {city.subheading && (
                      <p className="mt-1 text-sm text-muted max-w-xl">
                        {city.subheading}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/venues?city=${encodeURIComponent(city.slug)}`}
                    className="text-sm font-medium text-maroon hover:underline shrink-0"
                  >
                    View all in {city.name} →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {list.map((venue) => (
                    <Link
                      key={venue.id}
                      href={`/venues/${venue.slug}`}
                      className="group rounded-xl overflow-hidden bg-white border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={venue.cover_image}
                          alt={venue.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif text-lg text-ink group-hover:text-maroon transition-colors">
                          {venue.name}
                        </h4>
                        <p className="text-sm text-muted mt-1">{venue.city}</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-muted">
                          <span>
                            {venue.capacity_min}–{venue.capacity_max} guests
                          </span>
                          <span className="font-medium text-maroon">
                            {formatCurrency(venue.price_min)}+
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/venues"
            className="inline-flex text-sm font-medium text-maroon hover:underline"
          >
            Browse all wedding venues →
          </Link>
        </div>
      </div>
    </section>
  );
}
