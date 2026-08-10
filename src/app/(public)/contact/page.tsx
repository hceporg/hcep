"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockSettings } from "@/lib/mock-data";

export default function ContactPage() {
  const settings = mockSettings;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          city: form.get("city"),
          message: form.get("message"),
          source: "contact-page",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">
            Contact
          </h1>
          <p className="mt-3 text-muted">
            We&apos;d love to hear about your wedding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-ink">Phone</p>
              <a
                href={`tel:${settings.phone}`}
                className="text-maroon hover:underline"
              >
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">WhatsApp</p>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-maroon hover:underline"
              >
                Chat with us
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Email</p>
              <a
                href={`mailto:${settings.email}`}
                className="text-maroon hover:underline"
              >
                {settings.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Offices</p>
              <p className="text-muted text-sm">{settings.address}</p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-white p-6 space-y-4"
          >
            <Input name="name" label="Name" required />
            <Input name="email" label="Email" type="email" required />
            <Input name="phone" label="Phone" type="tel" required />
            <Input name="city" label="City" />
            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </div>
            {status === "success" && (
              <p className="text-sm text-green-700">Message sent — we&apos;ll reply soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong. Try again.</p>
            )}
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-maroon"
      />
    </div>
  );
}
