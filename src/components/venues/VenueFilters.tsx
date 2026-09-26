"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Venue, VenueCity } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const BUDGETS = [
  { label: "Any budget", max: Infinity },
  { label: "Under ₹15L", max: 1500000 },
  { label: "Under ₹30L", max: 3000000 },
  { label: "Under ₹50L", max: 5000000 },
  { label: "₹50L+", max: Infinity, min: 5000000 },
];
const CAPACITIES = [
  { label: "Any capacity", min: 0 },
  { label: "100+", min: 100 },
  { label: "300+", min: 300 },
  { label: "500+", min: 500 },
];

type Props = {
  venues: Venue[];
  cities: VenueCity[];
};

export function VenueFilters({ venues, cities }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("city") ?? "all";

  const [citySlug, setCitySlug] = useState(initialSlug);
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [capIdx, setCapIdx] = useState(0);

  useEffect(() => {
    setCitySlug(searchParams.get("city") ?? "all");
  }, [searchParams]);

  const cityOptions = useMemo(
    () => [
      { value: "all", label: "All cities" },
      ...cities.map((c) => ({ value: c.slug, label: c.name })),
    ],
    [cities]
  );

  const filtered = useMemo(() => {
    const budget = BUDGETS[budgetIdx];
    const cap = CAPACITIES[capIdx];
    const selected =
      citySlug === "all"
        ? null
        : cities.find((c) => c.slug === citySlug) ?? null;

    return venues.filter((v) => {
      if (selected) {
        const matchId = v.city_id === selected.id;
        const matchName =
          !v.city_id &&
          v.city.toLowerCase() === selected.name.toLowerCase();
        if (!matchId && !matchName) return false;
      }
      if (budget.min && v.price_max < budget.min) return false;
      if (budget.max !== Infinity && v.price_min > budget.max) return false;
      if (v.capacity_max < cap.min) return false;
      return true;
    });
  }, [venues, cities, citySlug, budgetIdx, capIdx]);

  function onCityChange(slug: string) {
    setCitySlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("city");
    else params.set("city", slug);
    const q = params.toString();
    router.replace(q ? `/venues?${q}` : "/venues", { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <Select
          label="City"
          value={citySlug}
          onChange={onCityChange}
          options={cityOptions}
        />
        <Select
          label="Budget"
          value={String(budgetIdx)}
          onChange={(v) => setBudgetIdx(Number(v))}
          options={BUDGETS.map((b, i) => ({
            value: String(i),
            label: b.label,
          }))}
        />
        <Select
          label="Capacity"
          value={String(capIdx)}
          onChange={(v) => setCapIdx(Number(v))}
          options={CAPACITIES.map((c, i) => ({
            value: String(i),
            label: c.label,
          }))}
        />
      </div>

      <p className="text-sm text-muted mb-6">{filtered.length} venues found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((venue) => (
          <Link
            key={venue.id}
            href={`/venues/${venue.slug}`}
            className="group rounded-xl overflow-hidden bg-white border border-border hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={venue.cover_image}
                alt={venue.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg text-ink group-hover:text-maroon transition-colors">
                {venue.name}
              </h3>
              <p className="text-sm text-muted mt-1">
                {venue.city}
                {venue.state ? `, ${venue.state}` : ""}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>
                  {venue.capacity_min}–{venue.capacity_max} guests
                </span>
                <span className="font-medium text-maroon">
                  {formatCurrency(venue.price_min)}+
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-16">
          No venues match these filters. Try adjusting your search.
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-maroon min-w-[160px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
