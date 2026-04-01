'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { text: "Born into a story that didn't look like success.", context: "Part 1 — The Foundation" },
  { text: "When you're broke, your imagination becomes your empire.", context: "Part 2 — Primary School" },
  { text: "Education was the gift they gave before they gave anything else.", context: "Part 3 — Secondary School" },
  { text: "Every desk. Every camera. Every byline. Building toward something.", context: "The Rise" },
  { text: "This is what it looks like when a man refuses to stay broke.", context: "The Empire" },
  { text: "The story hasn't been written yet. But the pen is in my hand.", context: "The Future" },
]

export function PullQuoteCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % QUOTES.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative py-12 px-6 text-center min-h-[160px] flex flex-col items-center justify-center">
      {/* Gold rule lines */}
      <div className="w-24 h-px bg-gold/40 mb-6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="font-body text-xl lg:text-2xl text-text-primary italic leading-relaxed mb-4">
            "{QUOTES[index].text}"
          </p>
          <p className="font-mono text-xs text-gold tracking-widest uppercase">
            {QUOTES[index].context}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="w-24 h-px bg-gold/40 mt-6" />

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: i === index ? '#D4A017' : 'rgba(212,160,23,0.3)' }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
