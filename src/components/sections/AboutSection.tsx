"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, MessageCircle, Zap, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  agencyPhases,
  agencyPrinciples,
  siteConfig,
} from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
  Award,
  MessageCircle,
  Zap,
};

export default function AboutSection() {
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

        {/* Top row: heading + lead paragraph, side by side */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <h2 className="text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
              Proof over polish.
              <br />
              <span className="text-neutral-400">Systems over souvenirs.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="text-[15px] leading-relaxed text-neutral-600">
              <strong className="font-semibold text-neutral-900">{siteConfig.description}</strong>{" "}
              We obsess over fidelity from discovery through launch—articulating narratives in product,
              polish, and code. Netiva behaves like your embedded frontier team, asynchronous by default.
            </p>
          </FadeIn>
        </div>

        {/* Bottom row: principles list + stat-over-image */}
        <div className="mt-14 grid gap-14 md:grid-cols-2">
          <div>
            <ul>
              {agencyPrinciples.map((item, i) => {
                const Icon = iconMap[item.icon] || Award;
                const isLast = i === agencyPrinciples.length - 1;
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: easeOut }}
                    className="flex gap-5"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/8 bg-[var(--card)] text-neutral-700">
                        <Icon size={18} />
                      </span>
                      {!isLast && <span className="mt-1 w-px flex-1 border-l border-dashed border-black/15" />}
                    </div>
                    <div className={isLast ? "pb-0" : "pb-8"}>
                      <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                      <p className="mt-1 max-w-xs text-sm leading-relaxed text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {agencyPhases.map((phase) => (
                  <span
                    key={phase}
                    className="rounded-full border border-black/8 bg-neutral-950 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white"
                  >
                    {phase}
                  </span>
                ))}
              </div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-900"
              >
                View selected work
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl bg-neutral-950 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/projects/draqla2.jpg"
                  alt="Draqla — real product shipped by Netiva"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
