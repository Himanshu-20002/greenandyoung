import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import InquiriesCatalogClient from '@/components/admin/inquiries-catalog-client'

export const dynamic = 'force-dynamic'

export default async function AdminInquiriesPage() {
  const inquiries = await db
    .collection('inquiries')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const plainInquiries = inquiries.map(inq => {
    const norm = normalizeDoc(inq)
    return {
      id: norm.id,
      name: norm.name,
      email: norm.email,
      subject: norm.subject || '',
      message: norm.message,
      read: norm.read !== undefined ? norm.read : false,
      createdAt: norm.createdAt ? new Date(norm.createdAt).toISOString() : new Date().toISOString(),
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Client Inquiries</h2>
        <p className="text-[10px] text-white/50 mt-1">Review contact inquiries and project consultation requests.</p>
      </div>

      <InquiriesCatalogClient initialInquiries={plainInquiries} />
    </div>
  )
}
