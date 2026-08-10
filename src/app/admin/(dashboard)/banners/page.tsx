"use client";

import { useState } from "react";
import { mockBanners } from "@/lib/mock-data";
import type { Banner } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { BannerMediaUpload } from "@/components/admin/BannerMediaUpload";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  function openNew() {
    setEditing(null);
    setMediaUrl(null);
    setMediaType("image");
    setShowForm(true);
  }

  function openEdit(b: Banner) {
    setEditing(b);
    setMediaUrl(b.media_url);
    setMediaType(b.media_type);
    setShowForm(true);
  }

  function closeForm() {
    setEditing(null);
    setShowForm(false);
    setMediaUrl(null);
    setMediaType("image");
  }

  function saveBanner(form: FormData) {
    if (!mediaUrl) return;

    const payload: Banner = {
      id: editing?.id ?? `b${Date.now()}`,
      media_url: mediaUrl,
      media_type: mediaType,
      couple_name: String(form.get("couple_name")),
      location: String(form.get("location")),
      date_label: String(form.get("date_label")),
      sort_order: Number(form.get("sort_order") || 0),
      is_active: form.get("is_active") === "on",
    };

    setBanners((prev) => {
      const exists = prev.find((b) => b.id === payload.id);
      if (exists) return prev.map((b) => (b.id === payload.id ? payload : b));
      return [...prev, payload];
    });
    closeForm();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Banner Manager</h1>
          <p className="text-sm text-muted mt-1">
            Hero carousel videos/images stored in Supabase Storage (shared 1 GB
            quota).
          </p>
        </div>
        <Button onClick={openNew}>Add banner</Button>
      </div>

      {showForm && (
        <form
          className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!mediaUrl) return;
            saveBanner(new FormData(e.currentTarget));
          }}
        >
          <h2 className="font-semibold">
            {editing ? "Edit banner" : "New banner"}
          </h2>

          <BannerMediaUpload
            value={mediaUrl}
            mediaType={mediaType}
            onChange={(url, type) => {
              setMediaUrl(url);
              setMediaType(type);
            }}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              name="sort_order"
              label="Sort order"
              type="number"
              defaultValue={String(editing?.sort_order ?? banners.length)}
            />
            <div className="text-sm text-muted flex items-end pb-2">
              Detected type:{" "}
              <span className="ml-1 font-medium text-ink capitalize">
                {mediaType}
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field
              name="couple_name"
              label="Couple name"
              defaultValue={editing?.couple_name}
              required
            />
            <Field
              name="location"
              label="Location"
              defaultValue={editing?.location}
            />
            <Field
              name="date_label"
              label="Date label"
              defaultValue={editing?.date_label}
              placeholder="May '25"
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
          {!mediaUrl && (
            <p className="text-xs text-red-600">Upload a banner image or video to continue.</p>
          )}
          <div className="flex gap-2">
            <Button type="submit" disabled={!mediaUrl}>
              Save
            </Button>
            <Button type="button" variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {banners
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((b) => (
            <div
              key={b.id}
              className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-white p-4"
            >
              {b.media_type === "video" ? (
                <video
                  src={b.media_url}
                  className="w-full sm:w-40 h-24 object-cover rounded-lg bg-cream-dark"
                  muted
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.media_url}
                  alt={b.couple_name}
                  className="w-full sm:w-40 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {b.couple_name} · {b.location} · {b.date_label}
                </p>
                <p className="text-xs text-muted mt-1">
                  {b.media_type} · order {b.sort_order} ·{" "}
                  {b.is_active ? "active" : "inactive"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => openEdit(b)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() =>
                    setBanners((prev) => prev.filter((x) => x.id !== b.id))
                  }
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

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
