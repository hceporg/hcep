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

  // Optional role check — profiles row is created on signup via schema trigger
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile && profile.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }

  return { user };
}
