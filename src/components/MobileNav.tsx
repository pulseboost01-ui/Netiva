'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavItem {
  href: string
  label: string
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-white/25 text-white transition-colors hover:border-floodlight hover:text-floodlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-floodlight"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <span aria-hidden="true" className="flex flex-col gap-1.5">
          <span className={`block h-0.5 w-5 bg-current transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </span>
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-pitch px-5 py-3 shadow-lg"
        >
          <ul className="container flex flex-col gap-1 px-0">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded px-3 py-3 text-base font-medium text-chalk/90 no-underline transition-colors hover:bg-white/10 hover:text-floodlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-floodlight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
