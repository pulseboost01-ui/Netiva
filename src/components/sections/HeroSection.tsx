"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, capabilityStatement, projects } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import { ProjectCardLink } from "@/components/ui/ProjectCard";

const easeOut = [0.16, 1, 0.3, 1] as const;

const WORDS = [
  { word: "Design.", className: "text-neutral-900" },
  { word: "Build.", className: "text-accent" },
  { word: "Launch.", className: "text-neutral-400" },
] as const;

const heroProject = projects.find((p) => p.id === "venstela")!;
const platformsOutcome = capabilityStatement.quantifiedOutcomes.find(
  (o) => o.label === "Live production platforms shipped & maintained",
)!;

/**
 * Display headline, one concrete subline, one CTA (CLAUDE.md §4.1) — plus a real project visual
 * and a proof strip of already-live capability-statement stats, so the section carries evidence
 * above the fold instead of just a promise. Still one static image (no carousel) and one CTA:
 * this isn't the "auto-rotating showcase" the original no-image call ruled out, just a fixed
 * frame of real, shipped work. Full proof still lives one scroll away in SelectedWorkSection.
 */
export default function HeroSection() {
  const { openBooking } = useContactDrawer();

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] w-full items-start px-6 pb-32 pt-24 md:px-10 md:pb-40 md:pt-32">
      <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <h1 className="text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tight">
          {WORDS.map(({ word, className }, i) => (
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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600"
        >
          {siteConfig.heroSubline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Book a call
          </button>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900"
          >
            View our work
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
          className="mt-6 max-w-2xl text-sm text-neutral-500"
        >
          <span className="font-semibold text-neutral-900">{platformsOutcome.value} live production platforms</span>{" "}
          shipped and maintained — 8-week fixed launches to ongoing builds.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
        className="hidden lg:block"
      >
        <ProjectCardLink
          project={heroProject}
          subtitle="Escrow-backed bookings, live since 2024"
        />
      </motion.div>
      </div>
    </section>
  );
}
