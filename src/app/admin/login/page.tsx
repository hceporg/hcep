"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const supabase = createClient();
    if (!supabase) {
      // Demo mode — any credentials work
      router.push("/admin");
      router.refresh();
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        <Link href="/" className="font-serif text-xl text-maroon block text-center">
          Highlight Creations
        </Link>
        <h1 className="mt-6 text-center font-semibold text-ink text-lg">
          Admin login
        </h1>
        <p className="text-center text-sm text-muted mt-1">
          Sign in to manage banners, reels, venues &amp; leads.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              defaultValue="enquiry@highlighcreations.com"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-xs text-center text-muted">
          Without Supabase env vars, admin runs in demo mode with mock data.
        </p>
      </div>
    </div>
  );
}
