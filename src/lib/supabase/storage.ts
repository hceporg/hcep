import { createClient } from "@/lib/supabase/client";

/** Free tier: 1 GB total Storage — keep files compressed and lean. */
export const MEDIA_BUCKET = "media";

export const BLOG_IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const BANNER_IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
/** Compress banner videos (ffmpeg) before upload — stay well under 1 GB total. */
export const BANNER_VIDEO_MAX_BYTES = 80 * 1024 * 1024; // 80 MB

export const BLOG_IMAGE_ACCEPT = "image/jpeg,image/jpg,image/png,image/webp,image/gif";
export const BANNER_MEDIA_ACCEPT =
  "image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

export const BLOG_IMAGE_RECOMMENDED =
  "Recommended size: 1600 × 900 px (16:9). Max file size: 5 MB. Formats: JPG, PNG, WebP, GIF.";

export const BANNER_MEDIA_RECOMMENDED =
  "Images: 1920 × 1080 px, max 5 MB. Videos: compress with ffmpeg first (H.264 MP4), max 80 MB. All files use the shared 1 GB Supabase Storage quota.";

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

export type MediaKind = "blog_cover" | "blog_inline" | "banner";

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

export function validateBlogImage(file: File): string | null {
  if (!IMAGE_TYPES.has(file.type)) {
    return "Please upload a JPG, PNG, WebP, or GIF image.";
  }
  if (file.size > BLOG_IMAGE_MAX_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
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
  if (kind === "banner") return "banners";
  if (kind === "blog_inline") return "blog/inline";
  return "blog/covers";
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
    purpose: kind === "banner" ? "banner" : kind,
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

/** Upload a blog cover/inline image to Supabase Storage. */
export async function uploadBlogImage(
  file: File,
  folder: "covers" | "inline" = "covers"
): Promise<UploadResult> {
  const validationError = validateBlogImage(file);
  if (validationError) throw new Error(validationError);
  return uploadToMedia(
    file,
    folder === "inline" ? "blog_inline" : "blog_cover"
  );
}

/** Upload a hero banner image or video to Supabase Storage. */
export async function uploadBannerMedia(file: File): Promise<UploadResult> {
  const validationError = validateBannerMedia(file);
  if (validationError) throw new Error(validationError);
  return uploadToMedia(file, "banner");
}

/** @deprecated Use MEDIA_BUCKET — kept for older imports */
export const BLOG_IMAGE_BUCKET = MEDIA_BUCKET;
