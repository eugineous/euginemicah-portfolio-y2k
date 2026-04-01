'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EraSection } from '@/components/origin/EraSection'
import { FamilyTree } from '@/components/origin/FamilyTree'
import { TribeBadge } from '@/components/origin/TribeBadge'
import { ScrambleText } from '@/components/global/ScrambleText'
import { ERA_CONFIGS, EUGINE } from '@/lib/constants'

export default function OriginPage() {
  const sealRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Wax seal crack animation
    if (!sealRef.current) return
    const path = sealRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = String(length)
    path.style.strokeDashoffset = String(length)
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 1.5s ease-in-out'
      path.style.strokeDashoffset = '0'
    }, 300)
  }, [])

  return (
    <main className="relative overflow-hidden">
      {/* Entry: Heritage section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 py-32 relative"
        style={{ background: 'linear-gradient(135deg, #0A1A0A 0%, #1A2A0A 50%, #0A1A0A 100%)' }}
      >
        {/* African geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4A017 0, #D4A017 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Wax seal SVG */}
        <div className="mb-12">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="40" fill="#8B0000" opacity="0.8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#D4A017" strokeWidth="1" />
            <text x="50" y="46" textAnchor="middle" fill="#D4A017" fontSize="8" fontFamily="serif">ROYLANDZ</text>
            <text x="50" y="58" textAnchor="middle" fill="#D4A017" fontSize="6" fontFamily="serif">UNIVERSE</text>
            <path
              ref={sealRef}
              d="M50,10 L55,30 L75,30 L60,45 L65,65 L50,52 L35,65 L40,45 L25,30 L45,30 Z"
              fill="none"
              stroke="#D4A017"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-3xl"
        >
          <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">THE BLOODLINE</p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary mb-8">
            <ScrambleText text="THE ORIGIN" />
          </h1>

          {/* Tribe badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <TribeBadge name="BUNYORE" color="#D4A017" />
            <TribeBadge name="MARAGOLI" color="#4CAF50" />
            <TribeBadge name="LUHYA NATION" color="#F5C842" />
          </div>

          {/* Family tree */}
          <FamilyTree />

          {/* Heritage details */}
          <div className="grid md:grid-cols-2 gap-6 mt-10 text-left">
            <div className="glass rounded-xl p-6">
              <p className="font-mono text-xs text-gold tracking-wider uppercase mb-3">FATHER'S SIDE</p>
              <p className="font-body text-text-secondary">{EUGINE.heritage.father}</p>
              <p className="font-mono text-xs text-text-tertiary mt-2">Abatongoi Clan, Bunyore</p>
            </div>
            <div className="glass rounded-xl p-6">
              <p className="font-mono text-xs text-gold tracking-wider uppercase mb-3">MOTHER'S SIDE</p>
              <p className="font-body text-text-secondary">{EUGINE.heritage.mother}</p>
              <p className="font-mono text-xs text-text-tertiary mt-2">Avamaseero Clan, Maragoli</p>
            </div>
            <div className="glass rounded-xl p-6 md:col-span-2">
              <p className="font-mono text-xs text-gold tracking-wider uppercase mb-3">GRANDPARENTS — THE EDUCATORS</p>
              <p className="font-body text-text-secondary">
                Gladys & David Zarembka — founders of Mua Hills Harambee Secondary School.
              </p>
              <p className="font-body text-text-tertiary italic mt-2 text-sm">
                "They believed in education before they believed in anything else."
              </p>
            </div>
          </div>

          <p className="font-body text-text-tertiary italic mt-8 text-lg">
            "The roots run deep. The branches reach the sky."
          </p>
        </motion.div>
      </section>

      {/* Timeline eras */}
      {ERA_CONFIGS.map((era, i) => (
        <EraSection key={era.id} era={era} index={i} />
      ))}

      {/* Bottom padding */}
      <div className="h-24 bg-void" />
    </main>
  )
}
