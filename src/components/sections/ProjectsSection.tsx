"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { useRef } from "react";

function ProjectTileInner({
  project,
  subtitle,
}: {
  project: (typeof projects)[number];
  subtitle: string;
}) {
  return (
    <>
      <div
        data-handoff-slot={project.id}
        className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]"
      >
        <ProjectVisual
          project={project}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-border bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft">
            View Project
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 p-5 md:p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground">
          View Project
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </>
  );
}

function ProjectDeferredTile({ project }: { project: (typeof projects)[number] }) {
  const subtitle = "subtitle" in project && project.subtitle ? project.subtitle : project.category;
  return (
    <div className="opacity-100 md:invisible md:opacity-0">
      <Link href={`/work/${project.id}`} className="group block touch-manipulation">
        <article className="overflow-hidden rounded-3xl border border-border bg-[var(--card)]">
          <ProjectTileInner project={project} subtitle={subtitle} />
        </article>
      </Link>
    </div>
  );
}

function ProjectRevealTile({ project }: { project: (typeof projects)[number] }) {
  const subtitle = "subtitle" in project && project.subtitle ? project.subtitle : project.category;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.id}`} className="group block touch-manipulation">
        <article className="overflow-hidden rounded-3xl border border-border bg-[var(--card)]">
          <ProjectTileInner project={project} subtitle={subtitle} />
        </article>
      </Link>
    </motion.div>
  );
}

function ProjectScrollTile({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof projects)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const subtitle = "subtitle" in project && project.subtitle ? project.subtitle : project.category;
  const start = 0.22 + index * 0.08;
  const end = Math.min(start + 0.32, 0.92);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <Link href={`/work/${project.id}`} className="group block touch-manipulation">
        <article className="overflow-hidden rounded-3xl border border-border bg-[var(--card)]">
          <ProjectTileInner project={project} subtitle={subtitle} />
        </article>
      </Link>
    </motion.div>
  );
}

function ProjectTile({
  project,
  index,
  scrollYProgress,
  suppressFirstThreeUntilHandoff,
}: {
  project: (typeof projects)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  suppressFirstThreeUntilHandoff?: boolean;
}) {
  const isDeferredPlacement = suppressFirstThreeUntilHandoff === true && index < 3;

  /** After hero flying cards dock into grid slots (md), fade/slide tiles in normally. */
  const isRevealEntrance = suppressFirstThreeUntilHandoff === false && index < 3;

  if (isDeferredPlacement) return <ProjectDeferredTile project={project} />;
  if (isRevealEntrance) return <ProjectRevealTile project={project} />;
  return <ProjectScrollTile project={project} index={index} scrollYProgress={scrollYProgress} />;
}

export default function ProjectsSection({
  suppressFirstThreeUntilHandoff,
}: {
  suppressFirstThreeUntilHandoff?: boolean;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const featured = projects.filter((p) => p.featured);

  return (
    <section
      ref={containerRef}
      id="selected-work"
      className="w-full scroll-mt-24 px-6 pb-12 pt-2 md:px-10 md:pb-14 md:pt-3"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim"
      >
        Work
      </motion.div>
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <FadeIn>
          <h2 className="font-display text-[clamp(2rem,4vw,2.95rem)] leading-[0.98] tracking-[-0.03em] text-foreground">
            Selected projects
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground"
          >
            View all projects
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeIn>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:gap-4">
        {featured.map((project, i) => (
          <ProjectTile
            key={project.id}
            project={project}
            index={i}
            scrollYProgress={scrollYProgress}
            suppressFirstThreeUntilHandoff={suppressFirstThreeUntilHandoff}
          />
        ))}
      </div>

      <FadeIn delay={0.15} className="mt-10 text-center md:hidden">
        <Link
          href="/work"
          className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          View all my projects →
        </Link>
      </FadeIn>
    </section>
  );
}
