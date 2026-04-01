'use client'

import { motion } from 'framer-motion'
import { VaultCard } from '@/components/archive/VaultCard'
import { GalleryFilter } from '@/components/archive/GalleryFilter'
import { StatsCounter } from '@/components/archive/StatsCounter'
import { ScrambleText } from '@/components/global/ScrambleText'

const ACHIEVEMENTS = [
  { title: 'Head of Digital — PPP TV Kenya', source: 'PPP TV', year: '2022–Present', description: 'Leading digital strategy, content distribution, and audience growth for one of Kenya\'s premier TV networks.' },
  { title: 'Co-Host & Producer — Urban News', source: 'StarTimes Ch.430', year: '2022–Present', description: '2M+ weekly viewers. Co-hosting and producing Kenya\'s premier urban news show.' },
  { title: 'Published Author — Born Broke, Built Loud', source: 'Memoir', year: '2024', description: 'A memoir chronicling the journey from Kakamega to Nairobi, from broke to empire.' },
  { title: 'CEO — Roylandz TV', source: 'Roylandz Media', year: '2020–2022', description: 'Founded and led Roylandz TV, building the brand from the ground up.' },
  { title: 'News Reporter — Citizen TV', source: 'Citizen TV Kenya', year: '2019–2022', description: 'Breaking news, investigative reporting, and live coverage for Kenya\'s top TV network.' },
  { title: 'ProPost AI Empire — 150+ Agents', source: 'ProPost', year: '2023–Present', description: 'Built the world\'s first fully autonomous AI social media empire with 150+ named agents across 9 companies.' },
]

const TECH_STACK = [
  { name: 'ProPost Architecture', items: ['150+ AI Agents', '9 Companies', '6 Platforms', 'Gemini AI', 'Meta Graph API'] },
  { name: 'Auto News Station', items: ['Next.js', 'Meta Graph API', 'Gemini AI', 'Instagram', 'Facebook'] },
  { name: 'Roylandz Universe', items: ['Next.js 14', 'Three.js', 'GSAP', 'Supabase', 'Vercel'] },
]

export default function ArchivePage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0A0A0A 100%)' }}
    >
      {/* Steel texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px',
        }}
      />

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-16 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-4">THE ARCHIVE</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary">
              <ScrambleText text="EVERY RECEIPT." />
            </h1>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-gold">
              EVERY PROOF.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Stats counter */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-8">NUMBERS THAT MATTER</p>
          <StatsCounter />
        </div>
      </section>

      {/* Portfolio gallery */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-2">PORTFOLIO</p>
            <h2 className="font-display text-3xl text-text-primary font-bold">The Work</h2>
          </motion.div>
          <GalleryFilter />
        </div>
      </section>

      {/* Achievements vault */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-2">ACHIEVEMENTS VAULT</p>
            <h2 className="font-display text-3xl text-text-primary font-bold">The Milestones</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <VaultCard key={i} {...a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-2">TECH STACK</p>
            <h2 className="font-display text-3xl text-text-primary font-bold">The Architecture</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TECH_STACK.map((stack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <p className="font-mono text-xs text-gold tracking-wider uppercase mb-4">{stack.name}</p>
                <div className="space-y-2">
                  {stack.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold/60" />
                      <span className="font-mono text-xs text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24" />
    </main>
  )
}
