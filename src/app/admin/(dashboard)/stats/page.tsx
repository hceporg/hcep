"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteStats } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function AdminStatsPage() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    const sb = createClient();
    if (!sb) return;
    const { data } = await sb.from("site_stats").select("*").limit(1).single();
    if (data) setStats(data as SiteStats);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save(form: FormData) {
    if (!stats) return;
    setSaving(true);
    const sb = createClient();
    if (!sb) return;
    const payload = {
      weddings_done: String(form.get("weddings_done")),
      google_rating: String(form.get("google_rating")),
      venue_partners: String(form.get("venue_partners")),
    };
    const { error } = await sb.from("site_stats").update(payload).eq("id", stats.id);
    setSaving(false);
    if (error) {
      alert("Save failed: " + error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    load();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;
  if (!stats) return <p className="text-sm text-red-600">No stats found. Run schema.sql seed first.</p>;

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
          save(new FormData(e.currentTarget));
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
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save stats"}
        </Button>
        {saved && <p className="text-sm text-green-700">Saved!</p>}
      </form>
    </div>
  );
}
