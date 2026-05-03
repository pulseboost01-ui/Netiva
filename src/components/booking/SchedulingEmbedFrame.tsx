"use client";

import { useState } from "react";

export default function SchedulingEmbedFrame({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-50 shadow-inner">
      {!loaded ? (
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center bg-neutral-50"
          aria-hidden
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
        </div>
      ) : null}
      <iframe
        title={title}
        src={src}
        className="h-[min(760px,78vh)] w-full bg-white"
        style={{ border: 0 }}
        allow="camera; microphone; fullscreen; payment"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
