'use client'

import React, { useState, useEffect } from 'react'
import { createCategory, deleteCategory } from '@/app/admin/actions/categories'
import { RefreshCw, Trash2, Plus } from 'lucide-react'

export default function CategoriesCatalogPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    division: 'RESIDENTIAL',
    iconName: 'Compass',
    gradient: 'from-amber-500/10 to-emerald-500/10',
    rating: '5.0',
    sortOrder: 0
  })
  const [saving, setSaving] = useState(false)

  async function loadCategories() {
    try {
      setLoading(true)
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await createCategory({
        ...formData,
        gender: formData.division
      })
      if (res.success) {
        setFormData({
          name: '',
          slug: '',
          division: 'RESIDENTIAL',
          iconName: 'Compass',
          gradient: 'from-amber-500/10 to-emerald-500/10',
          rating: '5.0',
          sortOrder: 0
        })
        loadCategories()
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
    if (!confirm('Are you sure you want to delete this category? This will delete all linked services and packages!')) return
    try {
      setSaving(true)
      const cat = categories.find(c => c.id === id)
      const dbId = cat?.dbId || id
      const res = await deleteCategory(dbId)
      if (res.success) {
        loadCategories()
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
    <div className="space-y-8 text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif tracking-widest uppercase">Catalog Categories</h2>
          <p className="text-[10px] opacity-60 mt-1">Organize residential space categories and turnkey architectural modules.</p>
        </div>
        <button
          onClick={loadCategories}
          className="p-2 border border-border rounded-xl hover:bg-foreground/5 text-foreground/75 hover:text-foreground transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List categories */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm transition-colors duration-300">
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Active Category Records</h3>
          {loading ? (
            <div className="py-10 text-center opacity-60 text-xs">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="py-10 text-center opacity-60 text-xs">No category items seeded in catalog.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-[9px] uppercase tracking-widest opacity-60">
                    <th className="pb-3 font-bold">Category Title</th>
                    <th className="pb-3 font-bold">Slug Name</th>
                    <th className="pb-3 font-bold">Division</th>
                    <th className="pb-3 font-bold">Icon Name</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-[11px] opacity-90">
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="py-3 font-bold">{cat.title}</td>
                      <td className="py-3 opacity-75 font-mono">{cat.id}</td>
                      <td className="py-3 uppercase tracking-wider text-[10px] text-accent font-semibold">{cat.gender}</td>
                      <td className="py-3 opacity-75">{cat.iconName}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={saving}
                          className="p-1.5 bg-foreground/5 hover:bg-rose-500/10 text-foreground/40 hover:text-rose-500 border border-border rounded transition-all cursor-pointer"
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

        {/* Create Form */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm h-fit transition-colors duration-300">
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Add Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="opacity-60 font-semibold uppercase tracking-wider text-[9px]">Category Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent/40"
                placeholder="e.g. Master Living Suites"
              />
            </div>

            <div className="space-y-1">
              <label className="opacity-60 font-semibold uppercase tracking-wider text-[9px]">Slug (URL Safe)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none focus:border-accent/40"
                placeholder="e.g. master-living-suites"
              />
            </div>

            <div className="space-y-1">
              <label className="opacity-60 font-semibold uppercase tracking-wider text-[9px]">Design Division</label>
              <select
                value={formData.division}
                onChange={(e) => setFormData(prev => ({ ...prev, division: e.target.value }))}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent/40 cursor-pointer"
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial & Corporate</option>
                <option value="TURNKEY">Turnkey Luxury</option>
                <option value="MODULAR">Modular & Kitchens</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="opacity-60 font-semibold uppercase tracking-wider text-[9px]">Lucide Icon Name</label>
              <select
                value={formData.iconName}
                onChange={(e) => setFormData(prev => ({ ...prev, iconName: e.target.value }))}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent/40 cursor-pointer"
              >
                <option value="Compass">Compass (Architecture)</option>
                <option value="Home">Home (Living & Suites)</option>
                <option value="Sparkles">Sparkles (Luxury Finishes)</option>
                <option value="Layers">Layers (Materials & Millwork)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 mt-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'Saving...' : 'Add Record'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
