"use client";

import { useState } from "react";
import type { Venue } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { formatCurrency, slugify } from "@/lib/utils";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminVenuesPage() {
  const { rows: venues, loading, error, upsert, remove } =
    useSupabaseTable<Venue>({ table: "venues", orderBy: "name" });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Venue | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(form: FormData) {
    setSaving(true);
    const name = String(form.get("name"));
    const payload: Partial<Venue> = {
      name,
      slug: String(form.get("slug") || slugify(name)),
      city: String(form.get("city")),
      state: String(form.get("state") || ""),
      cover_image: String(form.get("cover_image")),
      gallery: editing?.gallery ?? [String(form.get("cover_image"))],
      capacity_min: Number(form.get("capacity_min") || 50),
      capacity_max: Number(form.get("capacity_max") || 500),
      price_min: Number(form.get("price_min") || 0),
      price_max: Number(form.get("price_max") || 0),
      amenities: String(form.get("amenities") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description: String(form.get("description") || ""),
      is_featured: form.get("is_featured") === "on",
      is_active: form.get("is_active") === "on",
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
          <h1 className="font-serif text-3xl text-maroon">Venue Manager</h1>
          <p className="text-sm text-muted mt-1">
            Add venues with photos, capacity, and pricing ranges.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add venue
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
          <div className="grid sm:grid-cols-2 gap-3">
            <Field name="name" label="Name" defaultValue={editing?.name} required />
            <Field
              name="slug"
              label="Slug"
              defaultValue={editing?.slug}
              placeholder="auto from name"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field name="city" label="City" defaultValue={editing?.city} required />
            <Field name="state" label="State" defaultValue={editing?.state} />
          </div>
          <Field
            name="cover_image"
            label="Cover image URL"
            defaultValue={editing?.cover_image}
            required
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Field
              name="capacity_min"
              label="Capacity min"
              type="number"
              defaultValue={String(editing?.capacity_min ?? 50)}
            />
            <Field
              name="capacity_max"
              label="Capacity max"
              type="number"
              defaultValue={String(editing?.capacity_max ?? 500)}
            />
            <Field
              name="price_min"
              label="Price min (₹)"
              type="number"
              defaultValue={String(editing?.price_min ?? 0)}
            />
            <Field
              name="price_max"
              label="Price max (₹)"
              type="number"
              defaultValue={String(editing?.price_max ?? 0)}
            />
          </div>
          <Field
            name="amenities"
            label="Amenities (comma-separated)"
            defaultValue={editing?.amenities.join(", ")}
          />
          <label className="block text-sm">
            Description
            <textarea
              name="description"
              rows={3}
              defaultValue={editing?.description}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2"
            />
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={editing?.is_featured}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={editing?.is_active ?? true}
              />
              Active
            </label>
          </div>
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
        {venues.map((v) => (
          <div
            key={v.id}
            className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-white p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.cover_image}
              alt={v.name}
              className="w-full sm:w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium">{v.name}</p>
              <p className="text-xs text-muted">
                {v.city} · {v.capacity_min}–{v.capacity_max} · from{" "}
                {formatCurrency(v.price_min)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="!px-3 !py-1.5 text-xs"
                onClick={() => {
                  setEditing(v);
                  setShowForm(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="!px-3 !py-1.5 text-xs"
                onClick={() => {
                  if (confirm("Delete this venue?")) remove(v.id);
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
