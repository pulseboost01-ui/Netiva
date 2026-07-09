"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { easeOutExpo } from "@/lib/motion";

export default function CaseStudyShowcase() {
  return (
    <section id="case-studies" className="scroll-mt-24 border-b border-border">
      <div className="border-b border-border px-6 py-8 md:px-10 md:py-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-dim">Case studies</p>
          <h2 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] text-foreground">
            Four production builds
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Problem, engineering, and outcome for each platform — no filler case studies.
          </p>
        </FadeIn>
      </div>

      {projects.map((project, index) => {
        const reverse = index % 2 === 1;
        const frameVariant = project.id === "edtech" ? "phone" : "browser";

        return (
          <article
            key={project.id}
            className="border-b border-border px-6 py-12 md:px-10 md:py-16"
          >
            <div
              className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${reverse ? "lg:[direction:rtl]" : ""}`}
            >
              <div className={`lg:col-span-5 ${reverse ? "lg:[direction:ltr]" : ""}`}>
                <FadeIn>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-accent">
                    [ {String(index + 1).padStart(2, "0")} ] · {project.category}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">{project.subtitle}</p>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{project.problem}</p>
                  <div className="mt-6 inline-flex rounded-full border border-border bg-[var(--card)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                    {project.outcome}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {project.engineering.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {project.outcomeStat ? (
                    <div className="mt-10 border-t border-border pt-8">
                      <p className="font-display text-5xl text-accent md:text-6xl">{project.outcomeStat.value}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-dim">
                        {project.outcomeStat.label}
                      </p>
                    </div>
                  ) : null}
                  <Link
                    href={`/work/${project.id}`}
                    className="link-draw group mt-10 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground"
                  >
                    Read full case study
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </FadeIn>
              </div>

              <motion.div
                className={`lg:col-span-7 ${reverse ? "lg:[direction:ltr]" : ""}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.85, ease: easeOutExpo }}
              >
                <DeviceFrame label={project.title} variant={frameVariant}>
                  <div className={`relative ${frameVariant === "phone" ? "aspect-[9/16]" : "aspect-[16/10]"}`}>
                    <ProjectVisual
                      project={project}
                      fill
                      showLabel={false}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                  </div>
                </DeviceFrame>
              </motion.div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
