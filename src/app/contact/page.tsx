'use client'

import { motion } from 'framer-motion'
import { RadioWave } from '@/components/contact/RadioWave'
import { ContactForm } from '@/components/contact/ContactForm'
import { SocialLinks } from '@/components/contact/SocialLinks'
import { ScrambleText } from '@/components/global/ScrambleText'
import { EUGINE } from '@/lib/constants'
import { useState } from 'react'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EUGINE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Radio wave background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-full h-full" style={{ maxWidth: 800 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `${i * 150}px`,
                height: `${i * 150}px`,
                borderColor: 'rgba(212,160,23,0.15)',
                animation: `pulse-ring 4s ease-out infinite`,
                animationDelay: `${(i - 1) * 0.6}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 lg:px-16 pt-32 pb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">THE SIGNAL</p>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary mb-4">
                <ScrambleText text="SEND YOUR SIGNAL" />
              </h1>
              <p className="font-body text-text-secondary text-lg italic">
                "If you've made it this far, you're not here by accident."
              </p>
            </motion.div>

            {/* Radio wave visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <RadioWave />
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <ContactForm />
            </motion.div>

            {/* Right side info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-10"
            >
              {/* Direct contact */}
              <div>
                <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">DIRECT SIGNAL</p>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-3 glass rounded-xl px-6 py-4 border border-white/10 hover:border-gold/30 transition-all group w-full"
                >
                  <span className="font-mono text-text-primary group-hover:text-gold transition-colors">{EUGINE.email}</span>
                  <span className="ml-auto font-mono text-xs text-text-tertiary group-hover:text-gold transition-colors">
                    {copied ? '✓ COPIED' : 'COPY'}
                  </span>
                </button>
              </div>

              {/* Availability */}
              <div>
                <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">AVAILABILITY</p>
                <div className="glass rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full bg-green-400"
                      style={{ animation: 'pulse-ring 2s ease-out infinite', boxShadow: '0 0 6px #4CAF50' }}
                    />
                    <span className="font-mono text-xs text-green-400 tracking-widest">OPEN TO SIGNALS</span>
                  </div>
                  <div className="space-y-2">
                    {['Hosting / Speaking', 'Digital Strategy Consulting', 'Collaborations', 'Interviews'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold/60" />
                        <span className="font-body text-text-secondary text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-6">FIND THE SIGNAL</p>
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom quotes */}
        <section className="px-6 lg:px-16 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-display text-xl text-text-secondary italic">
              "{EUGINE.quote}"
            </p>
            <p className="font-mono text-xs text-gold tracking-widest">— {EUGINE.quoteAuthor}</p>
            <p className="font-body text-text-tertiary mt-4">
              "This is how we act in concert. Start here." — Eugine Micah
            </p>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </main>
  )
}
