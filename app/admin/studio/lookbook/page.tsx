import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import LookbookManager from '@/components/admin/lookbook-manager'

export const dynamic = 'force-dynamic'

export default async function AdminLookbookPage() {
  const packages = await db
    .collection('experience_packages')
    .find({})
    .sort({ sortOrder: 1 })
    .toArray()

  const formattedPackages = packages.map(pkg => {
    const norm = normalizeDoc(pkg)
    const items = (pkg.portfolioItems || pkg.portfolioImages || []).map((item: any, idx: number) => {
      if (typeof item === 'string') {
        return { id: `item-${idx}`, imageUrl: item, title: '' }
      }
      return normalizeDoc(item)
    })
    return {
      id: norm.id,
      title: norm.title,
      portfolioItems: items,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Experience Studio &bull; Lookbook Manager</h2>
        <p className="text-[10px] text-white/50 mt-1">Manage lookbook image slides, titles, and attachments for packages in a single dedicated space.</p>
      </div>

      <LookbookManager initialPackages={formattedPackages} />
    </div>
  )
}
