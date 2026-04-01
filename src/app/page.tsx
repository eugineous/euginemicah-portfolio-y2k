'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader } from '@/components/home/Loader'
import { StatsBar } from '@/components/home/StatsBar'
import { HexCard } from '@/components/home/HexCard'
import { Ticker } from '@/components/home/Ticker'
import { ScrambleText } from '@/components/global/ScrambleText'
import { MagneticButton } from '@/components/global/MagneticButton'
import { WORLDS, EUGINE, getParticleCount } from '@/lib/constants'

// Dynamic import — Three.js never in SSR bundle
const HeroScene = dynamic(
  () => import('@/components/home/HeroScene').then(m => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-void" /> }
)

// Worlds to show in hex grid (exclude portal itself)
const HEX_WORLDS = WORLDS.filter(w => w.slug !== 'portal').slice(0, 6)

export default function PortalPage() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 639px)').matches)
  }, [])

  useEffect(() => {
    if (!loaderDone) return
    // Stagger hero elements in
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [loaderDone])

  // GSAP stagger on headline letters
  useEffect(() => {
    if (!heroVisible || !headlineRef.current) return
    import('gsap').then(({ gsap }) => {
      const letters = headlineRef.current!.querySelectorAll('.letter')
      gsap.fromTo(letters,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )
    })
  }, [heroVisible])

  const particleCount = getParticleCount(isMobile)

  return (
    <>
      {/* Loader */}
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      </AnimatePresence>

      {/* Main portal */}
      <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>

        {/* Three.js star field background */}
        <div className="absolute inset-0 z-0">
          {loaderDone && <HeroScene particleCount={particleCount} />}
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 z-[1] grain pointer-events-none" />

        {/* Hero section */}
        <section className="relative z-10 min-h-screen flex items-center px-6 lg:px-16 pt-24 pb-32">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={heroVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Glitching gold border frame */}
                <div
                  className="absolute -inset-2 rounded-2xl border-2 border-gold/60 z-10 pointer-events-none"
                  style={{ animation: 'border-glitch 8s steps(1) infinite' }}
                />

                {/* Portrait image */}
                <div className="relative w-72 h-96 lg:w-80 lg:h-[480px] rounded-xl overflow-hidden">
                  {/* B&W layer */}
                  <Image
                    src="/images/EUGINE MICAH.png"
                    alt="Eugine Micah"
                    fill
                    className="object-cover object-top transition-all duration-700 group-hover:opacity-0"
                    style={{ filter: 'grayscale(1) contrast(1.1)' }}
                    priority
                  />
                  {/* Color layer (revealed on hover) */}
                  <Image
                    src="/images/EUGINE MICAH.png"
                    alt="Eugine Micah"
                    fill
                    className="object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    priority
                  />
                  {/* Gold grain overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6' fill='%23D4A017'/%3E%3C/svg%3E")`,
                      backgroundSize: '128px',
                    }}
                  />
                </div>

                {/* LIVE badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-signal-red/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span
                    className="w-2 h-2 rounded-full bg-white"
                    style={{ animation: 'pulse-ring 1.5s ease-out infinite' }}
                  />
                  <span className="font-mono text-[10px] text-white tracking-widest font-bold">LIVE</span>
                  <span className="font-mono text-[9px] text-white/70">PPP TV | StarTimes 430</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Text content */}
            <div className="flex flex-col gap-6">
              {/* Main headline — letter by letter */}
              <div ref={headlineRef} aria-label="Eugine Micah">
                <h1
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 'var(--text-hero)', color: 'transparent' }}
                >
                  {'EUGINE MICAH'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="letter inline-block"
                      style={{
                        background: 'var(--gradient-gold)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        opacity: 0,
                        ...(char === ' ' ? { width: '0.3em' } : {}),
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="font-headline text-text-secondary tracking-[0.2em] uppercase text-sm lg:text-base"
              >
                {EUGINE.tagline}
              </motion.p>

              {/* Typewriter line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={heroVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.6 }}
                className="font-mono text-xs text-gold tracking-widest"
              >
                NAIROBI, KENYA — BORN BROKE. BUILT LOUD.
              </motion.p>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <StatsBar />
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton variant="red" href="/broadcast">
                  ▶ WATCH URBAN NEWS
                </MagneticButton>
                <MagneticButton variant="outline" href="/memoir">
                  📖 READ MY MEMOIR
                </MagneticButton>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 2.4 }}
                className="flex items-center gap-2 mt-4"
                style={{ animation: 'breathe 2.5s ease-in-out infinite' }}
              >
                <span className="font-mono text-xs text-gold/60 tracking-widest">ENTER THE UNIVERSE ↓</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* World preview hex grid */}
        <section className="relative z-10 py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-3">EXPLORE THE UNIVERSE</p>
              <h2 className="font-display text-4xl lg:text-5xl text-text-primary">
                <ScrambleText text="9 WORLDS. ONE MAN." />
              </h2>
            </motion.div>

            {/* Hex grid */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {HEX_WORLDS.map((world, i) => (
                <motion.div
                  key={world.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <HexCard
                    icon={world.icon}
                    label={world.navLabel}
                    description={world.description}
                    route={world.route}
                    accentColor={world.accentColor}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom padding for ticker */}
        <div className="h-12" />
      </main>

      {/* Breaking news ticker — fixed at bottom */}
      <Ticker />
    </>
  )
}
