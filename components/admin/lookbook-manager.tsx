'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  addPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '@/app/admin/actions/lookbook'
import { 
  Upload, Trash2, Edit, Check, X, Plus, Image as ImageIcon, RefreshCw, AlertCircle 
} from 'lucide-react'

interface PortfolioItem {
  id: string
  imageUrl: string
  title: string | null
}

interface Package {
  id: string
  title: string
  portfolioItems: PortfolioItem[]
}

interface Props {
  initialPackages: Package[]
}

export default function LookbookManager({ initialPackages }: Props) {
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>(initialPackages)
  const [selectedPackageId, setSelectedPackageId] = useState(initialPackages[0]?.id || '')
  
  // New Item states
  const [newTitle, setNewTitle] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  
  // Editing states
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const activePackage = packages.find(p => p.id === selectedPackageId)
  const portfolioItems = activePackage?.portfolioItems || []

  // File Upload Helper
  const uploadFile = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: reader.result, folder: 'portfolio' })
          })
          if (!res.ok) throw new Error('Upload server error.')
          const data = await res.json()
          resolve(data.url)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = (err) => reject(err)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setSuccess(null)
    try {
      setUploading(true)
      const url = await uploadFile(file)
      setNewImageUrl(url)
      setSuccess('Image uploaded to Cloudinary successfully!')
    } catch (err: any) {
      setError('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddLookbookItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPackageId) {
      setError('Please select a target package.')
      return
    }
    if (!newImageUrl) {
      setError('Please upload or provide an image URL.')
      return
    }

    setError(null)
    setSuccess(null)
    try {
      const res = await addPortfolioItem(selectedPackageId, newImageUrl, newTitle)
      if (res.success && res.item) {
        setSuccess('Lookbook image added successfully!')
        
        // Update local state
        const newItem: PortfolioItem = {
          id: res.item.id,
          imageUrl: res.item.imageUrl,
          title: res.item.title
        }
        
        setPackages(prev => prev.map(pkg => {
          if (pkg.id === selectedPackageId) {
            return {
              ...pkg,
              portfolioItems: [...pkg.portfolioItems, newItem]
            }
          }
          return pkg
        }))
        
        // Reset inputs
        setNewTitle('')
        setNewImageUrl('')
      } else {
        setError(res.error || 'Failed to add item.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleStartEdit = (item: PortfolioItem) => {
    setEditingItemId(item.id)
    setEditingTitle(item.title || '')
  }

  const handleSaveEdit = async (itemId: string) => {
    setError(null)
    setSuccess(null)
    try {
      const res = await updatePortfolioItem(itemId, editingTitle)
      if (res.success) {
        setSuccess('Title updated successfully!')
        
        // Update local state
        setPackages(prev => prev.map(pkg => {
          if (pkg.id === selectedPackageId) {
            return {
              ...pkg,
              portfolioItems: pkg.portfolioItems.map(item => 
                item.id === itemId ? { ...item, title: editingTitle || null } : item
              )
            }
          }
          return pkg
        }))
        
        setEditingItemId(null)
      } else {
        setError(res.error || 'Failed to update title.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to remove this image from the lookbook?')) return
    setError(null)
    setSuccess(null)
    try {
      const res = await deletePortfolioItem(itemId)
      if (res.success) {
        setSuccess('Lookbook image removed successfully!')
        
        // Update local state
        setPackages(prev => prev.map(pkg => {
          if (pkg.id === selectedPackageId) {
            return {
              ...pkg,
              portfolioItems: pkg.portfolioItems.filter(item => item.id !== itemId)
            }
          }
          return pkg
        }))
      } else {
        setError(res.error || 'Failed to remove image.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div className="space-y-8 text-xs text-white max-w-6xl w-full">
      {/* Notifications */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Select package context */}
      <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-4">
        <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px] block">Select Experience Package to Manage</label>
        <select
          value={selectedPackageId}
          onChange={(e) => {
            setSelectedPackageId(e.target.value)
            setNewImageUrl('')
            setNewTitle('')
            setEditingItemId(null)
          }}
          className="w-full sm:max-w-md bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
        >
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form: Add Lookbook Photo */}
        <div className="lg:col-span-5 bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-6">
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-white">Add Lookbook Photo</h3>
            <p className="text-[10px] text-white/50 mt-1">Upload a unique high-end styling model image to display in this package's lookbook slider.</p>
          </div>

          <form onSubmit={handleAddLookbookItem} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px] block">Model Lookbook Photo</label>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1a1a1a] hover:border-accent/40 bg-[#121212] h-40 rounded-xl cursor-pointer group transition-all">
                  <Upload className="w-6 h-6 text-white/45 group-hover:text-accent transition-all mb-2" />
                  <span className="text-[10px] text-white/50">{uploading ? 'Uploading to Cloudinary...' : 'Click to Upload Image'}</span>
                  <span className="text-[9px] text-white/30 mt-1">Accepts PNG, JPG, WebP</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {newImageUrl && (
                  <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto rounded-xl overflow-hidden border border-[#1a1a1a] bg-white/5">
                    <img src={newImageUrl} alt="Uploaded Look" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Step / Look Label</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
                placeholder="e.g. Deep Exfoliation"
              />
            </div>

            <button
              type="submit"
              disabled={!newImageUrl}
              className="w-full py-3 bg-accent text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed font-bold uppercase tracking-wider rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Look to Book
            </button>
          </form>
        </div>

        {/* List: Existing Lookbook Items */}
        <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl space-y-6">
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-white">
              {activePackage?.title} &bull; Lookbook Slider
            </h3>
            <p className="text-[10px] text-white/50 mt-1">Edit or remove current lookbook slides (Max 8 recommended for filmstrip).</p>
          </div>

          {portfolioItems.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-[#1a1a1a] rounded-2xl text-white/50">
              <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-2" />
              <p className="italic">No photos in this package's lookbook yet. Upload some using the form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {portfolioItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-3 flex flex-col justify-between space-y-3 group hover:border-accent/20 transition-all"
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#1a1a1a] bg-white/5">
                    <img src={item.imageUrl} alt={item.title || 'Look'} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded bg-black/60 hover:bg-rose-500 text-white transition-all shadow"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {editingItemId === item.id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="w-full bg-[#0c0c0c] border border-accent/40 rounded px-2 py-1 text-white text-[10px] focus:outline-none"
                        />
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 rounded bg-accent/25 hover:bg-accent text-accent-foreground transition-all"
                            title="Save"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="p-1 rounded bg-[#0c0c0c] border border-[#1a1a1a] hover:bg-white/5 text-white/60 transition-all"
                            title="Cancel"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-white/80 truncate block">
                          {item.title || <span className="text-white/30 italic">No Title</span>}
                        </span>
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1 hover:bg-white/5 text-white/45 hover:text-white rounded transition-all"
                          title="Rename Label"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
