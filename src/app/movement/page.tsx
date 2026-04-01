'use client'

import { motion } from 'framer-motion'
import { CountyMap } from '@/components/movement/CountyMap'
import { ScrambleText } from '@/components/global/ScrambleText'
import { EUGINE } from '@/lib/constants'

const PODCAST_TEAM = [
  { name: 'Eugine Micah', role: 'Host & Producer' },
  { name: 'Lucy Ogunde', role: 'Co-Host' },
  { name: 'Mary Maina', role: 'Co-Host' },
  { name: 'Rania Biketi', role: 'Co-Host' },
]

const COMMUNITY_STATS = [
  { value: '2M+', label: 'People Reached Weekly' },
  { value: '47', label: 'Counties Targeted' },
  { value: '3+', label: 'Shows Produced' },
  { value: '100+', label: 'Hours of Content' },
]

const TESTIMONIALS = [
  { quote: "Urban News changed how I see Kenyan media.", author: "Viewer, Nairobi" },
  { quote: "The Nairobi Podcast speaks for us.", author: "Listener, Mombasa" },
  { quote: "Eugine brings stories that matter.", author: "Viewer, Kisumu" },
]

export default function MovementPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #1A0500 0%, #2A0A00 50%, #1A0500 100%)' }}
    >
      {/* Crowd silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full" fill="#E07B39">
          <path d="M0,200 L0,140 Q50,100 100,130 Q150,160 200,120 Q250,80 300,110 Q350,140 400,100 Q450,60 500,90 Q550,120 600,80 Q650,40 700,70 Q750,100 800,60 Q850,20 900,50 Q950,80 1000,50 Q1050,20 1100,60 Q1150,100 1200,70 L1200,200 Z" />
        </svg>
      </div>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-16 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#E07B39' }}>THE MOVEMENT</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-text-primary">
              <ScrambleText text="BUILT FOR THE PEOPLE" />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Urban Tour */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#E07B39' }}>URBAN TOUR</p>
            <h2 className="font-display text-4xl text-text-primary font-bold mb-4">
              Kenya's Premier High School Talent Search
            </h2>
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
              A 3-hour program format touring Kenya's schools. T-stage design. Sponsor integration. Every talent has a stage. We build it.
            </p>
            <div className="glass rounded-xl p-6 border border-orange-500/20">
              <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mb-2">PROGRAM FORMAT</p>
              <ul className="space-y-2">
                {['School pitch & setup', 'Talent showcase (3 hours)', 'Sponsor activations', 'Community engagement'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#E07B39' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CountyMap />
          </motion.div>
        </div>
      </section>

      {/* Tushinde */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#E07B39' }}>TWENDE TUSAIDIE TUSHINDE</p>
            <h2 className="font-display text-4xl lg:text-5xl text-text-primary font-bold mb-4">
              47 Counties. One Mission. No One Left Behind.
            </h2>
            <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
              A charity show across all 47 Kenya counties. MrBeast-style viral strategy. Real impact. Real stories.
            </p>
          </motion.div>

          {/* Community stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNITY_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center border border-white/10"
              >
                <p className="font-display text-3xl font-bold" style={{ color: '#E07B39' }}>{stat.value}</p>
                <p className="font-mono text-xs text-text-tertiary tracking-wider uppercase mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nairobi Podcast */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#E07B39' }}>THE NAIROBI PODCAST</p>
            <h2 className="font-display text-4xl text-text-primary font-bold">Four Voices. One City. Every Story.</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {PODCAST_TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mx-auto mb-3">
                  <span className="font-display text-lg text-orange-400">{member.name[0]}</span>
                </div>
                <p className="font-mono text-sm text-text-primary font-bold">{member.name}</p>
                <p className="font-mono text-xs text-text-tertiary mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform links */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['Spotify', 'YouTube', 'Apple Podcasts'].map((platform) => (
              <div key={platform} className="glass px-4 py-2 rounded-full border border-white/10 font-mono text-xs text-text-secondary">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hannah Arendt quote */}
      <section className="relative z-10 px-6 lg:px-16 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl lg:text-3xl text-text-primary leading-relaxed italic mb-6">
            "{EUGINE.quote}"
          </p>
          <p className="font-mono text-xs text-gold tracking-widest">— {EUGINE.quoteAuthor}</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <p className="font-body text-text-secondary italic mb-4">"{t.quote}"</p>
              <p className="font-mono text-xs text-text-tertiary">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-24" />
    </main>
  )
}
