"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Card = { label: string; count: number | string; href: string };

export default function AdminOverviewPage() {
  const [cards, setCards] = useState<Card[]>([
    { label: "Banners", count: "…", href: "/admin/banners" },
    { label: "Reels", count: "…", href: "/admin/reels" },
    { label: "Reviews", count: "…", href: "/admin/reviews" },
    { label: "Venues", count: "…", href: "/admin/venues" },
    { label: "Blog posts", count: "…", href: "/admin/blog" },
    { label: "Enquiries", count: "…", href: "/admin/enquiries" },
  ]);

  useEffect(() => {
    async function load() {
      const sb = createClient();
      if (!sb) return;
      const tables = ["banners", "reels", "reviews", "venues", "blog_posts", "enquiries"];
      const counts = await Promise.all(
        tables.map((t) => sb.from(t).select("id", { count: "exact", head: true }))
      );
      setCards((prev) =>
        prev.map((c, i) => ({ ...c, count: counts[i].count ?? 0 }))
      );
    }
    load();
  }, []);

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
