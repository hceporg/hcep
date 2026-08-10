import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { JsonLd, breadcrumbSchema, faqPageSchema } from "@/components/seo/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Destination Wedding Packages Rajasthan | Highlight Creations",
  description:
    "All-inclusive destination wedding packages across Agra, Jaipur, Udaipur & Bharatpur. Venue, décor, logistics — tailored by Highlight Creations.",
  path: "/destination-wedding-packages",
  keywords: [
    "destination wedding packages Rajasthan",
    "all-inclusive wedding package Rajasthan",
    "destination wedding planner Rajasthan",
  ],
});

const faqs = [
  {
    question: "What is included in a destination wedding package?",
    answer:
      "Packages typically cover planning coordination, venue shortlisting support, décor direction, vendor management, run-of-show, and on-ground coordination. Hospitality desks, transport, and entertainment can be added. Exact inclusions are confirmed in writing for your guest count and cities.",
  },
  {
    question: "Do you offer all-inclusive packages for Rajasthan destination weddings?",
    answer:
      "Yes — we design all-inclusive style packages spanning Agra, Bharatpur, Jaipur, and/or Udaipur. “All-inclusive” still depends on venue minimums and guest count; we itemize clearly so families know what is fixed vs variable.",
  },
  {
    question: "Can packages cover multiple cities?",
    answer:
      "Yes. Many couples combine Agra welcome events with Jaipur or Udaipur celebrations. One Highlight Creations team manages the full corridor.",
  },
];

const tiers = [
  {
    name: "Essential coordination",
    body: "Ideal when venue is shortlisted and you need a professional run-of-show, vendor management, and on-ground coordination across 1–2 days.",
  },
  {
    name: "Signature destination planning",
    body: "Full planning for multi-day celebrations — venue sourcing, décor direction, hospitality planning, and end-to-end vendor orchestration in one city.",
  },
  {
    name: "Corridor celebration",
    body: "Agra + Rajasthan multi-city itineraries (for example Agra → Jaipur or Jaipur → Udaipur) with unified logistics, rooming strategy, and one planning lead.",
  },
];

export default function DestinationWeddingPackagesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/destination-wedding-packages" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      <div className="bg-cream">
        <header className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">
            Destination Wedding Packages in Rajasthan &amp; Agra
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Transparent, tailored packages for palace, fort, and heritage
            destination weddings — planned by {SITE.name} across{" "}
            {SITE.areaServed.join(", ")}.
          </p>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 space-y-10 leading-relaxed text-ink/85">
          <p>
            Destination wedding packages should clarify scope — not hide fees
            behind vague “starting at” numbers. We build packages around guest
            count, function list, cities, and venue category, then share
            comparable vendor quotes so you can decide with confidence.
          </p>

          <section className="grid gap-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-white p-6"
              >
                <h2 className="font-serif text-xl text-maroon">{t.name}</h2>
                <p className="mt-2 text-sm text-muted">{t.body}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-serif text-2xl text-maroon mb-3">
              Explore city planning pages
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/agra-wedding-planner" className="text-maroon hover:underline">
                  Wedding planner in Agra
                </Link>
              </li>
              <li>
                <Link href="/jaipur-wedding-planner" className="text-maroon hover:underline">
                  Destination wedding planner Jaipur
                </Link>
              </li>
              <li>
                <Link href="/udaipur-wedding-planner" className="text-maroon hover:underline">
                  Destination wedding planner Udaipur
                </Link>
              </li>
              <li>
                <Link href="/bharatpur-wedding-planner" className="text-maroon hover:underline">
                  Wedding planner in Bharatpur
                </Link>
              </li>
              <li>
                <Link href="/venues" className="text-maroon hover:underline">
                  Wedding venues in Rajasthan and Agra
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-maroon mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-border bg-white"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 font-medium">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-5 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="text-center">
            <CtaButton source="packages" text="Get a package quote" />
          </div>
        </div>
      </div>
    </>
  );
}
