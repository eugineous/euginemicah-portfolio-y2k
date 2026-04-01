'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ClassifiedCard } from '@/components/future/ClassifiedCard'
import { CountdownTimer } from '@/components/future/CountdownTimer'
import { ScrambleText } from '@/components/global/ScrambleText'
import { CLASSIFIED_FILES } from '@/lib/constants'

const GlobeScene = dynamic(
  () => import('@/components/future/GlobeScene'),
  { ssr: false, loading: () => <div className="h-96 flex items-center justify-center"><p className="font-mono text-xs text-cyber-cyan">LOADING GLOBE...</p></div> }
)

export default function FuturePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#020005' }}
    >
      {/* Holographic grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          perspective: '500px',
          transform: 'rotateX(60deg)',
          transformOrigin: 'center bottom',
          height: '60%',
          bottom: 0,
          top: 'auto',
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.1) 2px, rgba(0,212,255,0.1) 4px)',
        }}
      />

      {/* 2027 watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.02 }}
      >
        <p
          className="font-display font-bold"
          style={{ fontSize: 'clamp(8rem, 25vw, 20rem)', color: '#00D4FF', animation: 'hologram-flicker 8s ease-in-out infinite' }}
        >
          2027
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 lg:px-16 pt-32 pb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-4">THE ORACLE</p>
              <h1
                className="font-mono font-bold mb-4"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  color: '#00D4FF',
                  textShadow: '0 0 30px rgba(0,212,255,0.5)',
                  animation: 'hologram-flicker 6s ease-in-out infinite',
                }}
              >
                <ScrambleText text="TRANSMISSION FROM 2027" />
              </h1>
              <p className="font-mono text-text-secondary">This is not speculation. This is a plan.</p>
            </motion.div>
          </div>
        </section>

        {/* Classified files */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-2">CLASSIFIED FILES</p>
              <h2 className="font-display text-3xl text-text-primary font-bold">The Mission Dossier</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {CLASSIFIED_FILES.map((file, i) => (
                <ClassifiedCard key={i} file={file} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Vision statement */}
        <section className="px-6 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="font-display text-2xl lg:text-4xl text-text-primary leading-relaxed">
                "By 2030, Roylandz Media will be the most recognized African digital media brand in the world.
                Not because I got lucky.{' '}
                <span style={{ color: '#00D4FF' }}>Because I got LOUD.</span>"
              </p>
            </motion.div>
          </div>
        </section>

        {/* Countdown */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-6">MISSION COUNTDOWN</p>
            <p className="font-mono text-sm text-text-tertiary mb-8">Until The Next Chapter Begins</p>
            <CountdownTimer />
          </div>
        </section>

        {/* Globe */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-4">THE REACH</p>
            <h2 className="font-display text-3xl text-text-primary font-bold mb-8">Building From Here. For All Of This.</h2>
            <GlobeScene />
          </div>
        </section>

        <div className="h-24" />
      </div>
    </main>
  )
}
