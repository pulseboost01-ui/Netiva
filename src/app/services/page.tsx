"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Pen, Code2, Database, Check, type LucideProps } from "lucide-react";
import { services } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import FAQSection from "@/components/sections/FAQSection";
import { useContactDrawer, useQuoteDrawer } from "@/components/contact/ContactDrawerContext";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

const iconMap: Record<string, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
  Layers,
  Pen,
  Code2,
  Database,
};

const process = [
  {
    step: "01",
    title: "Discovery call",
    description: "We align on the problem, users, constraints, and what success looks like before any build starts.",
  },
  {
    step: "02",
    title: "Scope & estimate",
    description: "I send a clear scope outline with milestones, timeline, and pricing—no vague agency packages.",
  },
  {
    step: "03",
    title: "Build & review",
    description: "I implement directly with regular checkpoints so you can see progress and make decisions early.",
  },
  {
    step: "04",
    title: "Launch & handover",
    description: "We ship, test the real workflow, and document what you need to keep the system running.",
  },
];

export default function ServicesPage() {
  const { open: openContact } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <div className="pb-14 pt-24 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeIn>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted-dim">Services</p>
          <h1 className="mb-6 text-5xl text-foreground md:text-7xl">
            What I
            <br />
            <em>build.</em>
          </h1>
          <p className="mb-12 max-w-md text-base leading-relaxed text-muted-foreground">
            Project-based work for production web products. Pricing is scoped per engagement—reach out and we&apos;ll
            define it together.
          </p>
        </FadeIn>

        <StaggerChildren id="pricing" className="mb-14 grid scroll-mt-24 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    service.popular
                      ? "border-[var(--accent)]/30 bg-[var(--accent)]/[0.04]"
                      : "border-border bg-card"
                  }`}
                >
                  {service.popular ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-bold text-black shadow-lg shadow-[var(--accent)]/20">
                        Common starting point
                      </span>
                    </div>
                  ) : null}

                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-black/5">
                    <Icon size={20} className="text-muted-foreground" />
                  </div>

                  <h2 className="font-display mb-2 text-2xl text-foreground">{service.title}</h2>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

                  <div className="mb-6">
                    {service.price != null ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-light text-foreground">
                          ${service.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-dim">/ {service.priceType}</span>
                      </div>
                    ) : (
                      <p className="text-base font-semibold text-foreground">Scoped per project</p>
                    )}
                  </div>

                  <ul className="mb-7 flex-1 space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${service.popular ? "text-[var(--accent)]" : "text-muted-dim"}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    type="button"
                    onClick={() => openContact()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
                      service.popular
                        ? "bg-[var(--accent)] text-black hover:bg-[#d4eb3f]"
                        : "border border-border text-neutral-700 hover:border-black/25 hover:text-foreground"
                    }`}
                  >
                    Discuss your project
                  </motion.button>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">Process</p>
            <h2 className="font-display mb-14 text-4xl text-foreground md:text-5xl">
              How I work
              <br />
              <em>with you</em>
            </h2>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2">
            {process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="flex gap-5 rounded-2xl border border-border bg-card p-7">
                  <span className="font-display flex-shrink-0 text-5xl leading-none text-foreground/8">{step.step}</span>
                  <div>
                    <h3 className="font-display mb-2 text-lg text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn>
          <div className="mb-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card p-7 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="font-display mb-2 text-2xl text-foreground">Custom project?</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Send a brief with your goals, timeline, and constraints. I&apos;ll reply with a practical scope and
                estimate.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => openQuote()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-black/15 px-7 py-3.5 font-medium text-neutral-800 transition-all hover:border-black/30 hover:text-foreground"
            >
              Get a quote
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </FadeIn>
      </div>

      <FAQSection />
    </div>
  );
}
