'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WORLDS } from '@/lib/constants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  currentPath: string
  onNavigate: (route: string) => void
}

export function MobileNav({ isOpen, onClose, currentPath, onNavigate }: MobileNavProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (route: string) => {
    onNavigate(route)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] flex flex-col"
          style={{ background: 'var(--gradient-hero)' }}
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 grain pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gold hover:text-gold-light transition-colors"
            aria-label="Close navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="px-8 pt-16 pb-8">
            <p className="font-mono text-xs text-gold tracking-widest uppercase">The Roylandz Universe</p>
            <h2 className="font-display text-3xl text-text-primary mt-1">Navigate</h2>
          </div>

          {/* World links */}
          <nav className="flex-1 overflow-y-auto px-8 pb-8" aria-label="Full navigation">
            <div className="space-y-1">
              {WORLDS.map((world, i) => {
                const isActive = currentPath === world.route
                return (
                  <motion.button
                    key={world.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => handleNavClick(world.route)}
                    className={`
                      w-full flex items-center gap-4 px-4 py-4 rounded-lg
                      transition-all duration-200 text-left
                      ${isActive
                        ? 'bg-gold/10 border border-gold/30'
                        : 'hover:bg-white/5 border border-transparent'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-2xl">{world.icon}</span>
                    <div>
                      <p className={`font-mono text-sm tracking-widest uppercase ${isActive ? 'text-gold' : 'text-text-primary'}`}>
                        {world.label}
                      </p>
                      <p className="font-ui text-xs text-text-tertiary mt-0.5">{world.description}</p>
                    </div>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-gold" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}>
            <p className="font-mono text-xs text-text-tertiary tracking-wider">
              BORN BROKE. BUILT LOUD. BUILT DIFFERENT.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
