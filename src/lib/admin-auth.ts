import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client-check";

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    return { user: { email: "demo@admin.local" }, demo: true as const };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { user: { email: "demo@admin.local" }, demo: true as const };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  return { user, demo: false as const };
}
