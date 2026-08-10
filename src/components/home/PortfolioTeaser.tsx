import Link from "next/link";
import type { PortfolioItem } from "@/lib/types";

export function PortfolioTeaser({ items }: { items: PortfolioItem[] }) {
  const featured = items.filter((i) => i.is_featured).slice(0, 6);

  return (
    <section className="bg-cream pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-white text-xl">{item.couple_name}</p>
                <p className="text-white/80 text-sm mt-1">
                  {item.location} · {item.date_label}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-maroon hover:text-maroon-dark underline-offset-4 hover:underline"
          >
            View all weddings
          </Link>
        </div>
      </div>
    </section>
  );
}
