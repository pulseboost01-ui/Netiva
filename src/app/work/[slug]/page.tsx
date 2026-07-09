"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import LuxuryButton from "@/components/ui/LuxuryButton";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";
import { easeOutExpo } from "@/lib/motion";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { open: openContact } = useContactDrawer();
  const project = projects.find((p) => p.id === params.slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const externalUrl = "externalUrl" in project ? project.externalUrl : undefined;
  const frameVariant = project.id === "edtech" ? "phone" : "browser";

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl border-x border-border px-6 pb-12 md:px-10">
        <FadeIn>
          <Link
            href="/work"
            className="link-draw mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            All work
          </Link>
        </FadeIn>

        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-accent">
              {project.category} · {project.year}
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-foreground">
              {project.title}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{project.subtitle}</p>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <p className="mb-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-dim">
                  <Calendar size={10} /> Client
                </p>
                <p className="text-sm text-foreground">{project.client}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-dim">
                  <Clock size={10} /> Duration
                </p>
                <p className="text-sm text-foreground">{project.duration}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-dim">
                  <Tag size={10} /> Stack
                </p>
                <p className="text-sm text-foreground">{project.tags[0]}</p>
              </div>
            </div>
            {externalUrl ? (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent"
              >
                Visit live product
                <ExternalLink size={14} />
              </a>
            ) : null}
          </FadeIn>
        </div>
      </div>

      <FadeIn>
        <div className="mx-auto max-w-7xl border-x border-border px-6 py-12 md:px-10 md:py-16">
          <DeviceFrame label={project.title} variant={frameVariant}>
            <div className={`relative ${frameVariant === "phone" ? "aspect-[9/16]" : "aspect-[16/9]"}`}>
              <ProjectVisual
                project={project}
                fill
                showLabel={false}
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </DeviceFrame>
        </div>
      </FadeIn>

      <div className="mx-auto max-w-7xl border-x border-border px-6 pb-24 md:px-10">
        <div className="grid gap-16 border-t border-border py-16 md:grid-cols-2 md:py-24">
          <FadeIn>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-muted-dim">Problem</p>
            <p className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">{project.problem}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-muted-dim">
              Engineering
            </p>
            <ul className="mt-6 space-y-4">
              {project.engineering.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: easeOutExpo }}
                  className="flex gap-4 text-base text-muted-foreground"
                >
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="grid gap-8 border-t border-border py-16 md:grid-cols-3 md:py-20">
          <FadeIn className="rounded-luxury border border-border bg-card p-8 shadow-soft">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-dim">Services</p>
            <ul className="mt-5 space-y-3">
              {project.services.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.06} className="rounded-luxury border border-border bg-card p-8 shadow-soft">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-dim">Stack</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {project.outcomeStat ? (
            <FadeIn delay={0.12} className="rounded-luxury border border-accent/20 bg-accent-dim p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-dim">Outcome</p>
              <p className="font-display mt-4 text-5xl text-accent md:text-6xl">{project.outcomeStat.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {project.outcomeStat.label}
              </p>
            </FadeIn>
          ) : (
            <FadeIn delay={0.12} className="rounded-luxury border border-border bg-card p-8 shadow-soft">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-dim">Outcome</p>
              <p className="font-display mt-4 text-3xl text-foreground">{project.outcome}</p>
            </FadeIn>
          )}
        </div>

        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-8 rounded-luxury border border-border bg-card p-10 shadow-soft md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="font-display text-3xl text-foreground md:text-4xl">Building something similar?</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Send a brief with your goals, timeline, and constraints. I&apos;ll reply with scope and a clear next step.
              </p>
            </div>
            <LuxuryButton type="button" onClick={() => openContact()} size="lg" className="gap-2">
              Start a project
              <ArrowUpRight size={16} />
            </LuxuryButton>
          </div>
        </FadeIn>

        {otherProjects.length > 0 ? (
          <div className="mt-24 border-t border-border pt-16">
            <FadeIn>
              <h2 className="font-display mb-10 text-3xl text-foreground">More production work</h2>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {otherProjects.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/work/${p.id}`} className="group block">
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                      <div className="overflow-hidden rounded-luxury border border-border bg-card shadow-soft">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <ProjectVisual
                            project={p}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="33vw"
                          />
                        </div>
                        <div className="p-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dim">{p.category}</p>
                          <p className="font-display mt-2 text-lg text-foreground">{p.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
