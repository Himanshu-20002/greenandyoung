import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDocs } from '@/lib/db-helpers'
import PackageCreateForm from '@/components/admin/package-create-form'

export const dynamic = 'force-dynamic'

export default async function CreatePackagePage() {
  const [rawCategories, rawServices] = await Promise.all([
    db.collection('categories').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('services').find({}).sort({ name: 1 }).toArray(),
  ])

  const plainCategories = normalizeDocs(rawCategories).map(cat => ({
    id: cat.id,
    name: cat.name,
    gender: (cat as any).gender || 'UNISEX',
    slug: cat.slug,
  }))

  const plainServices = normalizeDocs(rawServices).map(srv => ({
    id: srv.id,
    name: srv.name,
    categoryId: srv.categoryId,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Create Experience Package</h2>
        <p className="text-[10px] text-white/50 mt-1">Assemble a bespoke turnkey architectural interior package bundle.</p>
      </div>

      <PackageCreateForm
        categories={plainCategories}
        services={plainServices}
      />
    </div>
  )
}
