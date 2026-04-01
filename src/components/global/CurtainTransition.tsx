'use client'

import { useEffect, useRef, createContext, useContext, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface CurtainContextType {
  navigate: (href: string) => void
}

const CurtainContext = createContext<CurtainContextType>({
  navigate: () => {},
})

export function useCurtain() {
  return useContext(CurtainContext)
}

export function CurtainTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const navigate = useCallback(async (href: string) => {
    if (!curtainRef.current || !shimmerRef.current) {
      router.push(href)
      return
    }

    const curtain = curtainRef.current
    const shimmer = shimmerRef.current

    try {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline()
      tl.set(curtain, { scaleX: 0, transformOrigin: 'left center', display: 'block' })
        .to(curtain, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' })
        .to(shimmer, { opacity: 1, duration: 0.1 }, '-=0.1')
        .call(() => router.push(href))
        .to(curtain, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.4,
          ease: 'power2.inOut',
          delay: 0.1,
        })
        .to(shimmer, { opacity: 0, duration: 0.2 }, '-=0.3')
        .set(curtain, { display: 'none' })
    } catch {
      router.push(href)
    }
  }, [router])

  // Animate in on route change
  useEffect(() => {
    async function animateIn() {
      if (!curtainRef.current) return
      try {
        const { gsap } = await import('gsap')
        gsap.fromTo(
          document.body,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
      } catch {
        // no-op
      }
    }
    animateIn()
  }, [pathname])

  return (
    <CurtainContext.Provider value={{ navigate }}>
      {children}
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-void)',
          zIndex: 'var(--z-curtain)' as unknown as number,
          display: 'none',
          pointerEvents: 'none',
        }}
      />
      {/* Gold shimmer */}
      <div
        ref={shimmerRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.15), transparent)',
          zIndex: 'calc(var(--z-curtain) + 1)' as unknown as number,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </CurtainContext.Provider>
  )
}
