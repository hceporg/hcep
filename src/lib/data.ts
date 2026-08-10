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

export async function getBanners(): Promise<Banner[]> {
  const supabase = createPublicClient();
  if (!supabase) return mockBanners.filter((b) => b.is_active);

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data?.length) return mockBanners.filter((b) => b.is_active);
  return data as Banner[];
}

export async function getReels(): Promise<Reel[]> {
  const supabase = createPublicClient();
  if (!supabase) return mockReels.filter((r) => r.is_active);

  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data?.length) return mockReels.filter((r) => r.is_active);
  return data as Reel[];
}

export async function getReviews(): Promise<Review[]> {
  const supabase = createPublicClient();
  if (!supabase) return mockReviews.filter((r) => r.is_active);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order");

  if (error || !data?.length) return mockReviews.filter((r) => r.is_active);
  return data as Review[];
}

export async function getStats(): Promise<SiteStats> {
  const supabase = createPublicClient();
  if (!supabase) return mockStats;

  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .limit(1)
    .single();
  if (error || !data) return mockStats;
  return data as SiteStats;
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  if (!supabase) return mockSettings;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();
  if (error || !data) return mockSettings;
  return data as SiteSettings;
}

export async function getVenues(filters?: {
  city?: string;
  budgetMax?: number;
  capacityMin?: number;
}): Promise<Venue[]> {
  const supabase = createPublicClient();
  let venues = mockVenues.filter((v) => v.is_active);

  if (supabase) {
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("is_active", true)
      .order("name");
    if (!error && data?.length) venues = data as Venue[];
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
  const supabase = createPublicClient();
  if (!supabase) return mockBlogPosts.filter((p) => p.status === "published");

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data?.length) {
    return mockBlogPosts.filter((p) => p.status === "published");
  }
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const supabase = createPublicClient();
  if (!supabase) return mockPortfolio;

  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return mockPortfolio;
  return data as PortfolioItem[];
}

export async function getPortfolioBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const items = await getPortfolio();
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = createPublicClient();
  if (!supabase) return mockFaqs;

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order");

  if (error || !data?.length) return mockFaqs;
  return data as FaqItem[];
}
