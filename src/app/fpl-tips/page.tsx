import { Metadata } from 'next'
import Link from 'next/link'
import {
  getCaptainPicks,
  getDifferentials,
  getTransferInCandidates,
  getTransferOutCandidates,
  getFplAvailability,
  getFplGameweek,
  getFplPlayerPhotoUrl,
  FplPlayer,
} from '@/lib/fpl'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { PlayerVisual } from '@/components/PlayerVisual'
import { TeamLogo } from '@/components/TeamVisual'
import { getTeams } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Fantasy Premier League Tips - Captain Picks & Transfers',
  description: 'Weekly FPL analysis, captain recommendations, transfer tips, and differential plays. Injury-adjusted advice.',
  keywords: ['fantasy premier league tips', 'FPL captain picks', 'FPL transfers', 'FPL differential', 'best FPL captain this gameweek'],
  alternates: { canonical: '/fpl-tips' },
  openGraph: {
    title: 'Fantasy Premier League Tips - Captain Picks & Transfers',
    description: 'Weekly FPL analysis, captain recommendations, transfer tips, and differential plays.',
    url: '/fpl-tips',
  },
}

const FPL_FAQS = [
  {
    question: 'Who should I captain in FPL this gameweek?',
    answer:
      'The captain picks below are ranked by FPL’s own next-gameweek expected-points model, restricted to players who are confirmed available and have played regular minutes this season — check the availability list first, since a doubtful player is a risky captain choice.',
  },
  {
    question: 'What is an FPL differential?',
    answer:
      'A differential is a lower-ownership player with strong underlying stats, picked to gain rank on the overall FPL leaderboard rather than just following the crowd. The list below is capped at 5% ownership.',
  },
]

function StatusBadge({ status }: { status: FplPlayer['status'] }) {
  const styles: Record<FplPlayer['status'], { bg: string; text: string; label: string }> = {
    a: { bg: 'bg-accent-green/10', text: 'text-accent-green', label: 'AVAILABLE' },
    d: { bg: 'bg-accent-amber/10', text: 'text-accent-amber', label: 'DOUBTFUL' },
    i: { bg: 'bg-accent-red/10', text: 'text-accent-red', label: 'INJURED' },
    s: { bg: 'bg-accent-red/10', text: 'text-accent-red', label: 'SUSPENDED' },
    u: { bg: 'bg-slate-200', text: 'text-slate-600', label: 'UNAVAILABLE' },
    n: { bg: 'bg-slate-200', text: 'text-slate-600', label: 'NOT IN SQUAD' },
  }
  const style = styles[status] || styles.a
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}

export default async function FPLTipsPage() {
  const [captainPicks, differentials, transfersIn, transfersOut, availability, gameweek, teams] =
    await Promise.all([
      getCaptainPicks(4),
      getDifferentials(4),
      getTransferInCandidates(4),
      getTransferOutCandidates(4),
      getFplAvailability(8),
      getFplGameweek(),
      getTeams(),
    ])

  const teamLogos = new Map(teams.map((team) => [team.name, team.logo]))

  const hasAnyData =
    captainPicks.length > 0 ||
    differentials.length > 0 ||
    transfersIn.length > 0 ||
    transfersOut.length > 0

  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">Fantasy Premier League tips</h1>
          <p className="text-white/75 mt-3 max-w-lg">
            Weekly captain picks, transfer advice, and differential plays, pulled live from the
            official FPL API{gameweek.next ? ` for Gameweek ${gameweek.next}` : ''}.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          {!hasAnyData && (
            <div className="bg-slate-50 rounded p-8 text-center border border-slate-200 mb-12">
              <p className="text-slate-600">
                FPL data is temporarily unavailable. Check back shortly — this page refreshes
                automatically once the feed responds again.
              </p>
            </div>
          )}

          {/* Captain Section */}
          {captainPicks.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6">This week's captain picks</h2>
              <div className="space-y-4">
                {captainPicks.map((player, i) => (
                  <div key={player.id} className="bg-white border border-slate-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <PlayerVisual name={player.name} src={getFplPlayerPhotoUrl(player.photo)} />
                        <TeamLogo name={player.team} src={teamLogos.get(player.team)} />
                        <div>
                        <p className="text-sm text-slate-500 uppercase font-bold mb-1">
                          {i === 0 ? 'Top pick' : `Option ${i + 1}`} — {player.team}
                        </p>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {player.name} (£{player.price.toFixed(1)}m)
                        </p>
                      </div>
                      <span className="text-xs font-bold text-accent-green bg-green-50 px-3 py-1 rounded">
                        {player.expectedPointsNext.toFixed(1)} xPts
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {player.position} · Form: {player.form.toFixed(1)} · Season total: {player.totalPoints} pts
                    </p>
                    <p className="text-xs text-slate-500">
                      Expected points (next GW): {player.expectedPointsNext.toFixed(1)} | Ownership: {player.selectedByPercent.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transfer Section */}
          {(transfersIn.length > 0 || transfersOut.length > 0) && (
            <div className="mb-12 border-t border-slate-200 pt-12">
              <h2 className="mb-6">Recommended transfers</h2>
              <div className="space-y-4">
                {transfersIn.length > 0 && (
                  <div className="bg-slate-50 border border-chalk-line p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Transfer in — net transfers rising</h4>
                    <ul className="space-y-2">
                      {transfersIn.map((player) => (
                        <li key={player.id} className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-3 text-slate-700">
                            <PlayerVisual name={player.name} src={getFplPlayerPhotoUrl(player.photo)} />
                            <TeamLogo name={player.team} src={teamLogos.get(player.team)} />
                            <span>
                            {player.name} (£{player.price.toFixed(1)}m) — {player.team}, form {player.form.toFixed(1)}
                            </span>
                          </span>
                          <span className="text-accent-green font-bold">
                            {player.costChangeEvent > 0 ? '+' : ''}
                            {(player.costChangeEvent / 10).toFixed(1)}m
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {transfersOut.length > 0 && (
                  <div className="bg-slate-50 border border-chalk-line p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Transfer out — flagged or losing owners</h4>
                    <ul className="space-y-2">
                      {transfersOut.map((player) => (
                        <li key={player.id} className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-3 text-slate-700">
                            <PlayerVisual name={player.name} src={getFplPlayerPhotoUrl(player.photo)} />
                            <TeamLogo name={player.team} src={teamLogos.get(player.team)} />
                            <span>
                            {player.name} (£{player.price.toFixed(1)}m) —{' '}
                            {player.status === 'a' ? 'Losing owners fast' : player.news || 'Flagged unavailable'}
                            </span>
                          </span>
                          <span className="text-accent-red font-bold">
                            {player.costChangeEvent < 0 ? '' : '−'}
                            {(Math.abs(player.costChangeEvent) / 10).toFixed(1)}m
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Injury Alert */}
          {availability.length > 0 && (
            <div className="mb-12 border-t border-slate-200 pt-12 bg-accent-amber/5 border border-accent-amber rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-3">🚨 Key availability updates</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {availability.slice(0, 6).map((player) => (
                  <li key={player.id} className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <PlayerVisual name={player.name} src={getFplPlayerPhotoUrl(player.photo)} />
                      <TeamLogo name={player.team} src={teamLogos.get(player.team)} />
                      <span>
                        {player.name} ({player.position}, £{player.price.toFixed(1)}m) —{' '}
                        {player.news || 'No further detail from FPL'}
                      </span>
                    </span>
                    <StatusBadge status={player.status} />
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-600 mt-4 font-semibold">
                Full injury tracker: <Link href="/injuries" className="text-accent-green hover:underline">Check latest squad news →</Link>
              </p>
            </div>
          )}

          {/* Differentials */}
          {differentials.length > 0 && (
            <div className="border-t border-slate-200 pt-12">
              <h2 className="mb-6">Differential plays</h2>
              <p className="text-slate-600 mb-6">
                Players at 5% ownership or below, ranked by FPL's next-gameweek expected points. Higher variance, but significant upside if they deliver.
              </p>
              <div className="space-y-3">
                {differentials.map((player) => (
                  <div key={player.id} className="bg-white border border-slate-200 rounded p-4">
                    <p className="font-semibold text-slate-900 flex items-center gap-3">
                      <PlayerVisual name={player.name} src={getFplPlayerPhotoUrl(player.photo)} />
                      <TeamLogo name={player.team} src={teamLogos.get(player.team)} />
                      <span>{player.name} ({player.position}, £{player.price.toFixed(1)}m) — {player.team}</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      xPts next GW: {player.expectedPointsNext.toFixed(1)}. Ownership: {player.selectedByPercent.toFixed(1)}%.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FPL Resources */}
      <section className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-center">Helpful tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://fantasy.premierleague.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors"
            >
              <p className="font-bold text-slate-900 mb-2">Official FPL</p>
              <p className="text-sm text-slate-600">Manage your team and check live points</p>
            </a>
            <Link href="/injuries" className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors">
              <p className="font-bold text-slate-900 mb-2">Injury Tracker</p>
              <p className="text-sm text-slate-600">Latest squad news and player availability</p>
            </Link>
            <Link href="/fixtures" className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors">
              <p className="font-bold text-slate-900 mb-2">Fixtures</p>
              <p className="text-sm text-slate-600">Full schedule and fixture difficulty ratings</p>
            </Link>
            <Link href="/predictions" className="block bg-white border border-slate-200 rounded p-6 hover:border-turf transition-colors">
              <p className="font-bold text-slate-900 mb-2">Predictions</p>
              <p className="text-sm text-slate-600">Form analysis and match probabilities</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-6">FPL Tips FAQ</h2>
          <div className="space-y-6">
            {FPL_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Fantasy Premier League Tips',
            description: 'Weekly FPL analysis, captain picks, and transfer advice',
          }),
        }}
      />
      <script {...jsonLdScriptProps(getFaqJsonLd(FPL_FAQS))} />
    </>
  )
}
