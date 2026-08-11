"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/enquiry/CtaButton";
import type { SiteSettings } from "@/lib/types";

const benefits = [
  {
    emoji: "🎁",
    title: "Exclusive Deals",
    description: "Best deals made only for you tailored to your preferences.",
  },
  {
    emoji: "💡",
    title: "Expert Insights",
    description: "Our wedding experts know how to craft the best for you.",
  },
  {
    emoji: "🧘",
    title: "Stress-free Experience",
    description:
      "From venue recce to last second of event, we'll be with you.",
  },
];

export function WhyBetterSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative bg-gradient-to-b from-[#e8f5f0]/60 via-white to-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle top wave */}
      <div className="absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 60" className="w-full text-white" preserveAspectRatio="none">
          <path
            d="M0,40 C360,0 720,60 1440,20 L1440,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="arise" className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-ink">
            Why are we better?
          </h2>
          <p className="mt-3 text-muted text-sm sm:text-base max-w-lg mx-auto">
            Because we bring our years of experience in planning your wedding.
          </p>
        </Reveal>

        <Reveal variant="arise" delay={100}>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-white p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl sm:text-5xl mb-4">{b.emoji}</div>
                <h3 className="font-serif text-lg sm:text-xl text-ink font-semibold">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="arise" delay={200} className="mt-12 flex justify-center">
          <CtaButton text={settings.cta_text} source="why-better" />
        </Reveal>
      </div>
    </section>
  );
}
