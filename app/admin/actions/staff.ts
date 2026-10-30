'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function createStaffMember(data: { name: string; role: string; imageUrl?: string; rating?: number }) {
  try {
    const doc = {
      name: data.name,
      role: data.role,
      imageUrl: data.imageUrl || null,
      rating: data.rating || 5.0,
      active: true,
      createdAt: new Date(),
    }
    const res = await db.collection('staff').insertOne(doc)
    revalidatePath('/admin/people')
    return { success: true, staff: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}

export async function updateStaffMember(id: string, data: { name: string; role: string; imageUrl?: string; rating?: number }) {
  try {
    const queryId = toObjectId(id)
    await db.collection('staff').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      {
        $set: {
          name: data.name,
          role: data.role,
          imageUrl: data.imageUrl || null,
          rating: data.rating || 5.0,
          updatedAt: new Date(),
        },
      }
    )
    const staff = await db.collection('staff').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/people')
    return { success: true, staff: normalizeDoc(staff) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}

export async function toggleStaffActive(id: string, active: boolean) {
  try {
    const queryId = toObjectId(id)
    await db.collection('staff').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { active, updatedAt: new Date() } }
    )
    const staff = await db.collection('staff').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/people')
    return { success: true, staff: normalizeDoc(staff) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}

export async function deleteStaffMember(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('staff').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/people')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
