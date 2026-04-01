import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import DOMPurify from 'isomorphic-dompurify'

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Touch device detection (Property 3)
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

// Sanitize HTML input — strips all tags (Property 11)
export function sanitizeField(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}

// Contact form validation (Properties 9, 10)
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  purpose: 'collaboration' | 'booking' | 'press' | 'partnership' | 'other'
  message: string
  created_at?: string
}

export function validateContactForm(
  data: Partial<ContactSubmission>,
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name?.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or less'
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message?.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or less'
  }

  return errors
}

// Email body formatter (Property 13)
export function formatEmailBody(submission: ContactSubmission): string {
  return [
    `NAME: ${submission.name}`,
    `EMAIL: ${submission.email}`,
    `PURPOSE: ${submission.purpose}`,
    `MESSAGE:\n${submission.message}`,
    `SUBMITTED: ${submission.created_at ?? new Date().toISOString()}`,
  ].join('\n---\n')
}

// Email body parser (Property 13 — round-trip)
export function parseEmailBody(body: string): Partial<ContactSubmission> {
  const lines = body.split('\n---\n')
  const get = (prefix: string) =>
    lines
      .find((l) => l.startsWith(prefix))
      ?.slice(prefix.length)
      .trim() ?? ''
  return {
    name: get('NAME: '),
    email: get('EMAIL: '),
    purpose: get('PURPOSE: ') as ContactSubmission['purpose'],
    message: get('MESSAGE:\n'),
  }
}

// Countdown timer pure function (Property 7)
export interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function getCountdown(target: Date, now: Date): CountdownState {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

// Gallery filter pure function (Property 6)
export type FilterCategory = 'all' | 'tv' | 'podcast' | 'digital' | 'events'

export interface GalleryItem {
  id: string
  category: Exclude<FilterCategory, 'all'>
  title: string
  description: string
  thumbnail?: string
  link?: string
  year?: number
}

export function filterItems(
  items: GalleryItem[],
  category: FilterCategory,
): GalleryItem[] {
  if (category === 'all') return items
  return items.filter((item) => item.category === category)
}

// Magnetic button offset computation (Property 2)
export function computeMagneticOffset(
  dx: number,
  dy: number,
  radius: number,
  strength: number,
): { ox: number; oy: number } {
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist > radius) return { ox: 0, oy: 0 }
  return { ox: dx * strength, oy: dy * strength }
}

// Format large numbers for display
export function formatStat(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M+`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K+`
  return value.toString()
}

// Nairobi time (UTC+3) — Property 8
export function getNairobiTime(utcDate: Date): Date {
  return new Date(utcDate.getTime() + 3 * 60 * 60 * 1000)
}

export function formatNairobiTime(utcDate: Date): string {
  const nairobi = getNairobiTime(utcDate)
  return nairobi.toUTCString().slice(17, 25) // HH:MM:SS
}
