import axios from 'axios'
import { LeagueConfig, DEFAULT_LEAGUE, getSeasonForLeague } from './leagues'
import { getFplAvailability, getFplPlayerPhotoUrl } from './fpl'
import { recordMetric } from './metrics'

// api-football.com — see src/lib/leagues.ts for the rate-limit warning
// about covering multiple competitions on a free-tier key.
const API_KEY = process.env.FOOTBALL_API_KEY || 'demo'
const API_BASE = 'https://v3.football.api-sports.io'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'x-apisports-key': API_KEY,
  },
})

api.interceptors.response.use(
  (response) => {
    void recordMetric({
      kind: 'api_request',
      provider: 'api-football',
      status: response.status,
      metadata: { endpoint: response.config.url || 'unknown' },
    })
    return response
  },
  (error) => {
    void recordMetric({
      kind: 'error',
      provider: 'api-football',
      status: error.response?.status,
      metadata: { endpoint: error.config?.url || 'unknown', code: error.code || 'unknown' },
    })
    return Promise.reject(error)
  },
)

function getFixtureDateRange(league: LeagueConfig): { from: string; to: string } {
  const configuredSeason = Number(process.env.FOOTBALL_API_SEASON)
  if (Number.isInteger(configuredSeason) && configuredSeason >= 2020) {
    if (league.seasonKind === 'calendar') {
      return { from: `${configuredSeason}-01-01`, to: `${configuredSeason}-12-31` }
    }

    return { from: `${configuredSeason}-08-01`, to: `${configuredSeason + 1}-06-30` }
  }

  const from = new Date()
  const to = new Date(from)
  to.setDate(to.getDate() + 90)

  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  }
}

// --- Types -----------------------------------------------------------
// Explicit return types on every exported function below (rather than
// letting TypeScript infer them) is what keeps `next build` from failing:
// without them, the cache helper's generic collapses to `{}` and every
// page that reads `match.homeTeam` etc. fails to type-check.

export interface Fixture {
  id: number
  date: string
  homeTeam: string
  awayTeam: string
  score: { home: number | null; away: number | null }
  status: string
  venue?: string
  referee?: string
}

export interface Team {
  id: number
  name: string
  logo: string
  founded: number
  country?: string
}

export interface TeamStats extends Team {
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
}

export interface Injury {
  id: string
  player: string
  playerPhoto?: string
  team: string
  // These map to api-football's own `type`/`reason` fields (e.g. type:
  // "Missing Fixture", reason: "Hamstring Injury") rather than an invented
  // position/return-date, since the API doesn't provide either of those.
  type: string
  reason: string
  status: 'out' | 'doubtful'
  fixtureDate: string
}

async function getFallbackPremierLeagueInjuries(): Promise<Injury[]> {
  const players = await getFplAvailability(12)
  return players.map((player) => ({
    id: `fpl-${player.id}`,
    player: player.name,
    playerPhoto: getFplPlayerPhotoUrl(player.photo),
    team: player.team,
    type: player.status === 'd' ? 'Doubtful' : player.status === 's' ? 'Suspended' : 'Unavailable',
    reason: player.news || 'Flagged in the official FPL availability feed',
    status: player.status === 'd' ? 'doubtful' : 'out',
    fixtureDate: new Date().toISOString(),
  }))
}

export interface RecentMeeting {
  date: string
  homeTeam: string
  awayTeam: string
  homeGoals: number | null
  awayGoals: number | null
}

export interface Prediction {
  matchId: number
  homeTeam: string
  awayTeam: string
  homeWinProb: number
  drawProb: number
  awayWinProb: number
  // api-football's own generated advice string, e.g. "Double chance :
  // Arsenal or Draw and -3.5 goals". Empty string if the API didn't return one.
  advice: string
  // "Form rating" percent api-football computes from each side's last
  // several results. Null if the API didn't return a comparison block.
  formPercent: { home: number; away: number } | null
  recentMeetings: RecentMeeting[]
}

// --- Cache -------------------------------------------------------------

const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T
  }
  cache.delete(key)
  return null
}

function setCache<T>(key: string, data: T): T {
  cache.set(key, { data, timestamp: Date.now() })
  return data
}

// --- API functions -------------------------------------------------------

export async function getUpcomingFixtures(league: LeagueConfig = DEFAULT_LEAGUE): Promise<Fixture[]> {
  const cacheKey = `upcoming-fixtures-${league.id}`
  const cached = getCached<Fixture[]>(cacheKey)
  if (cached) return cached

  try {
    const dateRange = getFixtureDateRange(league)
    const response = await api.get('/fixtures', {
      params: {
        league: league.id,
        season: getSeasonForLeague(league),
        ...dateRange,
      },
    })

    const fixtures: Fixture[] = response.data.response.map((match: any) => ({
      id: match.fixture.id,
      date: match.fixture.date,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      score: match.goals,
      status: match.fixture.status.short,
      venue: match.fixture.venue.name,
    }))

    return setCache(cacheKey, fixtures)
  } catch (error) {
    console.error(`Failed to fetch fixtures for ${league.slug}:`, error)
    return []
  }
}

export async function getFixture(fixtureId: string): Promise<Fixture | null> {
  const cached = getCached<Fixture>(`fixture-${fixtureId}`)
  if (cached) return cached

  try {
    const response = await api.get('/fixtures', {
      params: { id: fixtureId },
    })

    const match = response.data.response[0]
    if (!match) return null

    const fixture: Fixture = {
      id: match.fixture.id,
      date: match.fixture.date,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      score: match.goals,
      status: match.fixture.status.short,
      venue: match.fixture.venue.name,
      referee: match.fixture.referee,
    }

    return setCache(`fixture-${fixtureId}`, fixture)
  } catch (error) {
    console.error('Failed to fetch fixture:', error)
    return null
  }
}

export async function getTeamFixtures(teamId: string, league: LeagueConfig = DEFAULT_LEAGUE): Promise<Fixture[]> {
  const cacheKey = `team-fixtures-${league.id}-${teamId}`
  const cached = getCached<Fixture[]>(cacheKey)
  if (cached) return cached

  try {
    const dateRange = getFixtureDateRange(league)
    const response = await api.get('/fixtures', {
      params: {
        league: league.id,
        season: getSeasonForLeague(league),
        team: teamId,
        ...dateRange,
      },
    })

    const fixtures: Fixture[] = response.data.response.map((match: any) => ({
      id: match.fixture.id,
      date: match.fixture.date,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      score: match.goals,
      status: match.fixture.status.short,
    }))

    return setCache(cacheKey, fixtures)
  } catch (error) {
    console.error('Failed to fetch team fixtures:', error)
    return []
  }
}

export async function getTeams(league: LeagueConfig = DEFAULT_LEAGUE): Promise<Team[]> {
  const cacheKey = `teams-${league.id}`
  const cached = getCached<Team[]>(cacheKey)
  if (cached) return cached

  try {
    const response = await api.get('/teams', {
      params: {
        league: league.id,
        season: getSeasonForLeague(league),
      },
    })

    const teams: Team[] = response.data.response.map((team: any) => ({
      id: team.team.id,
      name: team.team.name,
      logo: team.team.logo,
      founded: team.team.founded,
      country: team.team.country,
    }))

    return setCache(cacheKey, teams)
  } catch (error) {
    console.error(`Failed to fetch teams for ${league.slug}:`, error)
    return []
  }
}

export async function getTeam(teamId: string, league: LeagueConfig = DEFAULT_LEAGUE): Promise<TeamStats | null> {
  const cacheKey = `team-${league.id}-${teamId}`
  const cached = getCached<TeamStats>(cacheKey)
  if (cached) return cached

  try {
    const response = await api.get('/teams/statistics', {
      params: {
        league: league.id,
        season: getSeasonForLeague(league),
        team: teamId,
      },
    })

    const data = response.data.response
    if (!data || !data.team) return null

    const team: TeamStats = {
      id: data.team.id,
      name: data.team.name,
      logo: data.team.logo,
      founded: data.team.founded,
      wins: data.fixtures.wins.total,
      draws: data.fixtures.draws.total,
      losses: data.fixtures.loses.total,
      goalsFor: data.goals.for.total,
      goalsAgainst: data.goals.against.total,
    }

    return setCache(cacheKey, team)
  } catch (error) {
    console.error('Failed to fetch team:', error)
    return null
  }
}

// Real injury data from api-football's /injuries endpoint. That endpoint
// returns one row per (player, fixture they missed) for the whole season,
// not a live "currently injured" flag - so we approximate "current" by
// keeping only the most recent row per player and dropping anything tied
// to a fixture more than 21 days in the past. This is a real, if imperfect,
// signal rather than an invented one; api-football does not expose an
// explicit expected-return date, so we surface the fixture they're missing
// instead of guessing a return date.
export async function getInjuries(league: LeagueConfig = DEFAULT_LEAGUE): Promise<Injury[]> {
  const cacheKey = `injuries-${league.id}`
  const cached = getCached<Injury[]>(cacheKey)
  if (cached) return cached

  try {
    const response = await api.get('/injuries', {
      params: { league: league.id, season: getSeasonForLeague(league) },
    })

    const rows: any[] = response.data.response || []
    const hasConfiguredSeason = Number.isInteger(Number(process.env.FOOTBALL_API_SEASON))
    const cutoffMs = hasConfiguredSeason ? 0 : Date.now() - 21 * 24 * 60 * 60 * 1000

    const latestByPlayer = new Map<number, any>()
    for (const row of rows) {
      const fixtureDate = row?.fixture?.date
      const ts = fixtureDate ? new Date(fixtureDate).getTime() : NaN
      if (Number.isNaN(ts) || ts < cutoffMs) continue

      const playerId = row?.player?.id
      if (playerId == null) continue

      const existing = latestByPlayer.get(playerId)
      const existingTs = existing ? new Date(existing.fixture.date).getTime() : -Infinity
      if (ts > existingTs) latestByPlayer.set(playerId, row)
    }

    const injuries: Injury[] = Array.from(latestByPlayer.values())
      .map((row) => {
        const type = row.player?.type || 'Missing Fixture'
        return {
          id: `${row.player.id}-${row.fixture.id}`,
          player: row.player.name,
          playerPhoto: row.player.photo,
          team: row.team?.name || 'Unknown',
          type,
          reason: row.player?.reason || 'Not specified',
          status: /doubt|quest/i.test(type) ? 'doubtful' : 'out',
          fixtureDate: row.fixture.date,
        } as Injury
      })
      .sort((a, b) => a.team.localeCompare(b.team) || a.player.localeCompare(b.player))

    if (injuries.length > 0) return setCache(cacheKey, injuries)
    if (league.slug === DEFAULT_LEAGUE.slug) {
      return setCache(cacheKey, await getFallbackPremierLeagueInjuries())
    }

    return setCache(cacheKey, injuries)
  } catch (error) {
    console.error(`Failed to fetch injuries for ${league.slug}:`, error)
    if (league.slug === DEFAULT_LEAGUE.slug) {
      return setCache(cacheKey, await getFallbackPremierLeagueInjuries())
    }
    return []
  }
}

// Real, single-fixture prediction from api-football's /predictions endpoint.
// This is api-football's own model output (win/draw/win percentages, an
// advice string, form comparison, and head-to-head history), not a client-side
// random number.
export async function getPrediction(fixtureId: string): Promise<Prediction | null> {
  const cached = getCached<Prediction>(`prediction-${fixtureId}`)
  if (cached) return cached

  try {
    const response = await api.get('/predictions', {
      params: { fixture: fixtureId },
    })

    const data = response.data.response?.[0]
    if (!data) return null

    const toPercent = (value: string | undefined): number =>
      value ? parseInt(value.replace('%', ''), 10) || 0 : 0

    const pct = data.predictions?.percent || {}
    const formRaw = data.comparison?.form
    const formPercent = formRaw
      ? { home: toPercent(formRaw.home), away: toPercent(formRaw.away) }
      : null

    const recentMeetings: RecentMeeting[] = (data.h2h || [])
      .slice(-3)
      .reverse()
      .map((match: any) => ({
        date: match.fixture.date,
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
        homeGoals: match.goals.home,
        awayGoals: match.goals.away,
      }))

    const prediction: Prediction = {
      matchId: Number(fixtureId),
      homeTeam: data.teams.home.name,
      awayTeam: data.teams.away.name,
      homeWinProb: toPercent(pct.home),
      drawProb: toPercent(pct.draw),
      awayWinProb: toPercent(pct.away),
      advice: data.predictions?.advice || '',
      formPercent,
      recentMeetings,
    }

    return setCache(`prediction-${fixtureId}`, prediction)
  } catch (error) {
    console.error(`Failed to fetch prediction for fixture ${fixtureId}:`, error)
    return null
  }
}

export interface MatchStatistics {
  possession: { home: number | null; away: number | null }
  shots: { home: number | null; away: number | null }
  corners: { home: number | null; away: number | null }
  yellowCards: { home: number | null; away: number | null }
  redCards: { home: number | null; away: number | null }
}

// Real per-match stats from api-football's /fixtures/statistics endpoint.
// This endpoint only has data once a match has actually kicked off - for
// a fixture that hasn't started yet, api-football returns an empty
// response array, and every field below is correctly null rather than a
// placeholder number. Callers must render "not available yet" for null
// fields instead of substituting a fake stat.
export async function getFixtureStatistics(fixtureId: string): Promise<MatchStatistics | null> {
  const cacheKey = `fixture-stats-${fixtureId}`
  const cached = getCached<MatchStatistics>(cacheKey)
  if (cached) return cached

  try {
    const response = await api.get('/fixtures/statistics', {
      params: { fixture: fixtureId },
    })

    const rows: any[] = response.data.response || []
    if (rows.length < 2) return null // no stats reported yet (pre-match)

    const findStat = (row: any, type: string): number | null => {
      const stat = row.statistics?.find((s: any) => s.type === type)
      const value = stat?.value
      if (value === null || value === undefined) return null
      return typeof value === 'string' ? parseInt(value.replace('%', ''), 10) || 0 : value
    }

    const [home, away] = rows

    const stats: MatchStatistics = {
      possession: { home: findStat(home, 'Ball Possession'), away: findStat(away, 'Ball Possession') },
      shots: { home: findStat(home, 'Total Shots'), away: findStat(away, 'Total Shots') },
      corners: { home: findStat(home, 'Corner Kicks'), away: findStat(away, 'Corner Kicks') },
      yellowCards: { home: findStat(home, 'Yellow Cards'), away: findStat(away, 'Yellow Cards') },
      redCards: { home: findStat(home, 'Red Cards'), away: findStat(away, 'Red Cards') },
    }

    return setCache(cacheKey, stats)
  } catch (error) {
    console.error(`Failed to fetch statistics for fixture ${fixtureId}:`, error)
    return null
  }
}

// Predictions for the upcoming round. Fetched one fixture at a time because
// api-football's /predictions endpoint only accepts a single fixture ID -
// there's no bulk "predictions for this league" call.
export async function getPredictions(league: LeagueConfig = DEFAULT_LEAGUE): Promise<Prediction[]> {
  const cacheKey = `predictions-${league.id}`
  const cached = getCached<Prediction[]>(cacheKey)
  if (cached) return cached

  const fixtures = await getUpcomingFixtures(league)
  const results = await Promise.all(
    fixtures.slice(0, 5).map((fixture) => getPrediction(String(fixture.id)))
  )
  const predictions = results.filter((p): p is Prediction => p !== null)

  return setCache(cacheKey, predictions)
}
