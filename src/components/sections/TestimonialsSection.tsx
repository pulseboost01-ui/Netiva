"use client";

import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { siteConfig, testimonials } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRef, useState } from "react";

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] p-6 rounded-2xl bg-[var(--card)] border border-black/5 mx-3">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={12} className="fill-[var(--accent)] text-[var(--accent)]" />
        ))}
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-5">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-black/5">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900">{testimonial.name}</p>
          <p className="text-xs text-neutral-500">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const xRef = useRef(0);

  const doubled = [...testimonials, ...testimonials];

  useAnimationFrame((_, delta) => {
    if (paused) return;
    if (!trackRef.current) return;
    xRef.current -= delta * 0.04;
    const totalWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= totalWidth) {
      xRef.current = 0;
    }
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <section className="overflow-hidden border-t border-black/6 py-14 md:py-20">
      <div className="mb-10 w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            Partner signals
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            Confidence on the record,
            <br />
            <span className="text-neutral-400">not in the reel.</span>
          </h2>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
            {siteConfig.socialProofLine}
          </p>
        </FadeIn>
      </div>

      {/* Scrolling testimonials */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[var(--background)] to-transparent" />

        <div ref={trackRef} className="flex will-change-transform">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
