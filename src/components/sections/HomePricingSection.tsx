"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { homePricing } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useContactDrawer, useQuoteDrawer } from "@/components/contact/ContactDrawerContext";

export default function HomePricingSection() {
  const { open } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <section id="home-pricing" className="border-t border-border scroll-mt-24 py-16 md:py-24">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.2rem)] text-foreground md:text-[3.4rem]">
            {homePricing.headline}
            <br />
            <em>{homePricing.headlineEm}</em>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">{homePricing.leadBold}</strong>
            {homePricing.leadRest}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homePricing.steps.map((s, i) => (
            <FadeIn key={s.title} delay={0.05 * i}>
              <div className="rounded-[1.45rem] border border-border bg-card p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">{homePricing.footerNote}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-[1.7rem] border border-accent/25 bg-accent-dim p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {homePricing.unlimited.kicker}
              </p>
              <h3 className="font-display mt-3 text-2xl text-foreground">{homePricing.unlimited.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{homePricing.unlimited.description}</p>
              <div className="mt-6">
                {homePricing.unlimited.price != null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-foreground">
                      ${homePricing.unlimited.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/ {homePricing.unlimited.period}</span>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-foreground">Scoped per project — let&apos;s discuss</p>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {homePricing.unlimited.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted-foreground">
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
                className="mt-8 w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-white"
              >
                {homePricing.unlimited.cta}
              </motion.button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex h-full flex-col rounded-[1.7rem] border border-border bg-[var(--card)] p-8 shadow-[0_20px_70px_-45px_rgba(22,21,19,0.4)]">
              <h3 className="font-display text-2xl text-foreground">{homePricing.single.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{homePricing.single.description}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {homePricing.single.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-muted-dim" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
              <motion.button
                type="button"
                onClick={() => openQuote()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-full border border-border-strong py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-black/25"
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
