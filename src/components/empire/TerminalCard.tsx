'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ProPostCompany } from '@/lib/constants'

interface TerminalCardProps {
  company: ProPostCompany
  index: number
}

const STATUS_COLORS = {
  ACTIVE: '#4CAF50',
  BUILDING: '#F5C842',
  STEALTH: '#C0392B',
}

export function TerminalCard({ company, index }: TerminalCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg overflow-hidden border transition-all duration-300"
      style={{
        background: '#050B1A',
        borderColor: hovered ? '#00D4FF40' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
      }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-black/30">
        <span className="w-2.5 h-2.5 rounded-full bg-signal-red" />
        <span className="w-2.5 h-2.5 rounded-full bg-gold" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-[10px] text-text-tertiary truncate">{company.name.toLowerCase().replace(/ /g, '_')}.agent</span>
      </div>

      {/* Terminal content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-mono text-sm text-cyber-cyan font-bold leading-tight">{company.name}</h3>
          <div
            className="flex items-center gap-1 flex-shrink-0"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: STATUS_COLORS[company.status],
                boxShadow: `0 0 6px ${STATUS_COLORS[company.status]}`,
                animation: company.status === 'ACTIVE' ? 'pulse-ring 2s ease-out infinite' : 'none',
              }}
            />
            <span className="font-mono text-[9px] tracking-wider" style={{ color: STATUS_COLORS[company.status] }}>
              {company.status}
            </span>
          </div>
        </div>

        <p className="font-mono text-xs text-text-tertiary mb-3 leading-relaxed">{company.purpose}</p>

        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-gold">{company.agents} agents</span>
          <div className="flex gap-1">
            {company.platforms.slice(0, 3).map((p, i) => (
              <span key={i} className="font-mono text-[9px] text-text-tertiary bg-white/5 px-1.5 py-0.5 rounded">
                {p.split('/')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Typing animation on hover */}
        {hovered && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="font-mono text-[10px] text-cyber-cyan/60">
              {'> RUNNING...'}<span style={{ animation: 'typewriter 1s step-end infinite' }}>|</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
