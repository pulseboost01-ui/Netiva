"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig, navLinks, workPhases, isContactDrawerLink } from "@/data";
import { useContactDrawer, useQuoteDrawer } from "@/components/contact/ContactDrawerContext";
import { Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { isValidExternalUrl } from "@/lib/content";

const socialIconMap = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
} as const;

const socialIcons = Object.entries(siteConfig.socials)
  .filter(([, href]) => isValidExternalUrl(href))
  .map(([key, href]) => ({
    icon: socialIconMap[key as keyof typeof socialIconMap] ?? Github,
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

export default function Footer() {
  const { open: openContact } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <footer id="contact-strip" className="border-t border-border bg-[var(--muted)]">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-end md:gap-10 md:px-10 md:py-20">
          <div>
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-muted-dim">
              Let&apos;s build
            </p>
            <h2 className="font-display text-4xl leading-[0.98] tracking-tight text-foreground md:text-6xl">
              Have a project
              <br />
              <em>worth building?</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tell me what you need—marketplace, dashboard, payment flow, or school system—and I&apos;ll reply with
              a practical next step.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-border bg-accent px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white sm:w-auto"
            >
              Get in touch
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground hover:text-foreground sm:text-right"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-accent">
              <span className="font-mono text-[10px] font-bold text-white">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{siteConfig.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-dim">
                {siteConfig.location}
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-5 md:gap-6" aria-label="Footer">
            {navLinks.map((link) =>
              isContactDrawerLink(link) ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => openContact()}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
            <button
              type="button"
              onClick={() => openQuote()}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Get a quote
            </button>
          </nav>

          {socialIcons.length > 0 ? (
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, color: "#141414" }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[var(--card)] text-muted-foreground transition-colors hover:border-black/25"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          ) : null}
        </div>

        <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.55em] text-muted-dim md:mt-5">
          {workPhases.join(" · ")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
            </p>
            <nav className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-dim">
              <Link href={siteConfig.privacyPolicyHref} className="hover:text-foreground">
                Privacy
              </Link>
              <Link href={siteConfig.termsHref} className="hover:text-foreground">
                Terms
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span>{siteConfig.availability}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
