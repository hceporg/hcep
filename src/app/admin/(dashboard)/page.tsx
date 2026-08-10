import Link from "next/link";
import {
  mockBanners,
  mockBlogPosts,
  mockReels,
  mockReviews,
  mockVenues,
} from "@/lib/mock-data";

export default function AdminOverviewPage() {
  const cards = [
    { label: "Banners", count: mockBanners.length, href: "/admin/banners" },
    { label: "Reels", count: mockReels.length, href: "/admin/reels" },
    { label: "Reviews", count: mockReviews.length, href: "/admin/reviews" },
    { label: "Venues", count: mockVenues.length, href: "/admin/venues" },
    {
      label: "Blog posts",
      count: mockBlogPosts.length,
      href: "/admin/blog",
    },
    { label: "Enquiries", count: "—", href: "/admin/enquiries" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-maroon">Dashboard</h1>
      <p className="text-muted text-sm mt-1">
        Manage homepage content, venues, and lead enquiries.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-border bg-white p-5 hover:border-maroon/40 transition-colors"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="font-serif text-3xl text-maroon mt-1">{c.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
