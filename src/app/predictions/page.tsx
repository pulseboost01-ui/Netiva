import { Metadata } from 'next'
import Link from 'next/link'
import { getPredictions, getUpcomingFixtures, type Prediction, type Fixture } from '@/lib/api'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'EPL Predictions - This Week\'s Matches Analysis',
  description: 'Weekly Premier League match analysis and predictions based on form, head-to-head, and squad news.',
  keywords: ['EPL predictions', 'match preview', 'football analysis', 'team form', 'premier league predictions this week'],
  alternates: { canonical: '/predictions' },
  openGraph: {
    title: 'EPL Predictions - This Week\'s Matches Analysis',
    description: 'Weekly Premier League match analysis and predictions based on form and squad news.',
    url: '/predictions',
  },
}

const PREDICTION_FAQS = [
  {
    question: 'What are Premier League predictions based on?',
    answer:
      'Predictions here come from api-football’s prediction model, which weighs each side’s recent form, head-to-head history, and league statistics for the upcoming fixture.',
  },
  {
    question: 'Are these predictions guaranteed to be accurate?',
    answer:
      'No. Predictions are model output, not certainty — football results are inherently unpredictable, and these should not be treated as betting advice.',
  },
]

const METHOD_FACTORS = [
  { title: 'Current form', text: 'Recent results, goals scored and conceded, and clean sheets for both sides' },
  { title: 'Home/away split', text: 'How each team performs at home versus away this season' },
  { title: 'Head to head', text: "Actual results from the two teams' most recent meetings" },
  { title: 'League statistics', text: "Attack/defense ratings built from this season's fixtures" },
]

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default async function PredictionsPage() {
  const [predictions, fixtures] = await Promise.all([getPredictions(), getUpcomingFixtures()])
  const fixturesById = new Map<number, Fixture>(fixtures.map((f) => [f.id, f]))

  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">This week's predictions</h1>
          <p className="text-white/75 mt-3 max-w-lg">Form-based analysis and head-to-head records for every fixture.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          {predictions.length === 0 ? (
            <div className="border border-chalk-line rounded p-10 text-center">
              <p className="text-ink-soft">No predictions available right now. Check back closer to kickoff.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {predictions.map((pred: Prediction) => {
                const fixture = fixturesById.get(pred.matchId)

                return (
                  <div key={pred.matchId} className="border-b border-chalk-line pb-12 last:border-0">
                    <div className="flex items-center justify-between mb-6">
                      <Link href={`/matches/${pred.matchId}`} className="text-lg font-display font-semibold text-ink hover:text-turf transition-colors">
                        {pred.homeTeam} vs {pred.awayTeam}
                      </Link>
                      {fixture && (
                        <span className="text-sm text-ink-soft">{formatMatchDate(fixture.date)}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-px bg-chalk-line border border-chalk-line mb-6">
                      <div className="text-center bg-chalk p-4">
                        <p className="text-xs text-ink-soft mb-2">{pred.homeTeam} win</p>
                        <p className="scoreline text-2xl text-pitch">{pred.homeWinProb}%</p>
                      </div>
                      <div className="text-center bg-chalk p-4">
                        <p className="text-xs text-ink-soft mb-2">Draw</p>
                        <p className="scoreline text-2xl text-ink-soft">{pred.drawProb}%</p>
                      </div>
                      <div className="text-center bg-chalk p-4">
                        <p className="text-xs text-ink-soft mb-2">{pred.awayTeam} win</p>
                        <p className="scoreline text-2xl text-pitch">{pred.awayWinProb}%</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink mb-3 text-sm">Key factors</h4>
                      <ul className="space-y-2 text-sm text-ink-soft">
                        {pred.advice && (
                          <li className="flex gap-2">
                            <span className="text-turf shrink-0">→</span>
                            <span>{pred.advice}</span>
                          </li>
                        )}
                        {pred.formPercent && (
                          <li className="flex gap-2">
                            <span className="text-turf shrink-0">→</span>
                            <span>
                              Form rating: {pred.homeTeam} {pred.formPercent.home}%, {pred.awayTeam} {pred.formPercent.away}%
                            </span>
                          </li>
                        )}
                        {pred.recentMeetings.map((meeting) => (
                          <li key={meeting.date} className="flex gap-2">
                            <span className="text-turf shrink-0">→</span>
                            <span>
                              H2H {formatMatchDate(meeting.date)}: {meeting.homeTeam} {meeting.homeGoals ?? '?'}-{meeting.awayGoals ?? '?'} {meeting.awayTeam}
                            </span>
                          </li>
                        ))}
                        {!pred.advice && !pred.formPercent && pred.recentMeetings.length === 0 && (
                          <li className="text-ink-soft/60">No additional analysis available for this fixture yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white/50 py-12 border-t border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-6">How these are generated</h2>
          <p className="text-ink-soft mb-8 max-w-2xl">
            These win/draw/win percentages, the form rating, and the head-to-head results above come straight
            from api-football's prediction model for each fixture — this site doesn't run its own algorithm.
            The model factors in:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {METHOD_FACTORS.map((f, i) => (
              <div key={f.title} className="flex gap-4 py-4 border-b border-chalk-line sm:border-b-0 sm:py-5 sm:border-t">
                <span className="scoreline text-floodlight-dark text-lg w-6 shrink-0">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink text-sm">{f.title}</p>
                  <p className="text-sm text-ink-soft mt-0.5">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Injury Connection */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="border-l-2 border-floodlight pl-6">
            <h3 className="mb-2 text-lg">Check injuries before deciding</h3>
            <p className="text-ink-soft text-sm mb-3">
              Our predictions factor in squad news, but always cross-reference the <Link href="/injuries" className="text-turf font-medium">injury tracker</Link> for the latest updates.
            </p>
            <Link href="/injuries" className="inline-block text-sm font-semibold text-turf hover:text-pitch-light transition-colors">
              Go to injury tracker
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white/50 border-t border-chalk-line">
        <div className="container max-w-3xl">
          <h2 className="mb-6">Predictions FAQ</h2>
          <div className="space-y-6">
            {PREDICTION_FAQS.map((faq) => (
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
            name: 'EPL Predictions This Week',
            description: 'Form-based analysis and predictions for Premier League matches',
          }),
        }}
      />
      <script {...jsonLdScriptProps(getFaqJsonLd(PREDICTION_FAQS))} />
    </>
  )
}
