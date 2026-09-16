import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { MobileNav } from '@/components/MobileNav'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SOCIAL,
  getOrganizationJsonLd,
  jsonLdScriptProps,
} from '@/lib/seo'

const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Fixtures, Injuries, Predictions & FPL Tips`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Premier League fixtures',
    'EPL injury tracker',
    'Premier League predictions',
    'Fantasy Premier League tips',
    'where to watch Premier League',
    'EPL live scores',
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Fixtures, Injuries, Predictions & FPL Tips`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL.twitterHandle,
    creator: SOCIAL.twitterHandle,
    title: `${SITE_NAME} - Fixtures, Injuries, Predictions & FPL Tips`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  category: 'sports',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e3b2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { href: '/fixtures', label: 'Fixtures' },
    { href: '/injuries', label: 'Injuries' },
    { href: '/teams', label: 'Teams' },
    { href: '/predictions', label: 'Predictions' },
    { href: '/leagues', label: 'All Leagues' },
    { href: '/streams', label: 'Watch' },
    { href: '/fpl-tips', label: 'FPL Tips' },
  ]

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8597898343613591"
          crossOrigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://media.api-sports.io" />
        {/* Sitewide Organization + WebSite entity. Helps Google's Knowledge
            Graph and answer engines treat every page as part of one
            consistent, citable source instead of isolated pages. */}
        <script {...jsonLdScriptProps(getOrganizationJsonLd())} />
      </head>
      <body className="font-sans">
        <AnalyticsTracker />
        <header className="bg-pitch text-chalk sticky top-0 z-50">
          <div className="container relative flex min-h-16 items-center justify-between gap-4 py-3">
            <Link href="/" className="font-display text-xl font-semibold tracking-tight text-white">
              {SITE_NAME}
            </Link>
            <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm font-medium md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-chalk/85 hover:text-floodlight transition-colors no-underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <MobileNav items={navItems} />
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-ink text-chalk/70 py-14 mt-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div>
                <h3 className="font-display text-base font-semibold text-white mb-4">About</h3>
                <p className="text-sm leading-relaxed">
                  {SITE_NAME} provides live fixtures, injury updates, stream links, predictions, and Fantasy
                  Premier League analysis for every Premier League matchday — plus fixtures, injuries, and
                  predictions for <Link href="/leagues" className="underline text-chalk hover:text-floodlight">nine other major competitions</Link>.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white mb-4">Navigation</h3>
                <ul className="space-y-2 text-sm">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-chalk/70 hover:text-floodlight transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy-policy" className="text-chalk/70 hover:text-floodlight transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-chalk/70 hover:text-floodlight transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclaimer" className="text-chalk/70 hover:text-floodlight transition-colors">Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white mb-4">Data</h3>
                <p className="text-sm leading-relaxed">
                  Fixture and squad data is updated live. Stream recommendations link to official
                  broadcasters only. We earn commission on some merchandise and streaming referral links.
                </p>
              </div>
            </div>
            <div className="border-t border-chalk/15 pt-8">
              <p className="text-xs text-chalk/50">
                © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with the Premier League. All data is
                provided for informational purposes.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
