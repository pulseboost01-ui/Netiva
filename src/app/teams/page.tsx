import { Metadata } from 'next'
import Link from 'next/link'
import { getTeams, getTeamFixtures } from '@/lib/api'
import { CountryFlag, TeamLogo } from '@/components/TeamVisual'

export const metadata: Metadata = {
  title: 'Premier League Teams & Squad News',
  description: 'All 20 Premier League clubs with fixtures, standings, and detailed squad information.',
  keywords: ['EPL teams', 'Premier League clubs', 'squad news', 'fixtures by team', 'all 20 premier league clubs'],
  alternates: { canonical: '/teams' },
  openGraph: {
    title: 'Premier League Teams & Squad News',
    description: 'All 20 Premier League clubs with fixtures, standings, and squad information.',
    url: '/teams',
  },
}

export default async function TeamsPage() {
  const teams = await getTeams()

  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">Premier League teams</h1>
          <p className="text-white/75 mt-3 max-w-lg">All 20 clubs with fixtures, standings, and squad details.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-chalk-line border border-chalk-line">
            {teams.map((team: any) => (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="block bg-chalk hover:bg-white p-6 transition-colors text-center no-underline group"
              >
                <TeamLogo name={team.name} src={team.logo} />
                <h3 className="text-sm font-medium text-ink group-hover:text-turf transition-colors">{team.name}</h3>
                {team.country && (
                  <p className="text-xs text-ink-soft mt-1 flex items-center justify-center gap-1.5">
                    <CountryFlag country={team.country} /> {team.country}
                  </p>
                )}
                <p className="text-xs text-ink-soft mt-1">Founded {team.founded}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="bg-white/50 py-12 border-t border-chalk-line">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-4">Official merchandise</h2>
          <p className="text-ink-soft mb-6">
            Shop official kits, training gear, and fan merchandise from the Premier League store.
          </p>
          <a
            href="https://www.premierleague.com/shop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline"
          >
            Visit Premier League Shop
          </a>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premier League Teams',
            hasPart: teams.map((team: any) => ({
              '@type': 'SportsTeam',
              name: team.name,
              logo: team.logo,
              founded: team.founded,
            })),
          }),
        }}
      />
    </>
  )
}
