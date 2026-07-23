"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, Quote, TrendingUp } from "lucide-react";
import { projects, type ProjectItem } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import CaseStudyMetrics from "./CaseStudyMetrics";

export default function ProjectCaseStudy({ project }: { project: ProjectItem }) {
  const { open: openContact } = useContactDrawer();
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const techStack = Array.from(new Set([...project.tags, ...project.services]));

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
            <div className="mb-3 flex items-center gap-2.5">
              <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium">
                {project.category}
              </p>
              {project.status === "ongoing" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Ongoing
                </span>
              ) : null}
            </div>
            <h1 className="text-5xl md:text-6xl text-neutral-900 leading-[1.05]">{project.title}</h1>
            {project.subtitle ? <p className="mt-3 text-lg text-neutral-500">{project.subtitle}</p> : null}
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
              alt={`${project.title} — ${project.subtitle}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </FadeIn>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {/* Quantified metrics */}
        {/* <CaseStudyMetrics metrics={project.metrics} /> */}

        {/* Tech stack badges */}
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Tech & scope</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--card)] text-neutral-600 border border-black/8"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Gallery — additional real screenshots, only shown once cleared for publishing */}
        {project.gallery && project.gallery.length > 0 ? (
          <FadeIn className="mb-16">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">More from this project</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/5">
                  <Image
                    src={src}
                    alt={`${project.title} — additional view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        ) : null}

        {/* Challenge -> Approach -> Result */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Challenge", copy: project.caseStudy.challenge },
            { label: "Approach", copy: project.caseStudy.approach },
            { label: "Result", copy: project.caseStudy.result },
          ].map((block, i) => (
            <FadeIn key={block.label} delay={i * 0.06} className="p-7 rounded-2xl bg-[var(--card)] border border-black/5">
              <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">{block.label}</p>
              <p className="text-sm leading-relaxed text-neutral-600">{block.copy}</p>
            </FadeIn>
          ))}
        </div>

        {/* Key outcomes */}
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
            <TrendingUp size={12} /> Key outcomes
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="p-5 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03]"
              >
                <p className="text-lg font-display mb-1 text-neutral-900 leading-snug">{outcome.value}</p>
                <p className="text-xs text-neutral-500 leading-snug">{outcome.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Testimonial — only rendered once a real client quote exists */}
        {project.testimonial ? (
          <FadeIn className="mb-16">
            <div className="p-8 md:p-10 rounded-2xl border border-black/5 bg-[var(--card)]">
              <Quote size={22} className="text-accent mb-4" />
              <p className="text-lg md:text-xl leading-relaxed font-display mb-6 text-neutral-800">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-500">
                  {project.testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{project.testimonial.name}</p>
                  <p className="text-xs text-neutral-500">
                    {project.testimonial.role} · {project.testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ) : null}

        {/* Visit live site */}
        {project.liveUrl ? (
          <FadeIn className="mb-16">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-[var(--card)] p-6 transition-colors hover:border-black/15"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Live product</p>
                <p className="text-sm text-neutral-700">{project.liveUrl.replace(/^https?:\/\//, "")}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </FadeIn>
        ) : null}

        {/* CTA */}
        <FadeIn>
          <div className="p-8 md:p-12 rounded-2xl bg-[var(--card)] border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl text-neutral-900 mb-2 font-display">Want results like this?</h3>
              <p className="text-neutral-600 text-sm">Let&apos;s talk about your project and how I can help.</p>
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
              <h3 className="text-2xl text-neutral-900 mb-8 font-display">More work</h3>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              {otherProjects.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/work/${p.id}`}>
                    <motion.div whileHover={{ y: -3 }} className="group rounded-xl overflow-hidden bg-[var(--card)] border border-black/5">
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
                        <p className="text-sm text-neutral-800 group-hover:text-neutral-900 transition-colors font-display">
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
