'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { EraConfig } from '@/lib/constants'

interface EraSectionProps {
  era: EraConfig
  index: number
}

export function EraSection({ era, index }: EraSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        if (!ref.current) return

        // Animate background color transition
        gsap.to(ref.current, {
          backgroundColor: era.bgColor,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        })
      })
    )
  }, [era.bgColor])

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center px-6 lg:px-16 py-24 relative overflow-hidden"
      style={{ backgroundColor: era.bgColor }}
    >
      {/* Era number watermark */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none"
        style={{
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: era.accentColor,
          opacity: 0.04,
          lineHeight: 1,
        }}
      >
        {String(era.id).padStart(2, '0')}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Era label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px" style={{ background: era.accentColor }} />
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: era.accentColor }}
          >
            ERA {era.id} — {era.period}
          </span>
        </motion.div>

        {/* Era title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl lg:text-7xl font-bold text-text-primary mb-6"
        >
          {era.title}
        </motion.h2>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-xl lg:text-2xl text-text-secondary italic mb-8 border-l-4 pl-6"
          style={{ borderColor: era.accentColor }}
        >
          "{era.quote}"
        </motion.blockquote>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-text-secondary text-lg mb-8"
        >
          {era.description}
        </motion.p>

        {/* Highlights */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-2"
        >
          {era.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 font-mono text-sm text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: era.accentColor }} />
              {h}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}
