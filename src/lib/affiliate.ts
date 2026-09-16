// Central affiliate-link config. Every outbound "where to watch" / "best
// odds" link in the app should go through here rather than being
// hardcoded per page, for two reasons:
//   1. One place to paste real affiliate IDs once you're accepted into a
//      program, instead of hunting through every page that links out.
//   2. One place to enforce disclosure text, which AdSense and most
//      affiliate programs (and, in many jurisdictions, the law - FTC in
//      the US, ASA/CAP in the UK) require on any monetized outbound link.
//
// IMPORTANT: the URLs below are NOT real affiliate links. They're plain
// destination URLs. Sign up for the actual programs first (bookmaker
// affiliate networks, streaming affiliate programs where available in
// your target markets), then put your real tracked URLs in the env vars
// referenced here. Do not represent these as affiliate income until they
// are.

export interface AffiliatePartner {
  id: string
  name: string
  blurb: string
  // Falls back to a plain (non-monetized) destination URL if the env var
  // for a real affiliate link isn't set, so the site never 404s or lies
  // about a partnership that doesn't exist yet.
  url: string
  isAffiliate: boolean
}

function resolveUrl(envVar: string | undefined, fallback: string): { url: string; isAffiliate: boolean } {
  if (envVar && envVar.trim().length > 0) {
    return { url: envVar, isAffiliate: true }
  }
  return { url: fallback, isAffiliate: false }
}

export function getWatchPartners(): AffiliatePartner[] {
  const nowTv = resolveUrl(process.env.AFFILIATE_URL_NOWTV, 'https://www.nowtv.com')
  const primeVideo = resolveUrl(process.env.AFFILIATE_URL_PRIME, 'https://www.amazon.co.uk/prime')

  return [
    { id: 'nowtv', name: 'NOW TV', blurb: 'Watch live Premier League matches', ...nowTv },
    { id: 'prime', name: 'Amazon Prime', blurb: 'Select matches throughout the season', ...primeVideo },
  ]
}

export function getOddsPartners(): AffiliatePartner[] {
  // Empty until you're accepted into a licensed odds/bookmaker affiliate
  // program - AFFILIATE_URL_ODDS_1 etc. Deliberately not shipping a
  // fallback destination for gambling links, since an unlicensed or
  // wrong-jurisdiction link there is a compliance problem, not just a
  // missing feature.
  const partners: AffiliatePartner[] = []
  const oneUrl = process.env.AFFILIATE_URL_ODDS_1
  if (oneUrl) {
    partners.push({
      id: 'odds-1',
      name: process.env.AFFILIATE_NAME_ODDS_1 || 'Compare odds',
      blurb: 'Compare odds for this match',
      url: oneUrl,
      isAffiliate: true,
    })
  }
  return partners
}
