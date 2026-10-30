import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { bookingSchema } from '@/lib/schemas'
import { sendEmail, getBookingConfirmationTemplate, getAdminNotificationTemplate } from '@/lib/emails'
import { normalizeDoc, normalizeDocs, toObjectId } from '@/lib/db-helpers'

function generateReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `GY-${dateStr}-${result}`
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const result = bookingSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 })
    }

    const data = result.data
    const reference = generateReference()

    // Find package details
    const pkgQueryId = toObjectId(data.packageId)
    const experiencePkg = await db.collection('experience_packages').findOne({
      $or: [{ _id: pkgQueryId }, { id: data.packageId }],
    })

    const packageTitle = experiencePkg?.title || 'Bespoke Turnkey Consultation'

    const newBooking = {
      bookingReference: reference,
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      packageId: data.packageId,
      packageTitle,
      preferredDate: new Date(data.preferredDate),
      preferredTime: data.preferredTime,
      address: data.address || null,
      notes: data.notes || null,
      status: 'PENDING',
      statusHistory: [
        {
          status: 'PENDING',
          changedBy: 'SYSTEM',
          notes: 'Booking initially created.',
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection('bookings').insertOne(newBooking)

    // Email Automations
    try {
      const confirmationHtml = getBookingConfirmationTemplate(
        reference,
        data.customerName,
        packageTitle,
        new Date(data.preferredDate).toDateString(),
        data.preferredTime
      )
      const adminHtml = getAdminNotificationTemplate(
        reference,
        data.customerName,
        data.phone,
        data.email,
        packageTitle,
        new Date(data.preferredDate).toDateString(),
        data.preferredTime
      )

      await Promise.all([
        sendEmail({
          to: data.email,
          subject: 'Consultation Scheduled - Green & Young Interiors',
          html: confirmationHtml,
        }),
        sendEmail({
          to: process.env.ADMIN_EMAIL || 'info@greenandyoung.in',
          subject: `New Design Consultation [${reference}]`,
          html: adminHtml,
        }),
      ])
    } catch (emailErr) {
      console.error('Transactional emails failed to send:', emailErr)
    }

    return NextResponse.json({ success: true, bookingReference: reference })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 50

    const bookings = await db
      .collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return NextResponse.json(normalizeDocs(bookings))
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
