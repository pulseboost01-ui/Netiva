"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data";

/** [001–IDENTITY] positioning block inspired by marquee agency sites. */
export default function FeaturedQuoteSection() {
  const { identity } = siteConfig;

  return (
    <section className="border-t border-black/6 bg-gradient-to-b from-[var(--background)] via-white/[0.35] to-[var(--background)] py-14 md:py-16">
      <div className="w-full px-6 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <motion.p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-neutral-400"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.42em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {identity.label}
            </motion.p>
            <div className="space-y-2">
              <motion.h2
                className="text-4xl font-semibold leading-[1.02] tracking-tight text-neutral-900 md:text-5xl"
                initial={{ opacity: 0.2, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.76, 0, 0.17, 1] }}
              >
                Same internet.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-400"
              >
                New signal.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <p className="text-lg leading-snug text-neutral-700 md:text-xl md:leading-relaxed">{identity.body}</p>
            <Link
              href={identity.manifestoHref}
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-900"
            >
              {identity.manifestoCta}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
