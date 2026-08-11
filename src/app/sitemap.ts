import type { MetadataRoute } from "next";
import { CITY_LIST } from "@/lib/seo/cities";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import { getBlogPosts, getPortfolio, getVenues } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/agra-wedding-planner",
    "/goa-wedding-planner",
    "/jaipur-wedding-planner",
    "/udaipur-wedding-planner",
    "/bharatpur-wedding-planner",
    "/destination-wedding-packages",
    "/destination-weddings",
    "/artist-management",
    "/awards",
    "/venues",
    "/real-weddings",
    "/portfolio",
    "/blog",
    "/services",
    "/about",
    "/contact",
    "/faq",
    "/price-beat-challenge",
    "/privacy",
    "/terms",
    "/llms.txt",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: now,
    changeFrequency: path === "" || path.includes("wedding-planner") ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.includes("wedding-planner") || path === "/destination-wedding-packages"
          ? 0.9
          : 0.7,
  }));

  const [posts, venues, portfolio] = await Promise.all([
    getBlogPosts(),
    getVenues(),
    getPortfolio(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.published_at ? new Date(p.published_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const venueEntries: MetadataRoute.Sitemap = venues.map((v) => ({
    url: absoluteUrl(`/venues/${v.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: absoluteUrl(`/portfolio/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Ensure city paths from content map are present (already in staticRoutes)
  void CITY_LIST;
  void SITE;

  return [...staticRoutes, ...blogEntries, ...venueEntries, ...portfolioEntries];
}
