'use client'

import { useEffect, useRef, useState } from 'react'
import { ARCHIVE_STATS } from '@/lib/constants'

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [counts, setCounts] = useState(ARCHIVE_STATS.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated) return
      setAnimated(true)

      ARCHIVE_STATS.forEach((stat, i) => {
        const duration = 2000
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCounts(prev => {
            const next = [...prev]
            next[i] = Math.floor(eased * stat.value)
            return next
          })
          if (progress < 1) requestAnimationFrame(tick)
          else setCounts(prev => { const next = [...prev]; next[i] = stat.value; return next })
        }
        setTimeout(() => requestAnimationFrame(tick), i * 150)
      })
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animated])

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {ARCHIVE_STATS.map((stat, i) => (
        <div key={i} className="text-center glass rounded-xl p-6 border border-white/10">
          <p className="font-display text-3xl lg:text-4xl font-bold text-gold">
            {counts[i] >= 1_000_000
              ? `${(counts[i] / 1_000_000).toFixed(0)}M+`
              : counts[i] >= 100
              ? `${counts[i]}+`
              : counts[i]}
          </p>
          <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
