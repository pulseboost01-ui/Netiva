import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getTeams, getUpcomingFixtures } from '@/lib/api'
import { LEAGUES } from '@/lib/leagues'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/fixtures`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/injuries`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/predictions`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/fpl-tips`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/streams`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/teams`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/leagues`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const leagueRoutes: MetadataRoute.Sitemap = LEAGUES.map((league) => ({
    url: `${SITE_URL}/leagues/${league.slug}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Best-effort: these calls hit the live football API. If the API key is
  // missing or the request fails, api.ts already returns [] rather than
  // throwing, so the sitemap still builds with the static routes above.
  const [teams, fixtures] = await Promise.all([
    getTeams().catch(() => []),
    getUpcomingFixtures().catch(() => []),
  ])

  const teamRoutes: MetadataRoute.Sitemap = (teams as any[]).map((team) => ({
    url: `${SITE_URL}/teams/${team.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const matchRoutes: MetadataRoute.Sitemap = (fixtures as any[]).map((match) => ({
    url: `${SITE_URL}/matches/${match.id}`,
    changeFrequency: 'hourly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...leagueRoutes, ...teamRoutes, ...matchRoutes]
}
