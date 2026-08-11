"use client";

import { useEffect, useState } from "react";
import { Eye, Play } from "lucide-react";
import type { Reel, SiteSettings } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  reels: Reel[];
  settings: SiteSettings;
};

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
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </Reveal>

        <Reveal variant="arise" delay={200} className="mt-10 flex justify-center">
          <CtaButton text={settings.cta_text} source="reels-section" />
        </Reveal>
      </div>
    </section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const [thumb, setThumb] = useState<string | null>(reel.thumbnail_url);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    // Prefer stored thumbnail (demo Unsplash / admin-saved)
    if (reel.thumbnail_url) {
      setThumb(reel.thumbnail_url);
      setImgFailed(false);
      return;
    }

    // Skip fake example URLs — they can't resolve via Instagram
    if (/\/reel\/example/i.test(reel.instagram_url)) {
      setThumb(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/instagram?url=${encodeURIComponent(reel.instagram_url)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.thumbnail_url) {
          setThumb(data.thumbnail_url);
          setImgFailed(false);
        }
      } catch {
        // keep styled placeholder
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reel.instagram_url, reel.thumbnail_url]);

  const showImage = Boolean(thumb) && !imgFailed;

  return (
    <a
      href={reel.instagram_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative shrink-0 w-[160px] sm:w-[180px] lg:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden snap-start bg-cream-dark shadow-sm"
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb!}
          alt={reel.couple_name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a14] via-maroon to-[#4a1528]">
          {/* Instagram-style default reel frame */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
            <div className="size-14 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <Play className="size-6 fill-white text-white ml-0.5" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-white/70 text-center">
              Instagram Reel
            </p>
          </div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, #fff 0%, transparent 45%), radial-gradient(circle at 80% 70%, #f5c6c6 0%, transparent 40%)",
            }}
          />
        </div>
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
}
