"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data";

/** [001–IDENTITY] positioning block inspired by marquee agency sites. */
export default function FeaturedQuoteSection() {
  const { identity } = siteConfig;

  return (
    <section className="border-t border-border bg-[linear-gradient(180deg,rgba(247,241,232,0.45),rgba(236,229,217,0.95))] py-16 md:py-20">
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
              className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-muted-dim"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.42em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {identity.label}
            </motion.p>
            <motion.h2
                className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-foreground"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Solo developer. Production systems.
              </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">{identity.body}</p>
            <Link
              href={identity.manifestoHref}
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-foreground"
            >
              {identity.manifestoCta}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
