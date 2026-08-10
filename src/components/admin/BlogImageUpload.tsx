"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import {
  BLOG_IMAGE_ACCEPT,
  BLOG_IMAGE_MAX_BYTES,
  BLOG_IMAGE_RECOMMENDED,
  uploadBlogImage,
  validateBlogImage,
} from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
};

export function BlogImageUpload({
  value,
  onChange,
  label = "Cover image",
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setHint("");

    const invalid = validateBlogImage(file);
    if (invalid) {
      setError(invalid);
      return;
    }

    setUploading(true);
    setHint(
      `Uploading ${(file.size / (1024 * 1024)).toFixed(2)} MB of max 5 MB…`
    );

    try {
      const result = await uploadBlogImage(file, "covers");
      onChange(result.publicUrl);
      setHint(
        result.mode === "demo"
          ? "Preview ready (demo mode — configure Supabase to persist uploads)."
          : "Uploaded to Supabase Storage."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setHint("");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-ink">{label}</p>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border bg-cream-dark aspect-[16/9] max-h-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setHint("");
              setError("");
            }}
            className="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white hover:bg-black/80 cursor-pointer"
            aria-label="Remove image"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (!uploading) void handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "w-full rounded-xl border-2 border-dashed px-4 py-10",
            "flex flex-col items-center justify-center gap-2 text-center transition-colors",
            "cursor-pointer disabled:opacity-60 disabled:cursor-wait",
            dragging
              ? "border-maroon bg-maroon/5"
              : "border-border bg-cream/50 hover:border-maroon/50 hover:bg-cream"
          )}
        >
          {uploading ? (
            <Loader2 className="size-8 text-maroon animate-spin" />
          ) : (
            <ImagePlus className="size-8 text-maroon" />
          )}
          <span className="text-sm font-medium text-ink">
            {uploading ? "Uploading…" : "Click to upload cover image"}
          </span>
          <span className="text-xs text-muted">
            or drag &amp; drop · max{" "}
            {(BLOG_IMAGE_MAX_BYTES / (1024 * 1024)).toFixed(0)} MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={BLOG_IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      <p className="text-xs text-muted leading-relaxed">{BLOG_IMAGE_RECOMMENDED}</p>

      {hint && !error && <p className="text-xs text-maroon">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
