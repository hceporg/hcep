"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminSettingsPage() {
  const { rows, loading, upsert, reload } = useSupabaseTable<SiteSettings>({
    table: "site_settings",
    orderBy: "updated_at",
    ascending: false,
  });
  const settings = rows[0] ?? null;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(form: FormData) {
    if (!settings) return;
    setSaving(true);
    const payload = {
      site_name: String(form.get("site_name")),
      cta_text: String(form.get("cta_text")),
      venue_cta_text: String(form.get("venue_cta_text")),
      phone: String(form.get("phone")),
      whatsapp: String(form.get("whatsapp")),
      email: String(form.get("email")),
      address: String(form.get("address")),
    };
    const { error } = await upsert({ id: settings.id, ...payload });
    setSaving(false);
    if (error) {
      alert("Save failed: " + error);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    reload();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;
  if (!settings) return <p className="text-sm text-red-600">No settings found. Run schema.sql seed first.</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl text-maroon">Site Settings</h1>
      <p className="text-sm text-muted mt-1">
        CTA labels, contact info, and navigation.
      </p>

      <form
        className="mt-8 max-w-xl space-y-4 rounded-xl border border-border bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          save(new FormData(e.currentTarget));
        }}
      >
        {(
          [
            ["site_name", "Site name", settings.site_name],
            ["cta_text", "Primary CTA text", settings.cta_text],
            ["venue_cta_text", "Venue CTA text", settings.venue_cta_text],
            ["phone", "Phone", settings.phone],
            ["whatsapp", "WhatsApp", settings.whatsapp],
            ["email", "Email", settings.email],
            ["address", "Address / cities", settings.address],
          ] as const
        ).map(([name, label, value]) => (
          <label key={name} className="block text-sm">
            {label}
            <input
              name={name}
              defaultValue={value}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2"
            />
          </label>
        ))}

        <div className="pt-2">
          <p className="text-sm font-medium mb-2">Nav items (read-only preview)</p>
          <ul className="text-sm text-muted space-y-1">
            {settings.nav_items.map((n) => (
              <li key={n.label}>
                {n.label} → {n.href}
                {n.children && (
                  <ul className="pl-4 mt-1">
                    {n.children.map((c) => (
                      <li key={c.href}>
                        {c.label} → {c.href}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {saved && <p className="text-sm text-green-700">Saved!</p>}
      </form>
    </div>
  );
}
