// Central config for every competition the site covers. IDs are
// api-football's own league IDs (https://www.api-football.com/documentation-v3#tag/Leagues).
// Adding a competition is one entry here — every page, the sitemap, and
// nav pick it up automatically.
//
// IMPORTANT (read before deploying): api-football's free tier is capped at
// 100 requests/day TOTAL, shared across every endpoint. Each of these
// leagues needs its own fixtures/teams/injuries calls, and predictions cost
// one request PER FIXTURE. Covering 10 competitions at even light traffic
// will blow through 100 requests/day almost immediately even with the
// 5-minute cache in api.ts. A paid api-football plan (or a different data
// vendor) is a hard requirement for this to work in production at
// multi-league scale — not just a nice-to-have.

export type SeasonKind = 'aug-may' | 'calendar'

export interface LeagueConfig {
  slug: string
  id: number
  name: string
  shortName: string
  country: string
  seasonKind: SeasonKind
}

export const LEAGUES: LeagueConfig[] = [
  { slug: 'premier-league', id: 39, name: 'Premier League', shortName: 'EPL', country: 'England', seasonKind: 'aug-may' },
  { slug: 'la-liga', id: 140, name: 'La Liga', shortName: 'La Liga', country: 'Spain', seasonKind: 'aug-may' },
  { slug: 'serie-a', id: 135, name: 'Serie A', shortName: 'Serie A', country: 'Italy', seasonKind: 'aug-may' },
  { slug: 'bundesliga', id: 78, name: 'Bundesliga', shortName: 'Bundesliga', country: 'Germany', seasonKind: 'aug-may' },
  { slug: 'ligue-1', id: 61, name: 'Ligue 1', shortName: 'Ligue 1', country: 'France', seasonKind: 'aug-may' },
  { slug: 'champions-league', id: 2, name: 'UEFA Champions League', shortName: 'UCL', country: 'Europe', seasonKind: 'calendar' },
  { slug: 'europa-league', id: 3, name: 'UEFA Europa League', shortName: 'UEL', country: 'Europe', seasonKind: 'calendar' },
  { slug: 'eredivisie', id: 88, name: 'Eredivisie', shortName: 'Eredivisie', country: 'Netherlands', seasonKind: 'aug-may' },
  { slug: 'primeira-liga', id: 94, name: 'Primeira Liga', shortName: 'Primeira Liga', country: 'Portugal', seasonKind: 'aug-may' },
  { slug: 'mls', id: 253, name: 'Major League Soccer', shortName: 'MLS', country: 'USA', seasonKind: 'calendar' },
]

export const DEFAULT_LEAGUE = LEAGUES[0]

export function getLeagueBySlug(slug: string): LeagueConfig | undefined {
  return LEAGUES.find((l) => l.slug === slug)
}

/** api-football labels a season by its starting year for Aug-May leagues
 * (e.g. the 2026-27 Premier League season is "2026"), but by the calendar
 * year itself for leagues that run Jan-Dec (MLS, and API-Football's own
 * convention for continental cups). */
export function getSeasonForLeague(league: LeagueConfig): number {
  const configuredSeason = Number(process.env.FOOTBALL_API_SEASON)
  if (Number.isInteger(configuredSeason) && configuredSeason >= 2020) {
    return configuredSeason
  }

  const now = new Date()
  if (league.seasonKind === 'calendar') return now.getFullYear()
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
}
