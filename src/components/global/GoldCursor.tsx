'use client'

import { useEffect, useRef, useState } from 'react'
import { isTouchDevice } from '@/lib/utils'

interface TrailPoint {
  x: number
  y: number
  opacity: number
  id: number
}

export function GoldCursor() {
  const [isTouch, setIsTouch] = useState(true) // default true to avoid SSR flash
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isOverButton, setIsOverButton] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  useEffect(() => {
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      // Add trail point
      const id = trailIdRef.current++
      setTrail(prev => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, opacity: 1, id },
      ])

      // Check what's under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isInteractive = el?.closest('a, button, [role="button"], input, textarea, select') !== null
      const isBtn = el?.closest('button, [role="button"]') !== null
      setIsHovering(isInteractive)
      setIsOverButton(isBtn)
    }

    document.addEventListener('mousemove', handleMove)
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.body.style.cursor = ''
    }
  }, [isTouch])

  // Fade trail
  useEffect(() => {
    if (trail.length === 0) return
    const timer = setTimeout(() => {
      setTrail(prev => prev
        .map(p => ({ ...p, opacity: p.opacity - 0.15 }))
        .filter(p => p.opacity > 0)
      )
    }, 50)
    return () => clearTimeout(timer)
  }, [trail])

  if (isTouch) return null

  const size = isOverButton ? 12 : isHovering ? 40 : 20

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'var(--color-gold)',
            opacity: point.opacity * (i / trail.length),
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 'var(--z-cursor)' as unknown as number,
            transition: 'opacity 0.05s',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
          borderRadius: '50%',
          border: isOverButton ? '1px solid var(--color-gold)' : 'none',
          backgroundColor: isOverButton ? 'transparent' : 'var(--color-gold)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)' as unknown as number,
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
          mixBlendMode: 'difference',
        }}
      />

      {/* Crosshair lines for button hover */}
      {isOverButton && (
        <>
          <div style={{
            position: 'fixed',
            left: pos.x - 8,
            top: pos.y,
            width: 16,
            height: 1,
            backgroundColor: 'var(--color-gold)',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 'var(--z-cursor)' as unknown as number,
          }} />
          <div style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y - 8,
            width: 1,
            height: 16,
            backgroundColor: 'var(--color-gold)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 'var(--z-cursor)' as unknown as number,
          }} />
        </>
      )}
    </>
  )
}
