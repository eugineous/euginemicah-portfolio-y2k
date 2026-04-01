'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validateContactForm } from '@/lib/utils'
import { submitContact } from '@/app/actions/contact'
import type { ContactSubmission } from '@/lib/utils'

const PURPOSES: { value: ContactSubmission['purpose']; label: string }[] = [
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'booking', label: 'Booking / Appearance' },
  { value: 'press', label: 'Media Inquiry' },
  { value: 'partnership', label: 'Business Partnership' },
  { value: 'other', label: 'Just Had To Say Something' },
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      purpose: (form.elements.namedItem('purpose') as HTMLSelectElement).value as ContactSubmission['purpose'],
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    // Client-side validation
    const validationErrors = validateContactForm(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('submitting')

    const formData = new FormData(form)
    const result = await submitContact(formData)

    if (result.success) {
      setStatus('success')
      formRef.current?.reset()
    } else {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-gold/50 transition-colors"
  const labelClass = "block font-mono text-xs text-text-tertiary tracking-widest uppercase mb-2"

  return (
    <div className="relative">
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-2xl"
            style={{ background: 'rgba(2,0,5,0.95)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📡</div>
              <p className="font-mono text-gold text-lg tracking-widest font-bold mb-2">SIGNAL RECEIVED</p>
              <p className="font-body text-text-secondary">Your message has been transmitted.</p>
              <p className="font-body text-text-secondary">Eugine will respond soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 font-mono text-xs text-text-tertiary hover:text-gold transition-colors tracking-wider"
              >
                SEND ANOTHER SIGNAL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot — hidden from users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: 'none' }}
        />

        <div>
          <label htmlFor="name" className={labelClass}>WHO ARE YOU?</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className={inputClass}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="font-mono text-xs text-signal-red mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>WHERE CAN WE REACH YOU?</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            className={inputClass}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="font-mono text-xs text-signal-red mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="purpose" className={labelClass}>WHAT'S THE SIGNAL FOR?</label>
          <select
            id="purpose"
            name="purpose"
            className={inputClass}
            style={{ appearance: 'none' }}
          >
            {PURPOSES.map(p => (
              <option key={p.value} value={p.value} style={{ background: '#020005' }}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>WHAT'S YOUR SIGNAL?</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your message..."
            className={inputClass}
            style={{ resize: 'vertical' }}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <p id="message-error" className="font-mono text-xs text-signal-red mt-1">{errors.message}</p>}
        </div>

        {status === 'error' && (
          <p className="font-mono text-xs text-signal-red">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-lg font-mono text-sm tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-50"
          style={{
            background: status === 'submitting' ? 'rgba(192,57,43,0.5)' : 'var(--color-signal-red)',
            color: 'white',
            animation: status !== 'submitting' ? 'pulse-ring 2s ease-out infinite' : 'none',
            boxShadow: '0 0 20px rgba(192,57,43,0.3)',
          }}
        >
          {status === 'submitting' ? 'TRANSMITTING...' : '📡 TRANSMIT'}
        </button>
      </form>
    </div>
  )
}
