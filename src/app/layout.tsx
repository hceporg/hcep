import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { EnquiryProvider } from "@/components/enquiry/EnquiryContext";
import { EnquiryModal } from "@/components/enquiry/EnquiryModal";
import { PageLoader } from "@/components/motion/PageLoader";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Best Destination Wedding Planner in Rajasthan | Highlight Creations",
    template: "%s | Highlight Creations",
  },
  description:
    "Highlight Creations — luxury destination wedding planner for Agra, Jaipur, Udaipur & Bharatpur. Palace, fort & heritage weddings planned end to end. Get a free quote.",
  keywords: [
    "best destination wedding planner in Rajasthan",
    "luxury wedding planner Rajasthan",
    "top wedding planner Agra Jaipur Udaipur",
    "destination wedding planner Jaipur",
    "wedding planner in Agra",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "Best Destination Wedding Planner in Rajasthan | Highlight Creations",
    description:
      "Full-service destination wedding planning across Agra, Bharatpur, Jaipur, and Udaipur.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highlight Creations | Destination Wedding Planner",
    description:
      "Palace, fort, and heritage destination weddings across Agra & Rajasthan.",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink">
        <JsonLd data={localBusinessSchema()} />
        <PageLoader />
        <EnquiryProvider>
          {children}
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
