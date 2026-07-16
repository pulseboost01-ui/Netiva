"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";

const categories = ["All", "Marketplace", "Streaming", "Education", "Wellness"];

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkPageContent />
    </Suspense>
  );
}

function WorkPageContent() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const matchedCategory = categories.find(
    (c) => c.toLowerCase() === requestedCategory?.toLowerCase(),
  );
  const [activeCategory, setActiveCategory] = useState(matchedCategory ?? "All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
      {/* Header */}
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">
          Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl text-neutral-900 mb-6">
          Selected
          <br />
          <em>Work</em>
        </h1>
        <p className="text-neutral-600 text-base max-w-md leading-relaxed mb-12">
          A curated collection of projects that delivered real results for real clients. Every
          project started with a problem worth solving.
        </p>
      </FadeIn>

      {/* Filter pills */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "border border-black/10 text-neutral-500 hover:border-black/20 hover:text-neutral-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <Link key={project.id} href={`/work/${project.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden bg-[var(--card)] border border-black/5 cursor-pointer h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight size={20} className="text-black" />
                    </div>
                  </motion.div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                    {project.category} · {project.year}
                  </p>
                  <h2
                    className="text-lg text-neutral-900 group-hover:text-[var(--accent)] transition-colors mb-2 flex-1 font-display"
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-neutral-50 text-neutral-400 border border-black/5"
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
