import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client-check";

/**
 * Server-side admin gate. Password is never read or stored in app code —
 * only Supabase Auth session cookies are checked (password lives hashed in Supabase).
 */
export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=config");
  }

  const supabase = await createClient();
  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Optional role check — only enforce when a profiles row exists
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  // Ignore missing table / RLS errors so login still works if schema isn't fully applied
  if (!profileError && profile && profile.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }

  return { user };
}
