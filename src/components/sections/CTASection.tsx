"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

/** The homepage's one closing CTA block (§4.6) — sits directly above the footer, which stays minimal. */
export default function CTASection() {
  const { open: openContact } = useContactDrawer();

  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-end md:gap-10 md:px-10">
        <div>
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-neutral-400">
            Let&apos;s build
          </p>
          <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight text-neutral-900 md:text-6xl">
            Let&apos;s build
            <br />
            <span className="text-neutral-400">your next launch.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
            Tell us the scope, the timeline, and what &quot;done&quot; looks like — we&apos;ll reply with a phased plan and
            who on the team would work on it.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
          <motion.button
            type="button"
            onClick={() => openContact()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-neutral-900 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white sm:w-auto"
          >
            Message us
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500 hover:text-neutral-900 sm:text-right"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
