import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { newsletterSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const result = newsletterSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 })
    }

    const { email } = result.data

    await db.collection('newsletter_subscribers').updateOne(
      { email },
      {
        $set: { email, active: true, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true, email })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
