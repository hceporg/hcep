"use client";

import { useEffect, useRef } from "react";
import type { CtaBanner, SiteSettings } from "@/lib/types";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const FALLBACK: Pick<
  CtaBanner,
  "title" | "subtitle" | "media_url" | "media_type" | "button_text"
> = {
  title: "Book your venue",
  subtitle: "Pick your date. Set your budget. Choose your venue.",
  media_url:
    "https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_25fps.mp4",
  media_type: "video",
  button_text: "Check availability",
};

type Props = {
  settings: SiteSettings;
  cta?: CtaBanner | null;
};

export function VenueCtaSection({ settings, cta }: Props) {
  const { openEnquiry } = useEnquiry();
  const videoRef = useRef<HTMLVideoElement>(null);
  const banner = cta ?? FALLBACK;
  const isVideo = banner.media_type === "video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo, banner.media_url]);

  return (
    <section className="bg-cream">
      <div className="relative w-full min-h-[70vh] sm:min-h-[75vh] overflow-hidden">
        {isVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover scale-105"
            src={banner.media_url}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner.media_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55" />

        <div className="relative z-10 flex min-h-[70vh] sm:min-h-[75vh] flex-col items-center justify-center text-center px-6 py-24">
          <Reveal variant="arise" duration={1000}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              {banner.title}
            </h2>
          </Reveal>
          <Reveal variant="arise" delay={160} duration={1000}>
            <p className="mt-4 text-white/90 text-sm sm:text-base max-w-md mx-auto">
              {banner.subtitle}
            </p>
          </Reveal>
          <Reveal variant="arise" delay={280} duration={1000}>
            <div className="mt-8">
              <Button
                variant="primary"
                showArrow
                onClick={() => openEnquiry({ source: "venue-cta" })}
              >
                {banner.button_text || settings.venue_cta_text}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
