"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Banner, SiteSettings, SiteStats } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { cn } from "@/lib/utils";

type Props = {
  banners: Banner[];
  stats: SiteStats;
  settings: SiteSettings;
};

export function HeroSection({ banners, stats, settings }: Props) {
  const [index, setIndex] = useState(0);
  const active = banners[index] ?? banners[0];

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 6000);
    return () => clearInterval(id);
  }, [banners.length]);

  if (!active) return null;

  return (
    <section className="relative h-[100svh] min-h-[560px] max-h-[920px] w-full overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          {banner.media_type === "video" ? (
            <video
              src={banner.media_url}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={banner.media_url}
              alt={banner.couple_name}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/65" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col">
        {/* Couple badge + dots */}
        <div className="flex flex-1 flex-col items-center justify-start pt-[18vh] sm:pt-[20vh] px-4">
          <div className="hero-rise rounded-full bg-black/40 backdrop-blur-sm px-4 py-1.5 text-xs sm:text-sm text-white tracking-wide">
            {active.couple_name}
            {active.location && <> &bull; {active.location}</>}
            {active.date_label && <> &bull; {active.date_label}</>}
          </div>

          <div className="mt-4 flex items-center gap-2 hero-rise hero-rise-delay-1">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  i === index
                    ? "size-2.5 bg-white"
                    : "size-1.5 bg-white/60 hover:bg-white/90"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom content */}
        <div className="px-4 sm:px-8 lg:px-12 pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="h-px w-full bg-white/40 mb-6 sm:mb-8 hero-rise hero-rise-delay-1" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-xl hero-rise hero-rise-delay-2">
                Crafting Memorable Weddings
                <span className="inline-flex gap-1 ml-2 align-middle text-white/80 text-lg">
                  <StarIcon />
                  <StarIcon />
                </span>
              </h1>

              <div className="flex flex-col items-start lg:items-end gap-5 hero-rise hero-rise-delay-3">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-white">
                  <Stat
                    value={stats.weddings_done}
                    label="weddings done"
                  />
                  <Stat value={stats.google_rating} label="google rating" />
                  <Stat
                    value={stats.venue_partners}
                    label="venue partners"
                  />
                </div>
                <CtaButton
                  text={settings.cta_text}
                  source="hero"
                  className="min-w-[240px]"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll down"
          onClick={() =>
            document
              .getElementById("reviews-experiences")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 hover:text-white cursor-pointer animate-bounce"
        >
          <ChevronDown className="size-6" strokeWidth={1.5} />
          <ChevronDown className="size-6 -mt-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-left lg:text-right">
      <p className="text-lg sm:text-xl font-semibold leading-none">{value}</p>
      <p className="text-xs sm:text-sm text-white/80 mt-1">{label}</p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 inline" fill="currentColor">
      <path d="M8 0l1.5 5.5L15 7l-5.5 1.5L8 14l-1.5-5.5L1 7l5.5-1.5L8 0z" />
    </svg>
  );
}
