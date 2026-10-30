import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import GalleryManager from '@/components/admin/gallery-manager'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  const images = await db
    .collection('gallery_images')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const formattedImages = images.map(img => {
    const norm = normalizeDoc(img)
    return {
      id: norm.id,
      imageUrl: norm.imageUrl,
      caption: norm.caption || '',
      category: norm.category || 'Living & Lounges',
      active: norm.active !== undefined ? norm.active : true,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-foreground tracking-widest uppercase">
          Experience Studio &bull; Gallery Manager
        </h2>
        <p className="text-[10px] text-muted-foreground mt-1">
          Upload luxury residential captures, write descriptions, select space categories, and control public portfolio visibility.
        </p>
      </div>

      <GalleryManager images={formattedImages} />
    </div>
  )
}
