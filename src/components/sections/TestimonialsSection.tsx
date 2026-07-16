"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function TestimonialsSection() {
  return (
    <section className="border-t border-black/6 py-14 md:py-20">
      <div className="w-full px-6 md:px-10">
        <FadeIn>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            Partner signals
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.9vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-neutral-900">
            Confidence on the record,
            <br />
            <span className="text-neutral-400">not in the reel.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
            >
              <Link
                href={`/work/${project.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--card)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400">{project.category}</p>
                    {project.status === "ongoing" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-premium/10 px-2 py-0.5 text-[10px] font-semibold text-premium">
                        <span className="h-1.5 w-1.5 rounded-full bg-premium" />
                        Ongoing
                      </span>
                    ) : null}
                  </div>
                  <p className="text-base font-semibold text-neutral-900">{project.title}</p>
                  <p className="mt-auto flex items-center gap-1.5 text-sm text-neutral-500">
                    {project.outcome}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
