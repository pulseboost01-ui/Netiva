import { Metadata } from 'next'
import { SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern use of ${SITE_NAME}.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className="py-16">
      <div className="container max-w-3xl prose prose-sm">
        <h1>Terms of Service</h1>
        <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>

        <p><strong>[Operator note: have a lawyer review this before launch, especially the liability
        and jurisdiction sections — this is a starting template, not legal advice.]</strong></p>

        <h2>Acceptance of terms</h2>
        <p>By using {SITE_NAME}, you agree to these terms. If you don't agree, please don't use the site.</p>

        <h2>What this site is</h2>
        <p>
          {SITE_NAME} aggregates and displays publicly available football data — fixtures, team
          info, injury reports, and model-generated predictions — sourced from third-party
          providers (primarily api-football.com). We are not affiliated with the Premier League,
          any football club, or any league mentioned on this site.
        </p>

        <h2>No betting or financial advice</h2>
        <p>
          Predictions and analysis on this site are informational only. They are not betting
          advice, and we are not responsible for any losses connected to wagering decisions made
          using information from this site. Gambling involves risk; if you choose to bet, please do
          so responsibly and only through licensed operators.
        </p>

        <h2>Accuracy of data</h2>
        <p>
          We pull data from third-party APIs and do our best to display it accurately and keep it
          current, but we can't guarantee it's error-free, complete, or up to the second — injury
          statuses, fixture times, and scores can change faster than the data refreshes. Always
          verify anything time-sensitive (like a kickoff time) with an official source.
        </p>

        <h2>Third-party links</h2>
        <p>
          Links to streaming services, official league sites, or affiliate partners take you to
          third-party sites we don't control. We're not responsible for their content, availability,
          or practices.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Team names, logos, and league names are trademarks of their respective owners and are
          used descriptively/for identification purposes only. Site design and original written
          content are owned by {SITE_NAME}.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          The site is provided "as is" without warranties of any kind. To the fullest extent
          permitted by law, {SITE_NAME} is not liable for any damages arising from use of, or
          inability to use, the site or its data.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms at any time; continued use of the site means you accept the current version.</p>

        <h2>Governing law</h2>
        <p>[Specify your jurisdiction here.]</p>

        <h2>Contact</h2>
        <p>[legal@yourdomain.com]</p>
      </div>
    </section>
  )
}
