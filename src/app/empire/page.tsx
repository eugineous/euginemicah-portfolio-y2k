'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TerminalCard } from '@/components/empire/TerminalCard'
import { DashboardPanel } from '@/components/empire/DashboardPanel'
import { ScrambleText } from '@/components/global/ScrambleText'
import { PROPOST_COMPANIES, EUGINE } from '@/lib/constants'

const MatrixRain = dynamic(
  () => import('@/components/empire/MatrixRain').then(m => ({ default: m.MatrixRain })),
  { ssr: false }
)

const AUTO_NEWS_STEPS = [
  { step: '01', label: 'SCRAPE', desc: 'News articles collected from 50+ sources in real-time' },
  { step: '02', label: 'GENERATE', desc: 'Gemini AI creates branded images and captions' },
  { step: '03', label: 'PUBLISH', desc: 'Auto-posted to Instagram & Facebook via Meta Graph API' },
]

export default function EmpirePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020005 0%, #050B1A 100%)' }}
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 lg:px-16 pt-32 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-4">THE EMPIRE</p>
              <h1
                className="font-mono font-bold mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  color: '#00D4FF',
                  animation: 'glitch 4s steps(1) infinite',
                  textShadow: '0 0 20px rgba(0,212,255,0.5)',
                }}
              >
                <ScrambleText text="THE PROPOST EMPIRE" />
              </h1>
              <p className="font-mono text-text-secondary text-lg">
                150+ AI Agents. 6 Platforms. One Man's Vision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What is ProPost */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-4">WHAT IS PROPOST</p>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                ProPost is the world's first fully autonomous AI social media empire. 150+ named AI agents, organized into 9 companies, running 24 hours a day across LinkedIn, X, Instagram, Facebook, TikTok, and euginemicah.com.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '150+', label: 'AI Agents' },
                  { value: '9', label: 'Companies' },
                  { value: '6', label: 'Platforms' },
                ].map((s, i) => (
                  <div key={i} className="text-center glass rounded-lg p-4 border border-cyber-cyan/20">
                    <p className="font-mono text-2xl font-bold text-cyber-cyan">{s.value}</p>
                    <p className="font-mono text-xs text-text-tertiary mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <DashboardPanel />
            </motion.div>
          </div>
        </section>

        {/* 9 Companies grid */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-2">THE 9 COMPANIES</p>
              <h2 className="font-display text-3xl text-text-primary font-bold">The Agent Network</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROPOST_COMPANIES.map((company, i) => (
                <TerminalCard key={i} company={company} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Auto News Station */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase mb-2">AUTO NEWS STATION</p>
              <h2 className="font-display text-3xl text-text-primary font-bold">The Machine That Never Sleeps</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {AUTO_NEWS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative glass rounded-xl p-6 border border-cyber-cyan/20"
                >
                  {i < AUTO_NEWS_STEPS.length - 1 && (
                    <div className="absolute top-1/2 -right-3 text-cyber-cyan/40 hidden md:block">→</div>
                  )}
                  <p className="font-mono text-3xl font-bold text-cyber-cyan/30 mb-3">{step.step}</p>
                  <p className="font-mono text-sm font-bold text-cyber-cyan mb-2">{step.label}</p>
                  <p className="font-body text-text-secondary text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy terminal */}
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-xl border p-6 font-mono text-sm"
              style={{ background: '#020005', borderColor: '#00D4FF30' }}
            >
              <p className="text-text-tertiary mb-2">{'>'} LOADING PHILOSOPHY.txt...</p>
              <p className="text-cyber-cyan mb-1">{'>'} <span className="text-text-primary italic">"{EUGINE.philosophy}"</span></p>
              <p className="text-text-tertiary">{'>'} — Eugine Micah, Head of Digital, PPP TV Kenya</p>
              <p className="text-cyber-cyan/40 mt-2">{'>'} <span style={{ animation: 'typewriter 1s step-end infinite' }}>|</span></p>
            </div>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </main>
  )
}
