import { createClient } from "@/lib/supabase/client";
import { convertImageToWebp } from "@/lib/image/webp";

/** Free tier: 1 GB total Storage — keep files compressed and lean. */
export const MEDIA_BUCKET = "media";

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB (before / after webp)
export const BLOG_IMAGE_MAX_BYTES = IMAGE_MAX_BYTES;
export const BANNER_IMAGE_MAX_BYTES = IMAGE_MAX_BYTES;
/** Compress banner videos (ffmpeg) before upload — stay well under 1 GB total. */
export const BANNER_VIDEO_MAX_BYTES = 80 * 1024 * 1024; // 80 MB

export const IMAGE_ACCEPT =
  "image/jpeg,image/jpg,image/png,image/webp,image/gif";
export const BLOG_IMAGE_ACCEPT = IMAGE_ACCEPT;
export const BANNER_MEDIA_ACCEPT =
  "image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

export const IMAGE_SIZE_HINTS = {
  reel_thumb:
    "Recommended: 1080 × 1920 px (9:16). Max 5 MB. Converted to WebP before upload.",
  venue:
    "Recommended: 1600 × 1200 px (4:3). Max 5 MB. Converted to WebP before upload.",
  portfolio:
    "Recommended: 1600 × 1067 px (3:2). Max 5 MB. Converted to WebP before upload.",
  cta:
    "Recommended: 1920 × 1080 px (16:9). Max 5 MB. Images convert to WebP; videos stay as uploaded.",
  blog_cover:
    "Recommended: 1600 × 900 px (16:9). Max 5 MB. Converted to WebP before upload.",
  blog_inline:
    "Recommended: 1200 × 800 px. Max 5 MB. Converted to WebP before upload.",
  banner:
    "Images: 1920 × 1080 px, max 5 MB (→ WebP). Videos: H.264 MP4, max 80 MB.",
  other:
    "Max 5 MB. Images are converted to WebP before upload.",
} as const;

export const BLOG_IMAGE_RECOMMENDED = IMAGE_SIZE_HINTS.blog_cover;
export const BANNER_MEDIA_RECOMMENDED = IMAGE_SIZE_HINTS.banner;

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

export type MediaKind =
  | "blog_cover"
  | "blog_inline"
  | "banner"
  | "venue"
  | "portfolio"
  | "cta"
  | "reel_thumb"
  | "other";

export type UploadResult = {
  publicUrl: string;
  path: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  mediaType: "image" | "video";
  mode: "supabase" | "demo";
};

function mediaTypeOf(mime: string): "image" | "video" {
  return VIDEO_TYPES.has(mime) ? "video" : "image";
}

export function validateImage(file: File): string | null {
  if (!IMAGE_TYPES.has(file.type)) {
    return "Please upload a JPG, PNG, WebP, or GIF image.";
  }
  if (file.size > IMAGE_MAX_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

export function validateBlogImage(file: File): string | null {
  return validateImage(file);
}

export function validateBannerMedia(file: File): string | null {
  const isImage = IMAGE_TYPES.has(file.type);
  const isVideo = VIDEO_TYPES.has(file.type);
  if (!isImage && !isVideo) {
    return "Please upload an image (JPG/PNG/WebP/GIF) or video (MP4/WebM).";
  }
  if (isImage && file.size > BANNER_IMAGE_MAX_BYTES) {
    return "Banner image must be 5 MB or smaller.";
  }
  if (isVideo && file.size > BANNER_VIDEO_MAX_BYTES) {
    return "Banner video must be 80 MB or smaller. Compress with ffmpeg before upload.";
  }
  return null;
}

function folderFor(kind: MediaKind): string {
  switch (kind) {
    case "banner":
      return "banners";
    case "blog_inline":
      return "blog/inline";
    case "blog_cover":
      return "blog/covers";
    case "venue":
      return "venues";
    case "portfolio":
      return "portfolio";
    case "cta":
      return "cta";
    case "reel_thumb":
      return "reels";
    default:
      return "other";
  }
}

function purposeFor(kind: MediaKind): string {
  if (kind === "banner" || kind === "blog_cover" || kind === "blog_inline") {
    return kind;
  }
  if (kind === "venue" || kind === "portfolio") return kind;
  return "other";
}

async function uploadToMedia(
  file: File,
  kind: MediaKind
): Promise<UploadResult> {
  const supabase = createClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folderFor(kind)}/${Date.now()}-${safeName}`;
  const mediaType = mediaTypeOf(file.type);

  if (!supabase) {
    return {
      publicUrl: URL.createObjectURL(file),
      path,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      mediaType,
      mode: "demo",
    };
  }

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Upload failed");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  await supabase.from("media_assets").insert({
    bucket: MEDIA_BUCKET,
    path,
    public_url: publicUrl,
    file_name: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    purpose: purposeFor(kind),
  });

  return {
    publicUrl,
    path,
    fileName: file.name,
    sizeBytes: file.size,
    mimeType: file.type,
    mediaType,
    mode: "supabase",
  };
}

/** Upload any image — converts to WebP in the browser first. */
export async function uploadImage(
  file: File,
  kind: MediaKind = "other"
): Promise<UploadResult> {
  const validationError = validateImage(file);
  if (validationError) throw new Error(validationError);
  const webp = await convertImageToWebp(file);
  if (webp.size > IMAGE_MAX_BYTES) {
    throw new Error("Converted WebP is still over 5 MB. Try a smaller source image.");
  }
  return uploadToMedia(webp, kind);
}

/** Upload a blog cover/inline image to Supabase Storage. */
export async function uploadBlogImage(
  file: File,
  folder: "covers" | "inline" = "covers"
): Promise<UploadResult> {
  return uploadImage(
    file,
    folder === "inline" ? "blog_inline" : "blog_cover"
  );
}

/** Upload a hero banner image or video to Supabase Storage. */
export async function uploadBannerMedia(file: File): Promise<UploadResult> {
  const validationError = validateBannerMedia(file);
  if (validationError) throw new Error(validationError);
  if (file.type.startsWith("image/")) {
    const webp = await convertImageToWebp(file);
    if (webp.size > BANNER_IMAGE_MAX_BYTES) {
      throw new Error("Converted WebP is still over 5 MB.");
    }
    return uploadToMedia(webp, "banner");
  }
  return uploadToMedia(file, "banner");
}

/** Upload CTA / venue / portfolio / reel thumbnail media. */
export async function uploadMediaFile(
  file: File,
  kind: MediaKind
): Promise<UploadResult> {
  if (file.type.startsWith("video/")) {
    const invalid = validateBannerMedia(file);
    if (invalid) throw new Error(invalid);
    return uploadToMedia(file, kind);
  }
  return uploadImage(file, kind);
}

/** @deprecated Use MEDIA_BUCKET — kept for older imports */
export const BLOG_IMAGE_BUCKET = MEDIA_BUCKET;
