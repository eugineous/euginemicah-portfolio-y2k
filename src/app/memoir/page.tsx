'use client'

import { motion } from 'framer-motion'
import { BookMockup } from '@/components/memoir/BookMockup'
import { PullQuoteCarousel } from '@/components/memoir/PullQuoteCarousel'
import { ThemeBadge } from '@/components/memoir/ThemeBadge'
import { ScrambleText } from '@/components/global/ScrambleText'
import { MagneticButton } from '@/components/global/MagneticButton'
import { EUGINE } from '@/lib/constants'

const PARTS = [
  {
    number: 'I',
    title: 'The Foundation',
    period: '2000–2009',
    quote: "Born into a story that didn't look like success.",
    description: 'The roots. The bloodline. The beginning of a boy who would refuse to stay where he started.',
  },
  {
    number: 'II',
    title: 'Primary School Years',
    period: '2009–2015',
    quote: "When you're broke, your imagination becomes your empire.",
    description: 'The classroom. The dreams. The first stories told to no one but the sky.',
  },
  {
    number: 'III',
    title: 'Secondary School Years',
    period: '2015–2019',
    quote: 'Education was the gift they gave before they gave anything else.',
    description: 'Mua Hills. The grandparents\' school. The discipline that would become the foundation of everything.',
  },
]

const THEMES = ['Survival', 'Identity', 'Ambition', 'Heritage']

export default function MemoirPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #1a0a00 0%, #2D1B00 30%, #1a0a00 100%)' }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Ink smudge decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-5 pointer-events-none"
        style={{ background: '#D4A017', filter: 'blur(40px)' }} />
      <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full opacity-5 pointer-events-none"
        style={{ background: '#8B6914', filter: 'blur(60px)' }} />

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-16 pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">THE WORD</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary mb-4">
              <ScrambleText text="BORN BROKE," />
            </h1>
            <h1 className="font-display text-5xl lg:text-7xl font-bold mb-8" style={{
              background: 'var(--gradient-gold)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BUILT LOUD
            </h1>
            <p className="font-body text-text-secondary text-lg italic">A Memoir by Eugine Micah</p>
          </motion.div>

          {/* 3D Book */}
          <div className="relative">
            <BookMockup />
          </div>

          {/* Writing style */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-text-tertiary text-sm italic max-w-lg mx-auto"
          >
            Written in the voice of Will Smith's vulnerability, Kevin Hart's humor, Trevor Noah's context, and Jeff Koinange's gravitas.
          </motion.p>
        </div>
      </section>

      {/* Three parts */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {PARTS.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">{part.number}</span>
              </div>
              <div>
                <p className="font-mono text-xs text-gold tracking-widest uppercase mb-1">{part.period}</p>
                <h3 className="font-display text-2xl text-text-primary font-bold mb-3">{part.title}</h3>
                <blockquote className="font-body text-text-secondary italic mb-3 border-l-2 border-gold/30 pl-4">
                  "{part.quote}"
                </blockquote>
                <p className="font-body text-text-tertiary text-sm">{part.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Theme badges */}
      <section className="relative z-10 px-6 lg:px-16 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-6">KEY THEMES</p>
          <div className="flex flex-wrap justify-center gap-4">
            {THEMES.map((theme) => (
              <ThemeBadge key={theme} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote carousel */}
      <section className="relative z-10 px-6 lg:px-16 py-8">
        <div className="max-w-3xl mx-auto">
          <PullQuoteCarousel />
        </div>
      </section>

      {/* Roylandz brand origin */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 border border-gold/20">
          <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-6">THE NAME</p>
          <p className="font-display text-2xl lg:text-3xl text-text-primary leading-relaxed">
            "The name Roylandz wasn't given. It was built. Letter by letter. Decision by decision. Loss by loss. Win by win."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-16 py-16 text-center">
        <MagneticButton variant="gold" href="#">
          📖 ORDER THE MEMOIR
        </MagneticButton>
      </section>

      <div className="h-24" />
    </main>
  )
}
