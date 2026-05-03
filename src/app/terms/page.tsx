import type { Metadata } from "next";
import Link from "next/link";
import LegalDocShell from "@/components/legal/LegalDocShell";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Contractual framework governing use of Netiva’s website, enquiries, engagements, intellectual property transfer, confidentiality, warranties, limitation of liability, and dispute resolution.",
};

const LAST_UPDATED_ISO = "2026-05-03";
const LAST_UPDATED_DISPLAY = "3 May 2026";

const vendor = `${siteConfig.legalName ?? siteConfig.name}`;
const email = siteConfig.email;

export default function TermsPage() {
  return (
    <LegalDocShell
      title="Terms of Service"
      lastUpdatedISO={LAST_UPDATED_ISO}
      lastUpdatedDisplay={LAST_UPDATED_DISPLAY}
      summary={
        <>
          These Terms govern browsing this marketing site plus the commercial relationship when you procure professional
          services from <strong className="text-neutral-900">{vendor}</strong> (&ldquo;Netiva,&rdquo;{" "}
          <strong>&ldquo;we,&rdquo; &ldquo;us.&rdquo;</strong>) Separate statements of work, order forms, master agreements,
          or data processing addenda may supplement or supersede conflicting sections—but only expressly in writing executed
          by authorised signatories.
        </>
      }
    >
      <h2 id="accept">1. Agreement & incorporation</h2>
      <p>
        Accessing pages on domains Netiva publishes for marketing—including hostnames aligning with{' '}
        <strong>{email.split('@')[1] ?? 'netiva.studio'}</strong>—ticking acceptance boxes digitally, exchanging countersigned
        PDFs/eIDAS equivalents, verbally confirming recorded
        minutes attached to quotations, manifests assent—even if ancillary appendices iterate later—to these Terms &
        contemporaneous artefacts (quotes, onboarding docs, annexes labelled &ldquo;Incorporated by reference&rdquo;).
      </p>
      <p>
        You represent authority to bind the organisation you nominate (&ldquo;Client&rdquo;). Freelancers onboarding as
        individuals remain personally obligated unless superseded by formal employer guarantees we explicitly accept.
      </p>
      <p>
        Our{' '}
        <Link href={siteConfig.privacyPolicyHref} className="font-medium underline decoration-black/25 underline-offset-2">
          Privacy Policy
        </Link>{' '}
        details how Customer Personal Data—as defined therein—is processed ancillary to engagements.
      </p>

      <h2 id="services">2. Services, deliverables & evolution</h2>
      <p>
        Statements of Work (SOW) enumerate concrete deliverables, milestones, tooling stack assumptions, stakeholder
        designations, escalation matrices, KPI baselines referencing analytics platforms, contingency buffers, blackout
        windows, multilingual expansion waves, phased acceptance criteria—for brand, UX, engineering, editorial, QA,
        training, fractional product leadership arcs. Absent contradictory SOW text, exploratory retainers billed against
        hour banks convert automatically to fixed phases once approved scope freezes.
      </p>
      <p>
        Agile evolution continues through written change notices capturing fee/time deltas exceeding ten percent aggregated
        impact in any contiguous calendar month—even if iterative micro-adjustments ripple scope individually below the
        formal threshold—in order to uphold mutual visibility.
      </p>

      <h2 id="client">3. Client responsibilities</h2>
      <ul>
        <li>Allocate decision-makers reachable within SLA windows enumerated per SOW.</li>
        <li>Deliver brand assets—logos vectors, palettes, licences, typography files, guideline PDFs—with provenance attestations excluding uncleared stock.</li>
        <li>Provide staging credentials, SSO invites, CDN tokens, webhook secrets, sanitized databases where replication aids QA.</li>
        <li>Review accessibility contrast checklists verifying WCAG 2.2 AA conformance targets notwithstanding vendor tooling limitations.</li>
        <li>Indemnify us against third-party IP claims stemming from undeclared infringing materials forwarded for inclusion.</li>
      </ul>

      <h2 id="commercials">4. Fees, invoicing & taxes</h2>
      <p>
        Unless otherwise stated currency is <strong>USD</strong>; local VAT/Ugandan obligations pass through when legally
        required. Thirty-day invoicing horizons default; seven-day horizons may apply urgent accelerations surcharge labelled
        <em>Rush uplift</em> on quotes. Suspension rights activate after overdue balances exceed fourteen calendar days,
        escalating to termination after sixty unless remediated. Late interest accrues at <strong>1.5%</strong> per month simple
        (or maximal lawful rate whichever lower).
      </p>

      <h2 id="ip">5. Intellectual property & licence grants</h2>
      <p>
        Subject to clearance of outstanding invoices stipulated in triggering milestone tables, exclusive ownership of Final
        Deliverables—excluding Netiva Background IP—vests Client upon Acceptance (signed UAT artefacts or implicit acceptance
        per SOW). Netiva retains portfolio rights to anonymised artefacts in pitch decks respecting confidentiality.
      </p>
      <p>
        Background IP—including proprietary starter kits, scaffolding CLIs, design tokens compilers, typography pairings coded
        pre-engagement—licensed non-exclusive, perpetual but revocable upon uncured confidentiality breach restricting
        continued reuse.
      </p>

      <h2 id="confidentiality">6. Confidentiality</h2>
      <p>
        Each Party protects the other&apos;s Confidential Information—including pricing, unpublished roadmaps, pipeline
        strategies, biometric voiceprints from approved async standups—with no less diligence than afforded its own similarly
        sensitive information. Statutory disclosures permitted after furnishing prompt notice minus legally forbidden windows.
      </p>

      <h2 id="subs">7. Third-party tooling & subcontractors</h2>
      <p>
        We may deputise subcontractors under confidentiality regimes mirroring ours; objection rights exist for named
        competitors if Client notifies within seven days of disclosed roster revisions. Hosted infrastructure—Vercel, AWS,
        Cloudflare Workers, Sanity, Stripe, Clerk, Slack, HubSpot equivalents—runs under processors&apos; prevailing terms layered
        with DPAs aligning GDPR Article 28 expectations.
      </p>

      <h2 id="warranty">8. Warranties & disclaimers</h2>
      <p>
        Services furnished <strong>AS IS beyond express SOW remedies</strong>. We disclaim merchantability fitness for specialised
        industrial compliance regimes absent explicit conformance certifications commissioned in writing—HIPAA bespoke BAAs,
        PCI Level 1 audit orchestrations, FAA airworthiness disclaimers excluded unless separately priced attestations conclude.
      </p>

      <h2 id="liability">9. Limitation of liability</h2>
      <p>
        <strong>To the fullest extent permissible:</strong> neither Party liable for consequential, punitive, reputational halo
        downturns speculative, treasury opportunity costs, kinetic supply shock cascades—even if foreseeable—except where
        mandatory law forbids exclusions (gross negligence, wilful misconduct, bodily harm from negligence jurisdictions).
      </p>
      <p>
        Aggregate liability (multi-claim amalgamation) capped at <strong>fees paid trailing twelve calendar months preceding
        claim notice</strong> or <strong>USD 250,000</strong> whichever lower—excluding indemnities tied to infringing materials
        Client supplied (uncapped morally but practically governed by equitable proportionality doctrines).
      </p>

      <h2 id="indemnity">10. Indemnification symmetry</h2>
      <p>
        Client defends Netiva against third-party assertions citing materials Client demanded integrate without clearance.
        Netiva defends Client against assertions alleging Deliverables infringing solely Netiva-created components absent mixed
        instructions—subject to prompt cooperation, defence control election, mitigation attempts.
      </p>

      <h2 id="term">11. Term, suspension & graceful exit</h2>
      <p>
        Agreements persist until SOW completion or earlier termination for cause—material breach incurable within thirty-day
        cure notice, bankruptcy events, sanction list appearances. Retainers cease after written thirty-day winding notice
        unless prepaid blocks remain—burn-down governed by amortisation appendix.
      </p>

      <h2 id="force">12. Force majeure & extraordinary circumstances</h2>
      <p>
        Neither Party liable for outages traceable beyond reasonable control—infrastructure geopolitical embargoes, macro grid
        collapse, endemic region internet throttling mandates, celestial object impacts tongue-in-cheek yet illustrative—paused
        obligations resume once practical restoration occurs; neither Party monetises insurance recoveries withheld from mutual
        project continuation unless contractually earmarked separately.
      </p>

      <h2 id="law">13. Governing law & jurisdictional theatres</h2>
      <p>
        Interpretation defaults to statutes of <strong>The Republic of Uganda</strong>; exclusive jurisdiction in courts seated in
        <strong>Kampala</strong> unless—where Client HQ resides inside EU Member State requiring consumer protective mandatory
        forum—immutable consumer rules allocate differently. Hague Service Convention choreography honoured for cross-border
        filings.
      </p>

      <h2 id="disputes">14. Escalating dispute playbook</h2>
      <ol className="not-prose my-8 list-decimal space-y-3 rounded-xl border border-black/8 bg-[var(--muted)] px-8 py-6 ps-10 text-[14px] text-neutral-800">
        <li>Good-faith principals negotiation (14 days).</li>
        <li>Mediation administered under MILAT / LCIA optional modules if Parties jointly elect.</li>
        <li>Litigation resurrected upon failed mediation deadlock certificate.</li>
      </ol>
      <p>
        Nothing prevents interim injunctive relief protecting trade secrets circumventing elongated negotiation loops.
      </p>

      <h2 id="misc">15. Miscellaneous</h2>
      <ul>
        <li>No joint venture/franchising implied.</li>
        <li>No assignment absent written consent—not unreasonably withheld for corporate reorganisations devoid of hostile transfers.</li>
        <li>Waivers selective; cumulative remedies preserved.</li>
        <li>Survival for IP indemnities, confidentiality, accrued payment, dispute procedures.</li>
        <li>Electronic signatures enforceable referencing ESignatures Act parallels.</li>
      </ul>

      <h2 id="questions">16. Stewardship inbox</h2>
      <p>
        Operational questions—or requests for customised master agreements marrying procurement templates—route to{" "}
        <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
          {email}
        </a>
        . Tag subject lines <strong>TOS inquiry</strong> for triage fidelity.
      </p>
    </LegalDocShell>
  );
}
