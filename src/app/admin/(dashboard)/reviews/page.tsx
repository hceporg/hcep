"use client";

import { useState } from "react";
import type { Review } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { avatarColors } from "@/lib/utils";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminReviewsPage() {
  const { rows: reviews, loading, error, upsert, remove } =
    useSupabaseTable<Review>({ table: "reviews" });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(form: FormData) {
    setSaving(true);
    const payload: Partial<Review> = {
      reviewer_name: String(form.get("reviewer_name")),
      handle: String(form.get("handle") || ""),
      timeframe: String(form.get("timeframe") || ""),
      rating: Number(form.get("rating") || 5),
      review_text: String(form.get("review_text")),
      avatar_color: String(form.get("avatar_color") || avatarColors()[0]),
      source: "google",
      sort_order: Number(form.get("sort_order") || 0),
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
          <h1 className="font-serif text-3xl text-maroon">Reviews Manager</h1>
          <p className="text-sm text-muted mt-1">
            Manual Google review cards for the homepage carousel.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add review
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
            <Field
              name="reviewer_name"
              label="Name"
              defaultValue={editing?.reviewer_name}
              required
            />
            <Field
              name="handle"
              label="Handle"
              defaultValue={editing?.handle}
              placeholder="@name"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field
              name="timeframe"
              label="Timeframe"
              defaultValue={editing?.timeframe}
              placeholder="2 weeks ago"
            />
            <Field
              name="rating"
              label="Stars (1–5)"
              type="number"
              defaultValue={String(editing?.rating ?? 5)}
            />
            <label className="text-sm">
              Avatar color
              <select
                name="avatar_color"
                defaultValue={editing?.avatar_color ?? avatarColors()[0]}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2"
              >
                {avatarColors().map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-sm">
            Review text
            <textarea
              name="review_text"
              required
              rows={4}
              defaultValue={editing?.review_text}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
            />
          </label>
          <Field
            name="sort_order"
            label="Order"
            type="number"
            defaultValue={String(editing?.sort_order ?? reviews.length)}
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={editing?.is_featured ?? true}
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
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-border bg-white p-4 flex flex-col sm:flex-row gap-4"
          >
            <div
              className="size-10 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
              style={{ backgroundColor: r.avatar_color }}
            >
              {r.reviewer_name[0]}
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {r.reviewer_name}{" "}
                <span className="text-xs text-muted font-normal">
                  {r.handle} · {r.timeframe} · {"★".repeat(r.rating)}
                </span>
              </p>
              <p className="text-sm text-muted mt-1 line-clamp-2">
                {r.review_text}
              </p>
            </div>
            <div className="flex gap-2">
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
                  if (confirm("Delete this review?")) remove(r.id);
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
