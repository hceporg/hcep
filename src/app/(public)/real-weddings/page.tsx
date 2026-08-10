import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/site";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Real Destination Weddings Rajasthan | Highlight Creations",
  description:
    "Real destination weddings across Agra, Jaipur, Udaipur & Bharatpur — palace, fort, and heritage celebrations by Highlight Creations.",
  path: "/real-weddings",
  keywords: [
    "real destination weddings Rajasthan",
    "wedding photos Udaipur Jaipur",
    "destination wedding gallery Rajasthan",
  ],
});

export default async function RealWeddingsPage() {
  const items = await getPortfolio();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Real Weddings", path: "/real-weddings" },
        ])}
      />
      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
              Real Destination Weddings in Rajasthan &amp; Agra
            </h1>
            <p className="mt-3 text-muted">
              A glimpse into celebrations planned across palace, fort, and
              heritage settings — with more stories on our{" "}
              <Link href="/blog" className="text-maroon hover:underline">
                blog
              </Link>
              .
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover_image}
                  alt={`${item.couple_name} destination wedding in ${item.location} by Highlight Creations`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="font-serif text-xl text-white">
                    {item.couple_name}
                  </p>
                  <p className="text-sm text-white/85 mt-1">
                    {item.location} · {item.date_label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
