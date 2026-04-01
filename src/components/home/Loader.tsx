'use client'

import { useEffect, useRef, useState } from 'react'

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'done'>('loading')
  const counterRef = useRef<number>(0)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const duration = 2500
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100)
      counterRef.current = p
      setProgress(p)

      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Trigger glitch wipe
        setPhase('glitch')
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 600)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[400]"
      style={{
        background: '#020005',
        clipPath: phase === 'glitch' ? 'inset(0 0 100% 0)' : 'inset(0)',
        transition: phase === 'glitch' ? 'clip-path 0.5s cubic-bezier(0.77,0,0.18,1)' : 'none',
      }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Radio waveform SVG */}
      <div className="mb-8">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
          {[20, 40, 60, 80, 100].map((x, i) => (
            <rect
              key={i}
              x={x - 4}
              y={0}
              width={8}
              height={40}
              rx={4}
              fill="#D4A017"
              style={{
                transformOrigin: `${x}px 20px`,
                animation: `vu-bar ${0.8 + i * 0.15}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main text */}
      <p
        className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
        style={{ color: '#D4A017' }}
      >
        INITIALIZING THE ROYLANDZ UNIVERSE
      </p>

      {/* Progress bar */}
      <div className="w-64 h-px bg-white/10 relative mb-3">
        <div
          className="absolute inset-y-0 left-0 bg-gold transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counter */}
      <p
        className="font-mono text-xs"
        style={{ color: '#8B6914' }}
      >
        {String(progress).padStart(2, '0')}%
      </p>
    </div>
  )
}
