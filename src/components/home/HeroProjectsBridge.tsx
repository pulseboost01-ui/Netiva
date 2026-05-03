"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, siteConfig, trustedLogos } from "@/data";
import { useEffect, useRef, useState } from "react";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import HandoffFlyingPortal from "@/components/home/HandoffFlyingPortal";

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll track: only slightly taller than the viewport so the handoff has room to run
 * without a long empty gap before Latest Projects.
 */
/** Scroll track for card handoff — keep compact so Latest Projects sits closer under the hero. */
const BRIDGE_SCROLL_HEIGHT_CLASS = "h-[96vh] md:h-[110vh]";

export default function HeroProjectsBridge({
  onHandoffProgress,
  handoffTilesRevealed = false,
}: {
  onHandoffProgress?: (v: number) => void;
  handoffTilesRevealed?: boolean;
} = {}) {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { open: openContact, openBooking } = useContactDrawer();

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ["start start", "end end"],
    layoutEffect: true,
  });

  /* Spring breaks scroll-linked opacity at mount (wrong initial progress → hero stays invisible).
   * Raw progress keeps opacity correct at rest; card motion still feels smooth enough. */
  const p = scrollYProgress;

  const scrollHintOpacity = useTransform(p, [0, 0.06], [1, 0], { clamp: true });

  useMotionValueEvent(p, "change", (latest) => {
    onHandoffProgress?.(latest);
  });

  useEffect(() => {
    onHandoffProgress?.(p.get());
  }, [onHandoffProgress, p]);

  const featured = projects.filter((x) => x.featured).slice(0, 3);
  const heroWhatsAppPrefill = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    "Hello Netiva — I would like to schedule a conversation about a new project.",
  )}`;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduceMotion) {
    return (
      <section
        id="hero"
        aria-label="Introduction"
        className="relative flex min-h-screen flex-col justify-center py-16 font-sans md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] h-full w-full max-w-6xl -translate-x-1/2 border-x border-neutral-300/90"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div>
            <div className="border-b border-t border-neutral-300/90">
              <div className="flex flex-col items-start gap-10 px-6 pb-8 pt-20 md:flex-row md:gap-12 md:px-10 md:pb-10 md:pt-20">
            <div className="min-w-0 w-full md:w-1/2 md:flex-none md:max-w-[50%]">
              <HeroMetaRow />
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {siteConfig.availability}
              </div>
              <h1 className="mb-4 text-[clamp(2.65rem,6.9vw,5rem)] font-semibold leading-[1.02] tracking-[-0.038em] font-sans">
                <span className="block text-neutral-500">{siteConfig.hero.line1}</span>
                <span className="block text-neutral-900">{siteConfig.hero.line2}</span>
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-neutral-600 md:text-[17px]">
                <span className="font-medium text-neutral-900">{siteConfig.hero.leadBold}</span>
                {siteConfig.hero.leadRest}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <motion.button
                  type="button"
                  onClick={() => openContact()}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center gap-4 rounded-full border border-black/10 bg-neutral-900 px-9 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_22px_50px_-20px_rgba(0,0,0,0.55)] transition-colors hover:bg-neutral-800"
                >
                  Drop us a signal
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => openBooking()}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center rounded-full border border-black/12 bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-900 shadow-sm transition-colors hover:border-black/20"
                >
                  Schedule Call
                </motion.button>
                <a
                  href={heroWhatsAppPrefill}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-500/10 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-900 transition-colors hover:bg-emerald-500/20"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="grid min-w-0 w-full gap-4 md:w-1/2 md:flex-none md:max-w-[50%]">
              {featured.map((project, i) => (
                <Link key={project.id} href={`/work/${project.id}`} className="block overflow-hidden rounded-3xl border border-black/10 bg-[var(--card)] shadow-sm">
                  <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </Link>
              ))}
            </div>
              </div>
            </div>
            <div className="border-b border-neutral-300/90 px-6 py-4 md:px-10 md:py-6">
              <SocialProofStrip />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-visible font-sans">
      {/* Ref on the scroll-length wrapper so useScroll progress is 0 at page top */}
      <div ref={bridgeRef} className={`relative ${BRIDGE_SCROLL_HEIGHT_CLASS}`}>
        {/* Full-height vertical rails (LaunchFolio grid) — span entire scroll track */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] h-full w-full max-w-6xl -translate-x-1/2 border-x border-neutral-300/90"
        />

        <div className="sticky top-0 flex min-h-[100dvh] flex-col justify-center overflow-visible py-6 md:min-h-[min(100dvh,900px)] md:py-3">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)]/[0.06] blur-[120px]" />
            <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl overflow-visible">
            <div>
              <div className="border-b border-t border-neutral-300/90">
                <div className="flex flex-col items-start gap-5 overflow-visible px-6 pb-4 pt-14 md:flex-row md:items-start md:gap-10 md:px-10 md:pb-6 md:pt-12 lg:pt-14">
              <div className="min-w-0 w-full font-sans md:w-1/2 md:flex-none md:max-w-[50%] md:border-r md:border-neutral-300/90 md:pr-10 md:pt-1">
                <HeroMetaRow />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {siteConfig.availability}
                </motion.div>

                <h1 className="mb-4 font-sans text-[clamp(2.65rem,6.9vw,5rem)] font-semibold leading-[1.02] tracking-[-0.038em]">
                  <span className="block overflow-hidden text-neutral-500">
                    <motion.span
                      className="block"
                      initial={{ y: "100%", rotate: 0.001 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, delay: 0.14, ease: easeOut }}
                    >
                      {siteConfig.hero.line1}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden text-neutral-900">
                    <motion.span
                      className="block"
                      initial={{ y: "100%", rotate: 0.001 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, delay: 0.22, ease: easeOut }}
                    >
                      {siteConfig.hero.line2}
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
                  className="max-w-xl text-[15px] leading-relaxed text-neutral-600 md:text-[17px]"
                >
                  <span className="font-medium text-neutral-900">{siteConfig.hero.leadBold}</span>
                  {siteConfig.hero.leadRest}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.42, ease: easeOut }}
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <motion.button
                    type="button"
                    onClick={() => openContact()}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex items-center rounded-full border border-black/12 bg-neutral-900 px-9 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_22px_50px_-20px_rgba(0,0,0,0.55)] transition-colors hover:bg-neutral-800"
                  >
                    Drop us a signal
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => openBooking()}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex items-center justify-center rounded-full border border-black/12 bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-900 shadow-sm transition-colors hover:border-black/20"
                  >
                    Schedule Call
                  </motion.button>
                  <a
                    href={heroWhatsAppPrefill}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-500/10 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-900 transition-colors hover:bg-emerald-500/20"
                  >
                    WhatsApp
                  </a>
                </motion.div>
              </div>

              <div className="mt-8 grid gap-4 md:mt-0 md:hidden">
                {featured.map((project, i) => (
                  <Link key={project.id} href={`/work/${project.id}`} className="block">
                    <article className="overflow-hidden rounded-3xl border border-black/10 bg-[var(--card)] shadow-sm">
                      <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              <div
                ref={cardStageRef}
                aria-hidden
                className="relative isolate z-[2] hidden min-h-[340px] min-w-0 w-full overflow-visible md:block md:h-[clamp(340px,_52vh,_560px)] md:w-1/2 md:flex-none md:max-w-[50%] md:shrink-0 md:pt-1"
              />
              {!reduceMotion ? (
                <HandoffFlyingPortal
                  progress={p}
                  featured={featured}
                  stageRef={cardStageRef}
                  active={!handoffTilesRevealed}
                />
              ) : null}
                </div>
              </div>
              <div className="border-b border-neutral-300/90 px-6 py-3.5 md:px-10 md:py-5">
                <SocialProofStrip />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.45, ease: easeOut }}
            style={{ opacity: scrollHintOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex w-[min(calc(100%-3rem),72rem)] -translate-x-1/2 items-end justify-between gap-6 px-6 md:bottom-9 md:px-10"
          >
            <span className="hidden pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400 sm:block md:text-[11px]">
              Scroll to explore
            </span>
            <motion.div className="mx-auto flex flex-col items-center gap-2 pb-px sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-8 w-[18px] items-start justify-center rounded-full border border-black/14 pt-[5px]"
              >
                <motion.div
                  className="h-1 w-px rounded-full bg-neutral-900/70"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            <span className="hidden pb-1 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 sm:block">
              {siteConfig.siteVersion}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroMetaRow() {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-medium uppercase tracking-[0.38em] text-neutral-400">
      <span className="text-neutral-700">{siteConfig.location}</span>
    </div>
  );
}

function SocialProofStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex -space-x-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-neutral-200 to-neutral-100"
              style={{ zIndex: 5 - i }}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
          <span className="tracking-tight text-amber-500">★★★★★</span>
          <span className="text-neutral-800">{siteConfig.socialProofLine}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {trustedLogos.map((name) => (
          <span
            key={name}
            className="text-[13px] font-semibold uppercase tracking-wide text-neutral-400"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

