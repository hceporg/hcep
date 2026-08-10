import Link from "next/link";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { JsonLd, breadcrumbSchema, faqPageSchema } from "@/components/seo/JsonLd";
import type { CityPageContent } from "@/lib/seo/cities";
import { SITE } from "@/lib/seo/site";

export function CityWeddingPlannerPage({ city }: { city: CityPageContent }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: city.city, path: city.path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqPageSchema(city.faqs)} />

      <article className="bg-cream">
        <header className="border-b border-border bg-cream-dark/50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
            <nav className="text-xs text-muted mb-4" aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-1">
                <li>
                  <Link href="/" className="hover:text-maroon">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-ink">{city.city} wedding planner</li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-maroon leading-tight">
              {city.h1}
            </h1>
            <p className="mt-4 text-muted text-sm sm:text-base">
              {SITE.name} · {city.city}, {city.state} · Full-service destination
              wedding planning
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 space-y-12 text-ink/85 leading-relaxed">
          <section className="space-y-4">
            {city.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              {city.venuesHeading}
            </h2>
            <div className="space-y-4">
              {city.venuesBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              {city.costsHeading}
            </h2>
            <div className="space-y-4">
              {city.costsBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              {city.seasonHeading}
            </h2>
            <div className="space-y-4">
              {city.seasonBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              {city.permitsHeading}
            </h2>
            <div className="space-y-4">
              {city.permitsBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              {city.timelineHeading}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {city.timelineBody.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {city.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-border bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ink">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-5 text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-maroon mb-3">
              Also planning nearby?
            </h2>
            <ul className="space-y-2 text-sm">
              {city.relatedCities.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-maroon hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/venues" className="text-maroon hover:underline">
                  Wedding venues in Rajasthan and Agra
                </Link>
              </li>
            </ul>
          </section>

          <div className="text-center pt-4">
            <CtaButton source={`city:${city.slug}`} />
            <p className="mt-4 text-xs text-muted">{SITE.addressFull}</p>
            <p className="text-xs text-muted mt-1">
              <a href={`tel:${SITE.phone}`} className="hover:text-maroon">
                {SITE.phoneDisplay}
              </a>
              {" · "}
              <a href={`mailto:${SITE.email}`} className="hover:text-maroon">
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
