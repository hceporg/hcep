"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import {
  IMAGE_ACCEPT,
  IMAGE_MAX_BYTES,
  IMAGE_SIZE_HINTS,
  uploadMediaFile,
  type MediaKind,
} from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  kind?: MediaKind;
  label?: string;
  hint?: string;
  className?: string;
  /** Allow video as well (CTA banners). */
  allowVideo?: boolean;
  mediaType?: "image" | "video";
  onMediaTypeChange?: (type: "image" | "video") => void;
};

export function ImageUpload({
  value,
  onChange,
  kind = "other",
  label = "Image",
  hint,
  className,
  allowVideo = false,
  mediaType = "image",
  onMediaTypeChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const sizeHint = hint ?? IMAGE_SIZE_HINTS[kind] ?? IMAGE_SIZE_HINTS.other;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setStatus("");

    setUploading(true);
    setStatus(
      file.type.startsWith("image/")
        ? "Converting to WebP…"
        : `Uploading ${(file.size / (1024 * 1024)).toFixed(2)} MB…`
    );

    try {
      const result = await uploadMediaFile(file, kind);
      onChange(result.publicUrl);
      onMediaTypeChange?.(result.mediaType);
      setStatus(
        result.mode === "demo"
          ? "Preview ready (demo mode — configure Supabase to persist)."
          : `Uploaded as WebP (${(result.sizeBytes / 1024).toFixed(0)} KB).`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setStatus("");
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
              alt="Upload preview"
              className="h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => {
              onChange(null);
              onMediaTypeChange?.("image");
              setStatus("");
              setError("");
            }}
            className="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white hover:bg-black/80 cursor-pointer"
            aria-label="Remove"
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
            {uploading
              ? "Uploading…"
              : allowVideo
                ? "Click to upload image or video"
                : "Click to upload image"}
          </span>
          <span className="text-xs text-muted">
            or drag &amp; drop · max{" "}
            {(IMAGE_MAX_BYTES / (1024 * 1024)).toFixed(0)} MB
            {allowVideo ? " (videos ≤ 80 MB)" : ""} · → WebP
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={
          allowVideo
            ? `${IMAGE_ACCEPT},video/mp4,video/webm,video/quicktime`
            : IMAGE_ACCEPT
        }
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      <p className="text-xs text-muted leading-relaxed">{sizeHint}</p>
      {status && !error && <p className="text-xs text-maroon">{status}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
