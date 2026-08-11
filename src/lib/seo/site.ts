export const SITE = {
  name: "Highlight Creations",
  legalName: "Highlight Creations",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://hcep.in",
  phone: "+91-7037401415",
  phoneDisplay: "+91-7037401415",
  whatsapp: "+917037401415",
  email: "contact.hcep@gmail.com",
  /** NAP — keep identical across GBP, directories, and site */
  address: {
    streetAddress:
      "Panchwati Plaza, Kaveri Vihar Phase II, Shamsabad, Agra, Basai",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "282004",
    addressCountry: "IN",
  },
  addressFull:
    "Highlight Creations, Panchwati Plaza, Kaveri Vihar Phase II, Shamsabad, Agra, Basai, Uttar Pradesh 282004",
  logoPath: "/images/logo.jpg",
  sameAs: [
    "https://www.instagram.com/highlightcreations/",
  ],
  priceRange: "$$$",
  areaServed: ["Agra", "Bharatpur", "Jaipur", "Udaipur", "Goa"] as const,
} as const;

export type CitySlug =
  | "agra"
  | "bharatpur"
  | "jaipur"
  | "udaipur";

export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
