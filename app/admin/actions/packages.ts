'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { packageSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export async function createExperiencePackage(formData: any) {
  try {
    const validated = packageSchema.parse(formData)
    const doc = {
      title: validated.title,
      slug: validated.slug,
      description: validated.description,
      heroImage: validated.heroImage,
      durationMinutes: validated.durationMinutes,
      startingPrice: validated.startingPrice,
      badge: validated.badge || null,
      genderType: (validated as any).genderType || 'UNISEX',
      categoryId: validated.categoryId,
      serviceIds: validated.serviceIds || [],
      faqs: validated.faqs || [],
      portfolioImages: validated.portfolioImages || [],
      active: validated.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const res = await db.collection('experience_packages').insertOne(doc)
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/packages')
    revalidatePath('/')
    return { success: true, package: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create experience package.' }
  }
}

export async function updateExperiencePackage(id: string, formData: any) {
  try {
    const validated = packageSchema.parse(formData)
    const queryId = toObjectId(id)
    const updateData = {
      title: validated.title,
      slug: validated.slug,
      description: validated.description,
      heroImage: validated.heroImage,
      durationMinutes: validated.durationMinutes,
      startingPrice: validated.startingPrice,
      badge: validated.badge || null,
      genderType: (validated as any).genderType || 'UNISEX',
      categoryId: validated.categoryId,
      serviceIds: validated.serviceIds || [],
      faqs: validated.faqs || [],
      portfolioImages: validated.portfolioImages || [],
      active: validated.active,
      updatedAt: new Date(),
    }
    await db.collection('experience_packages').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: updateData }
    )
    const pkg = await db.collection('experience_packages').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/packages')
    revalidatePath('/')
    return { success: true, package: normalizeDoc(pkg) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update experience package.' }
  }
}

export async function togglePackageActive(id: string, active: boolean) {
  try {
    const queryId = toObjectId(id)
    await db.collection('experience_packages').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { active, updatedAt: new Date() } }
    )
    const pkg = await db.collection('experience_packages').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/catalog')
    revalidatePath('/')
    return { success: true, package: normalizeDoc(pkg) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Toggle status failed.' }
  }
}

export async function deleteExperiencePackage(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('experience_packages').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/packages')
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
