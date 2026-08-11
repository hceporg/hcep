import { createPublicClient } from "@/lib/supabase/public";
import {
  mockBanners,
  mockBlogPosts,
  mockFaqs,
  mockPortfolio,
  mockReels,
  mockReviews,
  mockSettings,
  mockStats,
  mockVenues,
} from "@/lib/mock-data";
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
} from "@/lib/types";

/** Mock data only when Supabase env vars are missing (local dev). */
function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getBanners(): Promise<Banner[]> {
  if (!supabaseConfigured()) return mockBanners.filter((b) => b.is_active);

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("getBanners:", error.message);
    return mockBanners.filter((b) => b.is_active);
  }
  // Keep demo banners when the table is still empty
  if (!data?.length) return mockBanners.filter((b) => b.is_active);
  return data as Banner[];
}

export async function getReels(): Promise<Reel[]> {
  if (!supabaseConfigured()) return mockReels.filter((r) => r.is_active);

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("getReels:", error.message);
    return mockReels.filter((r) => r.is_active);
  }
  // Keep demo reels when the table is still empty
  if (!data?.length) return mockReels.filter((r) => r.is_active);
  return data as Reel[];
}

export async function getReviews(): Promise<Review[]> {
  if (!supabaseConfigured()) return mockReviews.filter((r) => r.is_active);

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order");

  if (error) {
    console.error("getReviews:", error.message);
    return mockReviews.filter((r) => r.is_active);
  }
  // Keep demo reviews when the table is still empty
  if (!data?.length) return mockReviews.filter((r) => r.is_active);
  return data as Review[];
}

export async function getStats(): Promise<SiteStats> {
  if (!supabaseConfigured()) return mockStats;

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .limit(1)
    .single();
  if (error || !data) {
    if (error) console.error("getStats:", error.message);
    return mockStats;
  }
  return data as SiteStats;
}

export async function getSettings(): Promise<SiteSettings> {
  if (!supabaseConfigured()) return mockSettings;

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();
  if (error || !data) {
    if (error) console.error("getSettings:", error.message);
    return mockSettings;
  }
  return data as SiteSettings;
}

export async function getVenues(filters?: {
  city?: string;
  budgetMax?: number;
  capacityMin?: number;
}): Promise<Venue[]> {
  let venues: Venue[] = [];

  if (!supabaseConfigured()) {
    venues = mockVenues.filter((v) => v.is_active);
  } else {
    const supabase = createPublicClient()!;
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("is_active", true)
      .order("name");
    if (error) {
      console.error("getVenues:", error.message);
      venues = [];
    } else {
      venues = (data ?? []) as Venue[];
    }
  }

  if (filters?.city) {
    venues = venues.filter((v) =>
      v.city.toLowerCase().includes(filters.city!.toLowerCase())
    );
  }
  if (filters?.budgetMax) {
    venues = venues.filter((v) => v.price_min <= filters.budgetMax!);
  }
  if (filters?.capacityMin) {
    venues = venues.filter((v) => v.capacity_max >= filters.capacityMin!);
  }

  return venues;
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const venues = await getVenues();
  return venues.find((v) => v.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabaseConfigured()) {
    return mockBlogPosts.filter((p) => p.status === "published");
  }

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getBlogPosts:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  if (!supabaseConfigured()) return mockPortfolio;

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPortfolio:", error.message);
    return [];
  }
  return (data ?? []) as PortfolioItem[];
}

export async function getPortfolioBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const items = await getPortfolio();
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (!supabaseConfigured()) return mockFaqs;

  const supabase = createPublicClient()!;
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("getFaqs:", error.message);
    return [];
  }
  return (data ?? []) as FaqItem[];
}
