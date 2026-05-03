"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { homePricing } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useContactDrawer, useQuoteDrawer } from "@/components/contact/ContactDrawerContext";

export default function HomePricingSection() {
  const { open } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <section id="home-pricing" className="border-t border-black/6 scroll-mt-24 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <h2 className="font-display text-4xl text-neutral-900 md:text-5xl">
            {homePricing.headline}
            <br />
            <em>{homePricing.headlineEm}</em>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
            <strong className="font-semibold text-neutral-900">{homePricing.leadBold}</strong>
            {homePricing.leadRest}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homePricing.steps.map((s, i) => (
            <FadeIn key={s.title} delay={0.05 * i}>
              <div className="rounded-2xl border border-black/8 bg-[var(--card)] p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {s.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">{homePricing.footerNote}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.04] p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {homePricing.unlimited.kicker}
              </p>
              <h3 className="font-display mt-3 text-2xl text-neutral-900">{homePricing.unlimited.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{homePricing.unlimited.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-neutral-900">
                  ${homePricing.unlimited.price.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-500">/ {homePricing.unlimited.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {homePricing.unlimited.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-neutral-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
              <motion.button
                type="button"
                onClick={() => open()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white"
              >
                {homePricing.unlimited.cta}
              </motion.button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex h-full flex-col rounded-2xl border border-black/8 bg-[var(--card)] p-8">
              <h3 className="font-display text-2xl text-neutral-900">{homePricing.single.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{homePricing.single.description}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {homePricing.single.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-neutral-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-neutral-400" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
              <motion.button
                type="button"
                onClick={() => openQuote()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-full border border-black/15 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-black/25"
              >
                {homePricing.single.cta}
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
