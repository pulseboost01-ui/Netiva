import axios from 'axios'

// Official Fantasy Premier League public API. No key required, no
// documented rate limit — this is the same endpoint the FPL website
// itself calls client-side. Unofficial but extremely widely used and
// stable; endpoint shape has been consistent for years.
const FPL_BASE = 'https://fantasy.premierleague.com/api'

const fplApi = axios.create({ baseURL: FPL_BASE })

// --- Types ---------------------------------------------------------------

export type FplStatus = 'a' | 'd' | 'i' | 's' | 'u' | 'n'
// a = available, d = doubtful, i = injured, s = suspended,
// u = unavailable (e.g. left club), n = not in squad this season.

export interface FplPlayer {
  id: number
  name: string
  photo: string
  team: string
  position: 'GKP' | 'DEF' | 'MID' | 'FWD'
  price: number // millions, e.g. 10.5
  form: number
  totalPoints: number
  pointsPerGame: number
  selectedByPercent: number
  // FPL's own model's projected points for the next gameweek — not a
  // number this site invents.
  expectedPointsNext: number
  status: FplStatus
  // FPL's own free-text status note, e.g. "Hamstring injury - Expected
  // back 04 Oct". Empty string when there's nothing to report.
  news: string
  chanceOfPlayingNextRound: number | null
  costChangeEvent: number
  transfersInEvent: number
  transfersOutEvent: number
  minutes: number
}

export function getFplPlayerPhotoUrl(photo: string): string | undefined {
  const playerId = photo.replace(/\.jpg$/i, '').trim()
  return playerId ? `https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerId}.png` : undefined
}

interface BootstrapResult {
  players: FplPlayer[]
  currentGameweek: number | null
  nextGameweek: number | null
}

const POSITION_MAP: Record<number, FplPlayer['position']> = {
  1: 'GKP',
  2: 'DEF',
  3: 'MID',
  4: 'FWD',
}

// --- Cache -----------------------------------------------------------------
// FPL prices/ownership/form move on the order of hours, not minutes, so a
// longer TTL than the api-football cache (5 min) is deliberate — it's both
// accurate enough and polite to a public endpoint with no published quota.

const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 15 * 60 * 1000

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

// --- Core fetch --------------------------------------------------------

async function getBootstrap(): Promise<BootstrapResult> {
  const cacheKey = 'fpl-bootstrap'
  const cached = getCached<BootstrapResult>(cacheKey)
  if (cached) return cached

  try {
    const response = await fplApi.get('/bootstrap-static/')
    const data = response.data

    const teamsById = new Map<number, string>(
      (data.teams || []).map((t: any) => [t.id, t.name])
    )

    const toNum = (v: unknown): number => {
      const n = typeof v === 'string' ? parseFloat(v) : (v as number)
      return Number.isFinite(n) ? n : 0
    }

    const players: FplPlayer[] = (data.elements || []).map((el: any) => ({
      id: el.id,
      name: el.web_name,
      photo: el.photo || '',
      team: teamsById.get(el.team) || 'Unknown',
      position: POSITION_MAP[el.element_type] || 'MID',
      price: el.now_cost / 10,
      form: toNum(el.form),
      totalPoints: el.total_points ?? 0,
      pointsPerGame: toNum(el.points_per_game),
      selectedByPercent: toNum(el.selected_by_percent),
      expectedPointsNext: toNum(el.ep_next),
      status: (el.status || 'a') as FplStatus,
      news: el.news || '',
      chanceOfPlayingNextRound:
        el.chance_of_playing_next_round === null || el.chance_of_playing_next_round === undefined
          ? null
          : Number(el.chance_of_playing_next_round),
      costChangeEvent: el.cost_change_event ?? 0,
      transfersInEvent: el.transfers_in_event ?? 0,
      transfersOutEvent: el.transfers_out_event ?? 0,
      minutes: el.minutes ?? 0,
    }))

    const events: any[] = data.events || []
    const current = events.find((e) => e.is_current)
    const next = events.find((e) => e.is_next)

    const result: BootstrapResult = {
      players,
      currentGameweek: current?.id ?? null,
      nextGameweek: next?.id ?? null,
    }

    return setCache(cacheKey, result)
  } catch (error) {
    console.error('Failed to fetch FPL bootstrap data:', error)
    return { players: [], currentGameweek: null, nextGameweek: null }
  }
}

// --- Derived views -----------------------------------------------------
// Every function below filters/sorts the same real dataset differently.
// None of them invent a stat FPL doesn't already publish.

// Ranked by FPL's own next-gameweek expected-points model, restricted to
// players who are actually available and have proven regular minutes
// (>300 this season) so bench/rotation players with a lucky ep_next spike
// don't get recommended as captain.
export async function getCaptainPicks(limit = 5): Promise<FplPlayer[]> {
  const { players } = await getBootstrap()
  return players
    .filter((p) => p.status === 'a' && p.minutes > 300 && p.expectedPointsNext > 0)
    .sort((a, b) => b.expectedPointsNext - a.expectedPointsNext)
    .slice(0, limit)
}

// Low ownership, meaningful minutes, still ranked by expected points —
// i.e. a genuine "under-the-radar" list rather than arbitrary player
// names in placeholder brackets.
export async function getDifferentials(limit = 6, ownershipCeiling = 5): Promise<FplPlayer[]> {
  const { players } = await getBootstrap()
  return players
    .filter((p) => p.status === 'a' && p.selectedByPercent <= ownershipCeiling && p.minutes > 180)
    .sort((a, b) => b.expectedPointsNext - a.expectedPointsNext)
    .slice(0, limit)
}

// Net transfers in this event > net transfers out — i.e. the crowd is
// already buying. Real signal from FPL's own transfer counters.
export async function getTransferInCandidates(limit = 5): Promise<FplPlayer[]> {
  const { players } = await getBootstrap()
  return players
    .filter((p) => p.status === 'a' && p.transfersInEvent > p.transfersOutEvent)
    .sort(
      (a, b) =>
        b.transfersInEvent - b.transfersOutEvent - (a.transfersInEvent - a.transfersOutEvent)
    )
    .slice(0, limit)
}

// Two real reasons to sell: (1) flagged unavailable by FPL/the club with
// non-trivial ownership, or (2) available but bleeding transfers out
// relative to in — the crowd already souring on them.
export async function getTransferOutCandidates(limit = 5): Promise<FplPlayer[]> {
  const { players } = await getBootstrap()
  const unavailable = players.filter((p) => p.status !== 'a' && p.selectedByPercent > 1)
  const bleedingOwnership = players.filter(
    (p) => p.status === 'a' && p.transfersOutEvent > p.transfersInEvent * 1.5 && p.selectedByPercent > 1
  )
  return [...unavailable, ...bleedingOwnership]
    .sort((a, b) => b.selectedByPercent - a.selectedByPercent)
    .slice(0, limit)
}

// Availability list for the injury-alert block: anyone not flagged
// fully available, with enough ownership to matter to an FPL manager.
// news/status/chance_of_playing_next_round are FPL's own fields — not
// scraped or guessed.
export async function getFplAvailability(limit = 20): Promise<FplPlayer[]> {
  const { players } = await getBootstrap()
  return players
    .filter((p) => p.status !== 'a' && p.selectedByPercent > 0.5)
    .sort((a, b) => b.selectedByPercent - a.selectedByPercent)
    .slice(0, limit)
}

export async function getFplGameweek(): Promise<{ current: number | null; next: number | null }> {
  const { currentGameweek, nextGameweek } = await getBootstrap()
  return { current: currentGameweek, next: nextGameweek }
}
