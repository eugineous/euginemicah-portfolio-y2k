'use client'

import { useEffect, useState } from 'react'
import { getCountdown } from '@/lib/utils'

const TARGET = new Date('2027-01-01T00:00:00Z')

export function CountdownTimer() {
  const [cd, setCd] = useState(getCountdown(TARGET, new Date()))

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown(TARGET, new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: cd.days, label: 'DAYS' },
    { value: cd.hours, label: 'HOURS' },
    { value: cd.minutes, label: 'MINUTES' },
    { value: cd.seconds, label: 'SECONDS' },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
      {units.map(({ value, label }) => (
        <div key={label} className="text-center">
          <div
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg border flex items-center justify-center mb-2"
            style={{
              background: 'rgba(0,212,255,0.05)',
              borderColor: 'rgba(0,212,255,0.3)',
              boxShadow: '0 0 20px rgba(0,212,255,0.1)',
            }}
          >
            <span
              className="font-mono text-2xl lg:text-3xl font-bold tabular-nums"
              style={{ color: '#00D4FF' }}
            >
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <p className="font-mono text-[10px] text-text-tertiary tracking-widest">{label}</p>
        </div>
      ))}
    </div>
  )
}
