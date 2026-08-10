"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Venue } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const CITIES = ["All", "Goa", "Delhi NCR", "Mumbai", "Bangalore", "Udaipur", "Jaisalmer"];
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

export function VenueFilters({ venues }: { venues: Venue[] }) {
  const [city, setCity] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [capIdx, setCapIdx] = useState(0);

  const filtered = useMemo(() => {
    const budget = BUDGETS[budgetIdx];
    const cap = CAPACITIES[capIdx];
    return venues.filter((v) => {
      if (city !== "All" && !v.city.toLowerCase().includes(city.toLowerCase().replace(" ncr", ""))) {
        // soft match
        if (!v.city.toLowerCase().includes(city.toLowerCase().split(" ")[0].toLowerCase())) {
          return false;
        }
      }
      if (budget.min && v.price_max < budget.min) return false;
      if (budget.max !== Infinity && v.price_min > budget.max) return false;
      if (v.capacity_max < cap.min) return false;
      return true;
    });
  }, [venues, city, budgetIdx, capIdx]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <Select
          label="City"
          value={city}
          onChange={setCity}
          options={CITIES.map((c) => ({ value: c, label: c }))}
        />
        <Select
          label="Budget"
          value={String(budgetIdx)}
          onChange={(v) => setBudgetIdx(Number(v))}
          options={BUDGETS.map((b, i) => ({ value: String(i), label: b.label }))}
        />
        <Select
          label="Capacity"
          value={String(capIdx)}
          onChange={(v) => setCapIdx(Number(v))}
          options={CAPACITIES.map((c, i) => ({ value: String(i), label: c.label }))}
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
                {venue.city}, {venue.state}
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
