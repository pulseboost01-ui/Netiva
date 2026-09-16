const COUNTRY_CODES: Record<string, string> = {
  England: 'gb',
  France: 'fr',
  Germany: 'de',
  Italy: 'it',
  Netherlands: 'nl',
  Portugal: 'pt',
  Spain: 'es',
  USA: 'us',
  Europe: 'eu',
}

export function getCountryCode(country: string): string | undefined {
  return COUNTRY_CODES[country]
}

export function getCountryFlagUrl(country: string): string | undefined {
  const code = getCountryCode(country)
  return code ? `https://flagcdn.com/w40/${code}.png` : undefined
}

export function getCountryFlagEmoji(country: string): string {
  const code = getCountryCode(country)
  if (!code || code === 'eu') return '🌐'

  return code
    .toUpperCase()
    .split('')
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join('')
}
