import { Metadata } from 'next'
import Link from 'next/link'
import { LEAGUES } from '@/lib/leagues'
import { CountryFlag } from '@/components/TeamVisual'

export const metadata: Metadata = {
  title: 'All Football Leagues - Fixtures, Injuries & Predictions',
  description:
    'Live fixtures, injury tracking, and predictions for the Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, and more.',
  keywords: ['football fixtures', 'soccer leagues', 'European football', 'football predictions', 'football injury news'],
  alternates: { canonical: '/leagues' },
  openGraph: {
    title: 'All Football Leagues - Fixtures, Injuries & Predictions',
    description: 'Live fixtures, injury tracking, and predictions across every major football competition.',
    url: '/leagues',
  },
}

export default function LeaguesIndexPage() {
  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">Football leagues</h1>
          <p className="text-white/75 mt-3 max-w-lg">
            Pick a competition for its live fixtures, injury tracker, and match predictions.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {LEAGUES.map((league) => (
              <Link
                key={league.slug}
                href={`/leagues/${league.slug}`}
                className="flex items-baseline justify-between gap-4 py-5 border-b border-chalk-line pr-8 group no-underline"
              >
                <h2 className="text-lg text-ink group-hover:text-turf transition-colors">{league.name}</h2>
                <p className="text-sm text-ink-soft shrink-0 flex items-center gap-2">
                  <CountryFlag country={league.country} /> {league.country}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
