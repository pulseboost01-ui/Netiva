"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  agencyPhases,
  siteConfig,
  stats,
  workHistory,
} from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function AboutSection() {
  const leadStat = stats[0];

  return (
    <section id="agency" className="border-t border-black/6 scroll-mt-24 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400"
        >
          The agency
        </motion.p>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-14">
          <div>
            <FadeIn>
              <h2 className="mb-6 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
                Signals over static.
                <br />
                <span className="text-neutral-400">Systems over souvenirs.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.06}>
              <p className="mb-5 text-[15px] leading-relaxed text-neutral-600">
                <strong className="font-semibold text-neutral-900">{siteConfig.description}</strong>{" "}
                We obsess over fidelity from discovery through launch—articulating narratives in product,
                polish, and code.
              </p>
              <p className="mb-8 text-[15px] leading-relaxed text-neutral-600">
                Netiva behaves like your embedded frontier team—one pod, asynchronous by default,
                ruthless about documentation when time zones widen.
              </p>
              <motion.div className="mb-10 flex flex-wrap gap-2">
                {agencyPhases.map((phase, i) => (
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
                    className="rounded-full border border-black/8 bg-neutral-950 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white"
                  >
                    {phase}
                  </motion.span>
                ))}
              </motion.div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-900"
              >
                Open output log
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeIn>
          </div>

          <div className="space-y-5">
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-black/8 bg-[var(--card)] p-6 md:p-7"
              >
                <p className="text-6xl font-semibold tracking-tight text-neutral-900 md:text-[4.75rem]">
                  {leadStat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-neutral-400">{leadStat.label}</p>
                <div className="mt-10 border-t border-black/8 pt-5">
                  <p className="text-base font-semibold text-neutral-900">{siteConfig.name}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                    {siteConfig.location}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{siteConfig.tagline}</p>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="rounded-2xl border border-black/8 bg-[var(--card)] p-6 md:p-7">
                <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-neutral-400">
                  Signals on record
                </p>
                <ul className="space-y-4">
                  {workHistory.map((job) => (
                    <motion.li
                      key={`${job.company}-${job.period}`}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="flex items-start justify-between gap-5 border-b border-black/6 pb-4 last:border-none last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-neutral-900">{job.company}</p>
                        <p className="text-sm text-neutral-500">{job.role}</p>
                      </div>
                      <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-400">
                        {job.period}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
