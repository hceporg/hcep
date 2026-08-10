"use client";

import { useState } from "react";
import { mockPortfolio } from "@/lib/mock-data";
import type { PortfolioItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/utils";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>(mockPortfolio);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);

  function save(form: FormData) {
    const title = String(form.get("title"));
    const payload: PortfolioItem = {
      id: editing?.id ?? `p${Date.now()}`,
      title,
      slug: String(form.get("slug") || slugify(title)),
      couple_name: String(form.get("couple_name")),
      location: String(form.get("location")),
      date_label: String(form.get("date_label")),
      cover_image: String(form.get("cover_image")),
      gallery: editing?.gallery ?? [],
      description: String(form.get("description")),
      is_featured: form.get("is_featured") === "on",
    };
    setItems((prev) => {
      if (prev.find((p) => p.id === payload.id)) {
        return prev.map((p) => (p.id === payload.id ? payload : p));
      }
      return [payload, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Portfolio</h1>
          <p className="text-sm text-muted mt-1">
            Recently executed weddings gallery.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Add wedding
        </Button>
      </div>

      {(showForm || editing) && (
        <form
          className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            save(new FormData(e.currentTarget));
          }}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field name="title" label="Title" defaultValue={editing?.title} required />
            <Field
              name="couple_name"
              label="Couple name"
              defaultValue={editing?.couple_name}
              required
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field name="location" label="Location" defaultValue={editing?.location} />
            <Field
              name="date_label"
              label="Date"
              defaultValue={editing?.date_label}
            />
            <Field name="slug" label="Slug" defaultValue={editing?.slug} />
          </div>
          <Field
            name="cover_image"
            label="Cover image URL"
            defaultValue={editing?.cover_image}
            required
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
            <Button type="submit">Save</Button>
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
                  onClick={() => {
                    setEditing(item);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="!px-2 !py-1 text-xs"
                  onClick={() =>
                    setItems((prev) => prev.filter((x) => x.id !== item.id))
                  }
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
