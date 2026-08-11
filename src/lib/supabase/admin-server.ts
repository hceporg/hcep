import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Service-role client for admin mutations after verifying the caller's session.
 * Bypasses RLS — only use from server routes that check auth first.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function requireAdminSession() {
  const sessionClient = await createClient();
  if (!sessionClient) {
    return { error: "Supabase is not configured", status: 500 as const };
  }

  const {
    data: { user },
    error,
  } = await sessionClient.auth.getUser();

  if (error || !user) {
    return { error: "Unauthorized", status: 401 as const };
  }

  const admin = createServiceRoleClient();
  if (!admin) {
    return {
      error:
        "Admin backend not configured. Add SUPABASE_SERVICE_ROLE_KEY in Vercel env.",
      status: 500 as const,
    };
  }

  return { supabase: admin, user };
}
