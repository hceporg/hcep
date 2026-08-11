"use client";

import { useState } from "react";
import type { Reel } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminReelsPage() {
  const { rows: reels, loading, error, upsert, remove } =
    useSupabaseTable<Reel>({ table: "reels" });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reel | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(form: FormData) {
    setSaving(true);
    const payload: Partial<Reel> = {
      instagram_url: String(form.get("instagram_url")),
      couple_name: String(form.get("couple_name")),
      location: String(form.get("location") || ""),
      view_count: Number(form.get("view_count") || 0),
      sort_order: Number(form.get("sort_order") || 0),
      is_active: form.get("is_active") === "on",
      thumbnail_url: null,
    };
    if (editing) payload.id = editing.id;
    const result = await upsert(payload);
    setSaving(false);
    if (result.error) {
      alert("Save failed: " + result.error);
      return;
    }
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Experience Reels</h1>
          <p className="text-sm text-muted mt-1">
            Paste Instagram reel URLs — rendered via oEmbed on the site.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add reel
        </Button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
          {error}
        </p>
      )}

      {loading && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {(showForm || editing) && (
        <form
          className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            save(new FormData(e.currentTarget));
          }}
        >
          <Field
            name="instagram_url"
            label="Instagram reel URL"
            defaultValue={editing?.instagram_url}
            required
            placeholder="https://www.instagram.com/reel/..."
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              name="couple_name"
              label="Couple / caption"
              defaultValue={editing?.couple_name}
              required
            />
            <Field
              name="location"
              label="Location tag"
              defaultValue={editing?.location}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              name="view_count"
              label="View count"
              type="number"
              defaultValue={String(editing?.view_count ?? 0)}
            />
            <Field
              name="sort_order"
              label="Order"
              type="number"
              defaultValue={String(editing?.sort_order ?? reels.length)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={editing?.is_active ?? true}
            />
            Active
          </label>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {reels
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((r) => (
            <div
              key={r.id}
              className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-white p-4 items-start sm:items-center"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium">{r.couple_name}</p>
                <p className="text-xs text-muted truncate">{r.instagram_url}</p>
                <p className="text-xs text-muted mt-1">
                  {r.location} · 👁 {r.view_count} ·{" "}
                  {r.is_active ? "active" : "hidden"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => {
                    setEditing(r);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => {
                    if (confirm("Delete this reel?")) remove(r.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Field(props: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      {props.label}
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
