"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCardLink } from "@/components/ui/ProjectCard";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="selected-work"
      className="w-full scroll-mt-24 px-6 pb-14 pt-0 md:px-10 md:pb-16 md:pt-1"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400"
      >
        Output log
      </motion.div>
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <FadeIn>
          <h2 className="text-[clamp(1.95rem,4vw,2.85rem)] font-semibold leading-[1.02] tracking-tight text-neutral-900">
            Curated collaborations
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-900"
          >
            View all projects
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeIn>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {featured.map((project, i) => {
          const subtitle =
            "subtitle" in project && project.subtitle ? project.subtitle : project.category;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: easeOut }}
            >
              <ProjectCardLink project={project} subtitle={subtitle} />
            </motion.div>
          );
        })}
      </div>

      <FadeIn delay={0.15} className="mt-10 text-center md:hidden">
        <Link
          href="/work"
          className="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
        >
          View all my projects →
        </Link>
      </FadeIn>
    </section>
  );
}
