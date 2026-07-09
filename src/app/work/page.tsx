"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { isContentPlaceholder } from "@/lib/content";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <FadeIn>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-[var(--accent)]">Portfolio</p>
        <h1 className="mb-6 text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.95] text-foreground md:text-6xl">
          Production
          <br />
          <span className="text-muted-foreground">work</span>
        </h1>
        <p className="mb-12 max-w-xl text-base leading-relaxed text-muted-foreground">
          A compact portfolio of platforms I&apos;ve built for real operators: marketplaces, streaming, school systems,
          and internal workflows that need to hold up under daily use.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-14 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:border-black/20 hover:text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <Link key={project.id} href={`/work/${project.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.45rem] border border-border bg-card shadow-[0_20px_70px_-45px_rgba(22,21,19,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProjectVisual
                    project={project}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {!isContentPlaceholder(project.image) ? (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-muted-dim">
                      {project.category}
                    </p>
                    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="font-display mb-2 flex-1 text-lg text-foreground transition-colors group-hover:text-[var(--accent)]">
                    {project.title}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-neutral-50 px-2 py-0.5 text-xs text-muted-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--accent)]">{project.outcome}</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
