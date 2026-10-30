import { db } from './mongodb'
import { normalizeDocs } from './db-helpers'

export async function getHomepageSlides() {
  try {
    const now = new Date()
    const slides = await db
      .collection('hero_slides')
      .find({
        status: 'PUBLISHED',
        $and: [
          { $or: [{ startDate: { $exists: false } }, { startDate: null }, { startDate: { $lte: now } }] },
          { $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }] },
        ],
      })
      .sort({ sortOrder: 1 })
      .toArray()

    return normalizeDocs(slides)
  } catch (err) {
    console.warn('[MongoDB] Query failed for hero_slides, using fallback:', err)
    return []
  }
}

export async function getHomepageGalleryImages() {
  try {
    const images = await db
      .collection('gallery_images')
      .find({ active: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .toArray()

    return normalizeDocs(images)
  } catch (err) {
    console.warn('[MongoDB] Query failed for gallery_images, using fallback:', err)
    return []
  }
}

export async function getHomepageBeforeAfterImages() {
  try {
    const images = await db
      .collection('before_after_images')
      .find({ active: true })
      .sort({ sortOrder: 1 })
      .toArray()

    return normalizeDocs(images)
  } catch (err) {
    console.warn('[MongoDB] Query failed for before_after_images, using fallback:', err)
    return []
  }
}
