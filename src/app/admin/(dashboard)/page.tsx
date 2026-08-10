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

      <div className="mt-10 rounded-xl border border-border bg-white p-6">
        <h2 className="font-semibold text-ink">Quick setup</h2>
        <ol className="mt-3 space-y-2 text-sm text-muted list-decimal pl-5">
          <li>
            Copy <code className="text-maroon">.env.example</code> to{" "}
            <code className="text-maroon">.env.local</code> and add Supabase
            URL + anon key (+ <code className="text-maroon">CRON_SECRET</code>{" "}
            on Vercel).
          </li>
          <li>
            Run <code className="text-maroon">supabase/schema.sql</code> in the
            Supabase SQL editor (creates DB tables + <code>media</code> Storage
            bucket).
          </li>
          <li>Create an admin user in Supabase Auth (Dashboard → Authentication → Users) and sign in here. The password is stored only in Supabase (hashed), never in this repo.</li>
          <li>
            Upload banner videos/images and blog covers in Admin — all files go
            to Supabase Storage (1 GB free quota).
          </li>
        </ol>
      </div>
    </div>
  );
}
