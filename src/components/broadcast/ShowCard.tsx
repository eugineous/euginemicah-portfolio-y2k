'use client'

import { motion } from 'framer-motion'

interface ShowCardProps {
  title: string
  subtitle: string
  description: string
  badge?: string
  stat?: string
  accentColor?: string
  index: number
}

export function ShowCard({ title, subtitle, description, badge, stat, accentColor = '#D4A017', index }: ShowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
        {badge && (
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="font-display text-xl text-text-primary font-bold mb-1 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-3">{subtitle}</p>
      <p className="font-body text-text-secondary text-sm leading-relaxed">{description}</p>

      {stat && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="font-display text-2xl font-bold" style={{ color: accentColor }}>{stat}</p>
        </div>
      )}
    </motion.div>
  )
}
