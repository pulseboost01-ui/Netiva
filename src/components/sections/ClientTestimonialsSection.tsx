"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { clientTestimonials } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ClientTestimonialsSection() {
  if (clientTestimonials.length === 0) return null;

  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            What clients say
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            In their own words
            <span className="text-[var(--accent)]">.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
              className="flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--card)] p-6"
            >
              <Quote size={20} className="text-accent" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">{testimonial.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
