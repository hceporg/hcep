import { getFaqs } from "@/lib/data";
import { CtaButton } from "@/components/enquiry/CtaButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about wedding planning with Highlight Creations.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">FAQ</h1>
          <p className="mt-3 text-muted">Common questions from couples we work with.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-xl border border-border bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ink flex justify-between items-center gap-4">
                {faq.question}
                <span className="text-maroon text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted mb-4">Still have questions?</p>
          <CtaButton source="faq" />
        </div>
      </div>
    </div>
  );
}
