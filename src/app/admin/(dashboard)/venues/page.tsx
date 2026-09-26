"use client";

import { useMemo, useState } from "react";
import type { Venue, VenueCity } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { formatCurrency, slugify } from "@/lib/utils";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminVenuesPage() {
  const {
    rows: cities,
    loading: citiesLoading,
    error: citiesError,
    upsert: upsertCity,
    remove: removeCity,
  } = useSupabaseTable<VenueCity>({
    table: "venue_cities",
    orderBy: "sort_order",
  });

  const {
    rows: venues,
    loading: venuesLoading,
    error: venuesError,
    upsert: upsertVenue,
    remove: removeVenue,
  } = useSupabaseTable<Venue>({ table: "venues", orderBy: "name" });

  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [showCityForm, setShowCityForm] = useState(false);
  const [editingCity, setEditingCity] = useState<VenueCity | null>(null);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedCity = useMemo(
    () => cities.find((c) => c.id === selectedCityId) ?? null,
    [cities, selectedCityId]
  );

  const cityVenues = useMemo(
    () =>
      venues.filter(
        (v) =>
          v.city_id === selectedCityId ||
          (!v.city_id &&
            selectedCity &&
            v.city.toLowerCase() === selectedCity.name.toLowerCase())
      ),
    [venues, selectedCityId, selectedCity]
  );

  async function saveCity(form: FormData) {
    setSaving(true);
    const name = String(form.get("name")).trim();
    const payload: Partial<VenueCity> = {
      name,
      slug: String(form.get("slug") || slugify(name)),
      heading: String(form.get("heading") || `Wedding Venues in ${name}`),
      subheading: String(form.get("subheading") || ""),
      sort_order: Number(form.get("sort_order") || 0),
      is_active: form.get("is_active") === "on",
    };
    if (editingCity) payload.id = editingCity.id;
    const result = await upsertCity(payload);
    setSaving(false);
    if (result.error) {
      alert("Save failed: " + result.error);
      return;
    }
    setShowCityForm(false);
    setEditingCity(null);
  }

  async function saveVenue(form: FormData) {
    if (!selectedCity) return;
    if (!coverImage) {
      alert("Please upload a cover image.");
      return;
    }
    setSaving(true);
    const name = String(form.get("name"));
    const payload: Partial<Venue> = {
      name,
      slug: String(form.get("slug") || slugify(name)),
      city: selectedCity.name,
      city_id: selectedCity.id,
      state: String(form.get("state") || ""),
      cover_image: coverImage,
      gallery: editingVenue?.gallery?.length
        ? editingVenue.gallery
        : [coverImage],
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
    if (editingVenue) payload.id = editingVenue.id;
    const result = await upsertVenue(payload);
    setSaving(false);
    if (result.error) {
      alert("Save failed: " + result.error);
      return;
    }
    setShowVenueForm(false);
    setEditingVenue(null);
    setCoverImage(null);
  }

  if (selectedCity) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setSelectedCityId(null);
            setShowVenueForm(false);
            setEditingVenue(null);
          }}
          className="text-sm text-maroon hover:underline mb-4"
        >
          ← Back to cities
        </button>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-3xl text-maroon">
              {selectedCity.name}
            </h1>
            <p className="text-sm text-muted mt-1">
              Manage heading, subheading, and venues for this city page.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditingCity(selectedCity);
                setShowCityForm(true);
              }}
            >
              Edit city page
            </Button>
            <Button
              onClick={() => {
                setEditingVenue(null);
                setCoverImage(null);
                setShowVenueForm(true);
              }}
            >
              Add venue
            </Button>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-white p-4">
          <p className="font-serif text-xl text-maroon">{selectedCity.heading}</p>
          {selectedCity.subheading && (
            <p className="text-sm text-muted mt-1">{selectedCity.subheading}</p>
          )}
        </div>

        {(citiesError || venuesError) && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
            {citiesError || venuesError}
          </p>
        )}

        {showCityForm && editingCity?.id === selectedCity.id && (
          <CityForm
            editing={editingCity}
            saving={saving}
            onSave={saveCity}
            onCancel={() => {
              setShowCityForm(false);
              setEditingCity(null);
            }}
          />
        )}

        {showVenueForm && (
          <form
            className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              void saveVenue(new FormData(e.currentTarget));
            }}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                name="name"
                label="Venue name"
                defaultValue={editingVenue?.name}
                required
              />
              <Field
                name="slug"
                label="Slug"
                defaultValue={editingVenue?.slug}
                placeholder="auto from name"
              />
            </div>
            <Field
              name="state"
              label="State"
              defaultValue={editingVenue?.state}
            />
            <ImageUpload
              label="Cover image"
              kind="venue"
              value={coverImage}
              onChange={setCoverImage}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Field
                name="capacity_min"
                label="Capacity min"
                type="number"
                defaultValue={String(editingVenue?.capacity_min ?? 50)}
              />
              <Field
                name="capacity_max"
                label="Capacity max"
                type="number"
                defaultValue={String(editingVenue?.capacity_max ?? 500)}
              />
              <Field
                name="price_min"
                label="Price min (₹)"
                type="number"
                defaultValue={String(editingVenue?.price_min ?? 0)}
              />
              <Field
                name="price_max"
                label="Price max (₹)"
                type="number"
                defaultValue={String(editingVenue?.price_max ?? 0)}
              />
            </div>
            <Field
              name="amenities"
              label="Amenities (comma-separated)"
              defaultValue={editingVenue?.amenities?.join(", ")}
            />
            <label className="block text-sm">
              Description
              <textarea
                name="description"
                rows={3}
                defaultValue={editingVenue?.description}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2"
              />
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editingVenue?.is_featured}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={editingVenue?.is_active ?? true}
                />
                Active
              </label>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save venue"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowVenueForm(false);
                  setEditingVenue(null);
                  setCoverImage(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {venuesLoading && <p className="mt-6 text-sm text-muted">Loading…</p>}

        <div className="mt-6 space-y-3">
          {cityVenues.map((v) => (
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
                  {v.capacity_min}–{v.capacity_max} · from{" "}
                  {formatCurrency(v.price_min)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => {
                    setEditingVenue(v);
                    setCoverImage(v.cover_image);
                    setShowVenueForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => {
                    if (confirm("Delete this venue?")) void removeVenue(v.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {!venuesLoading && cityVenues.length === 0 && (
            <p className="text-sm text-muted py-8 text-center">
              No venues in this city yet. Add one above.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Venue Manager</h1>
          <p className="text-sm text-muted mt-1">
            Create city pages with heading &amp; subheading, then add venues to
            each city.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCity(null);
            setShowCityForm(true);
          }}
        >
          Add city page
        </Button>
      </div>

      {citiesError && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
          {citiesError}
          <span className="block mt-1 text-xs">
            If the table is missing, run{" "}
            <code className="bg-white px-1 rounded">
              supabase/city-venues-cta.sql
            </code>{" "}
            in the Supabase SQL Editor.
          </span>
        </p>
      )}

      {showCityForm && !selectedCityId && (
        <CityForm
          editing={editingCity}
          saving={saving}
          onSave={saveCity}
          onCancel={() => {
            setShowCityForm(false);
            setEditingCity(null);
          }}
        />
      )}

      {citiesLoading && <p className="mt-6 text-sm text-muted">Loading…</p>}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {cities
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((city) => {
            const count = venues.filter(
              (v) =>
                v.city_id === city.id ||
                (!v.city_id &&
                  v.city.toLowerCase() === city.name.toLowerCase())
            ).length;
            return (
              <div
                key={city.id}
                className="rounded-xl border border-border bg-white p-5"
              >
                <p className="font-serif text-xl text-maroon">{city.name}</p>
                <p className="text-sm text-ink mt-1 line-clamp-1">
                  {city.heading}
                </p>
                <p className="text-xs text-muted mt-1">
                  {count} venue{count === 1 ? "" : "s"} ·{" "}
                  {city.is_active ? "active" : "hidden"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    className="!px-3 !py-1.5 text-xs"
                    onClick={() => setSelectedCityId(city.id)}
                  >
                    Manage
                  </Button>
                  <Button
                    variant="outline"
                    className="!px-3 !py-1.5 text-xs"
                    onClick={() => {
                      setEditingCity(city);
                      setShowCityForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="!px-3 !py-1.5 text-xs"
                    onClick={() => {
                      if (
                        confirm(
                          `Delete city page "${city.name}"? Venues stay but lose the city link.`
                        )
                      ) {
                        void removeCity(city.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      {!citiesLoading && cities.length === 0 && (
        <p className="mt-10 text-center text-muted text-sm">
          No city pages yet. Add Agra, Goa, Jaipur, etc. to get started.
        </p>
      )}
    </div>
  );
}

function CityForm({
  editing,
  saving,
  onSave,
  onCancel,
}: {
  editing: VenueCity | null;
  saving: boolean;
  onSave: (form: FormData) => void;
  onCancel: () => void;
}) {
  return (
    <form
      className="mt-6 rounded-xl border border-border bg-white p-5 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <Field
          name="name"
          label="City name"
          defaultValue={editing?.name}
          required
        />
        <Field
          name="slug"
          label="Slug"
          defaultValue={editing?.slug}
          placeholder="auto from name"
        />
      </div>
      <Field
        name="heading"
        label="Page heading"
        defaultValue={editing?.heading}
        required
        placeholder="Wedding Venues in Agra"
      />
      <label className="block text-sm">
        Subheading
        <textarea
          name="subheading"
          rows={2}
          defaultValue={editing?.subheading}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          placeholder="Short description for this city page"
        />
      </label>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field
          name="sort_order"
          label="Order"
          type="number"
          defaultValue={String(editing?.sort_order ?? 0)}
        />
        <label className="flex items-center gap-2 text-sm pt-6">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={editing?.is_active ?? true}
          />
          Active (shown on site)
        </label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save city"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
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
