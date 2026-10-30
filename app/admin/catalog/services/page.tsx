import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import ServicesCatalogClient from '@/components/admin/services-catalog-client'

export const dynamic = 'force-dynamic'

export default async function ServicesCatalogPage() {
  const [rawCategories, rawServices] = await Promise.all([
    db.collection('categories').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('services').find({}).sort({ createdAt: -1 }).toArray(),
  ])

  const categories = normalizeDocs(rawCategories)

  const formattedServices = rawServices.map(srv => {
    const norm = normalizeDoc(srv)
    const cat = categories.find(c => c.id === norm.categoryId) || null
    return {
      id: norm.id,
      name: norm.name,
      categoryId: norm.categoryId,
      category: {
        name: cat ? cat.name : 'General',
        gender: cat ? (cat as any).gender || 'UNISEX' : 'UNISEX',
      },
    }
  })

  const formattedCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    gender: (cat as any).gender || 'UNISEX',
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Catalog Services</h2>
          <p className="text-[10px] text-white/50 mt-1">Manage architectural joinery, civil, &amp; MEP deliverables and link them into turnkey packages.</p>
        </div>
      </div>

      <ServicesCatalogClient
        initialServices={formattedServices}
        categories={formattedCategories}
      />
    </div>
  )
}
