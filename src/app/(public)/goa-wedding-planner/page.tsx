import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema, faqPageSchema } from "@/components/seo/JsonLd";
import { CityWeddingPlannerPage } from "@/components/seo/CityWeddingPlannerPage";
import { buildMetadata } from "@/lib/seo/site";

// NOTE: Goa is not part of the existing CITY_PAGES map, so we keep this
// page self-contained (still using the same CityWeddingPlannerPage layout).
const city: any = {
  slug: "goa",
  path: "/goa-wedding-planner",
  city: "Goa",
  state: "Goa",
  primaryKeyword: "destination wedding planner Goa",
  supportingKeywords: [
    "beach destination wedding Goa",
    "luxury wedding planner Goa",
    "wedding planner near Goa beaches",
  ],
  title: "Destination Wedding Planner Goa | Highlight Creations",
  description:
    "Plan a beach destination wedding in Goa with Highlight Creations. Venues, décor, logistics and end-to-end coordination — get a free quote today.",
  h1: "Destination Wedding Planner Goa for Beach & Resort Celebrations",
  intro: [
    "Goa wedding celebrations feel effortless when the plan is executed with precision. Highlight Creations designs beach and resort destination weddings end to end — venue sourcing, décor direction, vendor management, guest hospitality, and on-ground coordination.",
    "From sangeet nights to beachfront receptions, Goa weddings often combine multiple spaces (beach, lawn, banquet, and poolside). We build one timeline so your guests move smoothly and every moment looks planned — not rushed.",
    "If your celebration is a corridor itinerary (Agra → Goa welcome, or Goa → Rajasthan events), we manage the full coordination so you only have one planning lead.",
  ],
  venuesHeading: "Beachside and resort venues in Goa",
  venuesBody: [
    "Goa offers a mix of beach-facing resorts, heritage villas, and large banquet properties. Venue choice depends on guest capacity, ceremony vs reception split, weather contingencies, and access planning.",
    "We shortlist venues based on practical logistics — parking/transfer flow, indoor backup availability, sound windows, and load-in timing — so beach moments stay stress-free.",
  ],
  costsHeading: "What influences Goa destination wedding cost",
  costsBody: [
    "Costs depend on guest count, venue category, number of functions, décor scale, and peak-season demand. Beach setups and sound/entertainment add complexity too.",
    "We share transparent planning options aligned to your dates and function list. For an accurate range, contact us with your city preferences and estimated guest count.",
  ],
  seasonHeading: "Best season for a Goa destination wedding",
  seasonBody: [
    "Goa is popular in peak winter months. For planning, we lock venue inventory early and build weather-safe run-of-show buffers for beach moments.",
    "Shoulder seasons can be great for value — but we still design contingency coverage for indoor transfers and guest comfort.",
  ],
  permitsHeading: "Permits and coordination notes for Goa",
  permitsBody: [
    "Venue permissions typically govern event operations. We plan around any restrictions for amplified sound, public-area setups, and photography near scenic points.",
    "For smooth experiences, we coordinate coach timing, guest check-in waves, and vendor load-in schedules so the celebration never waits.",
  ],
  timelineHeading: "Suggested planning timeline",
  timelineBody: [
    "12–18 months out: shortlist Goa venues and lock dates (plus any corridor cities).",
    "6–9 months: confirm décor direction, photographer/filmmaker, catering menus, and rooming.",
    "8–12 weeks: finalize run-of-show, hospitality desks, and transfer planning.",
    "Final fortnight: guest communication, vendor coordination, and team briefing.",
  ],
  faqs: [
    {
      question: "How much does a destination wedding in Goa cost?",
      answer:
        "Goa destination wedding costs vary by venue tier, guest count, functions and season. Highlight Creations prepares a tailored estimate after understanding your dates, function list, and hospitality needs.",
    },
    {
      question: "Is Goa a good option for beach ceremonies?",
      answer:
        "Yes — with the right venue inventory and weather-safe planning. We build indoor backups, sound timing, and guest movement so beach moments stay seamless.",
    },
    {
      question: "Can you combine Goa with other cities in one trip?",
      answer:
        "Yes. Many couples plan a Goa celebration with Rajasthan/Agra events. We manage the corridor coordination under one planning lead.",
    },
  ],
  relatedCities: [
    { label: "Destination wedding packages", href: "/destination-wedding-packages" },
    { label: "Wedding planner in Agra", href: "/agra-wedding-planner" },
    { label: "Wedding planner Jaipur", href: "/jaipur-wedding-planner" },
    { label: "Wedding planner Udaipur", href: "/udaipur-wedding-planner" },
    { label: "Wedding planner Bharatpur", href: "/bharatpur-wedding-planner" },
  ],
};

export const metadata: Metadata = buildMetadata({
  title: city.title,
  description: city.description,
  path: city.path,
  keywords: [city.primaryKeyword, ...city.supportingKeywords],
});

export default function GoaWeddingPlannerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: city.city, path: city.path },
        ])}
      />
      <JsonLd data={faqPageSchema(city.faqs)} />
      <CityWeddingPlannerPage city={city} />
    </>
  );
}

