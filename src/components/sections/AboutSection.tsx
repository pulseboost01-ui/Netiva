"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, stats, workHistory, workPhases } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function AboutSection() {
  const leadStat = stats[0];

  return (
    <section id="about" className="scroll-mt-24 border-t border-border section-luxury">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim"
        >
          About
        </motion.p>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-14">
          <div>
            <FadeIn>
              <h2 className="font-display mb-6 text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] tracking-[-0.03em] text-foreground">
                Solo developer.
                <br />
                <em>Production-focused builds.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.06}>
              <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">{siteConfig.description}</strong> I focus on
                systems that handle real users, real money, and real operational workflows—not template sites.
              </p>
              <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
                You work directly with me from scope through launch. I ship the core implementation myself and
                keep communication straightforward across time zones.
              </p>
              <motion.div className="mb-10 flex flex-wrap gap-2">
                {workPhases.map((phase, i) => (
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="rounded-full border border-border bg-foreground px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-background"
                  >
                    {phase}
                  </motion.span>
                ))}
              </motion.div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground"
              >
                View production work
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeIn>
          </div>

          <div className="space-y-5">
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[1.6rem] border border-border bg-[var(--card)] p-6 shadow-[0_20px_70px_-45px_rgba(22,21,19,0.45)] md:p-7"
              >
                <p className="font-display text-6xl tracking-tight text-accent md:text-[4.75rem]">
                  {leadStat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-dim">{leadStat.label}</p>
                <div className="mt-10 border-t border-border pt-5">
                  <p className="text-base font-semibold text-foreground">{siteConfig.legalName}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-dim">
                    {siteConfig.location}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="rounded-[1.6rem] border border-border bg-[var(--card)] p-6 shadow-[0_20px_70px_-45px_rgba(22,21,19,0.4)] md:p-7">
                <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-muted-dim">
                  Recent focus
                </p>
                <ul className="space-y-4">
                  {workHistory.map((job) => (
                    <motion.li
                      key={`${job.company}-${job.period}`}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="flex items-start justify-between gap-5 border-b border-border pb-4 last:border-none last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-foreground">{job.company}</p>
                        <p className="text-sm text-muted-foreground">{job.role}</p>
                      </div>
                      <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-muted-dim">
                        {job.period}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
    </section>
  );
}
