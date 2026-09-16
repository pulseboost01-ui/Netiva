import { Metadata } from 'next'
import Link from 'next/link'
import { getFixture, getTeams, getFixtureStatistics } from '@/lib/api'
import { getWatchPartners, getOddsPartners } from '@/lib/affiliate'
import { notFound } from 'next/navigation'
import { getBreadcrumbJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { TrackedOutboundLink } from '@/components/TrackedOutboundLink'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const match = await getFixture(params.id)

  if (!match) return notFound()

  return {
    title: `${match.homeTeam} vs ${match.awayTeam} - Live Score & Stats`,
    description: `${match.homeTeam} vs ${match.awayTeam} on ${new Date(match.date).toLocaleDateString()}. Live score, team news, and stats.`,
    keywords: [`${match.homeTeam} vs ${match.awayTeam}`, `${match.homeTeam} vs ${match.awayTeam} score`, 'premier league live score'],
    alternates: { canonical: `/matches/${params.id}` },
    openGraph: {
      title: `${match.homeTeam} vs ${match.awayTeam} - Live Score & Stats`,
      description: `${match.homeTeam} vs ${match.awayTeam}. Live score, team news, and stats.`,
      url: `/matches/${params.id}`,
    },
  }
}

export async function generateStaticParams() {
  // Pre-generate pages for upcoming matches
  return []
}

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getFixture(params.id)

  if (!match) {
    notFound()
  }

  const date = new Date(match.date)
  const isLive = match.status === '1H' || match.status === '2H' || match.status === 'ET'
  const isFinished = match.status === 'FT' || match.status === 'AET'
  const isPostponed = match.status === 'PST'

  // Real per-match stats only exist once a match has kicked off; for an
  // upcoming fixture this correctly returns null and the stats block
  // below is skipped rather than showing invented numbers.
  const stats = isLive || isFinished ? await getFixtureStatistics(params.id) : null
  const watchPartners = getWatchPartners()
  const oddsPartners = getOddsPartners()

  return (
    <>
      <section className="bg-pitch text-white py-14">
        <div className="container max-w-3xl">
          <div className="text-center">
            <p className="text-white/60 mb-6 text-sm">
              {date.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
            <h1 className="sr-only">{match.homeTeam} vs {match.awayTeam}</h1>
            <div className="flex items-center justify-center gap-8 mb-6" aria-hidden="true">
              <p className="text-2xl font-display font-semibold flex-1 text-right">{match.homeTeam}</p>
              <div className="text-center shrink-0 w-32">
                {isFinished ? (
                  <p className="scoreline text-5xl text-white">{match.score.home}–{match.score.away}</p>
                ) : isLive ? (
                  <>
                    <p className="text-floodlight text-xs font-sans font-bold mb-1">LIVE</p>
                    <p className="scoreline text-4xl text-white">{match.score.home}–{match.score.away}</p>
                  </>
                ) : (
                  <p className="text-2xl text-white/50 font-display">vs</p>
                )}
              </div>
              <p className="text-2xl font-display font-semibold flex-1 text-left">{match.awayTeam}</p>
            </div>
            {match.venue && (
              <p className="text-white/60 text-sm">{match.venue}</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Match details</h2>

          {stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Possession</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.possession.home ?? '—'}% / {stats.possession.away ?? '—'}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Shots</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.shots.home ?? '—'} / {stats.shots.away ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Corners</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.corners.home ?? '—'} / {stats.corners.away ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Cards</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(stats.yellowCards.home ?? 0) + (stats.redCards.home ?? 0)} / {(stats.yellowCards.away ?? 0) + (stats.redCards.away ?? 0)}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded p-6 mb-8 text-sm text-slate-600 border border-slate-200">
              {isPostponed
                ? 'This match is postponed — no live stats to show.'
                : 'Live stats appear here once kickoff happens.'}
            </div>
          )}

          <div className="bg-slate-50 rounded p-6 mb-8">
            <h3 className="font-bold mb-4">Team news</h3>
            <p className="text-sm text-slate-600">
              Confirmed lineups aren’t published this far out — check the{' '}
              <Link href="/injuries" className="text-accent-green font-semibold hover:underline">injury tracker</Link>{' '}
              for the latest on both squads closer to kickoff.
            </p>
          </div>

          <div className="bg-accent-green/10 border border-accent-green rounded p-6">
            <h3 className="font-bold text-slate-900 mb-4">Injuries & suspensions</h3>
            <p className="text-sm text-slate-600">
              Check the <Link href="/injuries" className="text-accent-green font-semibold hover:underline">injury tracker</Link> for latest squad news on both teams.
            </p>
          </div>
        </div>
      </section>

      {/* Watch & Affiliate Section */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-3xl">
          <h2 className="mb-4">Where to watch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {watchPartners.map((partner) => (
              <TrackedOutboundLink
                key={partner.id}
                href={partner.url}
                provider={partner.id}
                target="_blank"
                rel={partner.isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors"
              >
                <p className="font-bold text-slate-900 mb-2">{partner.name}</p>
                <p className="text-sm text-slate-600 mb-4">{partner.blurb}</p>
                <span className="text-sm font-semibold text-accent-green">Watch now →</span>
              </TrackedOutboundLink>
            ))}
          </div>
          {watchPartners.some((p) => p.isAffiliate) && (
            <p className="text-xs text-slate-500">
              Some links above are affiliate links — we may earn a commission at no extra cost to you.
            </p>
          )}

          {oddsPartners.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-slate-900 mb-4">Compare odds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {oddsPartners.map((partner) => (
                  <TrackedOutboundLink
                    key={partner.id}
                    href={partner.url}
                    provider={partner.id}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors"
                  >
                    <p className="font-bold text-slate-900 mb-2">{partner.name}</p>
                    <p className="text-sm text-slate-600 mb-4">{partner.blurb}</p>
                    <span className="text-sm font-semibold text-accent-green">Compare now →</span>
                  </TrackedOutboundLink>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Affiliate link — 18+. Gamble responsibly. BeGambleAware.org
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FPL Section */}
      <section className="py-12 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Fantasy Premier League</h2>
          <div className="bg-slate-50 rounded p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              <strong>Captain tip:</strong> Check injury and form status before finalizing your FPL lineup. Both teams have key players to monitor.
            </p>
            <Link href="/fpl-tips" className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline">
              See this week's FPL picks
            </Link>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportingEvent',
            name: `${match.homeTeam} vs ${match.awayTeam}`,
            startDate: match.date,
            endDate: new Date(new Date(match.date).getTime() + 105 * 60000).toISOString(),
            eventStatus: isPostponed ? 'EventPostponed' : 'EventScheduled',
            homeTeam: {
              '@type': 'SportsTeam',
              name: match.homeTeam,
            },
            awayTeam: {
              '@type': 'SportsTeam',
              name: match.awayTeam,
            },
            location: {
              '@type': 'Place',
              name: match.venue,
            },
          }),
        }}
      />
      <script
        {...jsonLdScriptProps(
          getBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Fixtures', path: '/fixtures' },
            { name: `${match.homeTeam} vs ${match.awayTeam}`, path: `/matches/${match.id}` },
          ])
        )}
      />
    </>
  )
}
