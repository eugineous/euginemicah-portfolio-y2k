'use client'

import { useEffect, useRef, useState } from 'react'

// Simplified Kenya county positions (approximate SVG coordinates)
const COUNTIES = [
  { name: 'Nairobi', x: 310, y: 280 },
  { name: 'Mombasa', x: 380, y: 360 },
  { name: 'Kisumu', x: 200, y: 260 },
  { name: 'Nakuru', x: 250, y: 240 },
  { name: 'Eldoret', x: 220, y: 200 },
  { name: 'Kakamega', x: 190, y: 210 },
  { name: 'Meru', x: 340, y: 220 },
  { name: 'Nyeri', x: 310, y: 230 },
  { name: 'Machakos', x: 330, y: 290 },
  { name: 'Kilifi', x: 370, y: 330 },
]

export function CountyMap() {
  const [activeCounties, setActiveCounties] = useState<number[]>([])
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      // Animate counties lighting up one by one
      COUNTIES.forEach((_, i) => {
        setTimeout(() => {
          setActiveCounties(prev => [...prev, i])
        }, i * 200)
      })
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative flex justify-center">
      <svg viewBox="0 0 500 450" width="100%" style={{ maxWidth: 400 }}>
        {/* Kenya outline (simplified) */}
        <path
          d="M180,80 L220,60 L280,55 L340,70 L390,100 L420,150 L430,200 L420,260 L400,320 L380,370 L350,400 L300,420 L250,410 L200,390 L170,350 L150,300 L140,250 L145,200 L160,150 Z"
          fill="rgba(212,160,23,0.05)"
          stroke="rgba(212,160,23,0.3)"
          strokeWidth="1.5"
        />

        {/* County dots */}
        {COUNTIES.map((county, i) => (
          <g key={i}>
            <circle
              cx={county.x}
              cy={county.y}
              r={activeCounties.includes(i) ? 6 : 3}
              fill={activeCounties.includes(i) ? '#E07B39' : 'rgba(212,160,23,0.3)'}
              style={{
                transition: 'all 0.4s ease',
                filter: activeCounties.includes(i) ? 'drop-shadow(0 0 6px #E07B39)' : 'none',
              }}
              onMouseEnter={() => setTooltip({ name: county.name, x: county.x, y: county.y })}
              onMouseLeave={() => setTooltip(null)}
              className="cursor-pointer"
            />
            {activeCounties.includes(i) && (
              <circle
                cx={county.x}
                cy={county.y}
                r={12}
                fill="none"
                stroke="#E07B39"
                strokeWidth="1"
                opacity="0.4"
                style={{ animation: 'pulse-ring 2s ease-out infinite' }}
              />
            )}
          </g>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 30}
              y={tooltip.y - 28}
              width={60}
              height={18}
              rx={4}
              fill="rgba(2,0,5,0.9)"
              stroke="rgba(212,160,23,0.4)"
              strokeWidth="1"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 16}
              textAnchor="middle"
              fill="#D4A017"
              fontSize="9"
              fontFamily="monospace"
            >
              {tooltip.name}
            </text>
          </g>
        )}

        {/* 47 counties label */}
        <text x="250" y="440" textAnchor="middle" fill="rgba(212,160,23,0.4)" fontSize="10" fontFamily="monospace">
          47 COUNTIES — ONE MISSION
        </text>
      </svg>
    </div>
  )
}
