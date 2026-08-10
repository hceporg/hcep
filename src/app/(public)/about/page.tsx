import { CtaButton } from "@/components/enquiry/CtaButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Highlight Creations — wedding planners in Agra with 1,000+ celebrations delivered.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-maroon">About Us</h1>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">
          Highlight Creations was founded with a simple belief: every couple
          deserves a celebration that feels uniquely theirs — without the stress
          of navigating endless vendors and hidden costs.
        </p>
        <p className="mt-4 text-ink/75 leading-relaxed">
          Based in Agra, we&apos;ve planned over a thousand weddings across India and
          select destinations abroad, partnering with 28,000+ venues and a
          curated network of décor, catering, and entertainment specialists.
        </p>
      </section>

      <section className="bg-cream-dark border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { v: "1,043+", l: "Weddings planned" },
            { v: "4.8/5", l: "Google rating" },
            { v: "28,363+", l: "Venue partners" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif text-4xl text-maroon">{s.v}</p>
              <p className="text-sm text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-maroon mb-4">Our promise</h2>
        <p className="text-ink/80 leading-relaxed mb-8">
          Transparent pricing, dedicated planners, and a Price Beat Challenge
          that ensures you never overpay for the venue you love.
        </p>
        <CtaButton source="about" />
      </section>
    </div>
  );
}
