import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/supabase/admin-server";

const ALLOWED_TABLES = new Set([
  "banners",
  "reels",
  "reviews",
  "venues",
  "venue_cities",
  "cta_banners",
  "blog_posts",
  "portfolio",
  "enquiries",
  "site_settings",
  "site_stats",
]);

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

async function getAuthedClient() {
  return requireAdminSession();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  if (!ALLOWED_TABLES.has(table)) return badRequest("Table not allowed");

  const auth = await getAuthedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const search = req.nextUrl.searchParams;
  const orderBy = search.get("orderBy") ?? "sort_order";
  const ascending = search.get("ascending") !== "false";
  const countOnly = search.get("countOnly") === "true";
  const filters = search.get("filters");

  if (countOnly) {
    const { count, error } = await auth.supabase
      .from(table)
      .select("id", { count: "exact", head: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ count: count ?? 0 });
  }

  let query = auth.supabase.from(table).select("*").order(orderBy, { ascending });
  if (filters) {
    try {
      const parsed = JSON.parse(filters) as Record<string, unknown>;
      for (const [key, value] of Object.entries(parsed)) {
        query = query.eq(key, value);
      }
    } catch {
      return badRequest("Invalid filters JSON");
    }
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  if (!ALLOWED_TABLES.has(table)) return badRequest("Table not allowed");

  const auth = await getAuthedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await req.json();
  const payload = body?.payload;
  if (!payload) return badRequest("Missing payload");

  const { error } = await auth.supabase.from(table).upsert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  if (!ALLOWED_TABLES.has(table)) return badRequest("Table not allowed");

  const auth = await getAuthedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await req.json();
  const id = body?.id;
  const updates = body?.updates;
  if (!id || !updates) return badRequest("Missing id or updates");

  const { error } = await auth.supabase.from(table).update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  if (!ALLOWED_TABLES.has(table)) return badRequest("Table not allowed");

  const auth = await getAuthedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await req.json();
  const id = body?.id;
  if (!id) return badRequest("Missing id");

  const { error } = await auth.supabase.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

