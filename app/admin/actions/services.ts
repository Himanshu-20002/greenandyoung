'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { serviceSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export async function createService(formData: any) {
  try {
    const validated = serviceSchema.parse(formData)
    const doc = {
      name: validated.name,
      categoryId: validated.categoryId,
      createdAt: new Date(),
    }
    const res = await db.collection('services').insertOne(doc)
    revalidatePath('/admin/catalog')
    revalidatePath('/')
    return { success: true, service: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Validation or database operation failed.' }
  }
}

export async function updateService(id: string, formData: any) {
  try {
    const validated = serviceSchema.parse(formData)
    const queryId = toObjectId(id)
    await db.collection('services').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { name: validated.name, categoryId: validated.categoryId, updatedAt: new Date() } }
    )
    const service = await db.collection('services').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/catalog')
    revalidatePath('/')
    return { success: true, service: normalizeDoc(service) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Update failed.' }
  }
}

export async function deleteService(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('services').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/catalog')
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
