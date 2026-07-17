import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { capabilityStatement, companyInfo, internationalEngagement, siteConfig } from "@/data";
import PrintButton from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Capability Statement",
  description:
    "Netiva's capability statement — legal name, team size, tech stack, sector experience, and quantified outcomes for procurement and vendor-vetting review.",
  alternates: { canonical: "/capability-statement" },
};

export default function CapabilityStatementPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-14 pb-28 md:px-10 md:py-16 print:py-6">
      <header className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">
            Procurement & vendor review
          </p>
          <h1 className="mt-3 text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-neutral-900">
            Capability Statement
          </h1>
          <p className="mt-3 text-sm text-neutral-500">{capabilityStatement.legalName} · {siteConfig.location}</p>
        </div>
        <PrintButton />
      </header>

      <section className="pt-10">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Overview</h2>
        <p className="text-[15px] leading-relaxed text-neutral-700 max-w-prose">
          {capabilityStatement.foundedContext} Netiva is a {capabilityStatement.teamSize} that designs, builds, and
          maintains production web platforms end to end — including payments-critical systems for African markets.
        </p>
      </section>

      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Technology stack</h2>
        <div className="flex flex-wrap gap-2">
          {capabilityStatement.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--card)] text-neutral-700 border border-black/8"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Sector experience</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilityStatement.sectorExperience.map((item) => (
            <div key={item.sector} className="p-5 rounded-2xl border border-black/5 bg-[var(--card)]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.sector}</p>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Key capabilities</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {capabilityStatement.quantifiedOutcomes.map((outcome) => (
            <div key={outcome.label} className="p-5 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03]">
              <p className="text-lg font-display text-neutral-900 mb-1 leading-snug">{outcome.value}</p>
              <p className="text-xs text-neutral-500 leading-snug">{outcome.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
          {internationalEngagement.heading}
        </h2>
        <p className="text-[15px] leading-relaxed text-neutral-700 max-w-prose mb-5">
          {internationalEngagement.body}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-5 rounded-2xl border border-black/5 bg-[var(--card)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">Payment rails</p>
            <ul className="space-y-1.5">
              {internationalEngagement.paymentRails.map((item) => (
                <li key={item} className="text-sm text-neutral-600 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-2xl border border-black/5 bg-[var(--card)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">Delivery & cadence</p>
            <ul className="space-y-1.5">
              {internationalEngagement.delivery.map((item) => (
                <li key={item} className="text-sm text-neutral-600 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-sm text-neutral-600 leading-relaxed">{internationalEngagement.contracting}</p>
      </section>

      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Legal & compliance</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Full legal entity, registration, and tax details are maintained on our{" "}
          <Link href="/company" className="font-medium underline decoration-black/25 underline-offset-2 hover:text-neutral-950">
            Company & Legal
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="pt-12 border-t border-black/8 mt-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Contact</h2>
        <p className="text-sm text-neutral-700">
          {companyInfo.contactEmail} · {companyInfo.contactPhone} · {siteConfig.location}
        </p>
      </section>
    </article>
  );
}
