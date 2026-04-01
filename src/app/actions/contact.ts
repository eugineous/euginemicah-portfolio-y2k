'use server'

import { validateContactForm, sanitizeField, formatEmailBody, type ContactSubmission } from '@/lib/utils'
import { createServerSupabaseClient } from '@/lib/supabase'

export interface ContactActionResult {
  success: boolean
  error?: string
}

export async function submitContact(formData: FormData): Promise<ContactActionResult> {
  // 1. Check honeypot — silent discard if populated (Property 14)
  const honeypot = formData.get('website') as string
  if (honeypot) {
    // Bot detected — return fake success without writing to DB
    return { success: true }
  }

  // 2. Extract raw fields
  const raw = {
    name: formData.get('name') as string ?? '',
    email: formData.get('email') as string ?? '',
    purpose: formData.get('purpose') as ContactSubmission['purpose'] ?? 'other',
    message: formData.get('message') as string ?? '',
  }

  // 3. Server-side validation (re-validate even if client validated)
  const errors = validateContactForm(raw)
  if (Object.keys(errors).length > 0) {
    return { success: false, error: Object.values(errors)[0] }
  }

  // 4. Sanitize all string fields (Property 11)
  const sanitized: Omit<ContactSubmission, 'id' | 'created_at'> = {
    name: sanitizeField(raw.name.trim()),
    email: sanitizeField(raw.email.trim().toLowerCase()),
    purpose: raw.purpose,
    message: sanitizeField(raw.message.trim()),
  }

  try {
    // 5. Insert into Supabase (use type assertion to bypass strict generic inference)
    const supabase = createServerSupabaseClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: dbError } = await (supabase as any)
      .from('contact_submissions')
      .insert({
        name: sanitized.name,
        email: sanitized.email,
        purpose: sanitized.purpose,
        message: sanitized.message,
      })
      .select()
      .single()

    if (dbError) {
      console.error('[Contact] Supabase insert error:', dbError)
      return { success: false, error: 'Failed to save your message. Please try again.' }
    }

    // 6. Send email notification via Resend
    const submission: ContactSubmission = {
      ...sanitized,
      id: (data as { id: string; created_at: string }).id,
      created_at: (data as { id: string; created_at: string }).created_at,
    }

    await sendEmailNotification(submission)

    return { success: true }
  } catch (err) {
    console.error('[Contact] Unexpected error:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

async function sendEmailNotification(submission: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const contactEmail = process.env.CONTACT_EMAIL ?? 'euginemicah@gmail.com'

  if (!apiKey) {
    console.warn('[Contact] RESEND_API_KEY not set — skipping email notification')
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const emailBody = formatEmailBody(submission)

    await resend.emails.send({
      from: 'The Roylandz Universe <noreply@euginemicah.com>',
      to: contactEmail,
      subject: `New Signal: ${submission.purpose.toUpperCase()} from ${submission.name}`,
      text: emailBody,
      html: `
        <div style="font-family: monospace; background: #020005; color: #F8F4E8; padding: 24px; border-radius: 8px; border: 1px solid #D4A017;">
          <h2 style="color: #D4A017; margin: 0 0 16px;">📡 NEW SIGNAL RECEIVED</h2>
          <pre style="white-space: pre-wrap; color: #F8F4E8; font-size: 14px;">${emailBody}</pre>
          <hr style="border-color: #D4A017; margin: 16px 0;" />
          <p style="color: #8B6914; font-size: 12px; margin: 0;">The Roylandz Universe — euginemicah.com</p>
        </div>
      `,
    })
  } catch (err) {
    // Email failure is non-critical — submission is already saved to Supabase
    console.error('[Contact] Resend email error:', err)
  }
}
