import type { NavItem } from "@/lib/types";

/** Canonical header navigation — always used so new pages show even if Supabase seed is stale. */
export const SITE_NAV: NavItem[] = [
  { label: "Wedding Venues", href: "/venues" },
  { label: "Packages", href: "/destination-wedding-packages" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Destination Weddings", href: "/destination-weddings" },
      { label: "Artist Management", href: "/artist-management" },
      { label: "Awards", href: "/awards" },
      { label: "Agra weddings", href: "/agra-wedding-planner" },
      { label: "Goa weddings", href: "/goa-wedding-planner" },
      { label: "Jaipur weddings", href: "/jaipur-wedding-planner" },
      { label: "Udaipur weddings", href: "/udaipur-wedding-planner" },
      { label: "Bharatpur weddings", href: "/bharatpur-wedding-planner" },
      { label: "Real Weddings", href: "/real-weddings" },
      { label: "Our Work", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_CITIES = [
  { href: "/agra-wedding-planner", label: "Agra wedding planner" },
  { href: "/goa-wedding-planner", label: "Goa wedding planner" },
  { href: "/jaipur-wedding-planner", label: "Jaipur wedding planner" },
  { href: "/udaipur-wedding-planner", label: "Udaipur wedding planner" },
  { href: "/bharatpur-wedding-planner", label: "Bharatpur wedding planner" },
  { href: "/destination-wedding-packages", label: "Wedding packages" },
] as const;

export const FOOTER_EXPLORE = [
  { href: "/venues", label: "Wedding venues" },
  { href: "/destination-weddings", label: "Destination weddings" },
  { href: "/artist-management", label: "Artist management" },
  { href: "/awards", label: "Awards" },
  { href: "/real-weddings", label: "Real weddings" },
  { href: "/portfolio", label: "Our work" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/price-beat-challenge", label: "Price Beat Challenge" },
] as const;
