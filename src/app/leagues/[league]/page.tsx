import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LEAGUES, getLeagueBySlug, DEFAULT_LEAGUE } from '@/lib/leagues'
import { getUpcomingFixtures, getInjuries, getPredictions, getTeams } from '@/lib/api'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { CountryFlag, TeamLogo } from '@/components/TeamVisual'
import { PlayerVisual } from '@/components/PlayerVisual'

export function generateStaticParams() {
  return LEAGUES.map((league) => ({ league: league.slug }))
}

export function generateMetadata({ params }: { params: { league: string } }): Metadata {
  const league = getLeagueBySlug(params.league)
  if (!league) return {}

  const title = `${league.name} Fixtures, Injuries & Predictions`
  const description = `Live ${league.name} fixtures, injury news, and match predictions for every round. Updated throughout the season.`

  return {
    title,
    description,
    keywords: [
      `${league.name} fixtures`,
      `${league.name} predictions`,
      `${league.name} injury news`,
      `${league.name} this week`,
      `${league.shortName} scores`,
    ],
    alternates: { canonical: `/leagues/${league.slug}` },
    openGraph: { title, description, url: `/leagues/${league.slug}` },
  }
}

function faqsFor(leagueName: string) {
  return [
    {
      question: `Where can I find this week's ${leagueName} fixtures?`,
      answer: `This week's ${leagueName} fixtures are listed above with kickoff times, updated as the schedule is confirmed.`,
    },
    {
      question: `How current is the ${leagueName} injury news on this page?`,
      answer: `Injury statuses come from api-football's injury feed, filtered to each player's most recent report from the last three weeks.`,
    },
    {
      question: `Are the ${leagueName} predictions reliable?`,
      answer: `Predictions come from api-football's model, which weighs recent form, head-to-head history, and league statistics. They're analysis, not certainty — treat them as a preview, not betting advice.`,
    },
  ]
}

export default async function LeagueHubPage({ params }: { params: { league: string } }) {
  const league = getLeagueBySlug(params.league)
  if (!league) notFound()

  const [fixtures, injuries, predictions, teams] = await Promise.all([
    getUpcomingFixtures(league),
    getInjuries(league),
    getPredictions(league),
    getTeams(league),
  ])

  const topInjuries = injuries.slice(0, 6)
  const teamLogos = new Map(teams.map((team) => [team.name, team.logo]))
  const faqs = faqsFor(league.name)
  const noProviderData = fixtures.length === 0 && injuries.length === 0 && predictions.length === 0 && teams.length === 0

  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <p className="text-sm text-white/50 mb-2">
            <Link href="/leagues" className="text-white/70 hover:text-floodlight">Leagues</Link> / {league.name}
          </p>
          <h1 className="text-white">{league.name}</h1>
          <p className="text-white/75 mt-3 max-w-lg flex flex-wrap items-center gap-2">
            <CountryFlag country={league.country} />
            <span>{league.country} — live fixtures, injury tracker, and match predictions.</span>
            {league.slug === DEFAULT_LEAGUE.slug && (
              <>
                {' '}Looking for the full Premier League experience?{' '}
                <Link href="/" className="text-floodlight hover:underline">Visit the EPL hub</Link>
              </>
            )}
          </p>
          {noProviderData && (
            <p className="mt-4 max-w-xl text-sm text-floodlight">
              Football data is temporarily unavailable because API-Football has reached the daily request limit for this key.
              {process.env.FOOTBALL_API_SEASON ? ` The page is configured for the ${process.env.FOOTBALL_API_SEASON} season.` : ''}
              Please wait for the quota to reset or use a key with access to this competition.
            </p>
          )}
        </div>
      </section>

      {/* Fixtures */}
      <section className="py-12 border-b border-slate-200">
        <div className="container">
          <h2 className="mb-6">Upcoming Fixtures</h2>
          {fixtures.length === 0 ? (
            <p className="text-slate-500">
              {noProviderData
                ? 'No fixtures can be displayed until the API-Football request limit resets.'
                : 'No fixtures found for this season and date range.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fixtures.slice(0, 8).map((match) => (
                <div key={match.id} className="bg-white border border-slate-200 rounded p-4">
                  <p className="text-xs font-mono text-slate-500 mb-2">
                    {new Date(match.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex flex-1 items-center justify-end gap-2 text-right text-sm font-semibold text-slate-700">
                      {match.homeTeam}
                      <TeamLogo name={match.homeTeam} src={teamLogos.get(match.homeTeam)} />
                    </p>
                    <p className="text-slate-400 text-sm px-2">vs</p>
                    <p className="flex flex-1 items-center gap-2 text-sm font-semibold text-slate-700">
                      <TeamLogo name={match.awayTeam} src={teamLogos.get(match.awayTeam)} />
                      {match.awayTeam}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Injuries */}
      <section className="py-12 border-b border-slate-200 bg-slate-50">
        <div className="container">
          <h2 className="mb-6">Injury News</h2>
          {topInjuries.length === 0 ? (
            <p className="text-slate-500">
              {noProviderData
                ? 'Injury data is unavailable until the API-Football request limit resets.'
                : `No recent injuries reported for ${league.name} clubs.`}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topInjuries.map((injury) => (
                <div key={injury.id} className="bg-white border border-slate-200 rounded p-4">
                  <div className="flex items-center gap-3">
                    <PlayerVisual name={injury.player} src={injury.playerPhoto} />
                    <p className="font-semibold text-sm text-slate-900">{injury.player}</p>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                    <TeamLogo name={injury.team} src={teamLogos.get(injury.team)} />
                    <span>{injury.team} — {injury.reason}</span>
                  </p>
                  <span
                    className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded ${
                      injury.status === 'out' ? 'bg-accent-red/10 text-accent-red' : 'bg-accent-amber/10 text-accent-amber'
                    }`}
                  >
                    {injury.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Predictions */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <h2 className="mb-6">Match Predictions</h2>
          {predictions.length === 0 ? (
            <p className="text-slate-500">
              {noProviderData
                ? 'Predictions are unavailable until fixture data returns from API-Football.'
                : `No predictions available yet for the next round of ${league.name} fixtures.`}
            </p>
          ) : (
            <div className="space-y-4">
              {predictions.map((pred) => (
                <div key={pred.matchId} className="bg-white border border-slate-200 rounded-lg p-5">
                  <p className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <TeamLogo name={pred.homeTeam} src={teamLogos.get(pred.homeTeam)} />
                    <span>{pred.homeTeam} vs {pred.awayTeam}</span>
                    <TeamLogo name={pred.awayTeam} src={teamLogos.get(pred.awayTeam)} />
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-50 rounded p-3">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Home</p>
                      <p className="text-xl font-bold text-pitch">{pred.homeWinProb}%</p>
                    </div>
                    <div className="bg-slate-50 rounded p-3">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Draw</p>
                      <p className="text-xl font-bold text-slate-700">{pred.drawProb}%</p>
                    </div>
                    <div className="bg-slate-50 rounded p-3">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Away</p>
                      <p className="text-xl font-bold text-pitch">{pred.awayWinProb}%</p>
                    </div>
                  </div>
                  {pred.advice && <p className="text-sm text-slate-600 mt-3">{pred.advice}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-6">{league.name} FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script {...jsonLdScriptProps(getFaqJsonLd(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsOrganization',
            name: league.name,
            sport: 'Football',
            location: { '@type': 'Country', name: league.country },
          }),
        }}
      />
    </>
  )
}
