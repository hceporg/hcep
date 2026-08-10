import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-serif text-4xl text-maroon mb-6">Terms of Service</h1>
        <p className="text-sm text-muted mb-8">Last updated: August 2026</p>
        <div className="space-y-6 text-ink/85 leading-relaxed text-sm sm:text-base">
          <p>
            By using the Highlight Creations website and submitting enquiries, you
            agree to these terms.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">Services</h2>
          <p>
            Information on this site — including venue pricing ranges and
            availability — is indicative. Final packages are confirmed in a
            written agreement.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">
            Price Beat Challenge
          </h2>
          <p>
            The Price Beat Challenge is subject to eligibility criteria described
            on that page. We may decline non-comparable quotes.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">Liability</h2>
          <p>
            While we strive for accuracy, we are not liable for third-party
            vendor actions beyond our contractual scope.
          </p>
        </div>
      </div>
    </div>
  );
}
