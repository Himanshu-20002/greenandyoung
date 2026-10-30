'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function updateAppointmentStatusAction(id: string, status: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('appointments').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { status, updatedAt: new Date() } }
    )

    const updated = await db.collection('appointments').findOne({
      $or: [{ _id: queryId }, { id }],
    })

    revalidatePath('/admin/appointments')
    revalidatePath('/admin')
    return { success: true, appointment: normalizeDoc(updated) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Status update failed.' }
  }
}

export async function deleteAppointmentAction(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('appointments').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })

    revalidatePath('/admin/appointments')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
