"use client";

import { useEffect, useState } from "react";
import type { Enquiry } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const DEMO_ENQUIRIES: Enquiry[] = [
  {
    id: "e1",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "+91 98765 11111",
    wedding_date: "2026-12-15",
    city: "Goa",
    budget: "30–40 lakhs",
    message: "Looking for a beach venue for 150 guests.",
    source: "hero",
    venue_id: null,
    status: "new",
    created_at: new Date().toISOString(),
  },
  {
    id: "e2",
    name: "Rohan Mehta",
    email: "rohan@example.com",
    phone: "+91 98765 22222",
    wedding_date: "2027-02-20",
    city: "Udaipur",
    budget: "50+ lakhs",
    message: null,
    source: "venue-cta",
    venue_id: null,
    status: "contacted",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(DEMO_ENQUIRIES);

  useEffect(() => {
    // When Supabase is wired, fetch from API
  }, []);

  function setStatus(id: string, status: Enquiry["status"]) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-maroon">Enquiries</h1>
      <p className="text-sm text-muted mt-1">
        Leads from &quot;Start my wedding planning&quot; and availability forms.
      </p>

      <div className="mt-6 space-y-3">
        {enquiries.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-border bg-white p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{e.name}</p>
                <p className="text-sm text-muted mt-0.5">
                  {e.email} · {e.phone}
                </p>
                <p className="text-xs text-muted mt-2">
                  {e.city && <>{e.city} · </>}
                  {e.wedding_date && <>{e.wedding_date} · </>}
                  {e.budget && <>{e.budget} · </>}
                  source: {e.source}
                </p>
                {e.message && (
                  <p className="text-sm text-ink/80 mt-2">{e.message}</p>
                )}
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded ${
                    e.status === "new"
                      ? "bg-maroon/10 text-maroon"
                      : e.status === "contacted"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {e.status}
                </span>
                <div className="flex gap-1">
                  {(["new", "contacted", "closed"] as const).map((s) => (
                    <Button
                      key={s}
                      variant="ghost"
                      className="!px-2 !py-1 text-xs capitalize"
                      onClick={() => setStatus(e.id, s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
