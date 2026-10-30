'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function addPortfolioItem(packageId: string, imageUrl: string, title: string) {
  try {
    if (!packageId) throw new Error('Package ID is required')
    if (!imageUrl) throw new Error('Image URL is required')

    const doc = {
      packageId,
      imageUrl,
      title: title || null,
      createdAt: new Date(),
    }

    const res = await db.collection('portfolio_items').insertOne(doc)

    revalidatePath('/')
    revalidatePath('/admin/catalog/packages')
    return { success: true, item: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to add lookbook image.' }
  }
}

export async function updatePortfolioItem(id: string, title: string) {
  try {
    if (!id) throw new Error('Portfolio Item ID is required')
    const queryId = toObjectId(id)

    await db.collection('portfolio_items').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { title: title || null, updatedAt: new Date() } }
    )

    const updated = await db.collection('portfolio_items').findOne({
      $or: [{ _id: queryId }, { id }],
    })

    revalidatePath('/')
    revalidatePath('/admin/catalog/packages')
    return { success: true, item: normalizeDoc(updated) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update lookbook image.' }
  }
}

export async function deletePortfolioItem(id: string) {
  try {
    if (!id) throw new Error('Portfolio Item ID is required')
    const queryId = toObjectId(id)

    await db.collection('portfolio_items').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })

    revalidatePath('/')
    revalidatePath('/admin/catalog/packages')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete lookbook image.' }
  }
}
