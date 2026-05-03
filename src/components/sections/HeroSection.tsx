"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig, stats } from "@/data";
import { useRef, useEffect, useState } from "react";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { open: openContact } = useContactDrawer();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 10000 : 120,
    damping: reduceMotion ? 100 : 28,
    mass: reduceMotion ? 0.01 : 0.18,
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "38%"]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);
  const contentScale = useTransform(smoothProgress, [0, 1], [1, 0.97]);
  const fadeOpacity = useTransform(smoothProgress, [0, 0.45, 0.85], [1, 0.55, 0]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0], { clamp: true });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 pt-32 overflow-hidden"
    >
      {/* Animated background — parallax + subtle scale (LaunchFolio-style depth) */}
      <motion.div
        style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none origin-center will-change-transform"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/4 blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, scale: contentScale, opacity: fadeOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full will-change-transform"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/[0.03] text-xs text-neutral-500 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {siteConfig.availability}
          <span className="text-neutral-400">·</span>
          <MapPin size={11} />
          {siteConfig.location}
        </motion.div>

        {/* Main heading — line-by-line mask reveal */}
        <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-neutral-900 mb-6 font-sans">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 0 } : { y: "100%", rotate: 0.001 }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.95,
                delay: reduceMotion ? 0 : 0.14,
                ease: easeOut,
              }}
            >
              Design that
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 0 } : { y: "100%", rotate: 0.001 }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.95,
                delay: reduceMotion ? 0 : 0.24,
                ease: easeOut,
              }}
            >
              <span className="italic text-neutral-500">actually</span> works.
            </motion.span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: easeOut }}
            className="max-w-sm text-neutral-500 text-base leading-relaxed"
          >
            {siteConfig.description} I focus on creating interfaces that serve a real purpose —
            making sure they&apos;re not just pretty, but solve real problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <Link href="/work">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-6 py-3.5 border border-black/10 text-neutral-800 text-sm font-medium rounded-full hover:border-black/30 hover:text-neutral-900 transition-all duration-200"
              >
                View work
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </Link>
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02, backgroundColor: "#d4eb3f" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-[var(--accent)] text-black text-sm font-semibold rounded-full transition-colors duration-200"
            >
              Book a call
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
          className="mt-16 pt-8 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 + i * 0.08, duration: 0.55, ease: easeOut }}
              className="flex flex-col"
            >
              <span
                className="text-3xl md:text-4xl text-neutral-900 mb-1 font-display"
              >
                {stat.value}
              </span>
              <span className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator: delayed fade-in × scroll-driven fade (matches Framer hero handoff) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: easeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          style={reduceMotion ? undefined : { opacity: scrollHintOpacity }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={reduceMotion ? false : { y: [0, 6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="w-5 h-8 rounded-full border border-black/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
