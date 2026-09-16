'use client'

import { useState } from 'react'
import { getCountryFlagEmoji, getCountryFlagUrl } from '@/lib/countries'

interface TeamLogoProps {
  name: string
  src?: string
  size?: 'small' | 'large'
}

const PREMIER_LEAGUE_TEAM_IDS: Record<string, number> = {
  Arsenal: 42,
  'Aston Villa': 66,
  Bournemouth: 35,
  Brentford: 55,
  Brighton: 51,
  Chelsea: 49,
  'Crystal Palace': 52,
  Everton: 45,
  Fulham: 36,
  Ipswich: 57,
  'Ipswich Town': 57,
  Leeds: 63,
  Leicester: 46,
  Liverpool: 40,
  'Manchester City': 50,
  'Man City': 50,
  'Manchester United': 33,
  'Man Utd': 33,
  Newcastle: 34,
  'Nottingham Forest': 65,
  "Nott'm Forest": 65,
  Southampton: 41,
  Tottenham: 47,
  Spurs: 47,
  'West Ham': 48,
  'Wolverhampton Wanderers': 39,
  Wolves: 39,
}

function getTeamLogoSource(name: string, src?: string): string | undefined {
  if (src) return src
  const teamId = PREMIER_LEAGUE_TEAM_IDS[name]
  return teamId ? `https://media.api-sports.io/football/teams/${teamId}.png` : undefined
}

export function TeamLogo({ name, src, size = 'small' }: TeamLogoProps) {
  const imageSource = getTeamLogoSource(name, src)
  const [failed, setFailed] = useState(!imageSource)
  const dimensions = size === 'large' ? 'h-24 w-24' : 'h-14 w-14'

  if (failed) {
    return (
      <span
        aria-label={`${name} crest unavailable`}
        className={`${dimensions} inline-flex shrink-0 items-center justify-center rounded-full bg-turf/10 text-lg font-semibold text-turf`}
      >
        {name
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word[0])
          .join('')}
      </span>
    )
  }

  return (
    <img
      src={imageSource}
      alt={`${name} crest`}
      className={`${dimensions} shrink-0 object-contain`}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

interface CountryFlagProps {
  country: string
}

export function CountryFlag({ country }: CountryFlagProps) {
  const [failed, setFailed] = useState(false)
  const src = getCountryFlagUrl(country)

  if (failed || !src) {
    return <span aria-label={`${country} flag`}>{getCountryFlagEmoji(country)}</span>
  }

  return (
    <img
      src={src}
      alt={`${country} flag`}
      className="inline-block h-4 w-6 rounded-sm object-cover align-[-2px]"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
