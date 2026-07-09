"use client";

import { useEffect, useState } from "react";

/** Brief opacity fade on first paint — skipped when reduced motion is preferred. */
export default function FirstLoadFade({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="transition-opacity duration-500 ease-luxury"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
