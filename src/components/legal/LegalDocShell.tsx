import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/data";

const LEGAL_EFFECTIVE_LABEL = "Last updated";

type LegalDocShellProps = {
  title: string;
  /** ISO date preferred for semantics: YYYY-MM-DD */
  lastUpdatedISO: string;
  /** Display line under title, e.g. "3 May 2026" */
  lastUpdatedDisplay: string;
  summary?: ReactNode;
  children: ReactNode;
};

/** Shared chrome for Privacy & Terms routes (marketing site, not SPA). */
export default function LegalDocShell({
  title,
  lastUpdatedISO,
  lastUpdatedDisplay,
  summary,
  children,
}: LegalDocShellProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-14 pb-28 md:px-10 md:py-16">
      <header className="border-b border-black/10 pb-8">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
          <Link href="/" className="text-neutral-500 transition-colors hover:text-neutral-950">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href={siteConfig.privacyPolicyHref} className="text-neutral-500 transition-colors hover:text-neutral-950">
            Privacy
          </Link>
          <span aria-hidden>/</span>
          <Link href={siteConfig.termsHref} className="text-neutral-500 transition-colors hover:text-neutral-950">
            Terms
          </Link>
        </nav>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">Legal centre</p>
        <h1 className="mt-3 text-[clamp(1.85rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-neutral-900">
          {title}
        </h1>
        <p className="mt-5 text-[13px] text-neutral-500">
          <time dateTime={lastUpdatedISO}>{LEGAL_EFFECTIVE_LABEL}</time>:{" "}
          <span className="font-medium text-neutral-700">{lastUpdatedDisplay}</span>
          {" · "}Operated by{" "}
          <span className="text-neutral-800">{siteConfig.legalName ?? siteConfig.name}</span>
          {siteConfig.location ? (
            <>
              {" "}
              (<span>{siteConfig.location}</span>)
            </>
          ) : null}
        </p>
        {summary ? <div className="mt-5 max-w-prose border-l-2 border-[var(--accent)]/55 pl-4 text-[15px] leading-relaxed text-neutral-700">{summary}</div> : null}
        <p className="mt-6 rounded-xl border border-black/8 bg-neutral-950/[0.02] px-4 py-3 text-[12px] leading-relaxed text-neutral-500">
          <strong className="text-neutral-800">Notice:</strong> These documents are drafted for transparency and clarity.
          They are not legal advice. Engage counsel for regulations specific to your organization, jurisdictions, or
          industries.
        </p>
      </header>

      <div className="prose-custom pt-10">{children}</div>
    </article>
  );
}
