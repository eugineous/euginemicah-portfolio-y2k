import { NextRequest, NextResponse } from 'next/server'

interface RateWindow {
  count: number
  resetAt: number
}

// In-memory store — suitable for single-instance Vercel deployments
const ipWindows = new Map<string, RateWindow>()

function rateLimit(key: string, limit: number): boolean {
  const now = Date.now()
  const window = ipWindows.get(key)

  if (!window || now > window.resetAt) {
    ipWindows.set(key, { count: 1, resetAt: now + 60_000 })
    return true // allowed
  }

  if (window.count >= limit) return false // blocked

  window.count++
  return true
}

// Clean up expired windows periodically (prevent memory leak)
function cleanupExpired() {
  const now = Date.now()
  for (const [key, window] of ipWindows.entries()) {
    if (now > window.resetAt) ipWindows.delete(key)
  }
}

let lastCleanup = Date.now()

export function middleware(req: NextRequest) {
  // Periodic cleanup
  if (Date.now() - lastCleanup > 60_000) {
    cleanupExpired()
    lastCleanup = Date.now()
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const isContactRoute =
    req.nextUrl.pathname === '/api/contact' ||
    (req.nextUrl.pathname === '/contact' && req.method === 'POST')

  // Contact form: max 3 submissions/min per IP
  if (isContactRoute && !rateLimit(`contact:${ip}`, 3)) {
    return NextResponse.json(
      { error: 'Too many signals. Please wait before transmitting again.' },
      { status: 429 }
    )
  }

  // General: max 100 requests/min per IP
  if (!rateLimit(`general:${ip}`, 100)) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      { status: 429 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
}
