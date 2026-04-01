'use client'

import { useEffect, useRef } from 'react'

export function FamilyTree() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Animate SVG paths drawing in
    if (!svgRef.current) return
    const paths = svgRef.current.querySelectorAll('path, line')
    paths.forEach((path) => {
      const el = path as SVGPathElement
      const length = el.getTotalLength?.() ?? 100
      el.style.strokeDasharray = String(length)
      el.style.strokeDashoffset = String(length)
      el.style.transition = 'stroke-dashoffset 1.5s ease-in-out'
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        paths.forEach((path) => {
          ;(path as SVGPathElement).style.strokeDashoffset = '0'
        })
      }
    }, { threshold: 0.3 })

    observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex justify-center py-8">
      <svg
        ref={svgRef}
        viewBox="0 0 400 280"
        width="400"
        height="280"
        fill="none"
        className="max-w-full"
      >
        {/* Eugine — center bottom */}
        <circle cx="200" cy="240" r="20" stroke="#D4A017" strokeWidth="2" fill="#D4A01720" />
        <text x="200" y="244" textAnchor="middle" fill="#D4A017" fontSize="9" fontFamily="monospace">EUGINE</text>

        {/* Father — left */}
        <circle cx="100" cy="160" r="16" stroke="#8B6914" strokeWidth="1.5" fill="#8B691420" />
        <text x="100" y="164" textAnchor="middle" fill="#8B6914" fontSize="8" fontFamily="monospace">JOAB</text>

        {/* Mother — right */}
        <circle cx="300" cy="160" r="16" stroke="#8B6914" strokeWidth="1.5" fill="#8B691420" />
        <text x="300" y="164" textAnchor="middle" fill="#8B6914" fontSize="8" fontFamily="monospace">JOSEPHINE</text>

        {/* Paternal grandfather */}
        <circle cx="60" cy="80" r="14" stroke="#6B5D4F" strokeWidth="1" fill="#6B5D4F20" />
        <text x="60" y="84" textAnchor="middle" fill="#6B5D4F" fontSize="7" fontFamily="monospace">ABATONGOI</text>

        {/* Great-grandfather */}
        <circle cx="200" cy="40" r="14" stroke="#D4A017" strokeWidth="1.5" fill="#D4A01715" />
        <text x="200" y="36" textAnchor="middle" fill="#D4A017" fontSize="7" fontFamily="monospace">REV. MICAH</text>
        <text x="200" y="48" textAnchor="middle" fill="#D4A017" fontSize="6" fontFamily="monospace">OB'BAYI</text>

        {/* Zarembka grandparents */}
        <circle cx="340" cy="80" r="14" stroke="#6B5D4F" strokeWidth="1" fill="#6B5D4F20" />
        <text x="340" y="76" textAnchor="middle" fill="#6B5D4F" fontSize="7" fontFamily="monospace">GLADYS &</text>
        <text x="340" y="88" textAnchor="middle" fill="#6B5D4F" fontSize="7" fontFamily="monospace">DAVID Z.</text>

        {/* Connection lines */}
        <line x1="200" y1="220" x2="150" y2="176" stroke="#D4A017" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="200" y1="220" x2="250" y2="176" stroke="#D4A017" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="100" y1="144" x2="74" y2="94" stroke="#8B6914" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="100" y1="144" x2="186" y2="54" stroke="#8B6914" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="300" y1="144" x2="326" y2="94" stroke="#8B6914" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    </div>
  )
}
