import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import NewsletterCatalogClient from '@/components/admin/newsletter-catalog-client'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  const subscribers = await db
    .collection('newsletter_subscribers')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const plainSubscribers = subscribers.map(sub => {
    const norm = normalizeDoc(sub)
    return {
      id: norm.id,
      email: norm.email,
      active: norm.active !== undefined ? norm.active : true,
      createdAt: norm.createdAt ? new Date(norm.createdAt).toISOString() : new Date().toISOString(),
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Newsletter Subscribers</h2>
        <p className="text-[10px] text-white/50 mt-1">Review active mailing subscriptions from promotional footer boxes.</p>
      </div>

      <NewsletterCatalogClient initialSubscribers={plainSubscribers} />
    </div>
  )
}
