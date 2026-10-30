'use client'

import React, { useState } from 'react'
import { createService, deleteService } from '@/app/admin/actions/services'
import { Plus, Trash2, Scissors } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  gender: string
}

interface Service {
  id: string
  name: string
  categoryId: string
  category: {
    name: string
    gender: string
  }
}

interface Props {
  initialServices: Service[]
  categories: Category[]
}

export default function ServicesCatalogClient({ initialServices, categories }: Props) {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>(initialServices)
  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0]?.id || ''
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await createService(formData)
      if (res.success && res.service) {
        // Update local list
        const catObj = categories.find(c => c.id === formData.categoryId)
        const newService: Service = {
          id: res.service.id,
          name: res.service.name,
          categoryId: res.service.categoryId,
          category: {
            name: catObj?.name || '',
            gender: catObj?.gender || ''
          }
        }
        setServices(prev => [newService, ...prev])
        setFormData(prev => ({ ...prev, name: '' }))
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service? It will be removed from all experience packages.')) return
    try {
      setSaving(true)
      const res = await deleteService(id)
      if (res.success) {
        setServices(prev => prev.filter(s => s.id !== id))
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs text-white">
      {/* Services List Table */}
      <div className="lg:col-span-2 bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-4 shadow-sm">
        <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Active Service Records</h3>
        {services.length === 0 ? (
          <p className="text-white/50 py-10 text-center italic">No services registered in catalog.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1a1a1a] text-[9px] uppercase tracking-widest text-white/45 bg-[#121212]/40">
                  <th className="p-3 font-bold">Service Name</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Division</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a] text-[11px] text-white/80">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="p-3 font-bold text-white flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-accent" />
                      {srv.name}
                    </td>
                    <td className="p-3 text-white/60">{srv.category.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-md text-accent text-[9px] font-extrabold uppercase tracking-widest">
                        {srv.category.gender}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(srv.id)}
                        disabled={saving}
                        className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-white/45 hover:text-rose-400 border border-[#1a1a1a] rounded transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Service Form */}
      <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-4 shadow-sm h-fit">
        <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Add Service</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Service Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
              placeholder="e.g. Keratin Therapy"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Assign to Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-accent/40"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name} ({cat.gender})</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            {saving ? 'Saving...' : 'Add Record'}
          </button>
        </form>
      </div>
    </div>
  )
}
