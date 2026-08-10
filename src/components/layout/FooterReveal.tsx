"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function FooterReveal({ children }: { children: ReactNode }) {
  return (
    <Reveal variant="arise" duration={900}>
      {children}
    </Reveal>
  );
}
