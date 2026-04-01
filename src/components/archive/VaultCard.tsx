'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface VaultCardProps {
  title: string
  source?: string
  year?: string
  description: string
  index: number
}

export function VaultCard({ title, source, year, description, index }: VaultCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setOpen(!open)}
      className="cursor-pointer rounded-xl border overflow-hidden transition-all duration-300 hover:border-gold/40"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A, #111)',
        borderColor: open ? 'rgba(212,160,23,0.4)' : 'rgba(255,255,255,0.1)',
        boxShadow: open ? '0 0 20px rgba(212,160,23,0.1)' : 'none',
      }}
    >
      {/* Certificate header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-gold/40 flex items-center justify-center">
            <span className="text-gold text-sm">🏆</span>
          </div>
          <div>
            <p className="font-mono text-xs text-gold tracking-wider">{source ?? 'ACHIEVEMENT'}</p>
            {year && <p className="font-mono text-[10px] text-text-tertiary">{year}</p>}
          </div>
        </div>
        <span className="font-mono text-xs text-text-tertiary">{open ? '▲' : '▼'}</span>
      </div>

      <div className="px-6 py-4">
        <h3 className="font-display text-lg text-text-primary font-bold mb-2">{title}</h3>
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-body text-text-secondary text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
