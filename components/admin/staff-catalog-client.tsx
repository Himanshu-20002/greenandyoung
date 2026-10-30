'use client'

import React, { useState } from 'react'
import { createStaffMember, deleteStaffMember, toggleStaffActive } from '@/app/admin/actions/staff'
import { Trash2, User, Star, Plus, RefreshCw, Power } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Staff {
  id: string
  name: string
  role: string
  imageUrl: string | null
  rating: number
  active: boolean
}

interface Props {
  initialStaff: Staff[]
}

export default function StaffCatalogClient({ initialStaff }: Props) {
  const router = useRouter()
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    imageUrl: '',
    rating: 5.0
  })
  const [saving, setSaving] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await createStaffMember(formData)
      if (res.success && res.staff) {
        setStaffList(prev => [res.staff, ...prev])
        setFormData({ name: '', role: '', imageUrl: '', rating: 5.0 })
        router.refresh()
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (id: string, currentActive: boolean) => {
    try {
      setUpdatingId(id)
      const res = await toggleStaffActive(id, !currentActive)
      if (res.success) {
        setStaffList(prev => prev.map(s => s.id === id ? { ...s, active: !currentActive } : s))
        router.refresh()
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return
    try {
      setUpdatingId(id)
      const res = await deleteStaffMember(id)
      if (res.success) {
        setStaffList(prev => prev.filter(s => s.id !== id))
        router.refresh()
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs text-white">
      {/* Staff List */}
      <div className="lg:col-span-2 bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-4 shadow-sm">
        <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Active Team Members &amp; Engineers</h3>
        {staffList.length === 0 ? (
          <p className="text-white/50 py-10 text-center italic">No staff profiles registered.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className={`p-4 bg-[#121212] border rounded-xl flex items-center justify-between gap-3 ${
                  staff.active ? 'border-[#1a1a1a]' : 'border-[#1a1a1a] opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-sm text-accent overflow-hidden">
                    {staff.imageUrl ? (
                      <img src={staff.imageUrl} alt={staff.name} className="w-full h-full object-cover" />
                    ) : (
                      staff.name[0]?.toUpperCase()
                    )}
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-white leading-none">{staff.name}</span>
                    <span className="block text-[10px] text-white/50 mt-1">{staff.role}</span>
                    <div className="flex items-center gap-0.5 text-accent text-[9px] mt-1 font-bold">
                      <Star className="w-3 h-3 fill-accent text-accent inline mr-0.5" />
                      {staff.rating.toFixed(1)} Rating
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggle(staff.id, staff.active)}
                    disabled={updatingId === staff.id}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-[#1a1a1a] rounded transition-all"
                    title={staff.active ? 'Set Inactive' : 'Set Active'}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    disabled={updatingId === staff.id}
                    className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-white/60 hover:text-rose-400 border border-[#1a1a1a] rounded transition-all"
                    title="Delete Staff"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Staff form */}
      <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-4 shadow-sm h-fit">
        <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Add Staff Member</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Staff Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
              placeholder="e.g. Patrick Bateman"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Role Description</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
              placeholder="e.g. Principal Interior Architect"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Profile Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
              placeholder="e.g. /images/team-1.png (optional)"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Rating Scale (1-5)</label>
            <input
              type="number"
              step="0.1"
              min="1.0"
              max="5.0"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            {saving ? 'Saving...' : 'Add Member'}
          </button>
        </form>
      </div>
    </div>
  )
}
