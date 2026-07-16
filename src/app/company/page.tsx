import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo, siteConfig, PENDING_LEGAL_FIELD } from "@/data";

export const metadata: Metadata = {
  title: "Company & Legal",
  description:
    "Netiva's legal entity, registration status, and compliance details for procurement and vendor-vetting review.",
  alternates: { canonical: "/company" },
};

const fields: { label: string; value: string }[] = [
  { label: "Legal name", value: companyInfo.legalName },
  { label: "Trading as", value: companyInfo.tradingAs },
  { label: "Registration status", value: companyInfo.registrationStatus },
  { label: "Registration number", value: companyInfo.registrationNumber },
  { label: "Tax Identification Number (TIN)", value: companyInfo.tin },
  { label: "Certificate of good standing", value: companyInfo.certificateOfGoodStanding },
  { label: "Registered address", value: companyInfo.registeredAddress },
  { label: "Jurisdiction", value: companyInfo.jurisdiction },
];

export default function CompanyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-14 pb-28 md:px-10 md:py-16">
      <header className="border-b border-black/10 pb-8">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
          <Link href="/" className="text-neutral-500 transition-colors hover:text-neutral-950">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-neutral-700">Company</span>
        </nav>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-neutral-400">Legal centre</p>
        <h1 className="mt-3 text-[clamp(1.85rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-neutral-900">
          Company & legal standing
        </h1>
        <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-neutral-700 border-l-2 border-[var(--accent)]/55 pl-4">
          Netiva operates as a small studio based in {siteConfig.location}. This page exists so that procurement
          officers and vendor-vetting teams can find our legal and compliance details in one place, without having
          to ask.
        </p>
      </header>

      <div className="pt-10">
        <div className="not-prose overflow-x-auto rounded-xl border border-black/10">
          <table className="w-full min-w-[28rem] border-collapse text-left text-[13px]">
            <tbody className="divide-y divide-black/8 bg-[var(--card)]">
              {fields.map((field) => {
                const isPending = field.value === PENDING_LEGAL_FIELD;
                return (
                  <tr key={field.label}>
                    <th scope="row" className="w-1/3 px-4 py-3.5 align-top font-semibold text-neutral-700">
                      {field.label}
                    </th>
                    <td className={`px-4 py-3.5 align-top ${isPending ? "text-neutral-400 italic" : "text-neutral-800"}`}>
                      {field.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 rounded-xl border border-black/8 bg-neutral-950/[0.02] px-4 py-3 text-[12px] leading-relaxed text-neutral-500">
          <strong className="text-neutral-800">Notice:</strong> This page is not a substitute for formal
          due-diligence documents (incorporation certificate, tax clearance, etc.), which we can provide directly
          during a procurement process—reach out below.
        </p>

        <div className="mt-10">
          <h2 className="text-xl text-neutral-900 font-semibold mb-2">Direct contact for procurement teams</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            For due-diligence packets, signed reference letters, or compliance questionnaires, reach us directly at{" "}
            <a href={`mailto:${companyInfo.contactEmail}`} className="font-medium underline decoration-black/25 underline-offset-2 hover:text-neutral-950">
              {companyInfo.contactEmail}
            </a>{" "}
            or {companyInfo.contactPhone}.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          <Link href="/capability-statement" className="hover:text-neutral-900">
            Capability statement
          </Link>
          <Link href={siteConfig.privacyPolicyHref} className="hover:text-neutral-900">
            Privacy
          </Link>
          <Link href={siteConfig.termsHref} className="hover:text-neutral-900">
            Terms
          </Link>
        </div>
      </div>
    </article>
  );
}
