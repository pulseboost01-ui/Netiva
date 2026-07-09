"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, siteConfig } from "@/data";
import ProjectVisual from "@/components/ui/ProjectVisual";
import LuxuryButton from "@/components/ui/LuxuryButton";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function HeroProjectsBridge() {
  const { open: openContact, openBooking } = useContactDrawer();
  const leadProject = projects.find((p) => p.featured) ?? projects[0];
  const heroWhatsAppPrefill = `https://wa.me/${siteConfig.phone.whatsappDigits}?text=${encodeURIComponent(
    "Hello Netiva — I would like to schedule a conversation about a new project.",
  )}`;

  return (
    <section id="hero" aria-label="Introduction" className="relative border-b border-border font-sans">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] h-full w-full max-w-7xl -translate-x-1/2 border-x border-border"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 pt-24 md:px-10 md:pb-8 md:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.38em] text-muted-dim">
              {siteConfig.location}
            </p>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {siteConfig.availability}
            </div>

            <h1 className="font-display text-hero mb-5 font-normal text-foreground">
              Full-stack web products for production.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {siteConfig.hero.leadBold}
              {siteConfig.hero.leadRest}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <LuxuryButton type="button" size="lg" magnetic={false} onClick={() => openContact()}>
                Get in touch
              </LuxuryButton>
              <LuxuryButton type="button" variant="outline" size="md" magnetic={false} onClick={() => openBooking()}>
                Schedule call
              </LuxuryButton>
              <a
                href={heroWhatsAppPrefill}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-emerald-700/25 bg-emerald-50 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <Link href={`/work/${leadProject.id}`} className="group block">
            <article className="overflow-hidden rounded-luxury border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
              <div className="relative aspect-[4/3]">
                <ProjectVisual
                  project={leadProject}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
                <div>
                  <p className="font-display text-lg text-foreground">{leadProject.title}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {leadProject.subtitle}
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors group-hover:border-accent/40">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </article>
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{siteConfig.socialProofLine}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-dim">
            4 platforms · 114 students live · 3 payment rails
          </p>
        </div>
      </div>
    </section>
  );
}
