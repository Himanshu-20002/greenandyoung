'use server'

import { db } from '@/lib/mongodb'
import { toObjectId, normalizeDoc } from '@/lib/db-helpers'
import { categorySchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export async function createCategory(formData: any) {
  try {
    const validated = categorySchema.parse(formData)
    const doc = {
      name: validated.name,
      slug: validated.slug,
      gender: (validated as any).gender || 'UNISEX',
      iconName: validated.iconName || 'Home',
      gradient: validated.gradient || 'from-amber-500/10 to-orange-500/10',
      rating: validated.rating || '5.0',
      sortOrder: validated.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const res = await db.collection('categories').insertOne(doc)
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/categories')
    revalidatePath('/')
    return { success: true, category: normalizeDoc({ ...doc, _id: res.insertedId }) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Validation or database operation failed.' }
  }
}

export async function updateCategory(id: string, formData: any) {
  try {
    const validated = categorySchema.parse(formData)
    const queryId = toObjectId(id)
    const updateData = {
      name: validated.name,
      slug: validated.slug,
      gender: (validated as any).gender || 'UNISEX',
      iconName: validated.iconName || 'Home',
      gradient: validated.gradient || 'from-amber-500/10 to-orange-500/10',
      rating: validated.rating || '5.0',
      sortOrder: validated.sortOrder || 0,
      updatedAt: new Date(),
    }
    await db.collection('categories').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: updateData }
    )
    const category = await db.collection('categories').findOne({ $or: [{ _id: queryId }, { id }] })
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/categories')
    revalidatePath('/')
    return { success: true, category: normalizeDoc(category) }
  } catch (error: any) {
    return { success: false, error: error.message || 'Update failed.' }
  }
}

export async function deleteCategory(id: string) {
  try {
    const queryId = toObjectId(id)
    await db.collection('categories').deleteOne({
      $or: [{ _id: queryId }, { id }],
    })
    revalidatePath('/admin/catalog')
    revalidatePath('/admin/catalog/categories')
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Deletion failed.' }
  }
}
