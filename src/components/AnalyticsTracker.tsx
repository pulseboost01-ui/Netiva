'use client'

import { useEffect } from 'react'

export function AnalyticsTracker() {
  useEffect(() => {
    // Only count real readers: skip automated browsers and the
    // admin area, so the dashboard reflects the traffic AdSense will pay for.
    if (navigator.webdriver) return
    if (window.location.pathname.startsWith('/admin')) return
    const payload = JSON.stringify({ kind: 'pageview', path: window.location.pathname })
    navigator.sendBeacon?.('/api/metrics', new Blob([payload], { type: 'application/json' }))
  }, [])

  return null
}
