"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/utils";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminPortfolioPage() {
  const { rows: items, loading, error, upsert, remove } =
    useSupabaseTable<PortfolioItem>({
      table: "portfolio",
      orderBy: "created_at",
      ascending: false,
    });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setCoverImage(null);
    setShowForm(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditing(item);
    setCoverImage(item.cover_image);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setCoverImage(null);
  }

  async function save(form: FormData) {
    if (!coverImage) {
      alert("Please upload a cover image.");
      return;
    }
    setSaving(true);
    const title = String(form.get("title"));
    const payload: Partial<PortfolioItem> = {
      title,
      slug: String(form.get("slug") || slugify(title)),
      couple_name: String(form.get("couple_name")),
      location: String(form.get("location") || ""),
      date_label: String(form.get("date_label") || ""),
      cover_image: coverImage,
      gallery: editing?.gallery ?? [],
      description: String(form.get("description") || ""),
      is_featured: form.get("is_featured") === "on",
    };
    if (editing) payload.id = editing.id;
    const result = await upsert(payload);
    setSaving(false);
    if (result.error) {
      alert("Save failed: " + result.error);
      return;
    }
    closeForm();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Portfolio</h1>
          <p className="text-sm text-muted mt-1">
            Recently executed weddings — upload cover images (converted to
            WebP).
          </p>
        </div>
        <Button onClick={openNew}>Add wedding</Button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
          {error}
        </p>
      )}
      {loading && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {showForm && (
        <form
          className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void save(new FormData(e.currentTarget));
          }}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              name="title"
              label="Title"
              defaultValue={editing?.title}
              required
            />
            <Field
              name="couple_name"
              label="Couple name"
              defaultValue={editing?.couple_name}
              required
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field
              name="location"
              label="Location"
              defaultValue={editing?.location}
            />
            <Field
              name="date_label"
              label="Date"
              defaultValue={editing?.date_label}
            />
            <Field name="slug" label="Slug" defaultValue={editing?.slug} />
          </div>
          <ImageUpload
            label="Cover image"
            kind="portfolio"
            value={coverImage}
            onChange={setCoverImage}
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={editing?.is_featured ?? true}
            />
            Featured on homepage
          </label>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button type="button" variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-white overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.cover_image}
              alt={item.couple_name}
              className="h-36 w-full object-cover"
            />
            <div className="p-4 flex justify-between gap-2">
              <div>
                <p className="font-medium">{item.couple_name}</p>
                <p className="text-xs text-muted">
                  {item.location} · {item.date_label}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  className="!px-2 !py-1 text-xs"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="!px-2 !py-1 text-xs"
                  onClick={() => {
                    if (confirm("Delete?")) void remove(item.id);
                  }}
                >
                  Del
                </Button>
              </div>
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
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      {props.label}
      <input
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
