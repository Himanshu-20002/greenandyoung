import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDocs } from '@/lib/db-helpers'
import PromotionsManager from '@/components/admin/promotions-manager'

export const dynamic = 'force-dynamic'

export default async function AdminPromotionsPage() {
  const promotions = await db
    .collection('promotions')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-foreground tracking-widest uppercase">Experience Studio &bull; Promotions</h2>
        <p className="text-[10px] text-muted-foreground mt-1">Configure and manage reusable public badge promotions and campaign highlights for your hero slides.</p>
      </div>

      <PromotionsManager promotions={normalizeDocs(promotions)} />
    </div>
  )
}
