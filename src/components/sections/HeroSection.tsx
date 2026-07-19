"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, siteConfig } from "@/data";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

const easeOut = [0.16, 1, 0.3, 1] as const;

const WORDS = [
  { word: "Design.", className: "text-neutral-900" },
  { word: "Build.", className: "text-premium" },
  { word: "Launch.", className: "text-neutral-400" },
] as const;

const SHOWCASE = projects.filter((p) => p.featured);

export default function HeroSection() {
  const { openBooking } = useContactDrawer();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SHOWCASE.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const project = SHOWCASE[active]!;

  return (
    <section className="relative w-full px-6 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        {/* Left panel */}
        <div>
          <h1 className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight">
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
            className="mt-6 max-w-md text-base leading-relaxed text-neutral-600"
          >
            {siteConfig.description}
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
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
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
        </div>

        {/* Right panel — clean, ambient product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
        >
          <Link href={`/work/${project.id}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.25)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {project.title}
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
