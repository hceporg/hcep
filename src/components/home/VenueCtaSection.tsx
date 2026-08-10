"use client";

import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Luxury venue ambience — replace via Banner Manager / Supabase Storage when ready */
const VENUE_VIDEO =
  "https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_25fps.mp4";
const VENUE_POSTER =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80";

type Props = {
  settings: SiteSettings;
};

export function VenueCtaSection({ settings }: Props) {
  const { openEnquiry } = useEnquiry();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  return (
    <section className="bg-cream">
      {/* Full wall-to-wall video band */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[75vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover scale-105"
          src={VENUE_VIDEO}
          poster={VENUE_POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55" />

        <div className="relative z-10 flex min-h-[70vh] sm:min-h-[75vh] flex-col items-center justify-center text-center px-6 py-24">
          <Reveal variant="arise" duration={1000}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              Book your venue
            </h2>
          </Reveal>
          <Reveal variant="arise" delay={160} duration={1000}>
            <p className="mt-4 text-white/90 text-sm sm:text-base max-w-md mx-auto">
              Pick your date. Set your budget. Choose your venue.
            </p>
          </Reveal>
          <Reveal variant="arise" delay={280} duration={1000}>
            <div className="mt-8">
              <Button
                variant="primary"
                showArrow
                onClick={() => openEnquiry({ source: "venue-cta" })}
              >
                {settings.venue_cta_text}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="py-10 sm:py-12 flex justify-center">
        <Reveal variant="arise" delay={80}>
          <CtaButton text={settings.cta_text} source="venue-section-footer" />
        </Reveal>
      </div>
    </section>
  );
}
