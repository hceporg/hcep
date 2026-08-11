"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "./client";

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
    const sb = createClient();
    if (!sb) {
      setError("Supabase not configured");
      setLoading(false);
      return;
    }
    setLoading(true);
    let query = sb.from(table).select("*").order(orderBy, { ascending });
    if (filter) {
      Object.entries(filter).forEach(([k, v]) => {
        query = query.eq(k, v);
      });
    }
    const { data, error: err } = await query;
    if (err) {
      setError(err.message);
    } else {
      setRows((data ?? []) as T[]);
      setError(null);
    }
    setLoading(false);
  }, [table, orderBy, ascending, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const upsert = useCallback(
    async (row: Partial<T> & { id?: string }) => {
      const sb = createClient();
      if (!sb) return { error: "Supabase not configured" };
      const { error: err } = await sb.from(table).upsert(row as never);
      if (err) return { error: err.message };
      await load();
      return { error: null };
    },
    [table, load]
  );

  const remove = useCallback(
    async (id: string) => {
      const sb = createClient();
      if (!sb) return;
      await sb.from(table).delete().eq("id", id);
      await load();
    },
    [table, load]
  );

  return { rows, loading, error, reload: load, upsert, remove, setRows };
}
