"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data";
import { ProjectCardLink } from "@/components/ui/ProjectCard";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function WorkCategoriesSection() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All Work", ...unique];
  }, []);
  const [activeCategory, setActiveCategory] = useState("All Work");

  const visible =
    activeCategory === "All Work" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative w-full px-6 pb-16 pt-4 md:px-10 md:pb-20 md:pt-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-neutral-900"
        >
          Unlimited range across brand, product, and code
          <span className="text-[var(--accent)]">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-sm underline-offset-[10px] transition-colors ${
                  isActive
                    ? "font-semibold text-neutral-900 underline"
                    : "text-neutral-400 hover:text-neutral-700 hover:underline"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: easeOut }}
            >
              <ProjectCardLink project={project} subtitle={project.duration} aspectClassName="aspect-square" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
