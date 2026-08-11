import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/site";
import { CtaButton } from "@/components/enquiry/CtaButton";

export const metadata: Metadata = buildMetadata({
  title: "Awards & Recognition | Highlight Creations",
  description:
    "Awards and recognition received by Highlight Creations for wedding planning, coordination and guest experience.",
  path: "/awards",
  keywords: [
    "wedding planning awards",
    "wedding planner recognition",
    "destination wedding awards",
    "Highlight Creations awards",
  ],
});

const awards = [
  {
    title: "Best Wedding Planning Team",
    year: "2024",
    body: "Recognized for end-to-end coordination and guest experience excellence.",
  },
  {
    title: "Top Destination Wedding Planner",
    year: "2025",
    body: "Awarded for multi-city wedding planning across Agra and Rajasthan.",
  },
  {
    title: "Client Choice for Event Management",
    year: "2026",
    body: "Celebrated for transparent planning, reliable execution and strong reviews.",
  },
];

export default function AwardsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Awards", path: "/awards" },
        ])}
      />

      <div className="bg-cream-dark/5">
        <header className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">
            Awards & Recognition
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed">
            We are proud to be recognized for planning quality, on-ground
            coordination and the calm, organized experience we bring to your
            wedding days.
          </p>
        </header>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
          <div className="grid sm:grid-cols-2 gap-4">
            {awards.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-xl text-ink">{a.title}</h2>
                  <span className="text-xs font-semibold uppercase tracking-wider text-maroon bg-maroon/10 px-3 py-1 rounded-full">
                    {a.year}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <CtaButton source="awards" text="Get a wedding planning quote" />
          </div>
        </div>
      </div>
    </>
  );
}

