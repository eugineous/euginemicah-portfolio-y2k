'use client'

import { useRef, useState, useCallback } from 'react'
import { computeMagneticOffset, isTouchDevice } from '@/lib/utils'
import { useCurtain } from './CurtainTransition'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  radius?: number
  strength?: number
  variant?: 'gold' | 'red' | 'outline'
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  radius = 80,
  strength = 0.3,
  variant = 'gold',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ ox: 0, oy: 0 })
  const { navigate } = useCurtain()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice() || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    setOffset(computeMagneticOffset(dx, dy, radius, strength))
  }, [radius, strength])

  const handleMouseLeave = useCallback(() => {
    setOffset({ ox: 0, oy: 0 })
  }, [])

  const handleClick = useCallback(() => {
    if (href) {
      navigate(href)
    } else {
      onClick?.()
    }
  }, [href, navigate, onClick])

  const variantStyles: Record<string, string> = {
    gold: 'bg-gold text-void font-bold hover:bg-gold-light',
    red: 'bg-signal-red text-white font-bold hover:opacity-90',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-void',
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.ox}px, ${offset.oy}px)`,
        transition: offset.ox === 0 && offset.oy === 0 ? 'transform 0.4s ease' : 'transform 0.1s ease',
        display: 'inline-block',
      }}
    >
      <button
        onClick={handleClick}
        className={`
          px-6 py-3 rounded-full font-ui text-sm tracking-widest uppercase
          transition-all duration-200
          ${variantStyles[variant]}
          ${className}
        `}
      >
        {children}
      </button>
    </div>
  )
}
