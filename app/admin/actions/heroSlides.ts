'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function getHeroSlides() {
  try {
    const slides = await db
      .collection('hero_slides')
      .find({})
      .sort({ sortOrder: 1 })
      .toArray()
    return { success: true, slides: normalizeDocs(slides) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch slides.' }
  }
}

export async function createHeroSlide(data: {
  bgImage: string
  frameImage: string
  categoryId: string
  packageId?: string | null
  promotionId?: string | null
  startDate?: Date | null
  endDate?: Date | null
  imageAlt?: string | null
  campaignName?: string | null
  status: 'DRAFT' | 'PUBLISHED'
  sortOrder?: number
}) {
  try {
    const doc = {
      bgImage: data.bgImage,
      frameImage: data.frameImage,
      categoryId: data.categoryId,
      packageId: data.packageId || null,
      promotionId: data.promotionId || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      imageAlt: data.imageAlt || null,
      campaignName: data.campaignName || null,
      status: data.status,
      sortOrder: data.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const res = await db.collection('hero_slides').insertOne(doc)
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    return { success: true, slide: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create hero slide.' }
  }
}

export async function updateHeroSlide(
  id: string,
  data: {
    bgImage?: string
    frameImage?: string
    categoryId?: string
    packageId?: string | null
    promotionId?: string | null
    startDate?: Date | null
    endDate?: Date | null
    imageAlt?: string | null
    campaignName?: string | null
    status?: 'DRAFT' | 'PUBLISHED'
    sortOrder?: number
  }
) {
  try {
    const queryId = toObjectId(id)
    const updatedData: any = { ...data, updatedAt: new Date() }
    if (data.packageId === '') updatedData.packageId = null
    if (data.promotionId === '') updatedData.promotionId = null
    if (data.startDate !== undefined) updatedData.startDate = data.startDate ? new Date(data.startDate) : null
    if (data.endDate !== undefined) updatedData.endDate = data.endDate ? new Date(data.endDate) : null

    await db.collection('hero_slides').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: updatedData }
    )

    const slide = await db.collection('hero_slides').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    return { success: true, slide: normalizeDoc(slide) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update hero slide.' }
  }
}

export async function deleteHeroSlide(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('hero_slides').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/')
    revalidatePath('/admin/studio/hero')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete hero slide.' }
  }
}

export async function trackHeroEvent(slideId: string, eventType: 'IMPRESSION' | 'CLICK') {
  try {
    const event = {
      heroSlideId: slideId,
      eventType,
      createdAt: new Date(),
    }
    const res = await db.collection('hero_analytics').insertOne(event)
    return { success: true, event: normalizeDoc({ ...event, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to track hero analytics event.' }
  }
}
