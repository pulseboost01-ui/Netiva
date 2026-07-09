"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const EDTECH_URL = "https://edtech.netiva.tech";

export default function EdtechSection() {
  return (
    <section id="edtech" className="scroll-mt-24 border-t border-border section-luxury">
      <FadeIn>
        <div className="rounded-luxury border border-border bg-card p-10 shadow-soft md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div className="max-w-2xl space-y-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-accent">
                <GraduationCap size={14} aria-hidden />
                For schools
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-foreground">
                School management software,
                <br />
                <em>separate from freelance builds.</em>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If you run a school in Uganda, visit{" "}
                <strong className="font-medium text-foreground">edtech.netiva.tech</strong> for fees,
                attendance, report cards, and parent/student mobile access. Live at Eden Blossoms Pre &amp;
                Primary School with <span className="font-display text-accent">114</span> students.
              </p>
            </div>
            <Link
              href={EDTECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_20px_50px_-20px_var(--accent-glow)] transition-colors hover:bg-[#a68435]"
            >
              Explore edtech
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
