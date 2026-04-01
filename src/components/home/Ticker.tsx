'use client'

import { useState } from 'react'
import { TICKER_ITEMS } from '@/lib/constants'

export function Ticker() {
  const [paused, setPaused] = useState(false)
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden lg:bottom-0"
      style={{ background: 'var(--color-signal-red)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center">
        {/* BREAKING label */}
        <div
          className="flex-shrink-0 px-4 py-2 font-mono text-xs font-bold tracking-widest text-white z-10"
          style={{ background: '#8B0000', borderRight: '1px solid rgba(255,255,255,0.2)' }}
        >
          BREAKING
        </div>

        {/* Scrolling content */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex whitespace-nowrap py-2"
            style={{
              animation: `marquee 40s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {items.map((item, i) => (
              <span key={i} className="font-mono text-xs text-white tracking-wider mx-8">
                {item}
                <span className="mx-4 text-white/40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
