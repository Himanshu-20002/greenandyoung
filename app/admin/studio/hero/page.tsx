import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc, normalizeDocs } from '@/lib/db-helpers'
import HeroSliderManager from '@/components/admin/hero-slider-manager'

export const dynamic = 'force-dynamic'

export default async function AdminHeroSlidesPage() {
  const [rawCategories, rawPackages, rawPromotions, rawSlides] = await Promise.all([
    db.collection('categories').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('experience_packages').find({}).sort({ sortOrder: 1 }).toArray(),
    db.collection('promotions').find({}).sort({ name: 1 }).toArray(),
    db.collection('hero_slides').find({}).sort({ sortOrder: 1 }).toArray(),
  ])

  const categories = normalizeDocs(rawCategories)
  const packages = normalizeDocs(rawPackages)
  const promotions = normalizeDocs(rawPromotions)

  const formattedSlides = rawSlides.map(s => {
    const norm = normalizeDoc(s)
    const cat = categories.find(c => c.id === norm.categoryId) || null
    const pkg = packages.find(p => p.id === norm.packageId) || null
    const promo = promotions.find(p => p.id === norm.promotionId) || null

    return {
      id: norm.id,
      bgImage: norm.bgImage,
      frameImage: norm.frameImage || '',
      categoryId: norm.categoryId,
      packageId: norm.packageId,
      promotionId: norm.promotionId,
      startDate: norm.startDate ? new Date(norm.startDate).toISOString() : null,
      endDate: norm.endDate ? new Date(norm.endDate).toISOString() : null,
      imageAlt: norm.imageAlt || '',
      campaignName: norm.campaignName || '',
      status: norm.status || 'DRAFT',
      sortOrder: norm.sortOrder || 0,
      category: cat ? { name: cat.name, gender: (cat as any).gender || 'UNISEX' } : null,
      package: pkg ? { title: pkg.title } : null,
      promotion: promo ? { id: promo.id, name: promo.name, badgeLabel: promo.badgeLabel, badgeText: promo.badgeText, active: promo.active } : null,
      analytics: (norm.analytics || []).map((a: any) => ({
        eventType: a.eventType,
        createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString(),
      })),
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-foreground tracking-widest uppercase">Experience Studio &bull; Hero Slider</h2>
        <p className="text-[10px] text-muted-foreground mt-1">Configure and analyze high-end interactive slides for the website landing hero section.</p>
      </div>

      <HeroSliderManager
        slides={formattedSlides as any}
        categories={categories}
        packages={packages}
        promotions={promotions}
      />
    </div>
  )
}
