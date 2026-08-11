"use client";

import { useEffect, useState } from "react";
import { BrandLogoMark } from "@/components/layout/BrandLogo";

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    const minTime = 900;
    const start = Date.now();

    function finish() {
      const remaining = Math.max(0, minTime - (Date.now() - start));
      window.setTimeout(() => {
        setPhase("exiting");
        window.setTimeout(() => setPhase("done"), 550);
      }, remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      window.setTimeout(finish, 1800);
    }
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`page-loader ${phase === "exiting" ? "page-loader-exit" : ""}`}
      aria-hidden={phase !== "loading"}
    >
      <div className="page-loader-inner">
        <BrandLogoMark
          priority
          className="h-24 sm:h-28 page-loader-logo animate-[loader-pulse_1.2s_ease-in-out_infinite]"
        />
        <div className="page-loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
