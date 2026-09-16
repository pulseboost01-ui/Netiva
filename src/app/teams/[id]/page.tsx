import { Metadata } from 'next'
import Link from 'next/link'
import { getTeam, getTeamFixtures } from '@/lib/api'
import { notFound } from 'next/navigation'
import { getBreadcrumbJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { CountryFlag, TeamLogo } from '@/components/TeamVisual'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const team = await getTeam(params.id)

  if (!team) return notFound()

  return {
    title: `${team.name} - Fixtures, Squad News & Stats`,
    description: `${team.name} Premier League fixtures, injury news, season statistics, and upcoming opponents.`,
    keywords: [`${team.name} fixtures`, `${team.name} injury news`, `${team.name} Premier League`],
    alternates: { canonical: `/teams/${params.id}` },
    openGraph: {
      title: `${team.name} - Fixtures, Squad News & Stats`,
      description: `${team.name} Premier League fixtures, injury news, and season statistics.`,
      url: `/teams/${params.id}`,
    },
  }
}

export default async function TeamPage({ params }: { params: { id: string } }) {
  const team = await getTeam(params.id)
  const fixtures = await getTeamFixtures(params.id)

  if (!team) {
    notFound()
  }

  const goalsRatio = (team.goalsFor / (team.goalsFor + team.goalsAgainst || 1)).toFixed(2)

  return (
    <>
      <section className="bg-pitch text-white py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-6 mb-8">
            <TeamLogo name={team.name} src={team.logo} size="large" />
            <div>
              <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
              <p className="text-slate-300 flex items-center gap-2">
                {team.country && <CountryFlag country={team.country} />}
                {team.country} · Founded {team.founded}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Season statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Wins</p>
              <p className="text-3xl font-bold text-pitch">{team.wins}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Draws</p>
              <p className="text-3xl font-bold text-slate-700">0</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Losses</p>
              <p className="text-3xl font-bold text-accent-red">{team.losses}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Goals For</p>
              <p className="text-3xl font-bold text-accent-green">{team.goalsFor}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold mb-2">Goals Against</p>
              <p className="text-3xl font-bold text-accent-red">{team.goalsAgainst}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 mb-4">Goal difference</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent-green h-full"
                  style={{ width: `${Math.max(Math.min(parseInt(goalsRatio) * 100, 100), 0)}%` }}
                ></div>
              </div>
              <p className="font-bold text-slate-900">{team.goalsFor - team.goalsAgainst}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Upcoming fixtures</h2>
          <div className="space-y-3">
            {fixtures.slice(0, 5).map((match: any) => (
              <Link
                key={match.id}
                href={`/matches/${match.id}`}
                className="block bg-white border border-slate-200 rounded p-4 hover:border-turf transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500 font-mono min-w-fit">
                    {new Date(match.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{match.homeTeam}</span>
                    <span className="text-sm text-slate-500 mx-2">vs</span>
                    <span className="text-sm font-semibold text-slate-700">{match.awayTeam}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/fixtures" className="inline-block mt-6 text-sm font-semibold text-accent-green hover:text-emerald-700 transition-colors">
            See all fixtures →
          </Link>
        </div>
      </section>

      {/* Squad News CTA */}
      <section className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-4">{team.name} squad news</h2>
          <p className="text-slate-600 mb-6">
            Check the injury tracker for the latest updates on player availability and suspensions.
          </p>
          <Link href="/injuries" className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline">
            View injury tracker
          </Link>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsTeam',
            name: team.name,
            logo: team.logo,
            founded: team.founded,
          }),
        }}
      />
      <script
        {...jsonLdScriptProps(
          getBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Teams', path: '/teams' },
            { name: team.name, path: `/teams/${team.id}` },
          ])
        )}
      />
    </>
  )
}
