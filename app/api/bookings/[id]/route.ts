import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { sendEmail } from '@/lib/emails'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const json = await request.json()
    const { status, notes, changedBy } = json

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const queryId = toObjectId(id)
    const historyItem = {
      status,
      changedBy: changedBy || 'ADMIN',
      notes: notes || '',
      createdAt: new Date(),
    }

    await db.collection('bookings').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      {
        $set: { status, updatedAt: new Date() },
        $push: { statusHistory: historyItem as any },
      }
    )

    const updatedBooking = await db.collection('bookings').findOne({
      $or: [{ _id: queryId }, { id }],
    })

    if (updatedBooking) {
      if (status === 'CONFIRMED' && updatedBooking.email) {
        await sendEmail({
          to: updatedBooking.email,
          subject: `Your Consultation is Confirmed! [${updatedBooking.bookingReference}]`,
          html: `<p>Dear ${updatedBooking.customerName}, your design consultation has been confirmed by our specialists for ${new Date(updatedBooking.preferredDate).toDateString()} at ${updatedBooking.preferredTime}. We look forward to welcoming you!</p>`,
        }).catch(err => console.error('Email failed:', err))
      } else if (status === 'COMPLETED' && updatedBooking.email) {
        await sendEmail({
          to: updatedBooking.email,
          subject: `How was your Green & Young Interiors experience?`,
          html: `<p>Dear ${updatedBooking.customerName}, we hope you loved your ${updatedBooking.packageTitle || 'turnkey interior'} experience. Please share your feedback on our site!</p>`,
        }).catch(err => console.error('Email failed:', err))
      }
    }

    return NextResponse.json(normalizeDoc(updatedBooking))
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
