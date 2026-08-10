import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Keep-alive ping for Supabase free tier (pauses after ~7 days idle).
 * Hit every 6 days via Vercel Cron so the project stays active.
 *
 * Secured with CRON_SECRET (Vercel Cron sends Authorization: Bearer <secret>).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (secret) {
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 500 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase not configured — nothing to ping",
        pingedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  const supabase = createClient(url, key);

  const { error: dbError } = await supabase
    .from("site_stats")
    .select("id")
    .limit(1);

  const { error: storageError } = await supabase.storage
    .from("media")
    .list("", { limit: 1 });

  // Record ping (table created in schema.sql)
  await supabase.from("keep_alive_pings").insert({ source: "cron" });

  if (dbError) {
    return NextResponse.json(
      {
        ok: false,
        dbError: dbError.message,
        storageError: storageError?.message ?? null,
        pingedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    db: "ok",
    storage: storageError ? storageError.message : "ok",
    pingedAt: new Date().toISOString(),
  });
}
