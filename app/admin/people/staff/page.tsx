import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import StaffCatalogClient from '@/components/admin/staff-catalog-client'

export const dynamic = 'force-dynamic'

export default async function AdminStaffPage() {
  const staffList = await db
    .collection('staff')
    .find({})
    .sort({ name: 1 })
    .toArray()

  const plainStaff = staffList.map(s => {
    const norm = normalizeDoc(s)
    return {
      id: norm.id,
      name: norm.name,
      role: norm.role,
      imageUrl: norm.imageUrl || '',
      rating: norm.rating || 5.0,
      active: norm.active !== undefined ? norm.active : true,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-widest uppercase">Architecture &amp; Engineering Team</h2>
        <p className="text-[10px] text-white/50 mt-1">Review active architects, chartered project engineers, and site managers.</p>
      </div>

      <StaffCatalogClient initialStaff={plainStaff} />
    </div>
  )
}
