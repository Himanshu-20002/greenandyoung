'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { togglePackageActive, deleteExperiencePackage } from '@/app/admin/actions/packages'
import { RefreshCw, Trash2, Plus, Clock, Eye, EyeOff, Edit } from 'lucide-react'

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function loadPackages() {
    try {
      setLoading(true)
      const res = await fetch('/api/packages')
      if (res.ok) {
        const data = await res.json()
        setPackages(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPackages()
  }, [])

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      setUpdatingId(id)
      const res = await togglePackageActive(id, !currentActive)
      if (res.success) {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, active: !currentActive } : p))
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
    if (!confirm('Are you sure you want to delete this experience package? All active booking references to this package will raise constraint alerts!')) return
    try {
      setUpdatingId(id)
      const res = await deleteExperiencePackage(id)
      if (res.success) {
        setPackages(prev => prev.filter(p => p.id !== id))
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
    <div className="space-y-6 text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif tracking-widest uppercase">Experience Packages</h2>
          <p className="text-[10px] opacity-60 mt-1">Manage luxury discovery packages, and configure pricing tiers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadPackages}
            className="p-2.5 border border-border rounded-xl hover:bg-foreground/5 text-foreground/75 hover:text-foreground transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <Link
            href="/admin/catalog/packages/create"
            className="px-4 py-2.5 bg-accent text-accent-foreground font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-accent/90 transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Package
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center opacity-60 text-xs">Loading experience packages...</div>
      ) : packages.length === 0 ? (
        <div className="py-20 text-center opacity-60 bg-card border border-border rounded-2xl text-xs">
          No experience packages found. Click "Create Package" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-accent/30 transition-all group duration-300"
            >
              {/* Cover Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-foreground/5">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-300"
                />
                {pkg.tag && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[8px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                    {pkg.tag}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[8px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                  {pkg.gender}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-accent tracking-widest font-extrabold uppercase block">
                    {pkg.categorySlug}
                  </span>
                  <h3 className="font-serif font-bold text-base leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-[10px] opacity-65 line-clamp-2 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] font-semibold opacity-80">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="font-bold text-accent">{pkg.price}</div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                    pkg.active !== false
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/15'
                  }`}>
                    {pkg.active !== false ? 'Active' : 'Inactive'}
                  </span>

                  <div className="flex gap-1.5">
                    <Link
                      href={`/admin/catalog/packages/${pkg.id}`}
                      className="p-2 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground border border-border rounded-xl transition-all flex items-center justify-center cursor-pointer"
                      title="Edit Package & Lookbook"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleToggleActive(pkg.id, pkg.active !== false)}
                      disabled={updatingId === pkg.id}
                      className="p-2 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground border border-border rounded-xl transition-all cursor-pointer"
                      title={pkg.active !== false ? 'Deactivate Package' : 'Activate Package'}
                    >
                      {pkg.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      disabled={updatingId === pkg.id}
                      className="p-2 bg-foreground/5 hover:bg-rose-500/10 text-foreground/60 hover:text-rose-500 border border-border rounded-xl transition-all cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
