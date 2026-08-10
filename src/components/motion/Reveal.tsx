"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** arise | fade | slide-left | slide-right | scale */
  variant?: "arise" | "fade" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "header" | "footer";
};

export function Reveal({
  children,
  className,
  variant = "arise",
  delay = 0,
  duration = 800,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal",
        `reveal-${variant}`,
        visible && "reveal-visible",
        className
      )}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
