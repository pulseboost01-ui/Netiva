// Kick-off times are rendered on the server, which runs in UTC. Pinning the
// time zone to London keeps them correct for UK readers through BST, and
// the "UK" suffix tells everyone else which clock they're reading.
const UK_TIME_ZONE = 'Europe/London'

export function formatUkDate(date: string | Date, options: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString('en-GB', { ...options, timeZone: UK_TIME_ZONE })
}

export function formatUkTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: UK_TIME_ZONE,
  })
}

/** e.g. "Sat 4 Oct, 15:00 UK" */
export function formatUkKickoff(date: string | Date, options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return `${formatUkDate(date, options)}, ${formatUkTime(date)} UK`
}
