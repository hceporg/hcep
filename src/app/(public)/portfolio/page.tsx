import Link from "next/link";
import { getPortfolio } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recently Executed Weddings",
  description: "A glimpse into weddings planned and executed by Highlight Creations.",
};

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
            A Glimpse Into Our Recently Executed Weddings
          </h1>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Real celebrations, real couples — destinations across India and beyond.
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
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <p className="font-serif text-xl text-white">{item.couple_name}</p>
                <p className="text-sm text-white/85 mt-1">
                  {item.location} · {item.date_label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
