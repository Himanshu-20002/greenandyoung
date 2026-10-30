'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, Check, AlertCircle, Eye, MousePointerClick, TrendingUp, Monitor, Tablet, 
  Phone, ArrowUp, ArrowDown, Trash2, Edit2, Upload, Calendar, Search, Activity, X
} from 'lucide-react'
import { 
  createHeroSlide, updateHeroSlide, deleteHeroSlide 
} from '@/app/admin/actions/heroSlides'

interface Category {
  id: string
  name: string
  gender: string
}

interface ExperiencePackage {
  id: string
  title: string
  categoryId: string
}

interface Promotion {
  id: string
  name: string
  badgeLabel: string
  badgeText: string
  active: boolean
}

interface HeroSlideData {
  id: string
  bgImage: string
  frameImage: string
  categoryId: string
  packageId: string | null
  promotionId: string | null
  startDate: string | null
  endDate: string | null
  imageAlt: string | null
  campaignName: string | null
  status: 'DRAFT' | 'PUBLISHED'
  sortOrder: number
  category: { name: string; gender: string }
  package?: { title: string } | null
  promotion?: { id: string; name: string; badgeLabel: string; badgeText: string; active: boolean } | null
  analytics?: { eventType: 'IMPRESSION' | 'CLICK'; createdAt: string }[]
}

interface Props {
  slides: HeroSlideData[]
  categories: Category[]
  packages: ExperiencePackage[]
  promotions: Promotion[]
}

export default function HeroSliderManager({ slides, categories, packages, promotions }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingBg, setUploadingBg] = useState(false)
  const [uploadingFrame, setUploadingFrame] = useState(false)

  // Viewport Preview modal state
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [previewSlideIndex, setPreviewSlideIndex] = useState<number>(0)

  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [bgImage, setBgImage] = useState('')
  const [frameImage, setFrameImage] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '')
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')
  const [selectedPromotionId, setSelectedPromotionId] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [sortOrder, setSortOrder] = useState(0)

  // Calculate advanced telemetry stats
  const totalImpressions = slides.reduce(
    (acc, s) => acc + (s.analytics?.filter(a => a.eventType === 'IMPRESSION').length || 0), 0
  )
  const totalClicks = slides.reduce(
    (acc, s) => acc + (s.analytics?.filter(a => a.eventType === 'CLICK').length || 0), 0
  )

  // Last 30 days telemetry
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const stats30Days = slides.reduce((acc, s) => {
    const impressions30 = s.analytics?.filter(a => a.eventType === 'IMPRESSION' && new Date(a.createdAt) >= thirtyDaysAgo).length || 0
    const clicks30 = s.analytics?.filter(a => a.eventType === 'CLICK' && new Date(a.createdAt) >= thirtyDaysAgo).length || 0
    return {
      impressions: acc.impressions + impressions30,
      clicks: acc.clicks + clicks30
    }
  }, { impressions: 0, clicks: 0 })

  const ctr30Days = stats30Days.impressions > 0 
    ? ((stats30Days.clicks / stats30Days.impressions) * 100).toFixed(1) 
    : '0.0'

  // Performance sorting
  const slidesWithCTR = slides.map(s => {
    const imp = s.analytics?.filter(a => a.eventType === 'IMPRESSION').length || 0
    const clk = s.analytics?.filter(a => a.eventType === 'CLICK').length || 0
    const ctr = imp > 0 ? (clk / imp) * 100 : 0
    return { ...s, imp, clk, ctr }
  })

  // Top Performing Slide (with impressions > 0)
  const activeSlidesTelemetry = slidesWithCTR.filter(s => s.imp > 0)
  const topPerforming = activeSlidesTelemetry.length > 0 
    ? [...activeSlidesTelemetry].sort((a, b) => b.ctr - a.ctr)[0] 
    : null

  // Lowest Performing Slide
  const lowestPerforming = activeSlidesTelemetry.length > 0 
    ? [...activeSlidesTelemetry].sort((a, b) => a.ctr - b.ctr)[0] 
    : null

  // Image Upload Helper
  const uploadFile = async (file: File, folder: string) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: reader.result, folder })
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

  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploadingBg(true)
      const url = await uploadFile(file, 'hero-bg')
      setBgImage(url)
      setSuccess('Background image uploaded successfully!')
    } catch (err: any) {
      setError('Background upload failed: ' + err.message)
    } finally {
      setUploadingBg(false)
    }
  }

  const handleFrameUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploadingFrame(true)
      const url = await uploadFile(file, 'hero-frame')
      setFrameImage(url)
      setSuccess('Model frame image uploaded successfully!')
    } catch (err: any) {
      setError('Model frame upload failed: ' + err.message)
    } finally {
      setUploadingFrame(false)
    }
  }

  const handleEditClick = (slide: HeroSlideData) => {
    setIsEditing(true)
    setEditId(slide.id)
    setBgImage(slide.bgImage)
    setFrameImage(slide.frameImage)
    setSelectedCategoryId(slide.categoryId)
    setSelectedPackageId(slide.packageId || '')
    setSelectedPromotionId(slide.promotionId || '')
    setStartDate(slide.startDate ? new Date(slide.startDate).toISOString().slice(0, 16) : '')
    setEndDate(slide.endDate ? new Date(slide.endDate).toISOString().slice(0, 16) : '')
    setImageAlt(slide.imageAlt || '')
    setCampaignName(slide.campaignName || '')
    setStatus(slide.status)
    setSortOrder(slide.sortOrder)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditId(null)
    setBgImage('')
    setFrameImage('')
    setSelectedCategoryId(categories[0]?.id || '')
    setSelectedPackageId('')
    setSelectedPromotionId('')
    setStartDate('')
    setEndDate('')
    setImageAlt('')
    setCampaignName('')
    setStatus('DRAFT')
    setSortOrder(0)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!bgImage) {
      setError('Background image is required')
      return
    }
    if (!frameImage) {
      setError('Model frame image is required')
      return
    }

    try {
      setIsSubmitting(true)
      const data = {
        bgImage,
        frameImage,
        categoryId: selectedCategoryId,
        packageId: selectedPackageId || null,
        promotionId: selectedPromotionId || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        imageAlt: imageAlt || null,
        campaignName: campaignName || null,
        status,
        sortOrder: Number(sortOrder)
      }

      let res
      if (editId) {
        res = await updateHeroSlide(editId, data)
      } else {
        res = await createHeroSlide(data)
      }

      if (res.success) {
        setSuccess(editId ? 'Hero slide updated successfully!' : 'Hero slide created successfully!')
        handleCancel()
        router.refresh()
      } else {
        setError(res.error || 'Failed to save slide.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide? All analytics records will be lost.')) return
    setError(null)
    setSuccess(null)
    try {
      const res = await deleteHeroSlide(id)
      if (res.success) {
        setSuccess('Hero slide deleted successfully!')
        router.refresh()
      } else {
        setError(res.error || 'Failed to delete slide.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleOrderChange = async (slide: HeroSlideData, direction: 'up' | 'down') => {
    const slideIdx = slides.findIndex(s => s.id === slide.id)
    if (direction === 'up' && slideIdx === 0) return
    if (direction === 'down' && slideIdx === slides.length - 1) return

    const targetIdx = direction === 'up' ? slideIdx - 1 : slideIdx + 1
    const targetSlide = slides[targetIdx]

    try {
      await updateHeroSlide(slide.id, { sortOrder: targetSlide.sortOrder })
      await updateHeroSlide(targetSlide.id, { sortOrder: slide.sortOrder })
      router.refresh()
    } catch (err: any) {
      setError('Order swap failed: ' + err.message)
    }
  }

  const filteredPackages = packages.filter(pkg => pkg.categoryId === selectedCategoryId)
  
  // Slide being previewed
  const previewSource = slides[previewSlideIndex] || {
    bgImage: bgImage || '/images/booking-bg.webp',
    frameImage: frameImage || '/images/hero-model.webp',
    promotion: promotions.find(p => p.id === selectedPromotionId) || null,
    campaignName: campaignName || 'Default Campaign',
    status: 'PREVIEW',
    imageAlt: imageAlt || 'Green & Young Interiors'
  }

  return (
    <div className="space-y-8 text-xs text-foreground w-full">
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

      {/* Advanced Telemetry Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground block">Rolling 30 Days stats</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-serif font-bold text-accent">{ctr30Days}% CTR</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{stats30Days.clicks} Clicks</span>
          </div>
          <span className="text-[9px] text-muted-foreground/85 block">From {stats30Days.impressions} rolling impressions</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">Top Performing Slide</span>
          {topPerforming ? (
            <div>
              <span className="text-[11px] font-serif font-bold text-foreground truncate block">
                {topPerforming.campaignName || 'Unnamed Campaign'} ({topPerforming.ctr.toFixed(1)}% CTR)
              </span>
              <span className="text-[9px] text-muted-foreground/85 block mt-1">Clicks: {topPerforming.clk} &bull; Imp: {topPerforming.imp}</span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-foreground/60 italic block">No active metrics recorded</span>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-rose-500 dark:text-rose-400 block">Lowest Performing Slide</span>
          {lowestPerforming ? (
            <div>
              <span className="text-[11px] font-serif font-bold text-foreground truncate block">
                {lowestPerforming.campaignName || 'Unnamed Campaign'} ({lowestPerforming.ctr.toFixed(1)}% CTR)
              </span>
              <span className="text-[9px] text-muted-foreground/85 block mt-1">Clicks: {lowestPerforming.clk} &bull; Imp: {lowestPerforming.imp}</span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-foreground/60 italic block">No active metrics recorded</span>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground block">Aggregate conversion</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-serif font-bold text-foreground">
              {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0'}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase">{totalImpressions} views</span>
          </div>
          <span className="text-[9px] text-muted-foreground/85 block">{totalClicks} total conversions tracked</span>
        </div>
      </div>

      {/* Main Single Column Layout */}
      <div className="space-y-8 w-full">
        
        {/* Create/Edit Form */}
        <div className="bg-card border border-border p-6 rounded-2xl space-y-6 w-full">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div>
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">
                {isEditing ? 'Modify Slide Settings' : 'Add New Hero Slide'}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">Configure background assets, A/B campaigns, and seasonal ranges.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setPreviewSlideIndex(-1) // Preview temporary states
                  setShowPreviewModal(true)
                }}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-accent" />
                Live Preview
              </button>
              {isEditing && (
                <button 
                  onClick={handleCancel}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-lg text-foreground/70 hover:text-foreground transition-all uppercase tracking-wider text-[9px] font-bold cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">A/B Campaign Group Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Summer Bridal Fest - Group A"
                />
              </div>
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Image Alt Text (SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Luxurious bridal look styling"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Target Category</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value)
                    setSelectedPackageId('')
                  }}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-card text-foreground">{cat.name} ({cat.gender})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Target Package & Lookbook (Optional)</label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                >
                  <option value="" className="bg-card text-foreground">No Package (Generic category lookbook)</option>
                  {filteredPackages.map(pkg => (
                    <option key={pkg.id} value={pkg.id} className="bg-card text-foreground">{pkg.title} (Links Lookbook)</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Attached Promotion Badge</label>
                <select
                  value={selectedPromotionId}
                  onChange={(e) => setSelectedPromotionId(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                >
                  <option value="" className="bg-card text-foreground">No Promotion Badge</option>
                  {promotions.map(promo => (
                    <option key={promo.id} value={promo.id} className="bg-card text-foreground">{promo.name} ({promo.badgeText})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div className="space-y-2">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px] block">Background Image</label>
                <div className="flex gap-4 items-center">
                  <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent/40 bg-background py-4 px-2 rounded-xl cursor-pointer group transition-all min-h-[96px]">
                    <Upload className="w-4 h-4 text-foreground/45 group-hover:text-accent transition-all mb-1" />
                    <span className="text-[10px] text-foreground/80 font-bold">{uploadingBg ? 'Uploading...' : 'Upload Background Photo'}</span>
                    <span className="text-[9px] text-muted-foreground mt-1">Recommended resolution: 1920x1080px</span>
                    <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
                  </label>
                  {bgImage && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted/20 flex-shrink-0">
                      <img src={bgImage} alt="Background preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px] block">Model Frame Image</label>
                <div className="flex gap-4 items-center">
                  <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent/40 bg-background py-4 px-2 rounded-xl cursor-pointer group transition-all min-h-[96px]">
                    <Upload className="w-4 h-4 text-foreground/45 group-hover:text-accent transition-all mb-1" />
                    <span className="text-[10px] text-foreground/80 font-bold">{uploadingFrame ? 'Uploading...' : 'Upload Model Portrait'}</span>
                    <span className="text-[9px] text-muted-foreground mt-1">Recommended resolution: 760x960px</span>
                    <input type="file" accept="image/*" onChange={handleFrameUpload} className="hidden" />
                  </label>
                  {frameImage && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-muted/20 flex-shrink-0">
                      <img src={frameImage} alt="Frame preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scheduling Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-accent" /> Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                />
              </div>
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-rose-500" /> End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                />
              </div>
            </div>

            {/* Status and Sort Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Workflow Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                >
                  <option value="DRAFT" className="bg-card text-foreground">Draft (Unpublished)</option>
                  <option value="PUBLISHED" className="bg-card text-foreground">Published (Live)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-accent hover:brightness-110 text-accent-foreground font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Slide'}
              </button>
            </div>
          </form>
        </div>

        {/* Slides List */}
        <div className="bg-card border border-border p-6 rounded-2xl space-y-6 w-full">
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">Configured Slides</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Reorder, publish, or modify your current slider components.</p>
          </div>

          {slides.length === 0 ? (
            <p className="text-[10px] text-muted-foreground italic py-6 text-center border border-dashed border-border rounded-xl bg-muted/20">
              No custom hero slides configured yet. The site is currently displaying the default model photo.
            </p>
          ) : (
            <div className="space-y-3">
              {slides.map((slide, idx) => {
                const impressions = slide.analytics?.filter(a => a.eventType === 'IMPRESSION').length || 0
                const clicks = slide.analytics?.filter(a => a.eventType === 'CLICK').length || 0
                const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : '0.0'

                return (
                  <div 
                    key={slide.id} 
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${slide.status === 'PUBLISHED'
                      ? 'border-border bg-card hover:bg-muted/30'
                      : 'border-dashed border-border bg-muted/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-border bg-black/40 flex-shrink-0">
                        <img src={slide.bgImage} alt="bg" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-7 h-9 rounded-t-full rounded-b-md overflow-hidden border border-accent/30 scale-75">
                            <img src={slide.frameImage} alt="frame" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif font-bold text-foreground text-[11px]">
                            {slide.campaignName || 'No Campaign Tag'}
                          </span>
                          {slide.promotion && (
                            <span className="bg-accent/10 border border-accent/20 text-accent font-extrabold text-[8px] uppercase tracking-wide px-1.5 py-0.5 rounded">
                              {slide.promotion.badgeLabel}: {slide.promotion.badgeText}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase ${slide.status === 'PUBLISHED'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                            {slide.status}
                          </span>
                        </div>
                        
                        <div className="text-[10px] text-muted-foreground font-medium">
                          Category: <span className="text-accent">{slide.category.name} ({slide.category.gender})</span>
                          {slide.package && (
                            <> &bull; Package: <span className="text-foreground/80">{slide.package.title}</span></>
                          )}
                        </div>

                        {(slide.startDate || slide.endDate) && (
                          <div className="text-[9px] text-muted-foreground/85 flex items-center gap-1 font-semibold uppercase tracking-wider">
                            <Calendar className="w-3 h-3 text-accent" />
                            {slide.startDate ? new Date(slide.startDate).toLocaleDateString() : 'Immediate'}
                            <span> &rarr; </span>
                            {slide.endDate ? new Date(slide.endDate).toLocaleDateString() : 'Indefinite'}
                          </div>
                        )}

                        <div className="text-[9px] text-muted-foreground/70 font-semibold tracking-wider uppercase">
                          Views: {impressions} &bull; Clicks: {clicks} &bull; CTR: {ctr}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleOrderChange(slide, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-card hover:bg-muted border border-border disabled:opacity-30 transition-all cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOrderChange(slide, 'down')}
                          disabled={idx === slides.length - 1}
                          className="p-1 rounded bg-card hover:bg-muted border border-border disabled:opacity-30 transition-all cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setPreviewSlideIndex(idx)
                          setShowPreviewModal(true)
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-card border border-border hover:bg-muted text-foreground/80 hover:text-foreground transition-all uppercase tracking-wider text-[9px] font-bold cursor-pointer"
                        title="Preview in Mockup"
                      >
                        Preview
                      </button>
                      
                      <button
                        onClick={() => handleEditClick(slide)}
                        className="p-2 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all text-foreground/70 cursor-pointer"
                        title="Edit Settings"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="p-2 rounded-lg bg-card border border-border hover:bg-rose-500 hover:text-white transition-all text-foreground/70 cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* Viewport Previews Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6 w-full max-w-2xl relative shadow-2xl animate-fade-in text-foreground">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">Live Mockup Preview</h3>
                <p className="text-[10px] text-muted-foreground mt-1">Visualize the slide display across standard device viewports.</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Viewport Toggles */}
                <div className="flex border border-border rounded-lg overflow-hidden bg-muted">
                  <button
                    onClick={() => setPreviewViewport('desktop')}
                    className={`p-2 transition-all cursor-pointer ${previewViewport === 'desktop' ? 'bg-accent text-accent-foreground' : 'text-foreground/60 hover:text-foreground'}`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewViewport('tablet')}
                    className={`p-2 transition-all cursor-pointer ${previewViewport === 'tablet' ? 'bg-accent text-accent-foreground' : 'text-foreground/60 hover:text-foreground'}`}
                    title="Tablet Preview"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-2 transition-all cursor-pointer ${previewViewport === 'mobile' ? 'bg-accent text-accent-foreground' : 'text-foreground/60 hover:text-foreground'}`}
                    title="Mobile Preview"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-lg border border-border hover:bg-rose-500 hover:text-white text-foreground/60 transition-all cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mockup Frame Wrapper */}
            <div className="flex justify-center bg-[#050505] p-6 rounded-xl border border-border overflow-hidden min-h-[360px] items-center">
              
              {/* Desktop Render */}
              {previewViewport === 'desktop' && (
                <div className="w-full max-w-[580px] bg-[#0F0D0C] aspect-[16/9] border border-white/10 rounded-lg overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
                  <div className="absolute inset-0 z-0">
                    <img src={previewSource.bgImage} alt={previewSource.imageAlt || 'bg'} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                  </div>
                  
                  <div className="z-10 relative flex-grow flex items-center justify-between">
                    <div className="space-y-2 max-w-[50%]">
                      <span className="text-accent font-semibold text-[6px] tracking-widest uppercase block">Welcome to Green & Young</span>
                      <h1 className="text-xs font-serif font-bold text-white leading-tight">
                        Your Style.<br />Your Confidence.<br />Your Signature Look.
                      </h1>
                      <p className="text-[7px] text-white/70 leading-normal">
                        Professional grooming services trusted in Greater Noida West.
                      </p>
                      {previewSource.promotion && (
                        <div className="inline-flex items-center gap-2 bg-black/60 border border-accent/25 rounded-md p-1 backdrop-blur-sm scale-90 origin-left">
                          <div className="bg-accent text-accent-foreground font-extrabold text-[5px] uppercase tracking-wide px-1.5 py-0.5 rounded">
                            {previewSource.promotion.badgeLabel}
                          </div>
                          <span className="text-white font-bold text-[7px]">{previewSource.promotion.badgeText}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative mr-2 flex items-center justify-center">
                      <div className="absolute w-24 h-24 rounded-full border border-accent/20 bg-accent/5" />
                      <div className="relative w-20 h-26 rounded-t-full rounded-b-lg overflow-hidden border border-accent/20 bg-black/40 shadow-lg scale-90">
                        <img src={previewSource.frameImage} alt="model" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="z-10 relative flex justify-between items-center border-t border-white/5 pt-2 mt-auto">
                    <span className="text-[6px] uppercase tracking-wider text-accent">Mockup Desktop View</span>
                    <span className="text-[6px] text-white/40">Campaign: {previewSource.campaignName || 'Default'}</span>
                  </div>
                </div>
              )}

              {/* Tablet Render */}
              {previewViewport === 'tablet' && (
                <div className="w-full max-w-[420px] bg-[#0F0D0C] aspect-[4/3] border border-white/10 rounded-lg overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
                  <div className="absolute inset-0 z-0">
                    <img src={previewSource.bgImage} alt="bg" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/70" />
                  </div>
                  
                  <div className="z-10 relative flex-grow flex flex-col justify-center space-y-3">
                    <div className="text-center space-y-1">
                      <span className="text-accent font-semibold text-[6px] tracking-widest uppercase block">Welcome to Green & Young</span>
                      <h1 className="text-[14px] font-serif font-bold text-white leading-tight">
                        Your Style.<br />Your Confidence.<br />Your Signature Look.
                      </h1>
                    </div>

                    <div className="relative flex items-center justify-center py-2">
                      <div className="absolute w-24 h-24 rounded-full border border-accent/20 bg-accent/5" />
                      <div className="relative w-20 h-26 rounded-t-full rounded-b-lg overflow-hidden border border-accent/20 bg-black/40 shadow-lg">
                        <img src={previewSource.frameImage} alt="model" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </div>
                    </div>

                    {previewSource.promotion && (
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 bg-black/60 border border-accent/25 rounded-md p-1 pr-2 backdrop-blur-sm scale-90">
                          <div className="bg-accent text-accent-foreground font-extrabold text-[5px] uppercase tracking-wide px-1.5 py-0.5 rounded">
                            {previewSource.promotion.badgeLabel}
                          </div>
                          <span className="text-white font-bold text-[7px]">{previewSource.promotion.badgeText}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="z-10 relative flex justify-between items-center border-t border-white/5 pt-2 mt-auto">
                    <span className="text-[6px] uppercase tracking-wider text-accent">Mockup Tablet View</span>
                    <span className="text-[6px] text-white/40">Adaptive Layout</span>
                  </div>
                </div>
              )}

              {/* Mobile Render */}
              {previewViewport === 'mobile' && (
                <div className="w-[220px] bg-[#0F0D0C] h-[360px] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col justify-between p-3">
                  <div className="absolute inset-0 z-0">
                    <img src={previewSource.bgImage} alt="bg" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/75" />
                  </div>
                  
                  <div className="z-10 relative flex-grow flex flex-col justify-center space-y-4 pt-4">
                    <div className="text-center space-y-1">
                      <span className="text-accent font-semibold text-[5px] tracking-widest uppercase block">Welcome to Green & Young</span>
                      <h1 className="text-[11px] font-serif font-bold text-white leading-tight">
                        Your Style.<br />Your Confidence.<br />Your Signature Look.
                      </h1>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-20 h-20 rounded-full border border-accent/20 bg-accent/5" />
                      <div className="relative w-16 h-22 rounded-t-full rounded-b-lg overflow-hidden border border-accent/20 bg-black/40 shadow-lg scale-90">
                        <img src={previewSource.frameImage} alt="model" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </div>
                    </div>

                    {previewSource.promotion && (
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-1.5 bg-black/60 border border-accent/25 rounded-md p-1 backdrop-blur-sm scale-85">
                          <div className="bg-accent text-accent-foreground font-extrabold text-[4.5px] uppercase tracking-wide px-1 py-0.5 rounded">
                            {previewSource.promotion.badgeLabel}
                          </div>
                          <span className="text-white font-bold text-[6px]">{previewSource.promotion.badgeText}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="z-10 relative flex justify-between items-center border-t border-white/5 pt-1.5 mt-auto">
                    <span className="text-[5px] uppercase tracking-wider text-accent">Mockup Mobile View</span>
                    <span className="text-[5px] text-white/40">SEO Bounded</span>
                  </div>
                </div>
              )}

            </div>

            <div className="p-3 bg-muted rounded-xl border border-border flex gap-2 items-start">
              <Activity className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-foreground/70">A/B Testing Config</span>
                <p className="text-[9px] text-muted-foreground leading-normal">
                  If multiple published slides are created for the same package/category, the site will randomly rotate them for users, tracking impressions/clicks independently so you can measure which image yields the best CTR.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
