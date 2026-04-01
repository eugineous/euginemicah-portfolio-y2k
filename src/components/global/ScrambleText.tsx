'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'

interface ScrambleTextProps {
  text: string
  duration?: number
  className?: string
  trigger?: boolean
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
}

export function ScrambleText({
  text,
  duration = 800,
  className,
  trigger = true,
  tag: Tag = 'span',
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!trigger) return

    const start = performance.now()

    const tick = () => {
      const elapsed = performance.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * text.length)

      const scrambled = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolved) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayed(scrambled)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayed(text) // guarantee exact final text
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, duration, trigger])

  return <Tag className={className}>{displayed}</Tag>
}
