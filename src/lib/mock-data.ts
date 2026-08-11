import type {
  Banner,
  BlogPost,
  FaqItem,
  PortfolioItem,
  Reel,
  Review,
  SiteSettings,
  SiteStats,
  Venue,
} from "./types";

export const mockStats: SiteStats = {
  id: "1",
  weddings_done: "1112+",
  google_rating: "4.7/5",
  venue_partners: "105+",
};

export const mockSettings: SiteSettings = {
  id: "1",
  site_name: "Highlight Creations",
  cta_text: "Start my wedding planning",
  venue_cta_text: "Check availability",
  phone: "+91-7037401415",
  whatsapp: "+917037401415",
  email: "contact.hcep@gmail.com",
  address:
    "Panchwati Plaza, Kaveri Vihar Phase II, Shamsabad, Agra, Basai, Uttar Pradesh 282004",
  nav_items: [], // filled from SITE_NAV in getSettings()
};

export const mockBanners: Banner[] = [
  {
    id: "b1",
    media_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    media_type: "image",
    couple_name: "Anjali & Apurav",
    location: "Goa",
    date_label: "May '25",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "b2",
    media_url:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80",
    media_type: "image",
    couple_name: "Simrat & Prabhjot",
    location: "Delhi",
    date_label: "Dec '24",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "b3",
    media_url:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80",
    media_type: "image",
    couple_name: "Aastha & Rajat",
    location: "Dubai",
    date_label: "Feb '25",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "b4",
    media_url:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80",
    media_type: "image",
    couple_name: "Ritwika & Sumit",
    location: "Goa",
    date_label: "Jan '25",
    sort_order: 3,
    is_active: true,
  },
];

export const mockReels: Reel[] = [
  {
    id: "r1",
    instagram_url: "https://www.instagram.com/reel/example1/",
    couple_name: "Aastha & Rajat",
    location: "Dubai",
    view_count: 143,
    thumbnail_url:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "r2",
    instagram_url: "https://www.instagram.com/reel/example2/",
    couple_name: "Ritwika & Sumit",
    location: "Delhi NCR",
    view_count: 218,
    thumbnail_url:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "r3",
    instagram_url: "https://www.instagram.com/reel/example3/",
    couple_name: "Simrat & Prabhjot",
    location: "Goa",
    view_count: 97,
    thumbnail_url:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "r4",
    instagram_url: "https://www.instagram.com/reel/example4/",
    couple_name: "Meera & Kabir",
    location: "Jaipur",
    view_count: 312,
    thumbnail_url:
      "https://images.unsplash.com/photo-1583939411023-14754622e5aa?w=600&q=80",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "r5",
    instagram_url: "https://www.instagram.com/reel/example5/",
    couple_name: "Nisha & Arjun",
    location: "Udaipur",
    view_count: 156,
    thumbnail_url:
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "r6",
    instagram_url: "https://www.instagram.com/reel/example6/",
    couple_name: "Priya & Rohan",
    location: "Mumbai",
    view_count: 189,
    thumbnail_url:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    sort_order: 5,
    is_active: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: "rv1",
    reviewer_name: "Manjesh Pal",
    handle: "@MANJESHPAL",
    timeframe: "2 weeks ago",
    rating: 5,
    review_text:
      "Highlight Creations made our big day absolutely magical. From venue selection to décor, every detail was handled with care and professionalism.",
    avatar_color: "#7c3aed",
    source: "google",
    sort_order: 0,
    is_featured: true,
    is_active: true,
  },
  {
    id: "rv2",
    reviewer_name: "Amit Sharma",
    handle: "@amitsharma",
    timeframe: "1 month ago",
    rating: 5,
    review_text:
      "Exceptional service! They beat every quote we got and still delivered a wedding beyond our expectations. Highly recommend.",
    avatar_color: "#0ea5e9",
    source: "google",
    sort_order: 1,
    is_featured: true,
    is_active: true,
  },
  {
    id: "rv3",
    reviewer_name: "Priya Mehta",
    handle: "@priyamehta",
    timeframe: "3 weeks ago",
    rating: 5,
    review_text:
      "Planning a destination wedding seemed impossible until we found Highlight Creations. Seamless experience from start to finish.",
    avatar_color: "#92400e",
    source: "google",
    sort_order: 2,
    is_featured: true,
    is_active: true,
  },
  {
    id: "rv4",
    reviewer_name: "Rahul Verma",
    handle: "@rahulverma",
    timeframe: "2 months ago",
    rating: 5,
    review_text:
      "Their venue partners list is incredible. We found our dream palace venue within budget. Thank you team!",
    avatar_color: "#0d9488",
    source: "google",
    sort_order: 3,
    is_featured: true,
    is_active: true,
  },
  {
    id: "rv5",
    reviewer_name: "Sneha Kapoor",
    handle: "@snehak",
    timeframe: "1 month ago",
    rating: 5,
    review_text:
      "Professional, creative, and so easy to work with. Our guests are still talking about how beautiful everything looked.",
    avatar_color: "#ea580c",
    source: "google",
    sort_order: 4,
    is_featured: true,
    is_active: true,
  },
];

export const mockVenues: Venue[] = [
  {
    id: "v1",
    name: "The Grand Palace Resort",
    slug: "grand-palace-resort",
    city: "Udaipur",
    state: "Rajasthan",
    cover_image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    ],
    capacity_min: 200,
    capacity_max: 800,
    price_min: 2500000,
    price_max: 8000000,
    amenities: ["Lake View", "Bridal Suite", "Banquet Hall", "Lawn", "Parking"],
    description:
      "A majestic lakeside palace resort perfect for grand destination weddings with royal ambiance.",
    is_featured: true,
    is_active: true,
  },
  {
    id: "v2",
    name: "Seaside Villa Goa",
    slug: "seaside-villa-goa",
    city: "Goa",
    state: "Goa",
    cover_image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    ],
    capacity_min: 50,
    capacity_max: 300,
    price_min: 800000,
    price_max: 3500000,
    amenities: ["Beach Access", "Pool", "Open Air", "Catering Kitchen"],
    description:
      "Intimate beachfront villa with sunset views — ideal for destination celebrations.",
    is_featured: true,
    is_active: true,
  },
  {
    id: "v3",
    name: "Heritage Courtyard Delhi",
    slug: "heritage-courtyard-delhi",
    city: "Delhi NCR",
    state: "Delhi",
    cover_image:
      "https://images.unsplash.com/photo-1519167758481-83f150b4219d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f150b4219d?w=1200&q=80",
    ],
    capacity_min: 150,
    capacity_max: 500,
    price_min: 1500000,
    price_max: 5000000,
    amenities: ["Courtyard", "AC Halls", "Valet", "In-house Decor"],
    description:
      "A heritage property in the heart of Delhi NCR blending tradition with modern comfort.",
    is_featured: true,
    is_active: true,
  },
  {
    id: "v4",
    name: "Skyline Ballroom Mumbai",
    slug: "skyline-ballroom-mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    cover_image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    capacity_min: 100,
    capacity_max: 400,
    price_min: 2000000,
    price_max: 6000000,
    amenities: ["City Views", "LED Walls", "Bridal Room", "Parking"],
    description:
      "Contemporary ballroom with panoramic Mumbai skyline views for stylish celebrations.",
    is_featured: false,
    is_active: true,
  },
  {
    id: "v5",
    name: "Garden Estate Bangalore",
    slug: "garden-estate-bangalore",
    city: "Bangalore",
    state: "Karnataka",
    cover_image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
    ],
    capacity_min: 80,
    capacity_max: 350,
    price_min: 1000000,
    price_max: 4000000,
    amenities: ["Lush Gardens", "Pavilion", "Guest Rooms", "Outdoor Lighting"],
    description:
      "Lush garden estate for elegant outdoor weddings surrounded by greenery.",
    is_featured: false,
    is_active: true,
  },
  {
    id: "v6",
    name: "Desert Fort Jaisalmer",
    slug: "desert-fort-jaisalmer",
    city: "Jaisalmer",
    state: "Rajasthan",
    cover_image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    ],
    capacity_min: 100,
    capacity_max: 600,
    price_min: 1800000,
    price_max: 7000000,
    amenities: ["Fort Setting", "Desert Views", "Cultural Shows", "Camping"],
    description:
      "Unforgettable desert fort experience for couples seeking a unique backdrop.",
    is_featured: true,
    is_active: true,
  },
];

export const mockPortfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: "A Royal Affair in Udaipur",
    slug: "royal-affair-udaipur",
    couple_name: "Anjali & Apurav",
    location: "Udaipur",
    date_label: "May 2025",
    cover_image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    gallery: [],
    description: "A three-day destination wedding by the lake with floral mandaps and fireworks.",
    is_featured: true,
  },
  {
    id: "p2",
    title: "Beach Bliss in Goa",
    slug: "beach-bliss-goa",
    couple_name: "Simrat & Prabhjot",
    location: "Goa",
    date_label: "Dec 2024",
    cover_image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    gallery: [],
    description: "Sunset beach vows followed by a candlelit reception under the palms.",
    is_featured: true,
  },
  {
    id: "p3",
    title: "Modern Romance in Dubai",
    slug: "modern-romance-dubai",
    couple_name: "Aastha & Rajat",
    location: "Dubai",
    date_label: "Feb 2025",
    cover_image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    gallery: [],
    description: "A sleek indoor celebration with gold accents and a starlit dance floor.",
    is_featured: true,
  },
  {
    id: "p4",
    title: "Heritage Nights in Jaipur",
    slug: "heritage-nights-jaipur",
    couple_name: "Meera & Kabir",
    location: "Jaipur",
    date_label: "Nov 2024",
    cover_image:
      "https://images.unsplash.com/photo-1583939411023-14754622e5aa?w=800&q=80",
    gallery: [],
    description: "Palace courtyards, mehendi gardens, and a baraat through pink city streets.",
    is_featured: true,
  },
  {
    id: "p5",
    title: "Garden Dreams Bangalore",
    slug: "garden-dreams-bangalore",
    couple_name: "Nisha & Arjun",
    location: "Bangalore",
    date_label: "Oct 2024",
    cover_image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
    gallery: [],
    description: "An intimate garden wedding with botanical décor and live acoustic music.",
    is_featured: false,
  },
  {
    id: "p6",
    title: "City Lights Mumbai",
    slug: "city-lights-mumbai",
    couple_name: "Priya & Rohan",
    location: "Mumbai",
    date_label: "Sep 2024",
    cover_image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    gallery: [],
    description: "A glamorous ballroom wedding overlooking the Arabian Sea.",
    is_featured: false,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "bp1",
    title: "How Much Does a Destination Wedding in Rajasthan Cost in 2026?",
    slug: "destination-wedding-rajasthan-cost-2026",
    cover_image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    excerpt:
      "A practical breakdown of venue, décor, hospitality, and season — and how to budget without guesswork.",
    body: `## Start with guest count and function list\n\nCost follows guest count, number of events, and venue category more than city hype alone.\n\n## Venue and season\n\nPeak winter weekends in Jaipur and Udaipur book early and price higher. Agra and Bharatpur can offer strong heritage value depending on the property.\n\n## What to include in your budget\n\nPlanning fees, décor, catering, rooms, transport, entertainment, and contingency. Ask for itemized quotes.\n\n## Get a real number\n\nContact Highlight Creations with your dates and guest list for a tailored estimate across Agra, Jaipur, Udaipur, or Bharatpur.`,
    status: "published",
    published_at: "2026-01-15T10:00:00Z",
    created_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "bp2",
    title: "Best Time of Year for a Wedding in Udaipur, Jaipur, and Agra",
    slug: "best-time-wedding-udaipur-jaipur-agra",
    cover_image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    excerpt:
      "Season-by-season guidance for outdoor courtyards, lakeside evenings, and guest comfort.",
    body: `## October to March\n\nThe most popular window for outdoor palace and lakeside celebrations.\n\n## Summer and monsoon\n\nWorkable with indoor-heavy design and weather backups.\n\n## Multi-city tip\n\nIf you combine Agra with Jaipur or Udaipur, align travel days with cooler evenings and guest energy.`,
    status: "published",
    published_at: "2025-11-01T10:00:00Z",
    created_at: "2025-10-20T10:00:00Z",
  },
  {
    id: "bp3",
    title: "Agra vs Jaipur vs Udaipur: Choosing Your Destination Wedding City",
    slug: "agra-vs-jaipur-vs-udaipur-destination-wedding",
    cover_image:
      "https://images.unsplash.com/photo-1519167758481-83f150b4219d?w=800&q=80",
    excerpt:
      "Compare access, venue styles, and guest experience — then pick the city that fits your celebration.",
    body: `## Agra\n\nStrong access and heritage energy; ideal gateway to the Rajasthan corridor.\n\n## Jaipur\n\nPalace and fort variety with a deep vendor ecosystem for multi-day weddings.\n\n## Udaipur\n\nLakeside romance and palace silhouettes — plan transfers carefully.\n\n## Bharatpur\n\nA calmer heritage option that pairs well with Agra or Jaipur.`,
    status: "published",
    published_at: "2025-09-10T10:00:00Z",
    created_at: "2025-09-01T10:00:00Z",
  },
  {
    id: "bp4",
    title: "How Our Price Beat Challenge Works",
    slug: "how-price-beat-challenge-works",
    cover_image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
    excerpt:
      "Found a lower quote elsewhere? Here's how we match — and beat — competitive venue pricing.",
    body: `## Bring us a valid quote\n\nShare a comparable written quote from another vendor for the same venue and package.\n\n## We verify & beat it\n\nOur partnerships let us negotiate better rates — and we pass the savings to you.`,
    status: "published",
    published_at: "2025-05-15T10:00:00Z",
    created_at: "2025-05-10T10:00:00Z",
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: "f1",
    question: "How far in advance should we start planning?",
    answer:
      "Ideally 12–18 months for destination weddings, and 8–12 months for city celebrations. Popular dates and venues book early.",
    sort_order: 0,
  },
  {
    id: "f2",
    question: "What does your Price Beat Challenge cover?",
    answer:
      "If you find a lower comparable quote for the same venue and package, we verify it and beat that price. Terms apply — see our Price Beat Challenge page.",
    sort_order: 1,
  },
  {
    id: "f3",
    question: "Do you plan destination weddings abroad?",
    answer:
      "Yes. We plan weddings across India and select international destinations including Dubai, Thailand, and Europe.",
    sort_order: 2,
  },
  {
    id: "f4",
    question: "What's included in your planning packages?",
    answer:
      "Packages typically cover venue sourcing, décor direction, vendor management, timeline planning, and on-ground coordination. Custom scopes available.",
    sort_order: 3,
  },
  {
    id: "f5",
    question: "How do I get started?",
    answer:
      "Click 'Start my wedding planning' anywhere on the site, share your date, city, and budget — our team will reach out within 24 hours.",
    sort_order: 4,
  },
];
