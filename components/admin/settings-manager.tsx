'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Check, AlertCircle, Upload, Save, Image as ImageIcon } from 'lucide-react'
import { updateSiteSettings } from '@/app/admin/actions/settings'

interface Props {
  initialAboutImage: string
}

export default function SettingsManager({ initialAboutImage }: Props) {
  const router = useRouter()
  const [aboutImage, setAboutImage] = useState(initialAboutImage)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'settings')
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to upload photo.')
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
      setAboutImage(url)
      setSuccess('Our Story photo uploaded successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveSettings = async () => {
    setError(null)
    setSuccess(null)
    setSaving(true)

    try {
      const res = await updateSiteSettings({
        aboutImage
      })

      if (res.success) {
        setSuccess('Site settings updated successfully!')
        router.refresh()
      } else {
        setError(res.error || 'Failed to save settings.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 text-xs text-foreground">
      {/* Alert Messages */}
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
        {/* Left Column: Form Settings (Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">
                General Site Configurations
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Customize global visual sections and media assets of the landing page.
              </p>
            </div>

            <div className="space-y-6">
              {/* Our Story image configuration */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">
                    Our Story Section Image
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Select or upload a luxury architectural image demonstrating our turnkey execution and craftsmanship.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* File Input Uploader */}
                  <label className="flex flex-col items-center justify-center border border-dashed border-border hover:border-accent hover:bg-muted/30 rounded-xl p-4 w-full sm:w-56 h-36 cursor-pointer group transition-all text-center relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-accent mb-2 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span className="text-[10px] text-foreground font-bold uppercase tracking-wider">
                      {uploading ? 'Uploading...' : 'Upload New Photo'}
                    </span>
                    <span className="text-[8px] text-muted-foreground mt-1 block">
                      JPEG, PNG or WEBP format
                    </span>
                  </label>

                  <div className="w-full sm:flex-grow space-y-2">
                    <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">
                      Or Paste Image Path/URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aboutImage}
                        onChange={(e) => setAboutImage(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40 font-mono text-[10px]"
                        placeholder="e.g. /images/interiors/penthouse-living.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Save Button */}
              <div className="pt-4 flex justify-end border-t border-border/60">
                <button
                  onClick={handleSaveSettings}
                  disabled={saving || uploading}
                  className="px-6 py-3 bg-accent hover:brightness-110 text-accent-foreground font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview (Span 5) */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">
                Media Preview
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Visual presentation of the selected image in the "Our Story" section framework.
              </p>
            </div>

            <div className="my-auto flex justify-center py-4">
              <div className="relative w-56 aspect-[3/4] rounded-[24px] overflow-hidden border border-accent/25 shadow-2xl bg-black">
                {aboutImage ? (
                  <Image
                    src={aboutImage}
                    alt="Our Story Media Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <ImageIcon className="w-8 h-8 opacity-40 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">No Image Configured</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="px-2 py-0.5 rounded-full bg-accent/25 backdrop-blur-md border border-accent/30 text-[8px] uppercase tracking-widest text-accent font-bold">
                    Est. 2016
                  </span>
                  <h4 className="text-white font-bold text-sm mt-1 tracking-tight">Design Excellence</h4>
                  <p className="text-white/70 text-[9px] mt-0.5">Behind the scenes at Green & Young</p>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/80 italic text-center">
              Make sure to save configurations to commit changes to the live site.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
