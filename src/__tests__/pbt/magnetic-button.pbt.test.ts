/**
 * Property-Based Tests: MagneticButton offset bounds
 *
 * Property 2: MagneticButton offset is bounded by strength factor
 * Validates: Requirements 2.5
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { computeMagneticOffset } from '@/lib/utils'

describe('Property 2: MagneticButton offset is bounded by strength factor', () => {
  it('returns zero offset when cursor is outside the radius', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 500, noNaN: true }),
        fc.double({ min: 0, max: 360, noNaN: true }),
        fc.double({ min: 10, max: 200, noNaN: true }),
        fc.double({ min: 0.01, max: 1, noNaN: true }),
        (dist, angleDeg, radius, strength) => {
          // Place cursor just outside the radius
          const angle = (angleDeg * Math.PI) / 180
          const dx = (radius + dist) * Math.cos(angle)
          const dy = (radius + dist) * Math.sin(angle)

          const { ox, oy } = computeMagneticOffset(dx, dy, radius, strength)
          expect(ox).toBe(0)
          expect(oy).toBe(0)
        }
      )
    )
  })

  it('returns non-zero offset when cursor is inside the radius (non-zero displacement)', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 79, noNaN: true }),
        fc.double({ min: 0, max: 360, noNaN: true }),
        fc.double({ min: 80, max: 200, noNaN: true }),
        fc.double({ min: 0.1, max: 1, noNaN: true }),
        (dist, angleDeg, radius, strength) => {
          const angle = (angleDeg * Math.PI) / 180
          const dx = dist * Math.cos(angle)
          const dy = dist * Math.sin(angle)

          const { ox, oy } = computeMagneticOffset(dx, dy, radius, strength)
          // At least one offset should be non-zero when cursor is inside radius
          expect(Math.abs(ox) + Math.abs(oy)).toBeGreaterThan(0)
        }
      )
    )
  })

  it('offset equals dx * strength and dy * strength when inside radius', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -79, max: 79, noNaN: true }),
        fc.double({ min: -79, max: 79, noNaN: true }),
        fc.double({ min: 80, max: 200, noNaN: true }),
        fc.double({ min: 0.01, max: 1, noNaN: true }),
        (dx, dy, radius, strength) => {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= radius) return // skip outside-radius cases

          const { ox, oy } = computeMagneticOffset(dx, dy, radius, strength)

          // Offset must equal dx * strength and dy * strength when inside radius
          expect(ox).toBeCloseTo(dx * strength, 5)
          expect(oy).toBeCloseTo(dy * strength, 5)
        }
      )
    )
  })

  it('offset is exactly zero when dx and dy are both zero', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 200, noNaN: true }),
        fc.double({ min: 0.01, max: 1, noNaN: true }),
        (radius, strength) => {
          const { ox, oy } = computeMagneticOffset(0, 0, radius, strength)
          expect(ox).toBe(0)
          expect(oy).toBe(0)
        }
      )
    )
  })
})
