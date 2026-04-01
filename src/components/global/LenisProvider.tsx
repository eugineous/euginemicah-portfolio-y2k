'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import type Lenis from 'lenis'

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    let animationId: number

    async function init() {
      const LenisClass = (await import('lenis')).default
      const lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Sync with GSAP ticker if available
      try {
        const { gsap } = await import('gsap')
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      } catch {
        // GSAP not available, use RAF directly
        function raf(time: number) {
          lenis.raf(time)
          animationId = requestAnimationFrame(raf)
        }
        animationId = requestAnimationFrame(raf)
      }
    }

    init()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      lenisRef.current?.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
