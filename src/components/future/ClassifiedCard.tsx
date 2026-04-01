'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ClassifiedFile } from '@/lib/constants'

interface ClassifiedCardProps {
  file: ClassifiedFile
  index: number
}

const STATUS_COLORS = {
  'IN PROGRESS': '#C0392B',
  'BUILDING': '#F5C842',
  'ACCUMULATING': '#4CAF50',
  'DEPLOYING': '#00D4FF',
}

const CLEARANCE_COLORS = {
  'TOP SECRET': '#C0392B',
  'CLASSIFIED': '#F5C842',
  'RESTRICTED': '#888888',
}

export function ClassifiedCard({ file, index }: ClassifiedCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setOpen(!open)}
      className="cursor-pointer rounded-lg border overflow-hidden transition-all duration-300"
      style={{
        background: '#020005',
        borderColor: open ? STATUS_COLORS[file.status] + '60' : 'rgba(255,255,255,0.1)',
        boxShadow: open ? `0 0 20px ${STATUS_COLORS[file.status]}20` : 'none',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,212,255,0.03)' }}
      >
        <span className="font-mono text-xs text-cyber-cyan tracking-wider">FILE: {file.filename}</span>
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: CLEARANCE_COLORS[file.clearanceLevel],
            boxShadow: `0 0 6px ${CLEARANCE_COLORS[file.clearanceLevel]}`,
          }}
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest" style={{ color: STATUS_COLORS[file.status] }}>
              STATUS: {file.status}
            </span>
          </div>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded border"
            style={{ color: CLEARANCE_COLORS[file.clearanceLevel], borderColor: CLEARANCE_COLORS[file.clearanceLevel] + '40' }}
          >
            {file.clearanceLevel}
          </span>
        </div>

        <p className="font-mono text-xs text-text-tertiary mb-2">ETA: {file.eta}</p>

        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-body text-text-secondary text-sm leading-relaxed pt-2 border-t border-white/10">
            MISSION: {file.mission}
          </p>
        </motion.div>

        {!open && (
          <p className="font-mono text-[10px] text-text-tertiary mt-2">
            [CLICK TO DECRYPT]
          </p>
        )}
      </div>
    </motion.div>
  )
}
