"use client";

import { useEnquiry } from "./EnquiryContext";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

export function EnquiryModal() {
  const { isOpen, closeEnquiry, source, venueId } = useEnquiry();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      wedding_date: form.get("wedding_date") || null,
      city: form.get("city") || null,
      budget: form.get("budget") || null,
      message: form.get("message") || null,
      source,
      venue_id: venueId,
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={closeEnquiry}
      />
      <div className="relative w-full sm:max-w-lg bg-cream rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border bg-cream z-10">
          <div>
            <h2 className="font-serif text-2xl text-maroon">Start planning</h2>
            <p className="text-sm text-muted mt-0.5">
              Tell us a little about your wedding — we&apos;ll be in touch soon.
            </p>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            className="p-2 rounded-lg hover:bg-cream-dark text-muted cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-8 text-center">
            <p className="font-serif text-2xl text-maroon mb-2">Thank you!</p>
            <p className="text-muted mb-6">
              We&apos;ve received your enquiry and will reach out within 24 hours.
            </p>
            <Button onClick={closeEnquiry}>Close</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <Field label="Full name" name="name" required placeholder="Your name" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 …"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Wedding date" name="wedding_date" type="date" />
              <Field label="City / Destination" name="city" placeholder="Goa, Delhi…" />
            </div>
            <Field
              label="Approx. budget"
              name="budget"
              placeholder="e.g. 20–40 lakhs"
            />
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Guest count, style preferences…"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
              showArrow
            >
              {status === "loading" ? "Sending…" : "Submit enquiry"}
            </Button>
            <p className="text-xs text-muted text-center">
              By submitting, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-maroon">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
      />
    </div>
  );
}
