// Shared GSAP animation presets
// All GSAP imports are dynamic to avoid SSR bundle inclusion

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

// GSAP scroll-triggered fade up (call inside useEffect)
export async function gsapFadeUp(
  elements: Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; stagger?: number } = {}
) {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo(
    elements,
    { opacity: 0, y: 30, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: options.stagger ?? 0.1,
      delay: options.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start: 'top 85%',
        once: true,
      },
    }
  )
}

// GSAP letter stagger for headlines
export async function gsapLetterStagger(container: Element) {
  const { gsap } = await import('gsap')
  const letters = container.querySelectorAll('.letter')
  gsap.fromTo(
    letters,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
  )
}
