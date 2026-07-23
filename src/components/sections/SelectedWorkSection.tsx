"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Real, verifiable outcome line per project — a result with a number or timeframe, never a
 * status ("Live marketplace" is exactly the pattern CLAUDE.md §5 forbids). Built only from facts
 * already established elsewhere in this codebase (duration, year, real outcomes fields) — no
 * invented metrics. Update alongside `projects` in src/data/index.ts if these facts change.
 */
const SELECTED_WORK_IDS = ["venstela", "draqla", "school-management-system"] as const;

const outcomeLines: Record<(typeof SELECTED_WORK_IDS)[number], string> = {
  venstela: "Escrow-backed bookings, live since 2024",
  draqla: "Launched in 12 weeks",
  "school-management-system": "Live in daily use since 2024",
};

export default function SelectedWorkSection() {
  const selected = SELECTED_WORK_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section id="selected-work" className="w-full scroll-mt-24 border-t border-black/6 px-6 pb-14 pt-14 md:px-10 md:pb-16 md:pt-20">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            Selected work
          </p>
          <h2 className="text-[clamp(1.95rem,4vw,2.85rem)] font-semibold leading-[1.02] tracking-tight text-neutral-900">
            Real builds, real teams.
          </h2>
        </div>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-900"
        >
          View all projects
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {selected.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
          >
            <Link href={`/work/${project.id}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/8">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
                  <span className="shrink-0 text-xs text-neutral-500">{project.category}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {outcomeLines[project.id as (typeof SELECTED_WORK_IDS)[number]]}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
