'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: '2M+', label: 'Weekly Reach', sub: 'StarTimes Ch.430' },
  { value: '10+', label: 'Years Media', sub: 'Citizen TV → PPP TV' },
  { value: '3', label: 'Active Shows', sub: 'PPP • Urban News • More' },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="glass rounded-2xl px-6 py-4 flex items-center gap-0 border border-gold/20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {STATS.map((stat, i) => (
        <div key={i} className="flex items-center">
          <div className="px-6 text-center">
            <p className="font-display text-2xl text-gold font-bold leading-none">{stat.value}</p>
            <p className="font-mono text-xs text-text-primary tracking-wider mt-1 uppercase">{stat.label}</p>
            <div className="w-8 h-px bg-gold/40 mx-auto my-1" />
            <p className="font-mono text-[10px] text-text-tertiary">{stat.sub}</p>
          </div>
          {i < STATS.length - 1 && (
            <div className="w-px h-12 bg-white/10" />
          )}
        </div>
      ))}
    </div>
  )
}
