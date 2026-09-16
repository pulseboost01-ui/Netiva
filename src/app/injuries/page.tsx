import { Metadata } from 'next'
import Link from 'next/link'
import { getInjuries, getTeams } from '@/lib/api'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { PlayerVisual } from '@/components/PlayerVisual'

export const metadata: Metadata = {
  title: 'Premier League Injury Tracker - Live Updates',
  description: 'Real-time injury and suspension updates for all Premier League teams. Know who\'s fit before this week\'s matches.',
  keywords: ['injury tracker', 'player availability', 'EPL news', 'suspension', 'injury updates', 'who is injured premier league'],
  alternates: { canonical: '/injuries' },
  openGraph: {
    title: 'Premier League Injury Tracker - Live Updates',
    description: 'Real-time injury and suspension updates for all Premier League teams.',
    url: '/injuries',
  },
}

const INJURY_FAQS = [
  {
    question: 'How do I know if a player is fit for this weekend?',
    answer:
      'Check the status badge next to each player: OUT means they missed their most recent listed fixture through injury or suspension, and DOUBTFUL means the club or API has flagged their availability as a late call.',
  },
  {
    question: 'How often is the injury tracker updated?',
    answer:
      'This tracker pulls directly from api-football’s injury feed, filtered to the most recent report per player from the last three weeks, so it refreshes as soon as the underlying data does (cached for 5 minutes on this site).',
  },
]

const HOW_TO_USE = [
  { label: 'Check before selections', text: 'Review this page before choosing your starting XI or FPL lineup.' },
  { label: 'Plan transfers', text: 'If a key player is out for weeks, consider an early transfer.' },
  { label: 'Spot trends', text: 'Multiple injuries from one team might signal squad depth issues.' },
  { label: 'Read the reason', text: 'A knock or minor issue often means a quicker return than a listed muscle or ligament injury.' },
]

function SeverityBadge({ status }: { status: string }) {
  const styles: Record<string, { text: string; label: string }> = {
    out: { text: 'text-card-red', label: 'OUT' },
    doubtful: { text: 'text-floodlight-dark', label: 'DOUBTFUL' },
  }

  const style = styles[status] || styles.doubtful

  return (
    <span className={`scoreline text-xs ${style.text}`}>
      {style.label}
    </span>
  )
}

export default async function InjuriesPage() {
  const injuries = await getInjuries()
  const teams = await getTeams()

  // Group by team
  const grouped = injuries.reduce((acc: any, injury: any) => {
    if (!acc[injury.team]) acc[injury.team] = []
    acc[injury.team].push(injury)
    return acc
  }, {})

  const sortedTeams = Object.keys(grouped).sort()

  return (
    <>
      <section className="bg-pitch text-white py-16">
        <div className="container grid grid-cols-1 md:grid-cols-5 gap-8 items-end">
          <div className="md:col-span-3">
            <h1 className="text-white">Injury tracker</h1>
            <p className="text-white/75 mt-3 max-w-lg">
              Player availability across the league, pulled from the same feed clubs use for team news. Check this before you pick a side.
            </p>
          </div>
          <div className="md:col-span-2 border-l border-white/15 pl-6">
            <p className="scoreline text-3xl text-floodlight">{injuries.length}</p>
            <p className="text-sm text-white/70">players currently flagged, across {sortedTeams.length} clubs</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="mb-10 flex gap-6 pb-6 border-b border-chalk-line">
            <span className="text-sm text-ink-soft flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-card-red"></span>
              Out
            </span>
            <span className="text-sm text-ink-soft flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-floodlight"></span>
              Doubtful
            </span>
          </div>

          {sortedTeams.length === 0 ? (
            <div className="border border-chalk-line rounded p-10 text-center">
              <p className="scoreline text-lg text-ink mb-2">All clear</p>
              <p className="text-ink-soft max-w-sm mx-auto">
                No injuries currently reported — every squad in this tracker is at full strength. Check{' '}
                <Link href="/fixtures" className="text-turf font-medium">this week&rsquo;s fixtures</Link> or{' '}
                <Link href="/fpl-tips" className="text-turf font-medium">FPL tips</Link> while you wait for team news.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {sortedTeams.map((team: string) => (
                <div key={team} className="border-l-2 border-turf pl-6">
                  <h2 className="text-lg mb-4">{team}</h2>
                  <div>
                    {grouped[team].map((injury: any) => {
                      const fixtureDate = new Date(injury.fixtureDate)

                      return (
                        <div key={injury.id} className="flex items-start justify-between gap-4 py-3 border-b border-chalk-line last:border-0">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <PlayerVisual name={injury.player} src={injury.playerPhoto} />
                              <div>
                                <p className="font-medium text-ink">{injury.player}</p>
                                <p className="text-xs text-ink-soft mt-0.5">{injury.team}</p>
                              </div>
                            </div>
                            <p className="text-sm text-ink-soft mt-0.5">{injury.reason}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <SeverityBadge status={injury.status} />
                            <p className="text-xs text-ink-soft mt-1">
                              {fixtureDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FPL CTA */}
      <section className="bg-pitch/[0.04] border-t border-turf py-12">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-4">Fantasy Premier League players</h2>
          <p className="text-ink-soft mb-6">
            Use injury data to refine your captain picks and bench strategy. Updated live every matchday.
          </p>
          <Link href="/fpl-tips" className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline">
            See this week's FPL analysis
          </Link>
        </div>
      </section>

      {/* AEO Content */}
      <section className="py-12 border-t border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-6">How to use this tracker</h2>
          <div className="space-y-5">
            {HOW_TO_USE.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="scoreline text-turf text-sm w-6 shrink-0">{'→'}</span>
                <p className="text-sm text-ink-soft"><strong className="text-ink font-semibold">{item.label}:</strong> {item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - targets "who is injured for [team]" style AI/search queries */}
      <section className="py-12 bg-white/50 border-t border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-6">Injury tracker FAQ</h2>
          <div className="space-y-6">
            {INJURY_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-ink mb-1 text-base">{faq.question}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{faq.answer}</p>
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
            name: 'Premier League Injury Tracker',
            description: 'Real-time injury and suspension updates for Premier League players',
            mainEntity: {
              '@type': 'Collection',
              hasPart: injuries.map((injury: any) => ({
                '@type': 'Thing',
                name: injury.player,
                description: `${injury.reason} - ${injury.team}`,
              })),
            },
          }),
        }}
      />
      <script {...jsonLdScriptProps(getFaqJsonLd(INJURY_FAQS))} />
    </>
  )
}
