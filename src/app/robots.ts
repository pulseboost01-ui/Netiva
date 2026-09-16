import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Explicitly allowing AI answer-engine crawlers (GPTBot, PerplexityBot,
// ClaudeBot, Google-Extended, Amazonbot) is part of AEO: if they can't
// crawl you, they can't cite you in AI Overviews / ChatGPT / Perplexity
// answers. Remove any of these if you'd rather opt out of AI training use.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
