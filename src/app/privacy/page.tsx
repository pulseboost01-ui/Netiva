import type { Metadata } from "next";
import Link from "next/link";
import LegalDocShell from "@/components/legal/LegalDocShell";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Netiva collects, uses, and protects personal data when you browse the site, enquire about services, or work with me on a project.",
};

const LAST_UPDATED_ISO = "2026-05-03";
const LAST_UPDATED_DISPLAY = "3 May 2026";

const controller = `${siteConfig.legalName ?? siteConfig.name}`;
const email = siteConfig.email;

export default function PrivacyPage() {
  return (
    <LegalDocShell
      title="Privacy Policy"
      lastUpdatedISO={LAST_UPDATED_ISO}
      lastUpdatedDisplay={LAST_UPDATED_DISPLAY}
      summary={
        <>
          This policy explains how we handle personal information when you use our public-facing properties—including the
          host serving <strong className="text-neutral-900">{email.replace(/^[^@]+@/, "")}</strong> (collectively, the &ldquo;Site&rdquo;),
          correspond with our team,
          or enter a commercial engagement. We process data fairly, proportionally, and with choices where the law requires
          them.
        </>
      }
    >
      <h2 id="controller">1. Controller & representative</h2>
      <p>
        The controller responsible for processing personal data processed in connection with our marketing website and
        pre-contract enquiries is{" "}
        <strong>
          {controller}
        </strong>
        {siteConfig.location ? <> ({siteConfig.location})</> : null}.
      </p>
      <p>
        For privacy requests, contact{" "}
        <a href={`mailto:${email}`} className="font-medium underline decoration-black/25 underline-offset-2 hover:text-neutral-950">
          {email}
        </a>{" "}
        with subject line <strong>&ldquo;Privacy request&rdquo;</strong>.
      </p>

      <h2 id="scope">2. Scope & applicability</h2>
      <p>This policy applies to:</p>
      <ul>
        <li>Visitors to publicly available areas of our Site;</li>
        <li>
          Contacts who email us, submit forms, booking requests, quotations, questionnaires, calendars, file uploads,
          invoices, NDAs or similar artefacts;
        </li>
        <li>
          Authorized users of workspaces we administer for engagements (such as Slack, Linear, GitHub invitations, CMS
          access) when those tools process personal identifiers on our behalf; and
        </li>
        <li>Candidates evaluated for subcontractor or collaborator roles communicated through approved channels.</li>
      </ul>
      <p>
        Dedicated terms for contracted services—including client obligations, confidentiality, subprocessors authorised
        at contract tier, and DPIA artefacts where applicable—are described in Statements of Work, Master Terms, or DPAs,
        whichever governs your order. Consult our{" "}
        <Link href={siteConfig.termsHref} className="font-medium underline decoration-black/25 underline-offset-2">
          Terms of Service
        </Link>
        {" "}for contract formation rules.
      </p>

      <h2 id="categories">3. Categories of personal data</h2>
      <p>Depending on interactions, we may process:</p>
      <ul>
        <li>
          <strong>Identity & credentials:</strong> first and last names, avatar images, bios, timezone, professional
          affiliation, VAT / tax identifiers for billing.
        </li>
        <li>
          <strong>Contact:</strong> work email addresses, postal addresses when supplied, messenger handles, phonetic
          names for scheduling.
        </li>
        <li>
          <strong>Commercial artefacts:</strong> engagement briefs, budgets, timelines, stakeholder lists, approvals,
          invoicing payloads, receipts, procurement references.
        </li>
        <li>
          <strong>Automatically collected telemetry:</strong> IP address, approximation of geolocation inferred from CDN
          routing, timestamps, referrer URLs, interaction heatmaps aggregated from analytics tooling, hashed device
          identifiers, coarse screen metrics, diagnostics from edge networks.
        </li>
        <li>
          <strong>Collaboration artefacts:</strong> comments, uploads, previews, versioning metadata, SSO attributes when your
          organization connects an IdP into our workspaces.
        </li>
      </ul>
      <p>We do not target children; we delete accounts if we inadvertently collect data demonstrating an age under sixteen.</p>

      <h2 id="purposes">4. Purposes & lawful bases</h2>
      <div className="not-prose -mx-4 max-w-[calc(100%+2rem)] overflow-x-auto sm:mx-0 sm:max-w-none">
        <table className="my-8 min-w-[min(100%,48rem)] w-full border-collapse overflow-hidden rounded-lg border border-black/10 text-left text-[13px]">
        <caption className="sr-only">Lawful bases for processing</caption>
        <thead className="bg-neutral-950 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Purpose</th>
            <th className="px-4 py-3 font-semibold">Typical lawful basis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/8 bg-[var(--card)] text-neutral-700">
          <tr>
            <td className="px-4 py-3">Respond to demos, quotations, questionnaires, onboarding checklists.</td>
            <td className="px-4 py-3">Necessary steps prior to entering a contract (GDPR Article 6(1)(b)).</td>
          </tr>
          <tr>
            <td className="px-4 py-3">Operate, secure, and scale the Site; detect abuse.</td>
            <td className="px-4 py-3">Legitimate interests balanced against your fundamental rights.</td>
          </tr>
          <tr>
            <td className="px-4 py-3">Analytics for product roadmap & marketing optimisation.</td>
            <td className="px-4 py-3">Consent (where required); otherwise aggregated legitimate-interest analytics.</td>
          </tr>
          <tr>
            <td className="px-4 py-3">Comply with tax, AML, subpoena-equivalent statutes.</td>
            <td className="px-4 py-3">Legal obligations (GDPR Article 6(1)(c)).</td>
          </tr>
        </tbody>
        </table>
      </div>

      <h2 id="marketing">5. Marketing & communications preference center</h2>
      <p>
        Insight pieces, changelog mail, nurturing sequences, webinar invites, seasonal reports, surveys, sponsorship
        offers, curated partner introductions, podcasts, transcripts, transcripts of calls you approved for distribution,
        roadmap teasers—all require either explicit opt-ins or transactional necessity rooted in negotiations you
        authorised.
      </p>
      <p>
        You may revoke marketing consent anytime using <strong>Unsubscribe</strong> links appearing in outbound mail or via
        a written directive to{" "}
        <a href={`mailto:${email}`}>{email}</a>. Transactional confirmations, security advisories where your account risks
        breach, invoicing artefacts, SLA escalations triggered by outages, lawful regulatory notices—even after marketing
        opt-out—persist because overriding laws or ongoing contracts require retention.
      </p>

      <h2 id="cookies" className="scroll-mt-24">
        6. Cookies, pixels, fingerprint resistance & storage durations
      </h2>
      <p>
        We deploy strictly necessary authentication cookies controlling secured staging demos, ephemeral admin tokens,
        load-balancing affinity cookies terminating when browsers close unless longer persistence is unavoidable for SPA
        auth refresh flows you explicitly authorised.
      </p>
      <p>
        Optional analytics/marketing identifiers—when invoked—observe modern guidance: granular consent banners where
        jurisdictions dictate, minimized persistent IDs, hashed IP truncation, refusal logging. You may purge stored
        signals through browser tooling; certain Site features degrade predictably thereafter.
      </p>

      <h2 id="sharing">7. Disclosure & onward transfers</h2>
      <p>We disclose personal data exclusively when:</p>
      <ul>
        <li>Processors contracted under Article 28–style SCCs or materially equivalent safeguards support delivery;</li>
        <li>You direct disclosure (client references approved in writing);</li>
        <li>Competent authorities lawfully mandate cooperation (with proportionality objections where permitted).</li>
      </ul>
      <p>
        Cross-border replication may occur inside EU-US Data Privacy Framework–certified providers, UK IDTA overlays,
        Standard Contractual Clauses, supplemented measures from transfer impact assessments documenting residual risk.
      </p>

      <h2 id="retention">8. Retention</h2>
      <ul>
        <li>CRM & pipeline artefacts: ordinarily ≤ 36 months from last substantive touch unless statutes extend.</li>
        <li>Contractual deliverables mirrored for governance: durations align with Statements of Work or DPAs.</li>
        <li>Security/access logs rotated ≤ 365 days absent investigation holds.</li>
        <li>Tax & accounting records obey Ugandan/Revenue-prescriptive windows (often ≥ seven years).</li>
      </ul>

      <h2 id="security">9. Security measures</h2>
      <p>
        We institute administrative, organisational, pseudonymisation, cryptographic, logging, alerting, patching,
        least-privilege, vendor due diligence reviews, tabletop exercises referencing ISO 27001–aligned posture. No
        safeguards guarantee absolute immunity; breaches triaged under regulatory clocks with transparent updates.
      </p>

      <h2 id="rights">10. Data subject requests & timelines</h2>
      <p>
        Pursuant EEA/UK/Swiss parallels (where applicable): access, correction, deletion, portability, objection to
        processing rooted in legitimate interest, withdrawal of consent, restriction while disputes resolve, escalating
        to supervisory authorities. Uganda&apos;s Data Protection and Privacy Act, 2019 principles echo many requirements;
        escalate unresolved complaints domestically alongside cross-border escalation rights.
      </p>
      <p>
        We acknowledge requests promptly (≤ 72 office hours acknowledging receipt); substantive outcomes typically ≤ 30
        calendar days subject to statutory extensions for complex dossiers paired with explanatory narratives.
      </p>

      <h2 id="automated">11. Automated decision-making</h2>
      <p>No fully automated adjudications with legal/significant ramifications occur without human escalation.</p>

      <h2 id="changes">12. Modifications</h2>
      <p>
        Material updates appear at the top banner with revision history excerpts; continued use fourteen days thereafter
        counts as acknowledgement absent legally mandated affirmative consent regimes.
      </p>

      <h2 id="contact">13. Regulatory authority contacts (non-exclusive)</h2>
      <ul>
        <li>
          Uganda: Personal Data Protection Office under the Uganda Communications Commission supervisory matrix (consult
          current guidance bulletins).
        </li>
        <li>Ireland: Data Protection Commission (EU lead interactions often coordinated through Irish hub entities).</li>
      </ul>
      <p>
        Primary contact stays{" "}
        <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
          {email}
        </a>
        .
      </p>
    </LegalDocShell>
  );
}
