'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Trash2, Edit2, Check, AlertCircle, Upload, Tag, Image as ImageIcon } from 'lucide-react'
import { createGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/app/admin/actions/gallery'

interface GalleryImage {
  id: string
  imageUrl: string
  caption: string | null
  category: string
  active: boolean
}

interface Props {
  images: GalleryImage[]
}

const CATEGORIES = [
  'Living & Lounges',
  'Modular Kitchens',
  'Master Suites',
  'Walk-In Wardrobes',
  'Sacred Mandirs',
  'Spa Bathrooms',
]

export default function GalleryManager({ images }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [active, setActive] = useState(true)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'gallery')

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to upload image.')
    }

    const data = await res.json()
    return data.url
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(null)
    setUploading(true)

    try {
      const url = await uploadFile(file)
      setImageUrl(url)
      setSuccess('Image uploaded successfully!')
    } catch (err: any) {
      setError(err.message || 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleEditClick = (img: GalleryImage) => {
    setIsEditing(true)
    setEditId(img.id)
    setImageUrl(img.imageUrl)
    setCaption(img.caption || '')
    setCategory(img.category)
    setActive(img.active)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditId(null)
    setImageUrl('')
    setCaption('')
    setCategory(CATEGORIES[0])
    setActive(true)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!imageUrl) {
      setError('An image is required. Please upload or specify a URL.')
      return
    }

    try {
      setIsSubmitting(true)
      const data = { imageUrl, caption, category, active }

      let res
      if (editId) {
        res = await updateGalleryImage(editId, data)
      } else {
        res = await createGalleryImage(data)
      }

      if (res.success) {
        setSuccess(editId ? 'Gallery item updated successfully!' : 'Gallery item created successfully!')
        handleCancel()
        router.refresh()
      } else {
        setError(res.error || 'Failed to save gallery item.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item? This action is permanent.')) return
    setError(null)
    setSuccess(null)
    try {
      const res = await deleteGalleryImage(id)
      if (res.success) {
        setSuccess('Gallery item deleted successfully!')
        router.refresh()
      } else {
        setError(res.error || 'Failed to delete gallery item.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleStatusToggle = async (img: GalleryImage) => {
    try {
      const res = await updateGalleryImage(img.id, { active: !img.active })
      if (res.success) {
        router.refresh()
      }
    } catch (err: any) {
      setError('Toggle status failed: ' + err.message)
    }
  }

  return (
    <div className="space-y-8 text-xs text-foreground">
      {/* Messages */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 dark:text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form (Span 5) */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div className="border-b border-border pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">
                  {isEditing ? 'Edit Gallery Image' : 'Add Gallery Image'}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">Upload and categorize transformation works for the public gallery.</p>
              </div>
              {isEditing && (
                <button 
                  onClick={handleCancel}
                  className="px-2.5 py-1 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground/70 hover:text-foreground transition-all uppercase tracking-wider text-[9px] font-bold cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Uploader */}
              <div className="space-y-2">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Gallery Image File</label>
                <div className="flex flex-col items-center justify-center border border-dashed border-border hover:border-accent hover:bg-muted/30 rounded-xl p-4 h-36 cursor-pointer group transition-all text-center relative overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                    id="gallery-file-input"
                  />
                  <label htmlFor="gallery-file-input" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-accent mb-2 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span className="text-[10px] text-foreground font-bold uppercase tracking-wider">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Image URL text field */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Or Image URL / Path</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40 font-mono"
                  placeholder="e.g. /images/interiors/living-lounge.jpg"
                />
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Caption / Description</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Monolith Quartzite Living Suite with Fluted Travertine"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded border-border bg-background text-accent focus:ring-accent"
                  />
                  <span className="font-semibold text-foreground/70">Display in public gallery</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="px-5 py-2.5 bg-accent hover:brightness-110 text-accent-foreground font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Image'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Grid list of gallery items (Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">Uploaded Work Gallery</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Review, filter, and delete transformation captures displayed on the landing page.</p>
            </div>

            {images.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic py-6 text-center border border-dashed border-border rounded-xl bg-muted/40">
                No gallery images found. Upload your first capture!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img) => (
                  <div 
                    key={img.id} 
                    className={`p-3 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                      img.active 
                        ? 'border-border bg-card hover:bg-muted/30' 
                        : 'border-dashed border-border bg-muted/10'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-border/30">
                      <Image
                        src={img.imageUrl}
                        alt={img.caption || 'Gallery Image'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 bg-muted border border-accent/25 rounded px-2 py-0.5 w-fit">
                        <Tag className="w-2.5 h-2.5 text-accent" />
                        <span className="text-foreground font-bold text-[8px] uppercase tracking-wider">{img.category}</span>
                      </div>
                      <p className="font-bold text-foreground text-[10px] line-clamp-1">{img.caption || 'No Caption Provided'}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/40 pt-2.5">
                      <button
                        onClick={() => handleStatusToggle(img)}
                        className={`px-2 py-1 rounded-lg border text-[8px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                          img.active 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {img.active ? 'Visible' : 'Hidden'}
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(img)}
                          className="p-1.5 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all text-foreground/70 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="p-1.5 rounded-lg bg-card border border-border hover:bg-rose-500 hover:text-white transition-all text-foreground/70 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
