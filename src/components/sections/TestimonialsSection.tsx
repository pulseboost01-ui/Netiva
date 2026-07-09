"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { siteConfig, testimonials } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { hasRealTestimonials } from "@/lib/content";
import { useRef, useState } from "react";

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="mx-3 w-[340px] flex-shrink-0 rounded-2xl border border-border bg-[var(--card)] p-6 md:w-[400px]">
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-muted-foreground">
          EB
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
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
  const showTestimonials = hasRealTestimonials(testimonials);
  const doubled = [...testimonials, ...testimonials];

  useAnimationFrame((_, delta) => {
    if (!showTestimonials || paused || !trackRef.current) return;
    xRef.current -= delta * 0.04;
    const totalWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= totalWidth) xRef.current = 0;
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <section className="overflow-hidden border-t border-border py-14 md:py-20">
      <div className="mb-10 w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim">
            Client feedback
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-foreground">
            What clients say,
            <br />
            <span className="text-muted-dim">when they say it.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {showTestimonials
              ? siteConfig.socialProofLine
              : "I'm collecting a written testimonial from Eden Blossoms Pre & Primary School—the live school management client."}
          </p>
        </FadeIn>
      </div>

      {showTestimonials ? (
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
          <div ref={trackRef} className="flex will-change-transform">
            {doubled.map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-10">
          <div className="rounded-2xl border border-dashed border-border bg-[var(--card)] p-8 md:p-10">
            <p className="text-sm font-medium text-foreground">Eden Blossoms Pre & Primary School</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Live edtech client with 114 students. A written testimonial from Alex Muheesi is pending—I&apos;d
              rather show one real quote than fill this section with placeholders.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
