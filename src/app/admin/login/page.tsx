"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const configError = useMemo(() => {
    const code = searchParams.get("error");
    if (code === "config") {
      return "Admin auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY on the server.";
    }
    if (code === "forbidden") {
      return "This account is not allowed to access the admin dashboard.";
    }
    return "";
  }, [searchParams]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    // Password is sent only to Supabase Auth over HTTPS — never stored in this app.
    const supabase = createClient();
    if (!supabase) {
      setError(
        "Supabase is not configured. Add env vars on Vercel / .env.local, then create an admin user in Supabase Auth."
      );
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Clear password from form DOM after attempt
    const passwordInput = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement | null;
    if (passwordInput) passwordInput.value = "";

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="font-serif text-xl text-maroon block text-center"
        >
          Highlight Creations
        </Link>
        <h1 className="mt-6 text-center font-semibold text-ink text-lg">
          Admin login
        </h1>
        <p className="text-center text-sm text-muted mt-1">
          Sign in with your Supabase admin account.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" autoComplete="on">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
            />
          </div>
          {(error || configError) && (
            <p className="text-sm text-red-600">{error || configError}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-xs text-center text-muted leading-relaxed">
          Passwords are verified by Supabase Auth and are never stored in this
          codebase or environment files. Create the admin user in the Supabase
          Dashboard → Authentication → Users.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center text-muted text-sm">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
