"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

/**
 * Server-side login so Supabase session cookies are written on the response.
 * Password is sent to Supabase Auth only — never stored in app code.
 */
export async function adminLogin(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("confirm") || msg.includes("not confirmed")) {
      return {
        error:
          "Email not confirmed. In Supabase → Authentication → Users, open the user and confirm the email (or disable “Confirm email” under Providers).",
      };
    }
    if (msg.includes("invalid")) {
      return { error: "Invalid email or password." };
    }
    return { error: error.message || "Sign-in failed. Try again." };
  }

  // Ensure session is readable before entering the dashboard
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error:
        "Signed in, but no session cookie was set. Check Supabase Auth → URL Configuration (Site URL = https://hcep.in).",
    };
  }

  redirect("/admin");
}
