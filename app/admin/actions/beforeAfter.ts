'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function getBeforeAfterImages() {
  try {
    const images = await db
      .collection('before_after_images')
      .find({})
      .sort({ sortOrder: 1 })
      .toArray()
    return { success: true, images: normalizeDocs(images) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch before/after images.' }
  }
}

export async function createBeforeAfterImage(data: {
  beforeImage: string
  afterImage: string
  title?: string | null
  description?: string | null
  active?: boolean
  sortOrder?: number
}) {
  try {
    const doc = {
      beforeImage: data.beforeImage,
      afterImage: data.afterImage,
      title: data.title || null,
      description: data.description || null,
      active: data.active ?? true,
      sortOrder: data.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const res = await db.collection('before_after_images').insertOne(doc)
    revalidatePath('/')
    revalidatePath('/admin/studio/before-after')
    return { success: true, image: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create before/after image.' }
  }
}

export async function updateBeforeAfterImage(
  id: string,
  data: {
    beforeImage?: string
    afterImage?: string
    title?: string | null
    description?: string | null
    active?: boolean
    sortOrder?: number
  }
) {
  try {
    const queryId = toObjectId(id)
    await db.collection('before_after_images').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { ...data, updatedAt: new Date() } }
    )
    const updated = await db.collection('before_after_images').findOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/before-after')
    return { success: true, image: normalizeDoc(updated) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update before/after image.' }
  }
}

export async function deleteBeforeAfterImage(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('before_after_images').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/before-after')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete before/after image.' }
  }
}
