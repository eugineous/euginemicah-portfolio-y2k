'use client'

import { useEffect, useState } from 'react'
import { formatNairobiTime } from '@/lib/utils'

export function NairobiClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(formatNairobiTime(now))
      const nairobi = new Date(now.getTime() + 3 * 60 * 60 * 1000)
      setDate(nairobi.toUTCString().slice(0, 16))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-end">
      <span className="font-mono text-2xl text-gold tracking-widest tabular-nums">{time}</span>
      <span className="font-mono text-xs text-text-tertiary tracking-wider">NAIROBI UTC+3</span>
      <span className="font-mono text-xs text-text-tertiary">{date}</span>
    </div>
  )
}
