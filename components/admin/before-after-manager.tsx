'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Trash2, Edit2, Check, AlertCircle, Upload, Tag, Image as ImageIcon } from 'lucide-react'
import { createBeforeAfterImage, updateBeforeAfterImage, deleteBeforeAfterImage } from '@/app/admin/actions/beforeAfter'

interface BeforeAfterImage {
  id: string
  beforeImage: string
  afterImage: string
  title: string | null
  description: string | null
  active: boolean
  sortOrder: number
}

interface Props {
  images: BeforeAfterImage[]
}

export default function BeforeAfterManager({ images }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)

  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [beforeImage, setBeforeImage] = useState('')
  const [afterImage, setAfterImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [active, setActive] = useState(true)
  const [sortOrder, setSortOrder] = useState(0)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'before-after')

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

  const handleBeforeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(null)
    setUploadingBefore(true)

    try {
      const url = await uploadFile(file)
      setBeforeImage(url)
      setSuccess('Before Image uploaded successfully!')
    } catch (err: any) {
      setError(err.message || 'Before Image upload failed.')
    } finally {
      setUploadingBefore(false)
    }
  }

  const handleAfterFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(null)
    setUploadingAfter(true)

    try {
      const url = await uploadFile(file)
      setAfterImage(url)
      setSuccess('After Image uploaded successfully!')
    } catch (err: any) {
      setError(err.message || 'After Image upload failed.')
    } finally {
      setUploadingAfter(false)
    }
  }

  const handleEditClick = (img: BeforeAfterImage) => {
    setIsEditing(true)
    setEditId(img.id)
    setBeforeImage(img.beforeImage)
    setAfterImage(img.afterImage)
    setTitle(img.title || '')
    setDescription(img.description || '')
    setActive(img.active)
    setSortOrder(img.sortOrder)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditId(null)
    setBeforeImage('')
    setAfterImage('')
    setTitle('')
    setDescription('')
    setActive(true)
    setSortOrder(0)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!beforeImage || !afterImage) {
      setError('Both Before and After images are required.')
      return
    }

    try {
      setIsSubmitting(true)
      const data = { 
        beforeImage, 
        afterImage, 
        title, 
        description, 
        active,
        sortOrder: Number(sortOrder) 
      }

      let res
      if (editId) {
        res = await updateBeforeAfterImage(editId, data)
      } else {
        res = await createBeforeAfterImage(data)
      }

      if (res.success) {
        setSuccess(editId ? 'Before/After item updated successfully!' : 'Before/After item created successfully!')
        handleCancel()
        router.refresh()
      } else {
        setError(res.error || 'Failed to save before/after item.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this before/after item? This action is permanent.')) return
    setError(null)
    setSuccess(null)
    try {
      const res = await deleteBeforeAfterImage(id)
      if (res.success) {
        setSuccess('Before/After item deleted successfully!')
        router.refresh()
      } else {
        setError(res.error || 'Failed to delete before/after item.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleStatusToggle = async (img: BeforeAfterImage) => {
    try {
      const res = await updateBeforeAfterImage(img.id, { active: !img.active })
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
                  {isEditing ? 'Edit Transformation' : 'Add Transformation'}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">Configure before/after image sets and details.</p>
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
              <div className="grid grid-cols-2 gap-4">
                {/* Before Image Uploader */}
                <div className="space-y-2">
                  <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Before Image</label>
                  <div className="flex flex-col items-center justify-center border border-dashed border-border hover:border-accent hover:bg-muted/30 rounded-xl p-2 h-28 cursor-pointer group transition-all text-center relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBeforeFileChange}
                      className="hidden"
                      disabled={uploadingBefore}
                      id="before-file-input"
                    />
                    <label htmlFor="before-file-input" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <Upload className="w-4 h-4 text-muted-foreground group-hover:text-accent mb-1 transition-transform duration-300 group-hover:-translate-y-0.5" />
                      <span className="text-[8px] text-foreground font-bold uppercase tracking-wider">
                        {uploadingBefore ? 'Uploading...' : 'Before Image'}
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-2 py-1.5 text-foreground focus:outline-none focus:border-accent/40 font-mono text-[9px]"
                    placeholder="Before URL"
                  />
                </div>

                {/* After Image Uploader */}
                <div className="space-y-2">
                  <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">After Image</label>
                  <div className="flex flex-col items-center justify-center border border-dashed border-border hover:border-accent hover:bg-muted/30 rounded-xl p-2 h-28 cursor-pointer group transition-all text-center relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAfterFileChange}
                      className="hidden"
                      disabled={uploadingAfter}
                      id="after-file-input"
                    />
                    <label htmlFor="after-file-input" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <Upload className="w-4 h-4 text-muted-foreground group-hover:text-accent mb-1 transition-transform duration-300 group-hover:-translate-y-0.5" />
                      <span className="text-[8px] text-foreground font-bold uppercase tracking-wider">
                        {uploadingAfter ? 'Uploading...' : 'After Image'}
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-2 py-1.5 text-foreground focus:outline-none focus:border-accent/40 font-mono text-[9px]"
                    placeholder="After URL"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Title / Campaign</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Highlights Transformation"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Frizz-free balayage styling details"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                />
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
                  <span className="font-semibold text-foreground/70">Display in public slider</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingBefore || uploadingAfter}
                  className="px-5 py-2.5 bg-accent hover:brightness-110 text-accent-foreground font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Grid list of before-after items (Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">Transformation Slide Gallery</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Review, toggle status, and delete active before/after showcases.</p>
            </div>

            {images.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic py-6 text-center border border-dashed border-border rounded-xl bg-muted/40">
                No transformation slides found. Create your first slide!
              </p>
            ) : (
              <div className="space-y-4">
                {images.map((img) => (
                  <div 
                    key={img.id} 
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 transition-all ${
                      img.active 
                        ? 'border-border bg-card hover:bg-muted/30' 
                        : 'border-dashed border-border bg-muted/10'
                    }`}
                  >
                    <div className="flex gap-2 flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-black border border-border/30">
                        <Image
                          src={img.beforeImage}
                          alt="Before"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.5 rounded text-[6px] text-white uppercase font-bold">Before</div>
                      </div>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-black border border-border/30">
                        <Image
                          src={img.afterImage}
                          alt="After"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.5 rounded text-[6px] text-white uppercase font-bold">After</div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-2">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-foreground text-xs">{img.title || 'No Title Provided'}</h4>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{img.description || 'No description provided.'}</p>
                        <p className="text-[8px] text-accent font-bold uppercase tracking-wider">Order: {img.sortOrder}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/40 pt-2">
                        <button
                          onClick={() => handleStatusToggle(img)}
                          className={`px-2 py-0.5 rounded border text-[8px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                            img.active 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {img.active ? 'Active' : 'Hidden'}
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
