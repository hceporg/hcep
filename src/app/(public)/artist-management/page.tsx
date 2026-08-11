import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  title: "Artist Management for Weddings | Highlight Creations",
  description:
    "Artist management for weddings — choreography, live performances, vendor coordination and seamless event flow planned by Highlight Creations.",
  path: "/artist-management",
  keywords: [
    "artist management for wedding",
    "wedding performances",
    "choreography coordination",
    "wedding planning",
  ],
});

export default function ArtistManagementPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Artist Management", path: "/artist-management" },
        ])}
      />

      <div className="bg-cream">
        <header className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">
            Artist management that keeps every performance perfect
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed">
            From mehendi choreography to live stage performances, we align
            artists with your run-of-show, venue timelines and coordination
            plan — so transitions stay smooth.
          </p>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-16 space-y-8 leading-relaxed text-ink/85">
          <section className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">Choreography & rehearsals</h2>
              <p className="mt-2 text-sm text-muted">
                We coordinate rehearsals, stage requirements and music timing
                so your performance matches the wedding story.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">Live performances</h2>
              <p className="mt-2 text-sm text-muted">
                Artist schedules, sound checks, load-in timing and stage cues
                are planned in advance to avoid delays.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">Vendor coordination</h2>
              <p className="mt-2 text-sm text-muted">
                We coordinate artists with other vendors (photography, decor,
                catering) so every team works off one timeline.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif text-xl text-maroon">Seamless run-of-show</h2>
              <p className="mt-2 text-sm text-muted">
                Your performances are integrated into the function list with
                buffer time for arrivals, stage setup and guest movement.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-maroon">Works well with</h2>
            <p className="mt-3 text-sm text-muted">
              If you're planning a destination wedding, artist management is
              especially valuable — travel schedules and venue constraints add
              complexity, and we handle the coordination.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/destination-weddings" className="text-maroon hover:underline">
                  Destination weddings planning
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-maroon hover:underline">
                  Full services overview
                </Link>
              </li>
            </ul>
          </section>

          <div className="text-center">
            <CtaButton source="artist-management" text="Plan performances with us" />
          </div>
        </div>
      </div>
    </>
  );
}

