"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data";
import { Linkedin, X } from "lucide-react";

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialIcons = [
  { icon: X, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/6 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-[var(--accent)]">
            <span className="font-mono text-[9px] font-bold text-neutral-900">N</span>
          </div>
          <span className="text-sm font-semibold text-neutral-900">{siteConfig.name}</span>
        </div>

        <nav className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-[var(--accent)]"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        <p className="flex items-center gap-3 text-xs text-neutral-400">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <Link href={siteConfig.privacyPolicyHref} className="hover:text-neutral-700">
            Privacy
          </Link>
          <Link href={siteConfig.termsHref} className="hover:text-neutral-700">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
