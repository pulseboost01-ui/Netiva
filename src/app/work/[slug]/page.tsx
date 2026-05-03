"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { open: openContact } = useContactDrawer();
  const project = projects.find((p) => p.id === params.slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="pt-28">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <FadeIn>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-end mb-12">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">
              {project.category}
            </p>
            <h1 className="text-5xl md:text-6xl text-neutral-900 leading-[1.05]">
              {project.title}
            </h1>
            {"subtitle" in project && project.subtitle ? (
              <p className="mt-3 text-lg text-neutral-500">{project.subtitle}</p>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-neutral-500 text-base leading-relaxed mb-6">{project.description}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar size={10} /> Client
                </p>
                <p className="text-sm text-neutral-700">{project.client}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Clock size={10} /> Duration
                </p>
                <p className="text-sm text-neutral-700">{project.duration}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Tag size={10} /> Year
                </p>
                <p className="text-sm text-neutral-700">{project.year}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Hero image */}
      <FadeIn>
        <div className="relative aspect-[16/7] overflow-hidden max-w-6xl mx-auto px-6 mb-16">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </FadeIn>

      {/* Project details */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Services */}
          <FadeIn className="p-6 rounded-2xl bg-[var(--card)] border border-black/5">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Services</p>
            <ul className="space-y-2">
              {project.services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-neutral-600">
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Tags */}
          <FadeIn delay={0.05} className="p-6 rounded-2xl bg-[var(--card)] border border-black/5">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Tags</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-full bg-neutral-50 text-neutral-500 border border-black/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Outcome */}
          <FadeIn
            delay={0.1}
            className="p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03]"
          >
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">Key Outcome</p>
            <p
              className="text-4xl text-[var(--accent)] font-display"
            >
              {project.outcome}
            </p>
          </FadeIn>
        </div>

        {/* More images grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[
            "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80",
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={img} alt={`${project.title} detail ${i + 1}`} fill className="object-cover" sizes="50vw" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="p-8 md:p-12 rounded-2xl bg-[var(--card)] border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl md:text-3xl text-neutral-900 mb-2 font-display"
              >
                Want results like this?
              </h3>
              <p className="text-neutral-600 text-sm">
                Let&apos;s talk about your project and how I can help.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02, backgroundColor: "#d4eb3f" }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-black font-semibold rounded-full whitespace-nowrap"
            >
              Start a project
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </FadeIn>

        {/* More work */}
        {otherProjects.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <h3
                className="text-2xl text-neutral-900 mb-8 font-display"
              >
                More work
              </h3>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              {otherProjects.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/work/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="group rounded-xl overflow-hidden bg-[var(--card)] border border-black/5"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="33vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-neutral-400 mb-1">{p.category}</p>
                        <p
                          className="text-sm text-neutral-800 group-hover:text-neutral-900 transition-colors font-display"
                        >
                          {p.title}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
