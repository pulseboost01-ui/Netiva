"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Netiva's own account of how an engagement runs, stage by stage — not client testimonials
 * and not a rehash of the project grid (WorkCategoriesSection already lists every project;
 * this section deliberately names none). Real client testimonials live separately in
 * ClientTestimonialsSection, which stays hidden until real quotes exist.
 */
const process = [
  {
    phase: "Strategy",
    description:
      "We start by mapping the problem, not the deliverable. Before any design or code, we align on what success looks like for your users and your business, then scope a build we can actually commit to.",
  },
  {
    phase: "Design",
    description:
      "Prototypes over decks. We design directly in the medium the product will ship in, so what you approve is close to what you get — fewer surprises at handoff.",
  },
  {
    phase: "Development",
    description:
      "Every engagement runs on a live staging URL from week one, not a big reveal at the end. Async updates by default, and every merge gets a second pair of eyes before it ships.",
  },
  {
    phase: "Launch",
    description:
      "Launch is the start of the support relationship, not the end of the invoice. We stay close through the first weeks in production, watching for what real usage surfaces.",
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            From the studio
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            How we
            <br />
            <span className="text-neutral-400">build.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Our own words, not client quotes — the four stages every engagement runs through.
          </p>
        </FadeIn>

        <div className="mt-10 divide-y divide-black/6 border-t border-black/6">
          {process.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
              className="grid gap-3 py-8 md:grid-cols-[minmax(0,220px)_1fr] md:items-baseline md:gap-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-300">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg font-semibold text-neutral-900">{item.phase}</p>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
