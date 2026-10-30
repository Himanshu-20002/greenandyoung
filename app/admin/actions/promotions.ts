'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function getPromotions() {
  try {
    const promotions = await db
      .collection('promotions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return { success: true, promotions: normalizeDocs(promotions) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch promotions.' }
  }
}

export async function createPromotion(data: {
  name: string
  badgeLabel: string
  badgeText: string
  active?: boolean
}) {
  try {
    const doc = {
      name: data.name,
      badgeLabel: data.badgeLabel,
      badgeText: data.badgeText,
      active: data.active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const res = await db.collection('promotions').insertOne(doc)
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    revalidatePath('/admin/studio/promotions')
    return { success: true, promotion: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create promotion.' }
  }
}

export async function updatePromotion(
  id: string,
  data: {
    name?: string
    badgeLabel?: string
    badgeText?: string
    active?: boolean
  }
) {
  try {
    const queryId = toObjectId(id)
    await db.collection('promotions').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { ...data, updatedAt: new Date() } }
    )
    const promotion = await db.collection('promotions').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    revalidatePath('/admin/studio/promotions')
    return { success: true, promotion: normalizeDoc(promotion) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update promotion.' }
  }
}

export async function deletePromotion(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('promotions').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    revalidatePath('/admin/studio/promotions')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete promotion.' }
  }
}
