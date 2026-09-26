"use client";

import { useState } from "react";
import type { CtaBanner } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminCtaBannersPage() {
  const { rows, loading, error, upsert, remove } =
    useSupabaseTable<CtaBanner>({
      table: "cta_banners",
      orderBy: "key",
    });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CtaBanner | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setMediaUrl(null);
    setMediaType("image");
    setShowForm(true);
  }

  function openEdit(row: CtaBanner) {
    setEditing(row);
    setMediaUrl(row.media_url);
    setMediaType(row.media_type);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setMediaUrl(null);
  }

  async function save(form: FormData) {
    if (!mediaUrl) {
      alert("Please upload a banner image or video.");
      return;
    }
    setSaving(true);
    const payload: Partial<CtaBanner> = {
      key: String(form.get("key")).trim(),
      title: String(form.get("title")),
      subtitle: String(form.get("subtitle") || ""),
      media_url: mediaUrl,
      media_type: mediaType,
      button_text: String(form.get("button_text") || "Check availability"),
      is_active: form.get("is_active") === "on",
      updated_at: new Date().toISOString(),
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
          <h1 className="font-serif text-3xl text-maroon">CTA Banners</h1>
          <p className="text-sm text-muted mt-1">
            Upload images/videos for on-page CTAs (e.g. homepage &quot;Book your
            venue&quot;). Use key <code className="text-xs bg-cream-dark px-1 rounded">home_venue</code>{" "}
            for the home booking banner.
          </p>
        </div>
        <Button onClick={openNew}>Add CTA banner</Button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
          {error}
          <span className="block mt-1 text-xs">
            If the table is missing, run{" "}
            <code className="bg-white px-1 rounded">
              supabase/city-venues-cta.sql
            </code>{" "}
            in the Supabase SQL Editor.
          </span>
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
              name="key"
              label="Key (unique)"
              defaultValue={editing?.key ?? "home_venue"}
              required
              placeholder="home_venue"
            />
            <Field
              name="button_text"
              label="Button text"
              defaultValue={editing?.button_text ?? "Check availability"}
            />
          </div>
          <Field
            name="title"
            label="Title"
            defaultValue={editing?.title ?? "Book your venue"}
            required
          />
          <label className="block text-sm">
            Subtitle
            <textarea
              name="subtitle"
              rows={2}
              defaultValue={
                editing?.subtitle ??
                "Pick your date. Set your budget. Choose your venue."
              }
              className="mt-1 w-full rounded-lg border border-border px-3 py-2"
            />
          </label>
          <ImageUpload
            label="Banner media"
            kind="cta"
            allowVideo
            value={mediaUrl}
            mediaType={mediaType}
            onChange={setMediaUrl}
            onMediaTypeChange={setMediaType}
          />
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
            <Button type="button" variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-white p-4"
          >
            <div className="w-full sm:w-40 h-24 rounded-lg overflow-hidden bg-cream-dark shrink-0">
              {row.media_type === "video" ? (
                <video
                  src={row.media_url}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.media_url}
                  alt={row.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{row.title}</p>
              <p className="text-xs text-muted">
                key: {row.key} · {row.media_type} ·{" "}
                {row.is_active ? "active" : "hidden"}
              </p>
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {row.subtitle}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="!px-3 !py-1.5 text-xs"
                onClick={() => openEdit(row)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="!px-3 !py-1.5 text-xs"
                onClick={() => {
                  if (confirm("Delete this CTA banner?")) void remove(row.id);
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
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      {props.label}
      <input
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
