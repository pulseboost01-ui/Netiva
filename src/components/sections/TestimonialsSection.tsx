"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Netiva's own account of each engagement — not customer quotes, since we won't fabricate those. */
const spotlights: Record<string, string> = {
  venstela:
    "Venstela came to us needing a marketplace that could handle verified vendors, venues, and bookings without falling apart under real usage. We're still the team behind it today.",
  draqla:
    "Draqla needed a streaming experience fast enough for East African connections and slick enough to compete with global platforms. We shipped it and it's live.",
  "school-management-system":
    "A school needed one system four different roles could trust—parents, teachers, secretaries, admins. We built it, and we're still extending it as their needs grow.",
  "whispers-of-antidote":
    "A counseling practice needed a site as calm and trustworthy as the work itself. We designed and built it end to end.",
};

export default function TestimonialsSection() {
  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            Partner signals
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            Confidence on the record,
            <br />
            <span className="text-neutral-400">not in the reel.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
              className="flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--card)] p-6"
            >
              <Quote size={20} className="text-premium" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">
                {spotlights[project.id]}
              </p>
              <div className="mt-6 flex items-center justify-between gap-2 border-t border-black/5 pt-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{project.title}</p>
                  <p className="text-xs text-neutral-500">Netiva, on {project.title}</p>
                </div>
                <Link
                  href={`/work/${project.id}`}
                  className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition-colors hover:border-black/25 hover:text-neutral-900"
                  aria-label={`View ${project.title} case study`}
                >
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
