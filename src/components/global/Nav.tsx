'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { WORLDS } from '@/lib/constants'
import { useCurtain } from './CurtainTransition'
import { MobileNav } from './MobileNav'

// Nav items — exclude portal from the pill nav (it's the home)
const NAV_WORLDS = WORLDS.filter(w => w.slug !== 'portal')

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { navigate } = useCurtain()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (route: string) => {
    setMobileOpen(false)
    navigate(route)
  }

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden lg:flex"
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`
            flex items-center gap-1 px-4 py-2 rounded-full
            border border-white/10
            transition-all duration-300
            ${scrolled
              ? 'bg-void/90 backdrop-blur-xl shadow-lg shadow-black/50'
              : 'bg-void/60 backdrop-blur-md'
            }
          `}
        >
          {/* Logo/Home */}
          <button
            onClick={() => handleNavClick('/')}
            className="px-3 py-1.5 text-gold font-mono text-xs tracking-widest hover:text-gold-light transition-colors"
            aria-label="Home"
          >
            RM
          </button>

          <div className="w-px h-4 bg-white/10" />

          {/* World links */}
          {NAV_WORLDS.map((world) => {
            const isActive = pathname === world.route
            return (
              <button
                key={world.slug}
                onClick={() => handleNavClick(world.route)}
                className="relative px-3 py-1.5 group"
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`
                    font-mono text-xs tracking-widest uppercase transition-colors duration-200
                    ${isActive ? 'text-gold' : 'text-text-secondary group-hover:text-text-primary'}
                  `}
                >
                  {/* Active dot */}
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-1.5 mb-0.5" />
                  )}
                  {world.navLabel}
                </span>
                {/* Gold underline on hover */}
                <span
                  className={`
                    absolute bottom-0 left-3 right-3 h-px bg-gold
                    transition-transform duration-200 origin-left
                    ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}
                />
              </button>
            )
          })}
        </motion.div>
      </nav>

      {/* Mobile: hamburger button (top right) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-[100] lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
      >
        <span className="block w-6 h-0.5 bg-gold transition-all" />
        <span className="block w-4 h-0.5 bg-gold transition-all" />
        <span className="block w-6 h-0.5 bg-gold transition-all" />
      </button>

      {/* Mobile: bottom nav bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around bg-void/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">
          {/* Show 5 primary worlds in bottom bar */}
          {[WORLDS[0], WORLDS[1], WORLDS[2], WORLDS[4], WORLDS[8]].map((world) => {
            const isActive = pathname === world.route
            return (
              <button
                key={world.slug}
                onClick={() => handleNavClick(world.route)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                  isActive ? 'text-gold' : 'text-text-tertiary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-lg leading-none">{world.icon}</span>
                <span className="font-mono text-[9px] tracking-wider uppercase">
                  {world.navLabel.slice(0, 6)}
                </span>
              </button>
            )
          })}
          {/* More button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-text-tertiary"
            aria-label="More navigation options"
          >
            <span className="text-lg leading-none">☰</span>
            <span className="font-mono text-[9px] tracking-wider uppercase">MORE</span>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={pathname}
        onNavigate={handleNavClick}
      />
    </>
  )
}
