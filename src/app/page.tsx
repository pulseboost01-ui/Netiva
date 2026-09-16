import { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingFixtures, getInjuries, type Injury } from '@/lib/api'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'
import { PlayerVisual } from '@/components/PlayerVisual'

export const metadata: Metadata = {
  title: 'Premier League This Week - Fixtures & Injury News',
  description: 'This week\'s Premier League matches, team news, injuries, and where to stream. Live updates every minute.',
  keywords: ['premier league fixtures', 'EPL this week', 'football injuries', 'EPL news', 'premier league today'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Premier League This Week - Fixtures & Injury News',
    description: 'This week\'s Premier League matches, team news, injuries, and where to stream.',
    url: '/',
  },
}

const HOME_FAQS = [
  {
    question: 'Where can I find this week’s Premier League fixtures?',
    answer:
      'This week’s Premier League fixtures are listed on the Fixtures page, updated live with kickoff times and scores throughout each matchday.',
  },
  {
    question: 'How often is Premier League injury news updated?',
    answer:
      'The injury tracker is updated as news breaks, covering who is out, doubtful, or returning for every Premier League club ahead of the next round of fixtures.',
  },
  {
    question: 'Where can I get Fantasy Premier League captain picks?',
    answer:
      'Weekly FPL captain recommendations, differentials, and transfer advice, adjusted for the latest injury news, are on the FPL Tips page.',
  },
  {
    question: 'Where can I legally watch Premier League matches?',
    answer:
      'The Streams page lists official broadcasters and streaming services for the Premier League by region, including UK and US options.',
  },
]

// The site's index of sections, in the order a fan would actually reach
// for them across a matchweek: news before kickoff, then live, then
// FPL/watch admin. This ordering is the reason it's a numbered list
// rather than a decorative grid - the sequence carries information.
const SECTIONS = [
  { n: '01', href: '/injuries', title: 'Injury tracker', description: "Who's out, who's doubtful, before you pick a side or a lineup." },
  { n: '02', href: '/fixtures', title: 'Fixtures & stats', description: 'Every match this week with form, head-to-head record, and kickoff time.' },
  { n: '03', href: '/predictions', title: 'Weekly predictions', description: "Form-based analysis for this week's matches." },
  { n: '04', href: '/fpl-tips', title: 'Fantasy Premier League', description: 'Captain picks, transfers, and differentials, adjusted for injury news.' },
  { n: '05', href: '/teams', title: 'Team pages', description: 'Fixtures, squad news, and season trends for every club.' },
  { n: '06', href: '/streams', title: 'Where to watch', description: 'Official broadcasters by region - every match, every legal way to watch.' },
  { n: '07', href: '/leagues', title: 'Other leagues', description: 'La Liga, Serie A, Bundesliga, Ligue 1, Champions League, and more.' },
]

function FixtureRow({ match }: { match: any }) {
  const date = new Date(match.date)
  const now = new Date()
  const isLive = date <= now && date.getTime() + 95 * 60000 > now.getTime()
  const isUpcoming = date > now

  return (
    <Link
      href={`/matches/${match.id}`}
      className="flex items-center gap-4 py-4 border-b border-chalk-line/70 hover:bg-white/60 transition-colors no-underline group"
    >
      <span className="w-24 shrink-0 text-xs text-ink-soft">
        {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
        <br />
        {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span className="flex-1 text-right text-sm font-medium text-ink group-hover:text-turf">{match.homeTeam}</span>
      <span className="scoreline w-16 text-center text-lg shrink-0">
        {isLive && <span className="block text-[10px] text-card-red font-sans font-bold mb-0.5">LIVE</span>}
        {isUpcoming ? '—' : `${match.score?.home ?? '-'}–${match.score?.away ?? '-'}`}
      </span>
      <span className="flex-1 text-sm font-medium text-ink group-hover:text-turf">{match.awayTeam}</span>
    </Link>
  )
}

function InjuryLine({ injury }: { injury: Injury }) {
  return (
    <div className="flex gap-3 items-center border-b border-chalk-line/70 py-3 last:border-0">
      <PlayerVisual name={injury.player} src={injury.playerPhoto} />
      <span className="w-2 h-2 rounded-full bg-card-red shrink-0 mt-1.5" />
      <div>
        <p className="font-medium text-sm text-ink">{injury.player} <span className="text-ink-soft font-normal">· {injury.team}</span></p>
        <p className="text-xs text-ink-soft mt-0.5">{injury.reason} — {injury.status}</p>
      </div>
    </div>
  )
}

export default async function Home() {
  const [fixtures, injuries] = await Promise.all([getUpcomingFixtures(), getInjuries()])
  const topInjuries = injuries.slice(0, 4)

  return (
    <>
      {/* Hero - asymmetric: headline against a live-feeling data strip,
          not a centered slogan over a button. */}
      <section className="bg-pitch text-white">
        <div className="container py-16 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-10 items-end">
          <div className="md:col-span-3">
            <h1 className="text-white">Know before kickoff</h1>
            <p className="text-lg text-white/75 max-w-lg mt-4">
              Fixtures, injuries, and Fantasy Premier League analysis for this week — and nine other leagues besides.
            </p>
          </div>
          <div className="md:col-span-2 border-l border-white/15 pl-6">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-2">Right now</p>
            <p className="scoreline text-3xl text-floodlight">{fixtures.length}</p>
            <p className="text-sm text-white/70">fixtures on the board this week</p>
            <p className="scoreline text-3xl text-floodlight mt-4">{injuries.length}</p>
            <p className="text-sm text-white/70">players flagged in the injury tracker</p>
          </div>
        </div>
      </section>

      {/* This week's fixtures - a scoreline strip, not a card grid */}
      <section className="py-16 border-b border-chalk-line">
        <div className="container">
          <div className="flex items-baseline justify-between mb-2">
            <h2>This week&rsquo;s fixtures</h2>
            <Link href="/fixtures" className="text-sm font-medium text-turf hover:text-pitch-light">
              See all →
            </Link>
          </div>
          <div className="mt-6">
            {fixtures.length > 0 ? (
              fixtures.slice(0, 5).map((match: any) => <FixtureRow key={match.id} match={match} />)
            ) : (
              <p className="text-sm text-ink-soft py-8 border-t border-chalk-line">
                No fixtures loaded yet — check back once this week&rsquo;s round is confirmed, or see the full{' '}
                <Link href="/fixtures" className="text-turf font-medium">fixtures page</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Latest Injury News */}
      <section className="py-16 border-b border-chalk-line bg-white/50">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h2>Latest injury news</h2>
              <Link href="/injuries" className="text-sm font-medium text-turf hover:text-pitch-light">
                Full tracker →
              </Link>
            </div>
            <div className="mt-6">
              {topInjuries.length > 0 ? topInjuries.map((injury) => (
                <InjuryLine key={injury.id} injury={injury} />
              )) : (
                <p className="text-sm text-ink-soft py-8 border-t border-chalk-line">
                  Injury data is temporarily unavailable. The full tracker will refresh automatically when the provider feed returns.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section index - this IS a sequence (news to watch, in the order
          a fan uses it across a matchweek), so numbering earns its
          place here rather than decorating a random grid. */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="mb-2">Everything on this site</h2>
          <div className="mt-8">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-start gap-6 py-5 border-b border-chalk-line last:border-0 group no-underline"
              >
                <span className="scoreline text-2xl text-floodlight-dark w-10 shrink-0">{s.n}</span>
                <div>
                  <h3 className="text-ink group-hover:text-turf transition-colors">{s.title}</h3>
                  <p className="text-sm text-ink-soft mt-1">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently asked questions - answers Google's "People also ask" and
          gives AI answer engines (ChatGPT, Perplexity, AI Overviews) a
          clean, quotable summary of what this site covers. */}
      <section className="py-16 bg-white/50 border-t border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {HOME_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-ink mb-1 text-base">{faq.question}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script {...jsonLdScriptProps(getFaqJsonLd(HOME_FAQS))} />
    </>
  )
}
