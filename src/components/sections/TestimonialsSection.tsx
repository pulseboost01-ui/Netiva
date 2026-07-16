"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Netiva's own account of each engagement — not client testimonials. Deliberately styled
 * without quote marks or card chrome so it can never be mistaken for third-party endorsement.
 * Real client testimonials live separately in ClientTestimonialsSection, which stays hidden
 * until real quotes exist.
 */
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
            From the studio
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            How we approach
            <br />
            <span className="text-neutral-400">the work.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Our own account of each engagement, in our own words—not client testimonials. Real client testimonials,
            once collected, will appear in a clearly separate section.
          </p>
        </FadeIn>

        <div className="mt-10 divide-y divide-black/6 border-t border-black/6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
              className="grid gap-3 py-7 md:grid-cols-[minmax(0,220px)_1fr_auto] md:items-center md:gap-8"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-900">{project.title}</p>
                <p className="text-xs text-neutral-500">{project.category}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-neutral-600">{spotlights[project.id]}</p>
              <Link
                href={`/work/${project.id}`}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900 md:justify-self-end"
              >
                Case study
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
