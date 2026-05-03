"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CAPABILITIES_SECTION_NO,
  capabilities,
  launchFolioTechStack,
  siteConfig,
} from "@/data";

export default function ServicesSection() {
  return (
    <section id="capabilities" className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-neutral-400">
              <span>{CAPABILITIES_SECTION_NO}</span>
              <motion.span
                className="hidden h-px flex-1 max-w-[120px] origin-left bg-black/15 sm:block md:max-w-[200px]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
              <span>Capabilities</span>
            </div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-[2.85rem]">
              Engineered narratives for
              <br />
              teams who ship with intent.
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {launchFolioTechStack.slice(0, 6).map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-full border border-black/8 bg-neutral-900 px-3 py-1 text-[13px] font-medium text-white"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
          <Link
            href="/services#pricing"
            className="group inline-flex shrink-0 items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-900"
          >
            View retainers & rates
            <ArrowRight size={14} className="-translate-x-0.5 transition-transform group-hover:translate-x-0" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <motion.article
              key={cap.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.075,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-[var(--card)] p-5 md:p-6"
            >
              <motion.span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              <span className="mb-12 font-mono text-[10px] uppercase tracking-[0.32em] text-neutral-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-neutral-900 md:text-xl">{cap.title}</h3>
              <p className="mt-3 text-sm leading-snug text-neutral-500">{cap.subtitle}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-500"
        >
          {siteConfig.tagline}
        </motion.p>
      </div>
    </section>
  );
}
