'use client'

import { useState } from 'react'

interface PlayerVisualProps {
  name: string
  src?: string
}

export function PlayerVisual({ name, src }: PlayerVisualProps) {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  if (failed) {
    return (
      <span
        aria-label={`${name} photo unavailable`}
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-turf/10 text-sm font-semibold text-turf"
      >
        {initials}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} portrait`}
      className="h-12 w-12 shrink-0 rounded-full bg-chalk object-contain"
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
