import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { EnquiryProvider } from "@/components/enquiry/EnquiryContext";
import { EnquiryModal } from "@/components/enquiry/EnquiryModal";
import { PageLoader } from "@/components/motion/PageLoader";
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
  title: {
    default: "Highlight Creations | Crafting Memorable Weddings",
    template: "%s | Highlight Creations",
  },
  description:
    "Highlight Creations — wedding planners in Agra. Venues, décor, and end-to-end celebrations. Price Beat Challenge available.",
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
        <PageLoader />
        <EnquiryProvider>
          {children}
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
