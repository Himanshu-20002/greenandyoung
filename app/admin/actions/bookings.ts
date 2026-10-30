'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { sendEmail } from '@/lib/emails'
import { revalidatePath } from 'next/cache'

export async function updateBookingStatusAction(id: string, status: string, notes?: string, changedBy: string = 'ADMIN') {
  try {
    const queryId = toObjectId(id)
    const historyItem = {
      status,
      changedBy,
      notes: notes || `Status updated to ${status} via Server Action.`,
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

    revalidatePath('/admin/bookings')
    revalidatePath('/admin')
    return { success: true, booking: normalizeDoc(updatedBooking) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Status update failed.' }
  }
}

export async function deleteBookingAction(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('bookings').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/bookings')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
