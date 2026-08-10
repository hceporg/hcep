import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 prose-legal">
        <h1 className="font-serif text-4xl text-maroon mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted mb-8">Last updated: August 2026</p>
        <div className="space-y-6 text-ink/85 leading-relaxed text-sm sm:text-base">
          <p>
            Highlight Creations (&quot;we&quot;, &quot;us&quot;) collects personal
            information you provide through enquiry forms, including your name,
            email, phone number, wedding date, city, and budget preferences.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">How we use data</h2>
          <p>
            We use your information to respond to enquiries, provide wedding
            planning services, and improve our offerings. We do not sell your
            personal data to third parties.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">Storage</h2>
          <p>
            Enquiry data is stored securely in our database (Supabase / Postgres)
            and accessible only to authorized admin users.
          </p>
          <h2 className="font-serif text-2xl text-maroon pt-2">Contact</h2>
          <p>
            For privacy requests, email{" "}
            <a href="mailto:enquiry@highlighcreations.com" className="text-maroon underline">
              enquiry@highlighcreations.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
