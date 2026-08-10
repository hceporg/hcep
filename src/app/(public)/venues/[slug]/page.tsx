import { getVenueBySlug, getVenues } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { VenueEnquiryButton } from "@/components/venues/VenueEnquiryButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Venue" };
  return { title: venue.name, description: venue.description };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  return (
    <div className="bg-cream">
      <div className="relative h-[50vh] min-h-[320px] max-h-[520px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={venue.cover_image}
          alt={venue.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-4xl sm:text-5xl text-white">
              {venue.name}
            </h1>
            <p className="text-white/90 mt-2">
              {venue.city}, {venue.state}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-maroon mb-3">About</h2>
            <p className="text-ink/80 leading-relaxed">{venue.description}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-maroon mb-3">Amenities</h2>
            <ul className="flex flex-wrap gap-2">
              {venue.amenities.map((a) => (
                <li
                  key={a}
                  className="rounded-full bg-cream-dark px-3 py-1.5 text-sm text-ink"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {venue.gallery.length > 1 && (
            <div>
              <h2 className="font-serif text-2xl text-maroon mb-3">Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {venue.gallery.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className="rounded-xl aspect-[4/3] object-cover w-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted">Pricing from</p>
          <p className="font-serif text-3xl text-maroon mt-1">
            {formatCurrency(venue.price_min)}
          </p>
          <p className="text-sm text-muted mt-1">
            up to {formatCurrency(venue.price_max)}
          </p>
          <div className="mt-4 pt-4 border-t border-border text-sm space-y-2">
            <p>
              <span className="text-muted">Capacity:</span>{" "}
              <span className="font-medium">
                {venue.capacity_min}–{venue.capacity_max} guests
              </span>
            </p>
            <p>
              <span className="text-muted">Location:</span>{" "}
              <span className="font-medium">
                {venue.city}, {venue.state}
              </span>
            </p>
          </div>
          <VenueEnquiryButton venueId={venue.id} venueName={venue.name} />
        </aside>
      </div>
    </div>
  );
}
