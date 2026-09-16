import { Metadata } from 'next'
import { SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses, and protects data, including cookies and advertising.`,
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className="py-16">
      <div className="container max-w-3xl prose prose-sm">
        <h1>Privacy Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>

        <p>
          <strong>[Operator note: replace the bracketed placeholders below with your real business
          name, contact email, and jurisdiction before publishing. This page must accurately
          describe what the site actually does — don't leave sections that don't apply to you.]</strong>
        </p>

        <h2>Who we are</h2>
        <p>
          {SITE_NAME} ("we", "us") is operated by [Your Company / Legal Name], [Your Address /
          Jurisdiction]. You can contact us at [privacy@yourdomain.com].
        </p>

        <h2>What data we collect</h2>
        <ul>
          <li><strong>Usage data:</strong> pages visited, referring site, device/browser type, and approximate location (via IP), collected automatically through analytics.</li>
          <li><strong>Cookies:</strong> small files stored on your device to remember preferences and support advertising (see below).</li>
          <li><strong>Data you provide directly:</strong> only if you contact us or sign up for something we explicitly offer (e.g. a newsletter) — we do not otherwise collect names, emails, or account details.</li>
        </ul>

        <h2>Advertising and cookies</h2>
        <p>
          This site displays ads served by Google AdSense. Google and its partners use cookies
          (including the DoubleClick cookie) to serve ads based on your prior visits to this and
          other websites. You can opt out of personalized advertising by visiting{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>{' '}
          or <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        </p>
        <p>
          We may also use analytics cookies (e.g. Google Analytics) to understand how visitors use
          the site. [List every analytics/ad tool you actually run here — remove this bracket once done.]
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some links on this site (for example, on the Streams page) are affiliate or referral
          links. If you click one and make a purchase or sign up, we may earn a commission at no
          extra cost to you. This does not influence which factual sports data we display.
        </p>

        <h2>Third-party data</h2>
        <p>
          Fixture, team, injury, and prediction data is sourced from api-football.com (API-Sports).
          We do not control how that provider handles data on their end; see their own privacy
          policy for details.
        </p>

        <h2>Your choices</h2>
        <p>
          You can disable cookies in your browser settings, though some site features may not work
          as intended. You can also use the ad-personalization opt-outs linked above.
        </p>

        <h2>Children's privacy</h2>
        <p>This site is not directed at children under 13, and we do not knowingly collect data from them.</p>

        <h2>Changes to this policy</h2>
        <p>We'll update the "Last updated" date above whenever this policy changes materially.</p>

        <h2>Contact</h2>
        <p>Questions about this policy: [privacy@yourdomain.com].</p>
      </div>
    </section>
  )
}
