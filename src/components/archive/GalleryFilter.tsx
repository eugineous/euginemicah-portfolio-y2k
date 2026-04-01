'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { filterItems, type FilterCategory, type GalleryItem } from '@/lib/utils'

const CATEGORIES: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'tv', label: 'TV' },
  { value: 'podcast', label: 'PODCAST' },
  { value: 'digital', label: 'DIGITAL' },
  { value: 'events', label: 'EVENTS' },
]

const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', category: 'tv', title: 'Urban News — StarTimes Ch.430', description: 'Co-Host & Producer, 2M+ weekly viewers' },
  { id: '2', category: 'tv', title: 'PPP TV Digital Desk', description: 'Head of Digital, national reach' },
  { id: '3', category: 'tv', title: 'Citizen TV News', description: 'News Reporter, breaking stories' },
  { id: '4', category: 'podcast', title: 'The Nairobi Podcast', description: 'Four voices. One city. Every story.' },
  { id: '5', category: 'digital', title: 'ProPost AI Empire', description: '150+ agents, 6 platforms, 24/7' },
  { id: '6', category: 'digital', title: 'Auto News Station', description: 'Automated news image generation' },
  { id: '7', category: 'digital', title: 'ProPost X', description: 'Influencer monetization protocol' },
  { id: '8', category: 'events', title: 'Urban Tour', description: 'Kenya high school talent search' },
  { id: '9', category: 'events', title: 'Tushinde', description: '47 counties charity show' },
]

export function GalleryFilter() {
  const [active, setActive] = useState<FilterCategory>('all')
  const filtered = filterItems(GALLERY_ITEMS, active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className="px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              background: active === value ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)',
              color: active === value ? 'var(--color-void)' : 'var(--color-text-secondary)',
              border: `1px solid ${active === value ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase"
                  style={{ background: 'rgba(212,160,23,0.1)', color: '#D4A017' }}
                >
                  {item.category}
                </span>
              </div>
              <h3 className="font-display text-lg text-text-primary font-bold mb-2">{item.title}</h3>
              <p className="font-body text-text-secondary text-sm">{item.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
