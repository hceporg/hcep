import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  showName?: boolean;
  name?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  imageClassName,
  showName = true,
  name = "Highlight Creations",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <Image
        src="/images/logo-hc.png"
        alt="HC Event Planners"
        width={120}
        height={120}
        priority={priority}
        className={cn(
          "h-10 sm:h-11 w-auto object-contain",
          imageClassName
        )}
      />
      {showName && (
        <span className="font-serif text-lg sm:text-xl text-maroon tracking-tight group-hover:text-maroon-dark transition-colors">
          {name}
        </span>
      )}
    </Link>
  );
}

export function BrandLogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo-hc.png"
      alt="HC Event Planners"
      width={160}
      height={160}
      priority={priority}
      className={cn("w-auto object-contain", className)}
    />
  );
}
