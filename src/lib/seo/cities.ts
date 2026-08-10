import type { CitySlug } from "./site";
import { SITE } from "./site";

export type CityPageContent = {
  slug: CitySlug;
  path: string;
  city: string;
  state: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  title: string;
  description: string;
  h1: string;
  intro: string[];
  venuesHeading: string;
  venuesBody: string[];
  costsHeading: string;
  costsBody: string[];
  seasonHeading: string;
  seasonBody: string[];
  permitsHeading: string;
  permitsBody: string[];
  timelineHeading: string;
  timelineBody: string[];
  relatedCities: { label: string; href: string }[];
  faqs: { question: string; answer: string }[];
};

export const CITY_PAGES: Record<CitySlug, CityPageContent> = {
  agra: {
    slug: "agra",
    path: "/agra-wedding-planner",
    city: "Agra",
    state: "Uttar Pradesh",
    primaryKeyword: "wedding planner in Agra",
    supportingKeywords: [
      "Taj Mahal destination wedding",
      "luxury wedding planner Agra",
      "best destination wedding planner in Rajasthan",
    ],
    title: "Wedding Planner in Agra | Highlight Creations",
    description:
      "Plan a Taj-view or heritage destination wedding in Agra with Highlight Creations. Venues, décor, logistics — end to end. Get a free quote today.",
    h1: "Wedding Planner in Agra for Destination Celebrations",
    intro: [
      "Agra sits at the gateway of the Agra–Rajasthan destination wedding corridor. Couples choose Agra for iconic heritage backdrops, strong hotel inventory for guest stays, and easy air/rail access from Delhi and beyond. Highlight Creations plans full-service destination weddings here — venue sourcing, décor direction, vendor management, guest hospitality, and local coordination.",
      "Whether you want a Taj-side evening reception energy, a palace-style mandap on a resort lawn, or a multi-day celebration that continues into Bharatpur or Jaipur, we build one timeline and one vendor plan so your family is not managing fifteen chats.",
      "We are based in Agra (Panchwati Plaza, Kaveri Vihar Phase II, Shamsabad) and work across Bharatpur, Jaipur, and Udaipur — so Agra weddings can open or close a wider Rajasthan itinerary without changing planners.",
    ],
    venuesHeading: "Wedding venues and celebration styles in Agra",
    venuesBody: [
      "Agra destination weddings typically use heritage resorts, luxury hotels with large lawns and banquet capacity, and select properties that can host mehendi, sangeet, and reception under one campus. Viewpoint and photo moments near the city’s monuments are planned carefully — with permissions, crowd timing, and guest logistics — not as last-minute Instagram stops.",
      "We shortlist venues by guest count, budget band, ceremony vs reception split, and room blocks for outstation guests. For couples who also want a palace or fort chapter, we often pair an Agra welcome with Jaipur or Udaipur events.",
    ],
    costsHeading: "What influences destination wedding cost in Agra",
    costsBody: [
      "Budget depends on guest count, number of functions, venue category, décor scale, catering style, and peak vs shoulder season. Agra weekends in peak winter months book early and command higher venue and room rates.",
      "A useful planning approach is to lock guest count and function list first, then choose venue and décor language. Highlight Creations shares transparent package options and vendor quotes so families can compare apples-to-apples — including what’s included for hospitality and coordination.",
      "For a personalized range based on your dates and guest list, use our contact form or WhatsApp. Fixed website prices would mislead because Agra venue packages vary widely by property and season.",
    ],
    seasonHeading: "Best season for an Agra destination wedding",
    seasonBody: [
      "October to March is the most popular window for Agra destination weddings — cooler evenings for outdoor décor and guest comfort. April–June heat requires indoor-heavy plans or late-evening outdoor moments. Monsoon months need strong weather backups for lawn events.",
      "If your guest list includes international travelers, winter dates also align better with sightseeing between functions. We build buffers for traffic, monument visit windows, and hotel check-in waves.",
    ],
    permitsHeading: "Permits and coordination notes for Agra",
    permitsBody: [
      "Venue events usually run under the property’s permissions. Special photography near protected monuments, drone use, road processions, or large public-area décor may require additional clearances and timed slots.",
      "We coordinate with venues and local authorities where needed, and we plan guest movement so baraat or convoy routes stay safe and on schedule. Legal marriage registration is a separate process from the celebration plan — we can guide timelines so paperwork doesn’t clash with event days.",
    ],
    timelineHeading: "Suggested planning timeline",
    timelineBody: [
      "12–18 months out: shortlist Agra venues, hold dates, decide whether Jaipur/Udaipur/Bharatpur chapters are part of the trip.",
      "6–9 months: lock décor direction, photographer/filmmaker, catering menus, and rooming lists.",
      "8–12 weeks: finalize run-of-show, hospitality desks, transport, and vendor load-in plans.",
      "Final fortnight: rehearsals, guest communication, and on-ground team briefing.",
    ],
    relatedCities: [
      { label: "Destination wedding planner Jaipur", href: "/jaipur-wedding-planner" },
      { label: "Wedding planner in Bharatpur", href: "/bharatpur-wedding-planner" },
      { label: "Destination wedding packages", href: "/destination-wedding-packages" },
    ],
    faqs: [
      {
        question: "How much does a destination wedding in Agra cost?",
        answer:
          "Costs vary by guest count, venue tier, décor, catering, and season. Many families plan Agra destination weddings across a wide range depending on whether events stay on one resort campus or include premium heritage experiences. Highlight Creations prepares a customized quote after reviewing your dates, guest list, and function count — contact us for a free planning call.",
      },
      {
        question: "What is the best season for a wedding in Agra?",
        answer:
          "October through March is preferred for outdoor comfort and guest travel. Peak winter weekends sell out early. Summer and monsoon plans work with indoor venues and weather contingencies.",
      },
      {
        question: "Can we plan Taj Mahal-related photography for our Agra wedding?",
        answer:
          "Yes, with careful timing, permissions where required, and guest logistics. We treat monument moments as planned experiences — not spontaneous add-ons — so the wedding day run-of-show stays intact.",
      },
      {
        question: "Do you also plan events in Jaipur or Udaipur after Agra?",
        answer:
          "Yes. Highlight Creations serves Agra, Bharatpur, Jaipur, and Udaipur. Many couples host welcome events in Agra and continue to palace or lake-city celebrations with one planner throughout.",
      },
      {
        question: "Where is Highlight Creations based in Agra?",
        answer: `${SITE.addressFull}. Phone ${SITE.phoneDisplay}. Email ${SITE.email}.`,
      },
    ],
  },
  jaipur: {
    slug: "jaipur",
    path: "/jaipur-wedding-planner",
    city: "Jaipur",
    state: "Rajasthan",
    primaryKeyword: "destination wedding planner Jaipur",
    supportingKeywords: [
      "palace wedding Jaipur",
      "fort wedding planner Jaipur",
      "luxury wedding planner Rajasthan",
    ],
    title: "Destination Wedding Planner Jaipur | Highlight Creations",
    description:
      "Palace and fort destination weddings in Jaipur planned end to end by Highlight Creations. Décor, logistics, hospitality — get a free quote.",
    h1: "Destination Wedding Planner Jaipur for Palace & Fort Celebrations",
    intro: [
      "Jaipur is one of India’s most sought-after destination wedding cities — pink-city heritage, palace courtyards, fort views, and a deep vendor ecosystem for multi-day celebrations. As a destination wedding planner for Jaipur, Highlight Creations manages venue sourcing, décor, logistics, vendor management, guest hospitality, and permits under one plan.",
      "We design Jaipur weddings that feel royal without becoming chaotic: clear function mapping (mehendi gardens, sangeet stages, pheras courtyards, reception lawns), guest hotel clusters, and transport that respects old-city constraints.",
      "Our Agra base keeps the Agra–Jaipur corridor seamless for families flying into Delhi or Agra, then celebrating in Rajasthan.",
    ],
    venuesHeading: "Palace, fort, and heritage venues in Jaipur",
    venuesBody: [
      "Jaipur offers palace hotels, fort-adjacent properties, heritage havelis, and luxury resorts with large guest capacity. Venue choice drives décor language, load-in access, noise windows, and whether baraat routes need special planning.",
      "We shortlist by guest count, overnight inventory, ceremony vs reception spaces, and how photogenic courtyards perform at golden hour. If you want a fort chapter plus a modern reception campus, we structure the days so travel time never eats the celebration.",
    ],
    costsHeading: "Destination wedding costs in Jaipur",
    costsBody: [
      "Jaipur palace and fort weddings range widely. Peak wedding season (roughly Oct–Mar) and iconic properties book far ahead. Décor for courtyards and multi-level venues, live entertainment, and guest room blocks often dominate the budget.",
      "We build packages around what you actually need — full planning or venue-plus-coordination — and we keep vendor quotes comparable. For numbers tailored to your guest list, request a quote; published flat rates would ignore venue and season reality.",
    ],
    seasonHeading: "Best season for a Jaipur wedding",
    seasonBody: [
      "October to March is prime for outdoor palace courtyards and evening pheras. December–January nights are cold — we plan heaters, shawl hospitality, and earlier dinner cues. Summer requires shaded or indoor-heavy design; monsoon needs covered contingencies for open courtyards.",
    ],
    permitsHeading: "Permits and city logistics in Jaipur",
    permitsBody: [
      "Heritage and palace properties often have their own event guidelines. Processions, fireworks, drones, and late-night sound may be restricted. We align décor and entertainment with venue rules early so you don’t redesign two weeks before the wedding.",
      "Old-city movement and parking need advance planning for guest coaches. Our on-ground coordination keeps baraat energy high without gridlock.",
    ],
    timelineHeading: "Jaipur planning timeline",
    timelineBody: [
      "Book iconic Jaipur venues 12–18 months ahead for peak dates.",
      "Lock décor and entertainment 6–9 months out — courtyard lighting and stage engineering need lead time.",
      "Confirm rooming and transport 2–3 months out; refine run-of-show in the final 6 weeks.",
    ],
    relatedCities: [
      { label: "Destination wedding planner Udaipur", href: "/udaipur-wedding-planner" },
      { label: "Wedding planner in Agra", href: "/agra-wedding-planner" },
      { label: "Wedding venues in Rajasthan", href: "/venues" },
    ],
    faqs: [
      {
        question: "How much does a destination wedding in Jaipur cost?",
        answer:
          "Budgets depend on palace/fort venue category, guest count, décor scale, and season. Peak winter dates and heritage properties cost more. Highlight Creations provides a customized estimate after a planning call — we don’t publish one-size-fits-all prices.",
      },
      {
        question: "What is the best season for a wedding in Jaipur?",
        answer:
          "October–March is ideal for outdoor courtyards and evening ceremonies. Book early for popular weekends. Summer and monsoon plans emphasize covered spaces and weather backups.",
      },
      {
        question: "Can you plan a palace wedding and a fort experience in one trip?",
        answer:
          "Yes. We map functions across venues carefully so travel, wardrobe, and guest energy stay realistic across a 2–4 day celebration.",
      },
      {
        question: "What permits are needed for a destination wedding in Jaipur?",
        answer:
          "Most events run under venue permissions. Fireworks, drones, road processions, or amplified late-night sound may need extra approvals. We flag restrictions during venue shortlisting.",
      },
    ],
  },
  udaipur: {
    slug: "udaipur",
    path: "/udaipur-wedding-planner",
    city: "Udaipur",
    state: "Rajasthan",
    primaryKeyword: "destination wedding planner Udaipur",
    supportingKeywords: [
      "lake palace wedding Udaipur",
      "luxury wedding Udaipur",
      "palace wedding Udaipur",
    ],
    title: "Destination Wedding Planner in Udaipur | Highlight Creations",
    description:
      "Plan your dream palace wedding in Udaipur with Highlight Creations. Lakeside venues, décor, logistics — handled end to end. Get a free quote today.",
    h1: "Destination Wedding Planner Udaipur for Lakeside Palace Weddings",
    intro: [
      "Udaipur is the classic lakeside destination wedding city — palace silhouettes, boat transfers, and romantic evening receptions. Highlight Creations plans destination weddings in Udaipur end to end: venue sourcing, décor, logistics, vendor management, guest hospitality, and permits.",
      "Lake-city celebrations demand precise movement plans. Boat timings, hill-top venues, and multi-hotel guest lists can unravel without a single coordinator. We build one run-of-show that protects pheras light, guest comfort, and vendor load-in windows.",
      "Couples often combine Udaipur with Jaipur or Agra. We keep the full Rajasthan–Agra corridor under one planning team.",
    ],
    venuesHeading: "Lakeside palace and luxury venues in Udaipur",
    venuesBody: [
      "Udaipur venues include palace hotels, lakeside resorts, heritage properties, and cliff-top destinations with dramatic reception views. Capacity, boat logistics, and monsoon contingency matter as much as the Instagram frame.",
      "We match venues to guest count and overnight needs. For intimate pheras plus a larger reception, we design dual-space plans that still feel like one wedding story.",
    ],
    costsHeading: "What a Udaipur destination wedding typically budgets for",
    costsBody: [
      "Premium lakeside and palace inventory, peak-season room blocks, décor for outdoor decks, entertainment, and guest transport (including boats where relevant) drive cost. Udaipur’s most famous properties require early deposits and clear minimums.",
      "We prepare transparent package options and vendor comparisons. Contact us for a quote based on your dates and guest list rather than relying on generic online averages.",
    ],
    seasonHeading: "Best season for a wedding in Udaipur",
    seasonBody: [
      "October to March is the most popular season for outdoor lakeside events. Monsoon can be stunning but needs covered plans and flexible décor. Summers favor evening outdoor segments with strong indoor backups and hydration hospitality.",
    ],
    permitsHeading: "Permits and lakeside logistics",
    permitsBody: [
      "Venue guidelines usually govern fireworks, drones, and sound. Boat movements and jetty access need timed coordination with the property. We align vendor load-in with lake-property constraints so décor never arrives after guest seating.",
    ],
    timelineHeading: "Udaipur planning timeline",
    timelineBody: [
      "Reserve preferred Udaipur venues 12–18 months ahead for peak dates.",
      "Confirm boat/transfer plans and guest hotel clusters 3–4 months out.",
      "Finalize décor engineering for decks and courtyards 8–10 weeks out.",
    ],
    relatedCities: [
      { label: "Destination wedding planner Jaipur", href: "/jaipur-wedding-planner" },
      { label: "Wedding planner in Bharatpur", href: "/bharatpur-wedding-planner" },
      { label: "Real destination weddings", href: "/real-weddings" },
    ],
    faqs: [
      {
        question: "How much does a destination wedding in Udaipur cost?",
        answer:
          "Udaipur destination wedding costs vary by palace/lakeside venue, guest count, décor, and season. Peak winter weekends at iconic properties are premium. Highlight Creations shares a tailored quote after understanding your function list and hospitality needs.",
      },
      {
        question: "What is the best season for a wedding in Udaipur?",
        answer:
          "October–March is preferred for outdoor lakeside celebrations. Monsoon and summer are workable with covered venues and weather-smart design.",
      },
      {
        question: "Can you plan a lake palace-style wedding experience?",
        answer:
          "We plan palace and lakeside celebrations including transfers and guest hospitality. Availability and rules depend on the specific property and date — we shortlist realistically before you fall in love with a venue that can’t hold your guest count.",
      },
      {
        question: "What permits are needed for a destination wedding in Udaipur?",
        answer:
          "Most requirements sit with the venue. Fireworks, drones, amplified sound, and boat operations may have additional constraints. We surface these during venue selection.",
      },
    ],
  },
  bharatpur: {
    slug: "bharatpur",
    path: "/bharatpur-wedding-planner",
    city: "Bharatpur",
    state: "Rajasthan",
    primaryKeyword: "wedding planner in Bharatpur",
    supportingKeywords: [
      "heritage wedding Bharatpur",
      "palace wedding Bharatpur",
      "destination wedding Rajasthan",
    ],
    title: "Wedding Planner in Bharatpur | Highlight Creations",
    description:
      "Heritage and palace-style destination weddings in Bharatpur planned by Highlight Creations. Quiet grandeur, full logistics support. Get a quote.",
    h1: "Wedding Planner in Bharatpur for Heritage Destination Weddings",
    intro: [
      "Bharatpur offers a quieter Rajasthan destination wedding alternative — heritage character, palace-style hospitality, and proximity to Agra and Jaipur. Highlight Creations plans weddings in Bharatpur for couples who want destination energy without the peak-city intensity of the most crowded wedding weekends elsewhere.",
      "As your wedding planner in Bharatpur, we handle venue sourcing, décor, vendor management, guest stays, and coordination across the Agra–Bharatpur–Jaipur corridor.",
      "Many families host an intimate Bharatpur celebration paired with Agra welcome events or a Jaipur sangeet — one planner, one timeline.",
    ],
    venuesHeading: "Heritage and palace venues around Bharatpur",
    venuesBody: [
      "Bharatpur and nearby heritage properties suit mid-to-large guest lists seeking lawns, courtyards, and residential-style hospitality. We evaluate kitchen capacity, rooming, and décor access — especially important when outstation vendors travel from Jaipur or Delhi NCR.",
    ],
    costsHeading: "Destination wedding budgeting in Bharatpur",
    costsBody: [
      "Compared with ultra-iconic Udaipur or Jaipur palace inventory, Bharatpur can offer strong value for heritage aesthetics — but costs still scale with guest count, décor, and peak dates. We prepare clear package options and vendor quotes for your shortlist.",
    ],
    seasonHeading: "Best season for a Bharatpur wedding",
    seasonBody: [
      "October–March remains the most comfortable outdoor season. Shoulder months work with thoughtful evening scheduling. We plan weather backups for lawn pheras and mehendi.",
    ],
    permitsHeading: "Permits and regional logistics",
    permitsBody: [
      "Venue permissions cover most celebration needs. For multi-city trips (Agra + Bharatpur + Jaipur), we coordinate coach timing, check-in waves, and vendor travel so the quieter Bharatpur days still feel premium.",
    ],
    timelineHeading: "Bharatpur planning timeline",
    timelineBody: [
      "Shortlist venues 9–15 months ahead if combining with Agra or Jaipur dates.",
      "Confirm décor and hospitality 4–6 months out.",
      "Lock transport between cities 6–8 weeks before events.",
    ],
    relatedCities: [
      { label: "Wedding planner in Agra", href: "/agra-wedding-planner" },
      { label: "Destination wedding planner Jaipur", href: "/jaipur-wedding-planner" },
      { label: "Destination wedding packages", href: "/destination-wedding-packages" },
    ],
    faqs: [
      {
        question: "How much does a destination wedding in Bharatpur cost?",
        answer:
          "Budgets depend on venue, guest count, décor, and whether you add Agra or Jaipur functions. Bharatpur can be cost-efficient for heritage style relative to the most famous palace cities. Contact Highlight Creations for a quote matched to your guest list.",
      },
      {
        question: "What is the best season for a wedding in Bharatpur?",
        answer:
          "October to March is preferred for outdoor heritage venues. We design summer/monsoon plans with covered spaces when needed.",
      },
      {
        question: "Is Bharatpur a good alternative to Jaipur or Udaipur?",
        answer:
          "Yes for couples who want Rajasthan heritage with a calmer destination feel, especially when combined with Agra logistics. We help you compare cities honestly against guest travel and venue availability.",
      },
      {
        question: "What permits are needed for a destination wedding in Bharatpur?",
        answer:
          "Most celebrations operate under venue guidelines. Multi-city transport and any public-area events are planned case by case.",
      },
    ],
  },
};

export const CITY_LIST = Object.values(CITY_PAGES);
