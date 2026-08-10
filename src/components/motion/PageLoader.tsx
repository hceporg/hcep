"use client";

import { useEffect, useState } from "react";

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
      // Fallback if load is slow / already interactive
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
        <div className="page-loader-mark" />
        <p className="page-loader-brand">Highlight Creations</p>
        <div className="page-loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
