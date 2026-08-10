import { CtaButton } from "@/components/enquiry/CtaButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end wedding planning — venues, décor, catering, photography, and on-ground coordination.",
};

const services = [
  {
    title: "Venue sourcing",
    body: "Access our partner network of 28,000+ venues. We shortlist options by city, capacity, and budget.",
  },
  {
    title: "Décor & design",
    body: "Floral, lighting, and spatial design that matches your vision — mandap to reception.",
  },
  {
    title: "Catering coordination",
    body: "Menu curation with trusted culinary partners for multi-cuisine celebrations.",
  },
  {
    title: "Photography & film",
    body: "Recommend and manage photographers and filmmakers who capture every emotion.",
  },
  {
    title: "Entertainment",
    body: "DJs, live bands, mehendi artists, and surprise performances — booked and briefed.",
  },
  {
    title: "On-ground coordination",
    body: "Day-of management so you celebrate while we handle timelines, vendors, and guests.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
            Services
          </h1>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Everything you need for a seamless celebration — pick a full package
            or à la carte support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h2 className="font-serif text-xl text-maroon">{s.title}</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CtaButton source="services" />
        </div>
      </div>
    </div>
  );
}
