import { getPortfolio, getPortfolioBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaButton } from "@/components/enquiry/CtaButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getPortfolio();
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return { title: "Wedding" };
  return { title: item.title, description: item.description };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) notFound();

  return (
    <div className="bg-cream">
      <div className="relative h-[55vh] min-h-[360px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.cover_image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl text-white">
            <p className="text-sm uppercase tracking-wider text-white/80">
              {item.location} · {item.date_label}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl mt-2">
              {item.couple_name}
            </h1>
            <p className="mt-2 text-white/90">{item.title}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <Link href="/portfolio" className="text-sm text-maroon hover:underline">
          ← All weddings
        </Link>
        <p className="mt-6 text-lg text-ink/85 leading-relaxed">
          {item.description}
        </p>
        <div className="mt-10 flex justify-center">
          <CtaButton source={`portfolio:${item.slug}`} />
        </div>
      </div>
    </div>
  );
}
