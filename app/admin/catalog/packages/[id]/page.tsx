import React from 'react'
import { db } from '@/lib/mongodb'
import { notFound } from 'next/navigation'
import { toObjectId, normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import PackageEditForm from '@/components/admin/package-edit-form'

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function EditPackagePage({ params }: PageProps) {
  const { id } = await params
  const queryId = toObjectId(id)

  const [rawPkg, rawCategories, rawServices] = await Promise.all([
    db.collection('experience_packages').findOne({ $or: [{ _id: queryId }, { id }] }),
    db.collection('categories').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('services').find({}).sort({ name: 1 }).toArray(),
  ])

  if (!rawPkg) {
    notFound()
  }

  const pkg = normalizeDoc(rawPkg)
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

  const initialData = {
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    description: pkg.description || '',
    heroImage: pkg.heroImage || '',
    durationMinutes: pkg.durationMinutes || 45,
    startingPrice: pkg.startingPrice || 0,
    badge: pkg.badge || '',
    genderType: pkg.genderType || 'UNISEX',
    categoryId: pkg.categoryId || '',
    serviceIds: pkg.serviceIds || [],
    faqs: pkg.faqs || [],
    portfolioImages: pkg.portfolioImages || [],
    active: pkg.active !== undefined ? pkg.active : true,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Edit Experience Package</h2>
        <p className="text-[10px] text-white/50 mt-1">Update specifications, deliverables, nested FAQs, and lookbook images for this package.</p>
      </div>

      <PackageEditForm
        categories={plainCategories}
        services={plainServices}
        initialData={initialData}
      />
    </div>
  )
}
