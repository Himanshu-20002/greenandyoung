import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { contactSchema } from '@/lib/schemas'
import { sendEmail, getContactInquiryTemplate } from '@/lib/emails'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const result = contactSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 })
    }

    const data = result.data
    const newDoc = {
      name: data.name,
      email: data.email,
      subject: data.subject || '',
      message: data.message,
      read: false,
      createdAt: new Date(),
    }

    const res = await db.collection('inquiries').insertOne(newDoc)

    // Email notification
    try {
      const emailHtml = getContactInquiryTemplate(
        data.name,
        data.email,
        data.subject || '',
        data.message
      )
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'info@greenandyoung.in',
        subject: `New Contact Inquiry: ${data.subject || 'General Info'}`,
        html: emailHtml,
      })
    } catch (emailErr) {
      console.error('Contact notification email failed:', emailErr)
    }

    return NextResponse.json({ success: true, inquiryId: res.insertedId.toString() })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
