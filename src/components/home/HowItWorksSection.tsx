"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/enquiry/CtaButton";
import type { SiteSettings } from "@/lib/types";

const steps = [
  {
    number: 1,
    title: "Share your requirements",
    description:
      "Tell us your event date, budget, location, type of venue, guest count, etc.",
    expanded: true,
  },
  {
    number: 2,
    title: "Get a personalised proposal",
    description: "",
    expanded: false,
  },
  {
    number: 3,
    title: "Confirm and book",
    description: "",
    expanded: false,
  },
];

export function HowItWorksSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="arise" className="text-center mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-maroon/30" />
            <svg viewBox="0 0 24 6" className="w-6 text-maroon/50" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 3h24M18 0l6 3-6 3" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-maroon">
            How it works
          </h2>
          <p className="mt-3 text-muted text-sm sm:text-base">
            Book your wedding service in 3 easy steps
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Steps */}
          <Reveal variant="slide-left" delay={100}>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        step.expanded
                          ? "bg-maroon text-white"
                          : "bg-maroon/10 text-maroon"
                      }`}
                    >
                      {step.number}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-maroon/20 min-h-[32px]" />
                    )}
                  </div>
                  <div className={`pb-8 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink leading-tight">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="mt-2 text-muted text-sm sm:text-base max-w-md">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Phone illustration */}
          <Reveal variant="slide-right" delay={200}>
            <div className="relative flex justify-center">
              <div className="w-64 sm:w-72 aspect-square rounded-full bg-cream-dark flex items-center justify-center">
                <div className="w-40 sm:w-48 rounded-2xl bg-white shadow-lg p-5 transform rotate-[-3deg]">
                  <div className="text-center space-y-2">
                    <div className="text-4xl">📱</div>
                    <p className="text-sm text-ink font-medium leading-snug">
                      I want my wedding in Goa. My budget is 60 Lakhs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="arise" delay={300} className="mt-12 flex justify-center">
          <CtaButton text={settings.cta_text} source="how-it-works" />
        </Reveal>
      </div>
    </section>
  );
}
