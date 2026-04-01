import { NextRequest, NextResponse } from 'next/server'
import { submitContact } from '@/app/actions/contact'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const result = await submitContact(formData)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error('[API/contact] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
