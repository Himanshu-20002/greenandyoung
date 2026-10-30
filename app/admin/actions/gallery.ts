'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function getGalleryImages() {
  try {
    const images = await db
      .collection('gallery_images')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return { success: true, data: normalizeDocs(images) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch gallery images.' }
  }
}

export async function createGalleryImage(data: { imageUrl: string; caption?: string; category: string; active?: boolean }) {
  try {
    const doc = {
      imageUrl: data.imageUrl,
      caption: data.caption || '',
      category: data.category,
      active: data.active !== undefined ? data.active : true,
      createdAt: new Date(),
    }
    const res = await db.collection('gallery_images').insertOne(doc)
    revalidatePath('/')
    revalidatePath('/admin/studio/gallery')
    return { success: true, data: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create gallery image.' }
  }
}

export async function updateGalleryImage(
  id: string,
  data: { imageUrl?: string; caption?: string; category?: string; active?: boolean }
) {
  try {
    const queryId = toObjectId(id)
    await db.collection('gallery_images').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { ...data, updatedAt: new Date() } }
    )
    const updated = await db.collection('gallery_images').findOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/gallery')
    return { success: true, data: normalizeDoc(updated) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update gallery image.' }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('gallery_images').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/gallery')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete gallery image.' }
  }
}
