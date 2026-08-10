"use client";

import { useRef, useState } from "react";
import { Film, ImagePlus, Loader2, X } from "lucide-react";
import {
  BANNER_MEDIA_ACCEPT,
  BANNER_MEDIA_RECOMMENDED,
  BANNER_VIDEO_MAX_BYTES,
  uploadBannerMedia,
  validateBannerMedia,
} from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

type Props = {
  value: string | null;
  mediaType: "image" | "video";
  onChange: (url: string | null, mediaType: "image" | "video") => void;
  label?: string;
  className?: string;
};

export function BannerMediaUpload({
  value,
  mediaType,
  onChange,
  label = "Banner media",
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

    const invalid = validateBannerMedia(file);
    if (invalid) {
      setError(invalid);
      return;
    }

    setUploading(true);
    const mb = (file.size / (1024 * 1024)).toFixed(2);
    const maxMb = (BANNER_VIDEO_MAX_BYTES / (1024 * 1024)).toFixed(0);
    setHint(`Uploading ${mb} MB (limit ${maxMb} MB for video)…`);

    try {
      const result = await uploadBannerMedia(file);
      onChange(result.publicUrl, result.mediaType);
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
        <div className="relative rounded-xl overflow-hidden border border-border bg-cream-dark aspect-video max-h-56">
          {mediaType === "video" ? (
            <video
              src={value}
              className="h-full w-full object-cover"
              muted
              playsInline
              controls
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Banner preview"
              className="h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => {
              onChange(null, "image");
              setHint("");
              setError("");
            }}
            className="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white hover:bg-black/80 cursor-pointer"
            aria-label="Remove media"
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
            <span className="flex gap-2 text-maroon">
              <ImagePlus className="size-8" />
              <Film className="size-8" />
            </span>
          )}
          <span className="text-sm font-medium text-ink">
            {uploading ? "Uploading…" : "Upload banner image or video"}
          </span>
          <span className="text-xs text-muted">
            Drag &amp; drop · images ≤ 5 MB · videos ≤ 80 MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={BANNER_MEDIA_ACCEPT}
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      <p className="text-xs text-muted leading-relaxed">
        {BANNER_MEDIA_RECOMMENDED}
      </p>

      {hint && !error && <p className="text-xs text-maroon">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
