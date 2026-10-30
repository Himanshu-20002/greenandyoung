'use server'

import { db } from '@/lib/mongodb'
import { toObjectId } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function markInquiryRead(id: string, read: boolean) {
  try {
    const queryId = toObjectId(id)
    await db.collection('inquiries').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { read, updatedAt: new Date() } }
    )
    revalidatePath('/admin/marketing')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}

export async function deleteInquiry(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('inquiries').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/marketing')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
