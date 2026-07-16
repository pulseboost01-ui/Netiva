"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, stats } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

const easeOut = [0.16, 1, 0.3, 1] as const;

const STACK = projects.filter((p) => p.featured).slice(0, 3);

/** Front / mid / back slot geometry for the stacked card carousel (Skillex-style). */
const SLOT_STYLE = [
  { left: "0%", width: "60%", top: "0%", height: "100%", zIndex: 30, scale: 1, opacity: 1 },
  { left: "56%", width: "24%", top: "0%", height: "100%", zIndex: 20, scale: 0.97, opacity: 1 },
  { left: "78%", width: "22%", top: "4%", height: "92%", zIndex: 10, scale: 0.94, opacity: 0.92 },
] as const;

function StackCard({
  project,
  slot,
}: {
  project: (typeof STACK)[number];
  slot: number;
}) {
  const style = SLOT_STYLE[slot]!;
  const isFront = slot === 0;
  const heroStat = stats[0];

  return (
    <div
      style={{
        left: style.left,
        width: style.width,
        top: style.top,
        height: style.height,
        zIndex: style.zIndex,
      }}
      className="absolute overflow-hidden rounded-[28px] bg-neutral-900"
    >
      <Link href={`/work/${project.id}`} className="absolute inset-0 z-10" aria-label={project.title} />
      <Image
        src={project.image}
        alt={project.title}
        fill
        priority={isFront}
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 40vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-premium/85 via-black/35 to-transparent mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {isFront ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/70">{project.category}</p>
            <p className="text-lg font-semibold text-white md:text-xl">{project.title}</p>
          </div>
          <div className="rounded-xl bg-premium px-3 py-2 text-right text-white shadow-lg">
            <span className="block text-xl font-bold leading-none md:text-2xl">{heroStat.value}</span>
            <span className="block text-[9px] uppercase tracking-wider text-white/80">
              {heroStat.label}
            </span>
          </div>
        </div>
      ) : (
        <span className="pointer-events-none absolute bottom-6 left-1/2 origin-left -translate-x-1/2 -rotate-90 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
          {project.category}
        </span>
      )}
    </div>
  );
}

export default function HeroSection() {
  const { openBooking } = useContactDrawer();

  return (
    <section className="relative w-full overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
      {/* Ambient brand-color wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-premium/[0.08] blur-[110px]" />
        <div className="absolute -right-16 top-1/4 h-[380px] w-[380px] rounded-full bg-[var(--accent)]/[0.12] blur-[110px]" />
        <div className="absolute left-1/3 bottom-0 h-3 w-3 rounded-full bg-premium/40 blur-[1px]" />
      </div>

      <div className="relative grid gap-12 md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-tight">
            {[
              { word: "Design.", className: "text-neutral-900" },
              { word: "Build.", className: "text-premium" },
              { word: "Launch.", className: "text-neutral-400" },
            ].map(({ word, className }, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className={`block ${className}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.05 + i * 0.1, ease: easeOut }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-2xl bg-premium px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(5,150,105,0.65)] transition-transform hover:scale-[1.02]"
            >
              View our work
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-7 py-4 text-sm font-semibold text-neutral-900 transition-colors hover:border-black/25"
            >
              Book a call
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="relative h-[380px] sm:h-[440px] md:h-[520px]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[32px] bg-gradient-to-br from-premium to-[var(--accent)] opacity-90 md:translate-x-6 md:translate-y-6"
          />
          {STACK.map((project, slot) => (
            <StackCard key={project.id} project={project} slot={slot} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
