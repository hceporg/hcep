import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function avatarColors(): string[] {
  return ["#7c3aed", "#0ea5e9", "#92400e", "#0d9488", "#ea580c", "#db2777", "#4f46e5", "#16a34a"];
}
