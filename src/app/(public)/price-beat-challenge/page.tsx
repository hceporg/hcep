import { CtaButton } from "@/components/enquiry/CtaButton";
import { getSettings } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Beat Challenge",
  description:
    "Found a lower venue quote? We'll beat it. Highlight Creations' Price Beat Challenge.",
};

const steps = [
  {
    n: "01",
    title: "Find a competing quote",
    body: "Get a written quote from another vendor for the same venue, date, and comparable package.",
  },
  {
    n: "02",
    title: "Share it with us",
    body: "Send us the quote via our enquiry form. We'll verify the details within 48 hours.",
  },
  {
    n: "03",
    title: "We beat the price",
    body: "Thanks to our partner network, we match — and beat — eligible quotes so you save without compromise.",
  },
];

export default async function PriceBeatPage() {
  const settings = await getSettings();

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-[#3a010e]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-4">
            Exclusive offer
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
            Price Beat Challenge
          </h1>
          <p className="mt-5 text-white/90 text-lg max-w-2xl mx-auto">
            Found a lower quote for the same venue? Bring it to us — we&apos;ll
            beat it.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton
              text="Claim the challenge"
              source="price-beat"
              variant="white"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-serif text-3xl text-maroon text-center mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <p className="font-serif text-4xl text-maroon/30">{s.n}</p>
              <h3 className="font-semibold text-ink mt-2">{s.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-dark border-y border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl text-maroon mb-6">Terms</h2>
          <ul className="space-y-3 text-sm text-ink/80 list-disc pl-5">
            <li>
              Quote must be for the same venue, similar date window, and
              comparable inclusions (catering, rooms, décor allowance).
            </li>
            <li>
              Written quotes only — verbal estimates are not eligible.
            </li>
            <li>
              Applies to venue packages sourced through our partner network.
            </li>
            <li>
              We reserve the right to decline non-comparable or unverifiable
              quotes.
            </li>
            <li>
              Offer cannot be combined with other promotions unless stated.
            </li>
          </ul>
          <div className="mt-10 flex justify-center">
            <CtaButton text={settings.cta_text} source="price-beat-footer" />
          </div>
        </div>
      </section>
    </div>
  );
}
