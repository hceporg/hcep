"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/enquiry/CtaButton";
import type { SiteSettings } from "@/lib/types";

const locations = [
  { name: "Agra", emoji: "🕌", href: "/agra-wedding-planner" },
  { name: "Delhi", emoji: "🏛️", href: "/venues?city=delhi" },
  { name: "Jaipur", emoji: "🏰", href: "/jaipur-wedding-planner" },
  { name: "Goa", emoji: "🏖️", href: "/venues?city=goa" },
  { name: "Noida", emoji: "🌆", href: "/venues?city=noida" },
  { name: "Udaipur", emoji: "⛲", href: "/udaipur-wedding-planner" },
  { name: "Bharatpur", emoji: "🦚", href: "/bharatpur-wedding-planner" },
  { name: "Mumbai", emoji: "🌊", href: "/venues?city=mumbai" },
];

export function LocationSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="arise" className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-ink">
            Any location in mind?
          </h2>
          <p className="mt-3 text-muted text-sm sm:text-base">
            Choose a wedding venue in your city
          </p>
        </Reveal>

        <Reveal variant="arise" delay={100}>
          <div className="grid grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto">
            {locations.map((loc) => (
              <Link
                key={loc.name}
                href={loc.href}
                className="group flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className="size-16 sm:size-20 lg:size-24 rounded-full bg-cream flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl border-2 border-cream-dark group-hover:border-maroon/40 transition-colors shadow-sm">
                  {loc.emoji}
                </div>
                <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-maroon transition-colors">
                  {loc.name}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal variant="arise" delay={200} className="mt-8 text-center">
          <Link
            href="/venues"
            className="text-sm text-maroon hover:underline underline-offset-4"
          >
            View all
          </Link>
        </Reveal>

        <Reveal variant="arise" delay={250} className="mt-10 flex justify-center">
          <CtaButton text={settings.cta_text} source="location-section" />
        </Reveal>
      </div>
    </section>
  );
}
