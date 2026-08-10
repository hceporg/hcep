import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  wedding_date: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  source: z.string().default("cta"),
  venue_id: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please fill in all required fields correctly." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (!supabase) {
      // Dev fallback — log and succeed so the UI works without Supabase
      console.log("[enquiry]", parsed.data);
      return NextResponse.json({ ok: true, mode: "dev" });
    }

    const { error } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      wedding_date: parsed.data.wedding_date || null,
      city: parsed.data.city || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message || null,
      source: parsed.data.source,
      venue_id: parsed.data.venue_id || null,
      status: "new",
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Could not save enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
