"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig, navLinks, agencyPhases, isContactDrawerLink } from "@/data";
import { useContactDrawer, useQuoteDrawer } from "@/components/contact/ContactDrawerContext";
import { Linkedin, ArrowUpRight, X } from "lucide-react";

const socialIcons = [
  { icon: X, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  // { icon: Dribbble, href: siteConfig.socials.dribbble, label: "Dribbble" },
];

export default function Footer() {
  const { open: openContact } = useContactDrawer();
  const { open: openQuote } = useQuoteDrawer();

  return (
    <footer id="contact-strip" className="border-t border-black/8 bg-[var(--muted)] print:hidden">
      <div className="border-b border-black/8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-end md:gap-10 md:py-10 md:px-10">
          <div>
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-neutral-400">
              Let&apos;s build
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight text-neutral-900 md:text-6xl">
              The future
              <br />
              <span className="text-neutral-400">with signal.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
              Have a project that requires a deviation from the norm? Tell us what quiet problem you need to make
              loud—and we&apos;ll answer with a phased plan.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-neutral-900 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white sm:w-auto"
            >
              Drop us a signal
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500 hover:text-neutral-900 sm:text-right"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-[var(--accent)]">
              <span className="font-mono text-[10px] font-bold text-neutral-900">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-900">{siteConfig.name}</span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-5 md:gap-6">
            {navLinks.map((link) =>
              isContactDrawerLink(link) ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => openContact()}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </Link>
              ),
            )}
            <button
              type="button"
              onClick={() => openQuote()}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Get a Quote
            </button>
          </nav>

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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[var(--card)] text-neutral-500 transition-colors hover:border-black/25"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.55em] text-neutral-400 md:mt-5">
          {agencyPhases.join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/8 pt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          <Link href="/capability-statement" className="hover:text-neutral-900">
            Capability Statement
          </Link>
          <Link href="/company" className="hover:text-neutral-900">
            Company & Legal
          </Link>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t border-black/8 pt-5 md:flex-row">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
          </p>
        <nav className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              <Link href={siteConfig.privacyPolicyHref} className="hover:text-neutral-900">
                Privacy
              </Link>
              <Link href={siteConfig.termsHref} className="hover:text-neutral-900">
                Terms
              </Link>
            </nav>
            </div>
      </div>
    </footer>
  );
}
