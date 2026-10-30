'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { packageSchema } from '@/lib/schemas'
import { updateExperiencePackage } from '@/app/admin/actions/packages'
import { Plus, Trash2, Upload, AlertCircle, Check } from 'lucide-react'

interface Category {
  id: string
  name: string
  gender: string
  slug: string
}

interface Service {
  id: string
  name: string
  categoryId: string
}

interface Props {
  categories: Category[]
  services: Service[]
  initialData: {
    id: string
    title: string
    slug: string
    description: string
    heroImage: string
    durationMinutes: number
    startingPrice: number
    badge: string
    genderType: string
    categoryId: string
    serviceIds: string[]
    faqs: { question: string; answer: string }[]
    portfolioImages: string[]
    active: boolean
  }
}

export default function PackageEditForm({ categories, services, initialData }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false)

  const { register, handleSubmit, control, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: initialData.title || '',
      slug: initialData.slug || '',
      description: initialData.description || '',
      heroImage: initialData.heroImage || '',
      durationMinutes: initialData.durationMinutes || 60,
      startingPrice: initialData.startingPrice || 1000,
      badge: initialData.badge || '',
      genderType: (initialData.genderType || 'WOMEN') as 'WOMEN' | 'MEN' | 'UNISEX',
      categoryId: initialData.categoryId || categories[0]?.id || '',
      serviceIds: initialData.serviceIds || [],
      faqs: initialData.faqs || [],
      portfolioImages: initialData.portfolioImages || [],
      active: initialData.active !== false
    }
  })

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control,
    name: 'faqs'
  })

  const selectedCategoryId = watch('categoryId')
  const watchHeroImage = watch('heroImage')
  const watchPortfolioImages = watch('portfolioImages') || []

  // Suggest slug from title (only if not already set or custom modified)
  const watchTitle = watch('title')
  useEffect(() => {
    if (watchTitle && !initialData.id) {
      const suggested = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setValue('slug', suggested, { shouldValidate: true })
    }
  }, [watchTitle, setValue, initialData.id])

  // Filter services by selected Category
  const categoryServices = services.filter(s => s.categoryId === selectedCategoryId)

  // File Upload Helper (converts to base64 and posts to /api/upload)
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

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploadingHero(true)
      const url = await uploadFile(file, 'hero-packages')
      setValue('heroImage', url, { shouldValidate: true })
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploadingHero(false)
    }
  }

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    try {
      setUploadingPortfolio(true)
      const urls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i], 'portfolio')
        urls.push(url)
      }
      setValue('portfolioImages', [...(watchPortfolioImages || []), ...urls], { shouldValidate: true })
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploadingPortfolio(false)
    }
  }

  const handleRemovePortfolioImage = (idx: number) => {
    const updated = (watchPortfolioImages || []).filter((_, i) => i !== idx)
    setValue('portfolioImages', updated)
  }

  const onSubmit = async (data: any) => {
    setError(null)
    try {
      const res = await updateExperiencePackage(initialData.id, data)
      if (res.success) {
        router.push('/admin/catalog/packages')
        router.refresh()
      } else {
        setError(res.error)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl bg-[#0c0c0c] border border-[#1a1a1a] p-8 rounded-2xl shadow-md text-xs text-white">
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Basic Package Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Package Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
            placeholder="e.g. Signature Golden Glow Face Ritual"
          />
          {errors.title && <span className="text-rose-400 text-[10px]">{errors.title.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Slug (URL Segment)</label>
          <input
            type="text"
            {...register('slug')}
            className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-accent/40"
            placeholder="e.g. signature-golden-glow-face-ritual"
          />
          {errors.slug && <span className="text-rose-400 text-[10px]">{errors.slug.message}</span>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Package Description</label>
        <textarea
          rows={3}
          {...register('description')}
          className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40 leading-relaxed"
          placeholder="Detailed architectural narrative describing the interior scope, bespoke millwork, materials, and spatial transformation..."
        />
        {errors.description && <span className="text-rose-400 text-[10px]">{errors.description.message}</span>}
      </div>

      {/* Grid for Price, duration, category & badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Starting Price (INR)</label>
          <input
            type="number"
            {...register('startingPrice')}
            className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
          />
          {errors.startingPrice && <span className="text-rose-400 text-[10px]">{errors.startingPrice.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Duration (Minutes)</label>
          <input
            type="number"
            {...register('durationMinutes')}
            className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
          />
          {errors.durationMinutes && <span className="text-rose-400 text-[10px]">{errors.durationMinutes.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Category Assignment</label>
          <select
            {...register('categoryId')}
            className="w-full bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name} ({cat.gender})</option>
            ))}
          </select>
          {errors.categoryId && <span className="text-rose-400 text-[10px]">{errors.categoryId.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Division & Badge Selection</label>
          <div className="flex gap-2">
            <select
              {...register('genderType')}
              className="flex-grow bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
            >
              <option value="WOMEN">Women</option>
              <option value="MEN">Men</option>
              <option value="UNISEX">Unisex</option>
            </select>
            <select
              {...register('badge')}
              className="flex-grow bg-[#121212] border border-[#1a1a1a] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent/40"
            >
              <option value="">No Badge</option>
              <option value="MOST BOOKED">Most Booked</option>
              <option value="PREMIUM">Premium</option>
              <option value="SIGNATURE">Signature</option>
              <option value="POPULAR">Popular</option>
              <option value="HOLISTIC">Holistic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Multi-Service Select */}
      <div className="space-y-3">
        <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px] block">Select Services Included in Package</label>
        {categoryServices.length === 0 ? (
          <p className="text-[10px] text-amber-400 italic">No services created under the selected Category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-[#121212] border border-[#1a1a1a] rounded-xl">
            {categoryServices.map((srv) => (
              <label key={srv.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all">
                <input
                  type="checkbox"
                  value={srv.id}
                  {...register('serviceIds')}
                  className="rounded border-[#1a1a1a] bg-[#0c0c0c] text-accent focus:ring-accent"
                />
                <span className="text-white/80 font-medium select-none">{srv.name}</span>
              </label>
            ))}
          </div>
        )}
        {errors.serviceIds && <span className="text-rose-400 text-[10px] block">{errors.serviceIds.message}</span>}
      </div>

      {/* Hero Image Upload */}
      <div className="space-y-3">
        <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px] block">Hero Cover Image (Cloudinary)</label>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-grow w-full">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1a1a1a] hover:border-accent/40 bg-[#121212] h-32 rounded-xl cursor-pointer group transition-all">
              <div className="flex flex-col items-center justify-center space-y-1">
                <Upload className="w-6 h-6 text-white/45 group-hover:text-accent transition-all" />
                <span className="text-[10px] text-white/50">{uploadingHero ? 'Uploading to Cloudinary...' : 'Click to Upload Hero Image'}</span>
              </div>
              <input type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" />
            </label>
          </div>
          {watchHeroImage && (
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-[#1a1a1a] flex-shrink-0 bg-white/5">
              <img src={watchHeroImage} alt="Hero preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        {errors.heroImage && <span className="text-rose-400 text-[10px] block">{errors.heroImage.message}</span>}
      </div>

      {/* Portfolio Lookbook Upload */}
      <div className="space-y-3">
        <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px] block">Portfolio Lookbook Images (Multi-select / Add & Delete)</label>
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1a1a1a] hover:border-accent/40 bg-[#121212] h-20 rounded-xl cursor-pointer group transition-all">
            <div className="flex flex-col items-center justify-center space-y-1">
              <Upload className="w-5 h-5 text-white/45 group-hover:text-accent transition-all" />
              <span className="text-[10px] text-white/50">{uploadingPortfolio ? 'Uploading images...' : 'Select Lookbook Photos to Add'}</span>
            </div>
            <input type="file" multiple accept="image/*" onChange={handlePortfolioUpload} className="hidden" />
          </label>

          {watchPortfolioImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 p-3 bg-[#121212] border border-[#1a1a1a] rounded-xl">
              {watchPortfolioImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#1a1a1a] group bg-white/5">
                  <img src={img} alt="Lookbook" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePortfolioImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 hover:bg-rose-500 text-white transition-all shadow"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Curated FAQs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-white/60 font-semibold uppercase tracking-wider text-[9px]">Curated FAQs</label>
          <button
            type="button"
            onClick={() => appendFaq({ question: '', answer: '' })}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-[#1a1a1a] text-white/70 hover:text-white rounded-lg transition-all flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
          >
            <Plus className="w-3 h-3" />
            Add FAQ
          </button>
        </div>

        {faqFields.length === 0 ? (
          <p className="text-[10px] text-white/45 italic py-2 text-center bg-[#121212] border border-dashed border-[#1a1a1a] rounded-xl">No FAQ entries created.</p>
        ) : (
          <div className="space-y-3">
            {faqFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-[#121212] border border-[#1a1a1a] rounded-xl flex items-start gap-4">
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    required
                    {...register(`faqs.${index}.question` as const)}
                    placeholder="Question"
                    className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent/40"
                  />
                  <input
                    type="text"
                    required
                    {...register(`faqs.${index}.answer` as const)}
                    placeholder="Detailed Answer..."
                    className="w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="p-2 bg-[#0c0c0c] hover:bg-rose-500/10 text-white/45 hover:text-rose-400 border border-[#1a1a1a] rounded-lg transition-all self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toggle & Submit */}
      <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            {...register('active')}
            className="rounded border-[#1a1a1a] bg-[#0c0c0c] text-accent focus:ring-accent"
          />
          <span className="font-semibold text-white/70">Show package immediately in live catalog</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-accent text-accent-foreground font-bold uppercase tracking-wider rounded-xl hover:bg-accent/90 transition-all flex items-center gap-1.5 shadow-md"
        >
          <Check className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
