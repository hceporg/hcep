"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import type { Review, SiteSettings } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { getInitial } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  reviews: Review[];
  settings: SiteSettings;
};

export function ReviewsSection({ reviews, settings }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section className="bg-cream py-16 sm:py-20 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="arise">
          <h2 className="font-serif text-3xl sm:text-4xl text-center text-maroon mb-10 sm:mb-12">
            Our Google Reviews
          </h2>
        </Reveal>

        <Reveal variant="arise" delay={120} className="relative">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scroll(-1)}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex size-10 items-center justify-center rounded-lg bg-white border border-border shadow-sm text-muted hover:text-maroon cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scroll(1)}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex size-10 items-center justify-center rounded-lg bg-white border border-border shadow-sm text-muted hover:text-maroon cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>

          <div
            ref={scroller}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory px-1"
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="shrink-0 w-[260px] sm:w-[280px] snap-start rounded-2xl bg-white border border-border/80 shadow-sm p-5 flex flex-col"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="size-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ backgroundColor: review.avatar_color }}
                  >
                    {getInitial(review.reviewer_name)}
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <p className="font-semibold text-ink text-sm">
                      {review.reviewer_name}
                    </p>
                    <BadgeCheck
                      className="size-4 text-[#1a73e8] fill-[#1a73e8]"
                      strokeWidth={0}
                    />
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {review.handle}
                    {review.handle && review.timeframe ? " · " : ""}
                    {review.timeframe}
                  </p>
                  <GoogleLogo className="mt-3 size-5" />
                  <div
                    className="mt-2 flex gap-0.5"
                    aria-label={`${review.rating} stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < review.rating} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink/80 leading-relaxed line-clamp-5 text-left">
                  {review.review_text}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal variant="arise" delay={200} className="mt-10 flex justify-center">
          <CtaButton text={settings.cta_text} source="reviews-section" />
        </Reveal>
      </div>
    </section>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4"
      fill={filled ? "#f5b301" : "#e5e5e5"}
    >
      <path d="M10 1.5l2.4 5.2 5.6.6-4.2 3.8 1.2 5.5L10 14.2l-4.9 2.9 1.2-5.5L2 7.3l5.6-.6L10 1.5z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
