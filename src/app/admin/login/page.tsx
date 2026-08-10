"use client";

import { Suspense, useActionState, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { adminLogin, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(adminLogin, {} as LoginState);

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

  const error = state.error || configError;

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

        <form action={formAction} className="mt-8 space-y-4" autoComplete="on">
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <SubmitButton />
        </form>
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
