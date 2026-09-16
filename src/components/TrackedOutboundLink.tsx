'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'

interface TrackedOutboundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  provider: string
}

export function TrackedOutboundLink({ provider, onClick, ...props }: TrackedOutboundLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const payload = JSON.stringify({ kind: 'affiliate_click', provider, path: window.location.pathname })
    navigator.sendBeacon?.('/api/metrics', new Blob([payload], { type: 'application/json' }))
    onClick?.(event)
  }

  return <a {...props} onClick={handleClick} />
}
