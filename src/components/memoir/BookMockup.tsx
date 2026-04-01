'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function BookMockup() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="flex justify-center items-center py-12 cursor-pointer"
      onClick={() => setOpen(!open)}
      style={{ perspective: '1200px' }}
    >
      <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: 240, height: 320 }}>
        {/* Book cover */}
        <motion.div
          animate={{ rotateY: open ? -160 : -20 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          style={{
            position: 'absolute',
            width: 240,
            height: 320,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Front cover */}
          <div
            className="absolute inset-0 rounded-r-lg flex flex-col items-center justify-center p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #1a0a00 0%, #2D1B00 50%, #1a0a00 100%)',
              border: '2px solid #D4A017',
              boxShadow: '4px 4px 20px rgba(0,0,0,0.8), inset 0 0 30px rgba(212,160,23,0.05)',
            }}
          >
            {/* Embossed title */}
            <div className="mb-4">
              <p
                className="font-display text-2xl font-bold leading-tight"
                style={{
                  color: '#D4A017',
                  textShadow: '0 0 10px rgba(212,160,23,0.5), 2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                BORN BROKE,
              </p>
              <p
                className="font-display text-2xl font-bold"
                style={{
                  color: '#D4A017',
                  textShadow: '0 0 10px rgba(212,160,23,0.5), 2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                BUILT LOUD
              </p>
            </div>
            <div className="w-16 h-px bg-gold/40 mb-4" />
            <p className="font-body text-xs text-text-secondary italic">A Memoir by</p>
            <p className="font-display text-sm text-gold mt-1">Eugine Micah</p>

            {/* Decorative corner ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40" />
          </div>

          {/* Spine */}
          <div
            className="absolute top-0 bottom-0 -left-6 w-6 rounded-l-sm flex items-center justify-center"
            style={{
              background: 'linear-gradient(90deg, #0a0500, #2D1B00)',
              borderLeft: '1px solid #D4A01740',
              borderTop: '2px solid #D4A017',
              borderBottom: '2px solid #D4A017',
            }}
          >
            <p
              className="font-display text-[9px] text-gold/60 tracking-widest"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              BORN BROKE BUILT LOUD
            </p>
          </div>
        </motion.div>

        {/* Back/pages visible when open */}
        <div
          className="absolute inset-0 rounded-r-lg flex items-center justify-center"
          style={{
            background: '#F5F0E8',
            border: '1px solid #D4A01740',
          }}
        >
          <div className="text-center p-6">
            <p className="font-body text-void text-sm italic leading-relaxed">
              "The name Roylandz wasn't given.<br />
              It was built. Letter by letter.<br />
              Decision by decision.<br />
              Loss by loss. Win by win."
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-2 font-mono text-xs text-text-tertiary tracking-wider">
        {open ? 'CLICK TO CLOSE' : 'CLICK TO OPEN'}
      </p>
    </div>
  )
}
