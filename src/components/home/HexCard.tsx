'use client'

import { useRef, useState } from 'react'
import { useCurtain } from '@/components/global/CurtainTransition'

interface HexCardProps {
  icon: string
  label: string
  description: string
  route: string
  accentColor: string
}

export function HexCard({ icon, label, description, route, accentColor }: HexCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const { navigate } = useCurtain()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -8, y: dx * 8 })
  }

  return (
    <div
      ref={ref}
      onClick={() => navigate(route)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      className="cursor-pointer select-none"
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.05 : 1})`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.4s ease',
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center p-6 text-center"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          width: 160,
          height: 180,
          background: hovered
            ? `radial-gradient(circle at center, ${accentColor}18, rgba(5,11,26,0.95))`
            : 'rgba(5,11,26,0.85)',
          border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
          backdropFilter: 'blur(12px)',
          boxShadow: hovered ? `0 0 30px ${accentColor}20` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <span className="text-3xl mb-2">{icon}</span>
        <p
          className="font-mono text-xs tracking-widest uppercase font-bold"
          style={{ color: hovered ? accentColor : '#F8F4E8' }}
        >
          {label}
        </p>
        <p className="font-ui text-[10px] text-text-tertiary mt-1 leading-tight px-2">
          {description}
        </p>
      </div>
    </div>
  )
}
