export type Banner = {
  id: string;
  media_url: string;
  media_type: "image" | "video";
  couple_name: string;
  location: string;
  date_label: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Reel = {
  id: string;
  instagram_url: string;
  couple_name: string;
  location: string;
  view_count: number;
  thumbnail_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Review = {
  id: string;
  reviewer_name: string;
  handle: string;
  timeframe: string;
  rating: number;
  review_text: string;
  avatar_color: string;
  source: "google" | "other";
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
};

export type SiteStats = {
  id: string;
  weddings_done: string;
  google_rating: string;
  venue_partners: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type SiteSettings = {
  id: string;
  site_name: string;
  cta_text: string;
  venue_cta_text: string;
  nav_items: NavItem[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  excerpt: string;
  body: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

export type VenueCity = {
  id: string;
  name: string;
  slug: string;
  heading: string;
  subheading: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Venue = {
  id: string;
  name: string;
  slug: string;
  city: string;
  city_id: string | null;
  state: string;
  cover_image: string;
  gallery: string[];
  capacity_min: number;
  capacity_max: number;
  price_min: number;
  price_max: number;
  amenities: string[];
  description: string;
  is_featured: boolean;
  is_active: boolean;
};

export type CtaBanner = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  media_url: string;
  media_type: "image" | "video";
  button_text: string;
  is_active: boolean;
  updated_at?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  couple_name: string;
  location: string;
  date_label: string;
  cover_image: string;
  gallery: string[];
  description: string;
  is_featured: boolean;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  wedding_date: string | null;
  city: string | null;
  budget: string | null;
  message: string | null;
  source: string;
  venue_id: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};
