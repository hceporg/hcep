"use client";

import { useState } from "react";
import { mockStats } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

export default function AdminStatsPage() {
  const [stats, setStats] = useState(mockStats);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="font-serif text-3xl text-maroon">Stats Manager</h1>
      <p className="text-sm text-muted mt-1">
        Numbers shown on the hero: weddings done, rating, venue partners.
      </p>

      <form
        className="mt-8 max-w-md space-y-4 rounded-xl border border-border bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          setStats({
            ...stats,
            weddings_done: String(form.get("weddings_done")),
            google_rating: String(form.get("google_rating")),
            venue_partners: String(form.get("venue_partners")),
          });
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
      >
        <label className="block text-sm">
          Weddings done
          <input
            name="weddings_done"
            defaultValue={stats.weddings_done}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Google rating
          <input
            name="google_rating"
            defaultValue={stats.google_rating}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Venue partners
          <input
            name="venue_partners"
            defaultValue={stats.venue_partners}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          />
        </label>
        <Button type="submit">Save stats</Button>
        {saved && <p className="text-sm text-green-700">Saved (demo / in-memory).</p>}
      </form>
    </div>
  );
}
