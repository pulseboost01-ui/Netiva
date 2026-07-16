"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Pen, Code2, Database, Check, type LucideProps } from "lucide-react";
import { services, faqs } from "@/data";
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
    title: "Discovery Call",
    description:
      "A working session to align incentives, timelines, stakeholders, and the north-star outcomes you measure.",
  },
  {
    step: "02",
    title: "Proposal & Contract",
    description:
      "We deliver a phased proposal—scope narrative, RACI-lite, roadmap, commercials, then green-light with deposit.",
  },
  {
    step: "03",
    title: "Design & Iteration",
    description:
      "Design and engineering sprint in tandem—reviews at predictable intervals, ruthless decision logs, async + live.",
  },
  {
    step: "04",
    title: "Delivery & Support",
    description:
      "Handover with documentation plus 30 days of stabilization—we stay close until KPIs plateau.",
  },
];

export default function ServicesPage() {
  const { open: openContact } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <div className="pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-3">
            Expertise
          </p>
          <h1 className="text-5xl md:text-7xl text-neutral-900 mb-6">
            Capabilities &
            <br />
            <em>engagement.</em>
          </h1>
          <p className="text-neutral-600 text-base max-w-md leading-relaxed mb-12">
            The same pillars we showcase on-site—every scope is quoted after a discovery call, once we understand
            what you actually need.
          </p>
        </FadeIn>

        {/* Service cards */}
        <StaggerChildren id="pricing" className="grid gap-4 mb-14 scroll-mt-24 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-7 rounded-2xl border h-full flex flex-col ${
                    service.popular
                      ? "border-[var(--accent)]/30 bg-[var(--accent)]/[0.04]"
                      : "border-black/5 bg-[var(--card)]"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-[var(--accent)] text-black text-xs font-bold rounded-full shadow-lg shadow-[var(--accent)]/20">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="w-11 h-11 rounded-xl bg-black/5 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-neutral-600" />
                  </div>

                  <h2
                    className="text-2xl text-neutral-900 mb-2 font-display"
                  >
                    {service.title}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-2.5 mb-7 flex-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <Check
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${service.popular ? "text-[var(--accent)]" : "text-neutral-400"}`}
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
                    className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all ${
                      service.popular
                        ? "bg-[var(--accent)] text-black hover:bg-[#d4eb3f]"
                        : "border border-black/10 text-neutral-700 hover:border-black/25 hover:text-neutral-900"
                    }`}
                  >
                    Book intro call
                  </motion.button>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* How it works */}
        <div className="mb-12">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-3">
              The Process
            </p>
            <h2
              className="text-4xl md:text-5xl text-neutral-900 mb-14 font-display"
            >
              How we work
              <br />
              <em>together</em>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="p-7 rounded-2xl bg-[var(--card)] border border-black/5 flex gap-5">
                  <span
                    className="text-5xl text-neutral-900/8 flex-shrink-0 leading-none font-display"
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3
                      className="text-lg text-neutral-900 mb-2 font-display"
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Custom project CTA */}
        <FadeIn>
          <div className="p-7 md:p-10 rounded-2xl bg-[var(--card)] border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8">
            <div>
              <h3 className="text-2xl text-neutral-900 mb-2 font-display">Off‑menu engagements</h3>
              <p className="text-neutral-600 text-sm max-w-md">
                Deviation from norm is encouraged—send the messy brief and we&apos;ll architect a phased response.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => openQuote()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-7 py-3.5 border border-black/15 text-neutral-800 font-medium rounded-full hover:border-black/30 hover:text-neutral-900 transition-all whitespace-nowrap"
            >
              Get a quote
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto">
        <FAQSection />
      </div>
    </div>
  );
}
