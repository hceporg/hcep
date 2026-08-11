"use client";

import { Eye, Play } from "lucide-react";
import type { Reel, SiteSettings } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  reels: Reel[];
  settings: SiteSettings;
};

function getInstagramThumbnail(url: string): string | null {
  const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  if (!match) return null;
  return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
}

export function ReelsSection({ reels, settings }: Props) {
  return (
    <section
      id="reviews-experiences"
      className="bg-cream py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="arise" className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-maroon">
            Our Clients&apos; Reviews &amp; Experiences
          </h2>
          <p className="mt-3 text-maroon/80 text-sm sm:text-base">
            Hear it from our happy couples and families
          </p>
        </Reveal>

        <Reveal
          variant="arise"
          delay={120}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory reveal-stagger"
        >
          {reels.map((reel) => {
            const thumb = getInstagramThumbnail(reel.instagram_url);
            return (
              <a
                key={reel.id}
                href={reel.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative shrink-0 w-[160px] sm:w-[180px] lg:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden snap-start bg-cream-dark shadow-sm"
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={reel.couple_name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-maroon/40 to-maroon" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/45 backdrop-blur-sm px-2 py-0.5 text-[11px] text-white">
                  <Eye className="size-3" />
                  {reel.view_count}
                </div>

                <div className="absolute top-3 right-3 rounded-full bg-black/40 p-1.5 text-white">
                  <Play className="size-3.5 fill-white" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <p className="font-serif text-white text-base sm:text-lg leading-tight">
                    {reel.couple_name}
                  </p>
                  {reel.location && (
                    <span className="inline-block mt-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
                      {reel.location}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </Reveal>

        <Reveal variant="arise" delay={200} className="mt-10 flex justify-center">
          <CtaButton text={settings.cta_text} source="reels-section" />
        </Reveal>
      </div>
    </section>
  );
}
