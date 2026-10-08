'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ADSENSE_CLIENT = 'ca-pub-6093166595977387'

// Ad unit IDs come from AdSense → Ads → By ad unit. Until they're set the
// component renders nothing, so pages never show an empty ad box.
const SLOTS = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
} as const

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/** Two placements per page at most: `top` just under the page header (above
 * the fold) and `inContent` between the main content and the secondary
 * sections. More than that tends to lower RPM rather than raise it. */
export function AdUnit({ placement, className = '' }: { placement: keyof typeof SLOTS; className?: string }) {
  const slot = SLOTS[placement]
  const pathname = usePathname()
  const ref = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (!slot || !ref.current || ref.current.dataset.adsbygoogleStatus) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Ad blockers and unfilled requests are expected; the page must not care.
    }
  }, [slot, pathname])

  if (!slot) return null

  return (
    <div className={`container my-8 ${className}`} aria-label="Advertisement">
      <p className="text-[10px] uppercase tracking-wide text-ink-soft/60 mb-1 text-center">Advertisement</p>
      {/* min-height reserves space so the ad loading in doesn't shift the page */}
      <ins
        key={pathname}
        ref={ref}
        className="adsbygoogle block min-h-[100px]"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
