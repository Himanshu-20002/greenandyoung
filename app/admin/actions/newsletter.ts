'use server'

import { db } from '@/lib/mongodb'
import { toObjectId } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function toggleSubscriberActive(id: string, active: boolean) {
  try {
    const queryId = toObjectId(id)
    await db.collection('newsletter_subscribers').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { active, updatedAt: new Date() } }
    )
    revalidatePath('/admin/marketing')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}

export async function deleteSubscriber(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('newsletter_subscribers').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/marketing')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
