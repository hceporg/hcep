import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/site";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Destination Weddings in Goa, Agra & Rajasthan | Highlight Creations",
  description:
    "Full-service destination wedding planning across Goa, Agra and Rajasthan. Venues, décor, logistics and on-ground coordination — tailored for your celebration.",
  path: "/destination-weddings",
  keywords: [
    "destination weddings",
    "destination wedding planner",
    "Goa wedding planner",
    "Agra wedding planner",
    "Rajasthan destination wedding planner",
  ],
});

export default function DestinationWeddingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destination Weddings", path: "/destination-weddings" },
        ])}
      />

      <div className="bg-cream">
        <header className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">
            Destination weddings, planned end to end
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed">
            {SITE.name} plans weddings across Goa, Agra and Rajasthan — with
            a clear function list, venue shortlisting, and on-ground
            coordination so your celebration stays calm and beautiful.
          </p>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-16 space-y-10 leading-relaxed text-ink/85">
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">What we handle</h2>
              <p className="mt-2 text-sm text-muted">
                Venue sourcing, décor direction, vendor management, hospitality
                desks, transport flow and run-of-show coordination.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">How we plan</h2>
              <p className="mt-2 text-sm text-muted">
                We structure the wedding story (not just the venue) — then align
                logistics and permissions to protect your best moments.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-maroon mb-4">
              Choose your city planning page
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/goa-wedding-planner"
                  className="text-maroon hover:underline"
                >
                  Destination wedding planner in Goa
                </Link>
              </li>
              <li>
                <Link
                  href="/agra-wedding-planner"
                  className="text-maroon hover:underline"
                >
                  Wedding planner in Agra
                </Link>
              </li>
              <li>
                <Link
                  href="/jaipur-wedding-planner"
                  className="text-maroon hover:underline"
                >
                  Destination wedding planner Jaipur
                </Link>
              </li>
              <li>
                <Link
                  href="/udaipur-wedding-planner"
                  className="text-maroon hover:underline"
                >
                  Destination wedding planner Udaipur
                </Link>
              </li>
              <li>
                <Link
                  href="/bharatpur-wedding-planner"
                  className="text-maroon hover:underline"
                >
                  Wedding planner in Bharatpur
                </Link>
              </li>
            </ul>
          </section>

          <div className="text-center">
            <CtaButton source="destination-weddings" text="Start my destination wedding planning" />
          </div>
        </div>
      </div>
    </>
  );
}

