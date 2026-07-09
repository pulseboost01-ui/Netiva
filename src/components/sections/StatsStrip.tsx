"use client";

import { motion } from "framer-motion";
import { stats } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function StatsStrip() {
  return (
    <section className="border-y border-border px-6 py-10 md:px-10 md:py-14">
      <FadeIn>
        <p className="mb-8 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim">
          By the numbers — all verifiable
        </p>
      </FadeIn>
      <div className="grid gap-10 md:grid-cols-3 md:gap-12">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[1.5rem] border border-border bg-card p-8 shadow-soft md:p-10"
            >
              <p className="font-display text-[clamp(3.75rem,9vw,6rem)] leading-none tracking-tight text-accent transition-colors group-hover:text-foreground">
                {stat.value}
              </p>
              <div className="hairline-gold my-5 w-16" />
              <p className="max-w-[16rem] font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
