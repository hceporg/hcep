"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/lib/types";
import { CtaButton } from "@/components/enquiry/CtaButton";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    title: "Share your requirements",
    description:
      "Tell us your event date, budget, location, type of venue, guest count, etc.",
  },
  {
    number: 2,
    title: "Get a personalised proposal",
    description:
      "We shortlist venues, share décor direction, and send a tailored plan with transparent pricing.",
  },
  {
    number: 3,
    title: "Confirm and book",
    description:
      "Lock your dates, confirm vendors, and let our team handle coordination until the big day.",
  },
];

function StepVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="w-40 sm:w-48 rounded-2xl bg-white shadow-lg p-5 transform rotate-[-3deg]">
        <div className="text-center space-y-2">
          <div className="text-4xl">📱</div>
          <p className="text-sm text-ink font-medium leading-snug">
            I want my wedding in Goa. My budget is 60 Lakhs
          </p>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="w-44 sm:w-52 rounded-2xl bg-white shadow-lg p-5 transform rotate-[2deg]">
        <div className="space-y-3">
          <div className="text-3xl">📋</div>
          <p className="text-sm font-semibold text-maroon">Your wedding proposal</p>
          <ul className="text-xs text-muted space-y-1.5 text-left">
            <li>• Venue shortlist for Goa</li>
            <li>• Décor moodboard</li>
            <li>• Day-wise function plan</li>
            <li>• Transparent budget breakdown</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="w-40 sm:w-48 rounded-2xl bg-white shadow-lg p-5 transform rotate-[-2deg]">
      <div className="text-center space-y-3">
        <div className="text-4xl">✅</div>
        <p className="text-sm font-semibold text-maroon">You&apos;re booked!</p>
        <p className="text-xs text-muted leading-relaxed">
          Dates confirmed · Vendors aligned · Planning team assigned
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection({ settings }: { settings: SiteSettings }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = rect.height - viewport;
      if (scrollable <= 0) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = scrolled / scrollable;
      const index = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      );
      setActiveStep(index);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-16 sm:top-[72px] h-[calc(100vh-4rem)] sm:h-[calc(100vh-72px)] flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-12">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-maroon">
              How it works
            </h2>
            <p className="mt-3 text-muted text-sm sm:text-base">
              Book your wedding service in 3 easy steps
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-0">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                return (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "size-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-500",
                          isActive
                            ? "bg-maroon text-white scale-110"
                            : isPast
                              ? "bg-maroon/20 text-maroon"
                              : "bg-maroon/10 text-maroon/50"
                        )}
                      >
                        {step.number}
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-px flex-1 min-h-[40px] transition-colors duration-500",
                            isPast ? "bg-maroon/40" : "bg-maroon/15"
                          )}
                        />
                      )}
                    </div>
                    <div
                      className={cn(
                        "pb-8 transition-all duration-500",
                        i === steps.length - 1 && "pb-0"
                      )}
                    >
                      <h3
                        className={cn(
                          "font-serif text-xl sm:text-2xl leading-tight transition-colors duration-500",
                          isActive
                            ? "text-ink"
                            : isPast
                              ? "text-ink/70"
                              : "text-ink/35"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-sm sm:text-base max-w-md transition-all duration-500 overflow-hidden",
                          isActive
                            ? "text-muted max-h-32 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative flex justify-center min-h-[280px] sm:min-h-[320px]">
              <div className="w-64 sm:w-80 aspect-square rounded-full bg-cream-dark flex items-center justify-center relative">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-700",
                      i === activeStep
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    )}
                  >
                    <StepVisual step={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center">
            <CtaButton text={settings.cta_text} source="how-it-works" />
          </div>
        </div>
      </div>
    </section>
  );
}
