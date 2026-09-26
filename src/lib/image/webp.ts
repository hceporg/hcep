/** Browser-side image → WebP conversion before upload (saves Supabase Storage). */

const MAX_EDGE = 1920;

export type WebpOptions = {
  maxEdge?: number;
  quality?: number;
};

/**
 * Converts an image File to WebP in the browser.
 * Videos and non-image files are returned unchanged.
 */
export async function convertImageToWebp(
  file: File,
  options: WebpOptions = {}
): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  // Animated GIF — keep original (canvas flattens frames)
  if (file.type === "image/gif") return file;

  const maxEdge = options.maxEdge ?? MAX_EDGE;
  const quality = options.quality ?? 0.82;

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  if (width > maxEdge || height > maxEdge) {
    const scale = maxEdge / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image for WebP conversion.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("WebP conversion failed"))),
      "image/webp",
      quality
    );
  });

  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}
