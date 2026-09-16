import { Metadata } from 'next'
import { getFaqJsonLd, jsonLdScriptProps } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Where to Watch Premier League - Streaming & Broadcast Guide',
  description: 'Official broadcasters and streaming services for Premier League matches. UK, US, and international options.',
  keywords: ['where to watch EPL', 'premier league streams', 'broadcast', 'now tv', 'sky sports', 'peacock', 'how to watch premier league in the us'],
  alternates: { canonical: '/streams' },
  openGraph: {
    title: 'Where to Watch Premier League - Streaming & Broadcast Guide',
    description: 'Official broadcasters and streaming services for Premier League matches.',
    url: '/streams',
  },
}

const STREAM_FAQS = [
  {
    question: 'How can I watch Premier League matches in the UK?',
    answer:
      'In the UK, live Premier League matches are shown on Sky Sports, TNT Sports, and Amazon Prime Video depending on the fixture, with Match of the Day highlights on the BBC.',
  },
  {
    question: 'How can I watch Premier League matches in the US?',
    answer:
      'In the US, every Premier League match is broadcast on NBC/USA Network and streamed on Peacock.',
  },
]

export default function StreamsPage() {
  return (
    <>
      <section className="bg-pitch py-16">
        <div className="container">
          <h1 className="text-white">Where to watch the Premier League</h1>
          <p className="text-white/75 mt-3 max-w-lg">All legal ways to stream or watch every EPL fixture. Updated for the current season.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="mb-8">United Kingdom</h2>
          <div className="space-y-6 mb-12">
            <div className="border border-slate-200 rounded-lg p-6 hover:border-turf transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Sky Sports</h3>
                  <p className="text-sm text-slate-600 mt-1">Premier League matches, live and on-demand</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Sky Sports offers the most extensive EPL coverage with matches across Sky Sports Main Event and Sky Sports Football. Subscription includes access to Sky Go app.
              </p>
              <a
                href="https://www.sky.com/sports"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline text-sm"
              >
                Learn more
              </a>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 hover:border-turf transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">NOW TV</h3>
                  <p className="text-sm text-slate-600 mt-1">Day and month passes available</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Stream live Premier League matches without a contract. Day pass £14.99, or a rolling monthly pass from £27.99 (12-month saver rate, then £34.99).
              </p>
              <a
                href="https://www.nowtv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline text-sm"
              >
                Learn more
              </a>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 hover:border-turf transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Amazon Prime Video</h3>
                  <p className="text-sm text-slate-600 mt-1">Select matches throughout the season</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Amazon holds rights to select Wednesday evening and Boxing Day matches. Included with Prime membership or standalone sports subscription.
              </p>
              <a
                href="https://www.amazon.co.uk/prime"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline text-sm"
              >
                Learn more
              </a>
            </div>
          </div>

          <h2 className="mb-8">United States</h2>
          <div className="space-y-6 mb-12">
            <div className="border border-slate-200 rounded-lg p-6 hover:border-turf transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Peacock</h3>
                  <p className="text-sm text-slate-600 mt-1">Exclusive US home of Premier League</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                NBC's streaming service carries nearly all EPL matches. Available on Peacock Premium ($12.99/month with ads, $19.99 ad-free).
              </p>
              <a
                href="https://www.peacocktv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline text-sm"
              >
                Learn more
              </a>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 hover:border-turf transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Fubo</h3>
                  <p className="text-sm text-slate-600 mt-1">Live sports streaming</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Cable-free option with NBC coverage. Base plans start around $73.99/month — regional sports network fees are often added on top, so check the final price at signup.
              </p>
              <a
                href="https://www.fubo.tv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline text-sm"
              >
                Learn more
              </a>
            </div>
          </div>

          <h2 className="mb-8">Other regions</h2>
          <div className="bg-slate-50 border border-chalk-line p-6">
            <p className="text-sm text-slate-700 mb-4">
              Premier League rights vary by country. Check your local broadcaster or streaming service. Common international providers include:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-slate-700">
              <li>• DAZN (Canada, Europe)</li>
              <li>• Optus Sport (Australia)</li>
              <li>• Stan Sport (Australia)</li>
              <li>• SuperSport (Africa)</li>
              <li>• ESPN+ (Latin America)</li>
              <li>• Hotstar (India)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Match Schedule CTA */}
      <section className="bg-accent-green/5 border-t border-accent-green py-12">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-4">Never miss a match</h2>
          <p className="text-slate-600 mb-6">
            Check our fixtures page to see which matches are available on each broadcaster this week.
          </p>
          <a href="/fixtures" className="inline-block bg-floodlight text-ink px-6 py-2.5 rounded font-semibold hover:bg-floodlight-dark hover:text-white transition-colors no-underline">
            See this week's fixtures
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="mb-6">Watching FAQ</h2>
          <div className="space-y-6">
            {STREAM_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 border-t border-slate-200">
        <div className="container max-w-3xl">
          <p className="text-xs text-slate-500">
            Prices last verified September 2026. Broadcasting rights and subscription prices change season to season and even month to month — please verify current availability and pricing with broadcasters directly before subscribing.
          </p>
        </div>
      </section>

      <script
        {...jsonLdScriptProps({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Where to Watch Premier League',
          description: 'Official broadcasters and streaming services for Premier League matches',
        })}
      />
      <script {...jsonLdScriptProps(getFaqJsonLd(STREAM_FAQS))} />
    </>
  )
}
