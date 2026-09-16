// Central SEO + AEO (Answer Engine Optimization) configuration.
// Edit SITE_URL / SITE_NAME / socials once you have a real domain and handles,
// and every page's metadata + structured data updates automatically.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://example.com'

export const SITE_NAME = 'Netiva'
export const SITE_SHORT_NAME = 'Netiva'
export const SITE_DESCRIPTION =
  'Live Premier League fixtures, injury tracking, predictions, and Fantasy Premier League tips — plus La Liga, Serie A, Bundesliga, Ligue 1, Champions League, and more.'

// Core keyword clusters. Reuse these across page metadata + copy instead of
// inventing new phrasing per page — consistent phrasing is what both Google
// and answer engines (ChatGPT, Perplexity, Google AI Overviews) learn to
// associate with your site.
export const KEYWORD_CLUSTERS = {
  core: [
    'Premier League fixtures',
    'EPL fixtures today',
    'Premier League live scores',
    'Premier League table',
  ],
  injuries: [
    'Premier League injury news',
    'EPL injury tracker',
    'who is injured this week Premier League',
    'player availability EPL',
  ],
  fpl: [
    'Fantasy Premier League tips',
    'FPL captain picks this week',
    'FPL differentials',
    'best FPL transfers gameweek',
  ],
  predictions: [
    'Premier League predictions this week',
    'EPL match previews',
    'Premier League score predictions',
  ],
  streams: [
    'how to watch Premier League',
    'where to stream EPL matches',
    'Premier League TV channel today',
  ],
  teams: [
    'Premier League club news',
    'EPL team fixtures and form',
  ],
} as const

export const SOCIAL = {
  // Fill these in once the accounts exist — they power sameAs in the
  // Organization schema, which is what helps answer engines and Google
  // treat this as one consistent, citable entity.
  twitter: '', // e.g. 'https://twitter.com/eplhub'
  twitterHandle: '@eplhub',
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Organization + WebSite JSON-LD, meant to be rendered once in the root layout. */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/icon.png'),
        sameAs: [SOCIAL.twitter].filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/fixtures?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
}

/** FAQPage JSON-LD — the single highest-leverage schema for AEO. Answer
 * engines lift question/answer pairs almost verbatim when they're marked
 * up like this, so keep answers short, factual, and self-contained. */
export function getFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Renders a <script type="application/ld+json"> block. Use one per schema
 * object rather than combining unrelated types into one blob. */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  }
}
