import { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingFixtures } from '@/lib/api'
import { getWatchPartners } from '@/lib/affiliate'
import { TrackedOutboundLink } from '@/components/TrackedOutboundLink'

export const metadata: Metadata = {
  title: 'Premier League Fixtures & Results - Live Scores',
  description: 'All Premier League fixtures with live scores, schedules, and match details. Updated throughout every matchday.',
  keywords: ['EPL fixtures', 'premier league schedule', 'live scores', 'match results', 'premier league fixtures this week'],
  alternates: { canonical: '/fixtures' },
  openGraph: {
    title: 'Premier League Fixtures & Results - Live Scores',
    description: 'All Premier League fixtures with live scores, schedules, and match details.',
    url: '/fixtures',
  },
}

export default async function FixturesPage() {
  const fixtures = await getUpcomingFixtures()
  const watchPartners = getWatchPartners()

  // Group by week
  const grouped = fixtures.reduce((acc: any, match: any) => {
    const date = new Date(match.date)
    const weekStart = new Date(date)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const week = weekStart.toISOString().split('T')[0]

    if (!acc[week]) acc[week] = []
    acc[week].push(match)
    return acc
  }, {})

  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">Premier League fixtures</h1>
          <p className="text-white/75 mt-3 max-w-lg">All upcoming matches and recent results. Live scores updated throughout matchday.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          {Object.entries(grouped).map(([week, matches]: [string, any]) => {
            const weekDate = new Date(week)
            const weekEnd = new Date(weekDate)
            weekEnd.setDate(weekEnd.getDate() + 6)

            return (
              <div key={week} className="mb-12">
                <h2 className="text-lg mb-6">
                  {weekDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} – {weekEnd.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                </h2>

                <div>
                  {matches.map((match: any) => {
                    const date = new Date(match.date)
                    const isLive = match.status === '1H' || match.status === '2H' || match.status === 'ET'
                    const isFinished = match.status === 'FT' || match.status === 'AET' || match.status === 'PST'

                    return (
                      <Link
                        key={match.id}
                        href={`/matches/${match.id}`}
                        className="flex items-center gap-4 py-4 border-b border-chalk-line last:border-0 hover:bg-white/60 transition-colors no-underline group"
                      >
                        <span className="w-24 shrink-0 text-xs text-ink-soft">
                          {date.toLocaleDateString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex-1 text-right text-sm font-medium text-ink group-hover:text-turf">{match.homeTeam}</span>
                        <span className="scoreline w-16 text-center text-lg shrink-0">
                          {isLive && <span className="block text-[10px] text-card-red font-sans font-bold mb-0.5">LIVE</span>}
                          {isFinished ? `${match.score.home}–${match.score.away}` : '—'}
                        </span>
                        <span className="flex-1 text-sm font-medium text-ink group-hover:text-turf">{match.awayTeam}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section for Affiliate */}
      <section className="bg-white/50 py-12 border-t border-chalk-line">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-4">Where to watch</h2>
          <p className="text-ink-soft mb-6">
            Don't miss a match. Find the best way to stream every fixture legally.
          </p>
          <div className="grid grid-cols-2 gap-px bg-chalk-line border border-chalk-line max-w-md mx-auto">
            {watchPartners.map((partner) => (
              <TrackedOutboundLink
                key={partner.id}
                href={partner.url}
                provider={partner.id}
                target="_blank"
                rel={partner.isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                className="block bg-chalk hover:bg-white p-4 transition-colors no-underline"
              >
                <p className="font-medium text-sm text-ink">{partner.name}</p>
                <p className="text-xs text-ink-soft mt-1">{partner.blurb}</p>
              </TrackedOutboundLink>
            ))}
          </div>
          {watchPartners.some((p) => p.isAffiliate) && (
            <p className="text-xs text-ink-soft/70 mt-3">
              Some links above are affiliate links — we may earn a commission at no extra cost to you.
            </p>
          )}
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premier League Fixtures',
            description: 'All upcoming Premier League fixtures with live scores',
            hasPart: fixtures.map((match: any) => ({
              '@type': 'SportingEvent',
              name: `${match.homeTeam} vs ${match.awayTeam}`,
              startDate: match.date,
              homeTeam: { '@type': 'SportsTeam', name: match.homeTeam },
              awayTeam: { '@type': 'SportsTeam', name: match.awayTeam },
            })),
          }),
        }}
      />
    </>
  )
}
