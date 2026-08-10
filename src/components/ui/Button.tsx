"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  showArrow?: boolean;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-white hover:bg-maroon-dark shadow-sm",
  secondary:
    "bg-cream-dark text-maroon hover:bg-border",
  outline:
    "border border-maroon text-maroon bg-transparent hover:bg-maroon hover:text-white",
  ghost: "text-maroon hover:bg-cream-dark",
  white:
    "bg-white text-maroon hover:bg-cream shadow-sm",
};

export function Button({
  variant = "primary",
  showArrow = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <ChevronRight className="size-4" strokeWidth={2.5} />}
    </button>
  );
}
