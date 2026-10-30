'use server'

import { db } from '@/lib/mongodb'
import { revalidatePath } from 'next/cache'

export async function updateSiteSettings(settings: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await db.collection('settings').updateOne(
        { key },
        { $set: { key, value, updatedAt: new Date() } },
        { upsert: true }
      )
    }
    revalidatePath('/admin/studio/settings')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Operation failed.' }
  }
}
