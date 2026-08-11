"use client";

import { useCallback, useEffect, useState } from "react";

type UseTableOptions<T> = {
  table: string;
  orderBy?: string;
  ascending?: boolean;
  filter?: Record<string, unknown>;
};

export function useSupabaseTable<T extends { id: string }>({
  table,
  orderBy = "sort_order",
  ascending = true,
  filter,
}: UseTableOptions<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const search = new URLSearchParams({
      orderBy,
      ascending: String(ascending),
    });
    if (filter) search.set("filters", JSON.stringify(filter));

    const res = await fetch(`/api/admin/${table}?${search.toString()}`, {
      credentials: "include",
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json?.error ?? "Failed to load data");
    } else {
      setRows((json?.data ?? []) as T[]);
      setError(null);
    }
    setLoading(false);
  }, [table, orderBy, ascending, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const upsert = useCallback(
    async (row: Partial<T> & { id?: string }) => {
      const res = await fetch(`/api/admin/${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ payload: row }),
      });
      const json = await res.json();
      if (!res.ok) return { error: json?.error ?? "Save failed" };
      await load();
      return { error: null };
    },
    [table, load]
  );

  const update = useCallback(
    async (id: string, updates: Partial<T>) => {
      const res = await fetch(`/api/admin/${table}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, updates }),
      });
      const json = await res.json();
      if (!res.ok) return { error: json?.error ?? "Update failed" };
      await load();
      return { error: null };
    },
    [table, load]
  );

  const remove = useCallback(
    async (id: string) => {
      await fetch(`/api/admin/${table}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      await load();
    },
    [table, load]
  );

  return { rows, loading, error, reload: load, upsert, update, remove, setRows };
}
