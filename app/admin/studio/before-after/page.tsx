import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import BeforeAfterManager from '@/components/admin/before-after-manager'

export const dynamic = 'force-dynamic'

export default async function AdminBeforeAfterPage() {
  const images = await db
    .collection('before_after_images')
    .find({})
    .sort({ sortOrder: 1 })
    .toArray()

  const formattedImages = images.map(img => {
    const norm = normalizeDoc(img)
    return {
      id: norm.id,
      beforeImage: norm.beforeImage,
      afterImage: norm.afterImage,
      title: norm.title || null,
      description: norm.description || null,
      active: norm.active !== undefined ? norm.active : true,
      sortOrder: norm.sortOrder || 0,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-foreground tracking-widest uppercase">
          Experience Studio &bull; Before/After Slider Manager
        </h2>
        <p className="text-[10px] text-muted-foreground mt-1">
          Upload and configure before/after image pairs to showcase bare-shell to luxury interior transformations.
        </p>
      </div>

      <BeforeAfterManager images={formattedImages} />
    </div>
  )
}
