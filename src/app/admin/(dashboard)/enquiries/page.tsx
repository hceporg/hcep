"use client";

import type { Enquiry } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useSupabaseTable } from "@/lib/supabase/admin-hooks";

export default function AdminEnquiriesPage() {
  const { rows: enquiries, loading, error, update } =
    useSupabaseTable<Enquiry>({ table: "enquiries", orderBy: "created_at", ascending: false });

  async function setStatus(id: string, status: Enquiry["status"]) {
    await update(id, { status } as Partial<Enquiry>);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-maroon">Enquiries</h1>
      <p className="text-sm text-muted mt-1">
        Leads from &quot;Start my wedding planning&quot; and availability forms.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</p>
      )}
      {loading && <p className="mt-6 text-sm text-muted">Loading…</p>}

      <div className="mt-6 space-y-3">
        {enquiries.length === 0 && !loading && (
          <p className="text-sm text-muted">No enquiries yet.</p>
        )}
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
