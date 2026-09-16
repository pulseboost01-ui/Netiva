'use client'

import { useEffect } from 'react'

export function AnalyticsTracker() {
  useEffect(() => {
    const payload = JSON.stringify({ kind: 'pageview', path: window.location.pathname })
    navigator.sendBeacon?.('/api/metrics', new Blob([payload], { type: 'application/json' }))
  }, [])

  return null
}
