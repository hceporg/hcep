"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/reels", label: "Reels" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/venues", label: "Venues" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav({ horizontal }: { horizontal?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        horizontal
          ? "flex gap-1 py-2"
          : "flex flex-col gap-0.5 p-3 flex-1"
      )}
    >
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
              active
                ? "bg-maroon text-white"
                : "text-ink/80 hover:bg-cream-dark hover:text-maroon"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
