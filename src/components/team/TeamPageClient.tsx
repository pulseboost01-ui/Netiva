"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, User } from "lucide-react";
import { teamMembers, capabilityStatement } from "@/data";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import { useContactDrawer } from "@/components/contact/ContactDrawerContext";

export default function TeamPageClient() {
  const { open: openContact } = useContactDrawer();

  return (
    <div className="pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-3">
            The team
          </p>
          <h1 className="text-5xl md:text-7xl text-neutral-900 mb-6">
            Who you&apos;d
            <br />
            <em>actually work with.</em>
          </h1>
          <p className="text-neutral-600 text-base max-w-md leading-relaxed mb-14">
            Netiva is a {capabilityStatement.teamSize}—small enough that you talk to the people building your
            product, large enough to staff a real engagement across design, backend, and frontend.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <StaggerItem key={member.id}>
              <div className="h-full p-6 rounded-2xl border border-black/5 bg-[var(--card)] flex flex-col">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-black/15 bg-neutral-950/[0.02] text-neutral-300">
                  <User size={26} />
                </div>
                {member.name ? (
                  <>
                    <p className="text-base font-semibold mb-1 text-neutral-900">{member.name}</p>
                    <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-medium mb-3">
                      {member.role}
                    </p>
                  </>
                ) : (
                  <p className="text-base font-semibold mb-3 text-neutral-900">{member.role}</p>
                )}
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">{member.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.1} className="mt-6">
          <p className="text-xs text-neutral-400">
            Roles shown without a name are real seats on the team; names go public once each person signs off.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-14">
          <div className="p-8 md:p-12 rounded-2xl bg-[var(--card)] border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl text-neutral-900 mb-2 font-display">Need to staff a project?</h3>
              <p className="text-neutral-600 text-sm">
                Tell us the scope and timeline—we&apos;ll tell you exactly who on the team would work on it.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => openContact()}
              whileHover={{ scale: 1.02, backgroundColor: "#d4eb3f" }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-black font-semibold rounded-full whitespace-nowrap"
            >
              Talk to the team
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
