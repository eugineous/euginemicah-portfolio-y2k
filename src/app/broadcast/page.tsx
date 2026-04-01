'use client'

import { motion } from 'framer-motion'
import { NairobiClock } from '@/components/broadcast/NairobiClock'
import { VUMeter } from '@/components/broadcast/VUMeter'
import { BroadcastPlayer } from '@/components/broadcast/BroadcastPlayer'
import { ShowCard } from '@/components/broadcast/ShowCard'
import { ScrambleText } from '@/components/global/ScrambleText'

const SHOWS = [
  {
    title: 'Urban News',
    subtitle: 'StarTimes Channel 430',
    description: 'Co-Host & Producer. Every story. Every angle. Every week. 2M+ viewers weekly across East Africa.',
    badge: 'ON AIR',
    stat: '2M+ Weekly',
    accentColor: '#C0392B',
  },
  {
    title: 'PPP TV Digital Desk',
    subtitle: 'Head of Digital',
    description: 'Leading digital strategy, content distribution, and audience growth for PPP TV Kenya.',
    badge: 'ACTIVE',
    stat: 'Head of Digital',
    accentColor: '#D4A017',
  },
  {
    title: 'The Nairobi Podcast',
    subtitle: 'With Lucy Ogunde, Mary Maina, Rania Biketi',
    description: 'Four voices. One city. Every story. The conversations Nairobi is really having.',
    badge: 'PODCAST',
    stat: '4 Hosts',
    accentColor: '#00D4FF',
  },
  {
    title: 'Citizen TV Legacy',
    subtitle: 'News Reporter — Where It All Started',
    description: 'The discipline. The craft. The bylines. Every desk. Every camera. Building toward something.',
    badge: 'LEGACY',
    stat: '10+ Years',
    accentColor: '#888888',
  },
]

const CAREER_STATS = [
  { value: '10+', label: 'Years In Media' },
  { value: '3', label: 'Major Shows' },
  { value: '2M+', label: 'Weekly Viewers' },
  { value: '4', label: 'Networks' },
]

export default function BroadcastPage() {
  return (
    <main
      className="relative min-h-screen scan-lines"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0A0A0A 100%)' }}
    >
      {/* Bokeh lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#D4A01720' : '#C0392B15'}, transparent)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: 'blur(20px)',
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* ON AIR badge */}
          <div className="flex items-center gap-2 bg-signal-red/20 border border-signal-red/40 px-3 py-1.5 rounded-full">
            <span
              className="w-2 h-2 rounded-full bg-signal-red"
              style={{ animation: 'pulse-ring 1.5s ease-out infinite' }}
            />
            <span className="font-mono text-xs text-signal-red tracking-widest font-bold">ON AIR</span>
          </div>
          <VUMeter />
        </div>

        <div className="text-center hidden md:block">
          <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase">PPP TV KENYA</p>
          <p className="font-mono text-[10px] text-text-tertiary tracking-wider">THE DIGITAL DESK</p>
        </div>

        <NairobiClock />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="font-mono text-xs text-signal-red tracking-[0.3em] uppercase mb-3">THE BROADCAST</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary">
              <ScrambleText text="LIVE FROM THE STUDIO" />
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Video player */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <BroadcastPlayer />
              <div className="mt-4">
                <p className="font-display text-xl text-text-primary font-bold">Urban News with Eugine Micah & Lucy Ogunde</p>
                <p className="font-mono text-xs text-text-tertiary mt-1 tracking-wider">StarTimes Channel 430 · 2,000,000+ Viewers Every Week</p>
              </div>
            </motion.div>

            {/* Career stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {CAREER_STATS.map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-5 text-center border border-white/10">
                    <p className="font-display text-3xl font-bold text-gold">{stat.value}</p>
                    <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Philosophy quote */}
              <div
                className="relative p-6 rounded-xl border-l-4"
                style={{ borderColor: '#C0392B', background: 'rgba(192,57,43,0.05)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-signal-red/30" />
                <p className="font-mono text-sm text-text-secondary italic leading-relaxed">
                  "The camera doesn't lie. Neither do I. That's the job."
                </p>
                <p className="font-mono text-xs text-signal-red mt-3 tracking-widest">— EUGINE MICAH</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-signal-red/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Show cards */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-2">THE SHOWS</p>
            <h2 className="font-display text-3xl lg:text-4xl text-text-primary font-bold">Every Platform. Every Story.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOWS.map((show, i) => (
              <ShowCard key={i} {...show} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="h-24" />
    </main>
  )
}
