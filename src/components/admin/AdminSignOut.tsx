"use client";

import { createClient } from "@/lib/supabase/client";

export function AdminSignOut() {
  async function signOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="text-xs text-muted hover:text-maroon cursor-pointer"
    >
      Sign out
    </button>
  );
}
