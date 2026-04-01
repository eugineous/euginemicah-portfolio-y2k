/**
 * Property-Based Tests: Contact form honeypot discard behavior
 *
 * Property 14: Honeypot silently discards bot submissions
 * Validates: Requirements 14.5, 16.4
 */

import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'

// Mock Supabase to avoid requiring real env vars at module load time.
// The honeypot check fires before any DB call, so this mock is never invoked
// for the honeypot property — it only prevents the module-load error.
vi.mock('@/lib/supabase', () => ({
  supabaseAnon: {},
  createServerSupabaseClient: vi.fn(() => ({
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: { message: 'should not reach DB' } }),
  })),
}))

import { submitContact } from '@/app/actions/contact'

describe('Property 14: Honeypot silently discards bot submissions', () => {
  it('returns success: true for any non-empty honeypot value without touching the DB', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Any non-empty string in the honeypot field
        fc.string({ minLength: 1, maxLength: 200 }),
        // Valid-looking form fields (should be irrelevant when honeypot is set)
        fc.constantFrom('Alice', 'Bob', 'Charlie'),
        fc.constantFrom('test@example.com', 'bot@spam.io'),
        fc.constantFrom('collaboration', 'booking', 'press', 'partnership', 'other'),
        fc.string({ minLength: 10, maxLength: 200 }),
        async (honeypotValue, name, email, purpose, message) => {
          const formData = new FormData()
          formData.set('website', honeypotValue) // honeypot field populated
          formData.set('name', name)
          formData.set('email', email)
          formData.set('purpose', purpose)
          formData.set('message', message)

          const result = await submitContact(formData)

          // Must silently return success — no error exposed to bot
          expect(result.success).toBe(true)
          expect(result.error).toBeUndefined()
        }
      )
    )
  })

  it('does not return success: true when honeypot is empty and form is invalid', async () => {
    const formData = new FormData()
    formData.set('website', '') // honeypot empty — real user
    formData.set('name', '')    // invalid: missing name
    formData.set('email', '')
    formData.set('purpose', 'other')
    formData.set('message', '')

    const result = await submitContact(formData)

    // Should fail validation, not silently succeed
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
