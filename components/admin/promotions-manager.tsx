'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Edit2, Check, AlertCircle, Tag } from 'lucide-react'
import { createPromotion, updatePromotion, deletePromotion } from '@/app/admin/actions/promotions'

interface PromotionData {
  id: string
  name: string
  badgeLabel: string
  badgeText: string
  active: boolean
}

interface Props {
  promotions: PromotionData[]
}

export default function PromotionsManager({ promotions }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [badgeLabel, setBadgeLabel] = useState('Limited Offer')
  const [badgeText, setBadgeText] = useState('')
  const [active, setActive] = useState(true)

  const handleEditClick = (promo: PromotionData) => {
    setIsEditing(true)
    setEditId(promo.id)
    setName(promo.name)
    setBadgeLabel(promo.badgeLabel)
    setBadgeText(promo.badgeText)
    setActive(promo.active)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditId(null)
    setName('')
    setBadgeLabel('Limited Offer')
    setBadgeText('')
    setActive(true)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name) {
      setError('Internal promotion name is required.')
      return
    }
    if (!badgeText) {
      setError('Public badge text is required.')
      return
    }

    try {
      setIsSubmitting(true)
      const data = { name, badgeLabel, badgeText, active }

      let res
      if (editId) {
        res = await updatePromotion(editId, data)
      } else {
        res = await createPromotion(data)
      }

      if (res.success) {
        setSuccess(editId ? 'Promotion updated successfully!' : 'Promotion created successfully!')
        handleCancel()
        router.refresh()
      } else {
        setError(res.error || 'Failed to save promotion.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promotion? Linked slides will clear their promotions.')) return
    setError(null)
    setSuccess(null)
    try {
      const res = await deletePromotion(id)
      if (res.success) {
        setSuccess('Promotion deleted successfully!')
        router.refresh()
      } else {
        setError(res.error || 'Failed to delete promotion.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  const handleStatusToggle = async (promo: PromotionData) => {
    try {
      const res = await updatePromotion(promo.id, { active: !promo.active })
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
                  {isEditing ? 'Edit Promotion Campaign' : 'Create New Promotion'}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">Setup reusable promo offers, campaign badges, and seasonal rewards.</p>
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
              <div className="space-y-1">
                <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Internal Promotion Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                  placeholder="e.g. Summer Campaign 2026"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Badge Label (Public)</label>
                  <input
                    type="text"
                    value={badgeLabel}
                    onChange={(e) => setBadgeLabel(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                    placeholder="e.g. Limited Offer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-foreground/60 font-semibold uppercase tracking-wider text-[9px]">Badge Text / Offer (Public)</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-accent/40"
                    placeholder="e.g. Save ₹500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded border-border bg-background text-accent focus:ring-accent"
                  />
                  <span className="font-semibold text-foreground/70">Promotion campaign is active</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-accent hover:brightness-110 text-accent-foreground font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Promotion'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: List of promotions (Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">Configured Promotions</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Monitor reusable campaign badges linked to your active hero slides.</p>
            </div>

            {promotions.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic py-6 text-center border border-dashed border-border rounded-xl bg-muted/40">
                No promotions created yet. Add your first promotion to attach to hero slides.
              </p>
            ) : (
              <div className="space-y-3">
                {promotions.map((promo) => (
                  <div 
                    key={promo.id} 
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      promo.active 
                        ? 'border-border bg-card hover:bg-muted/30' 
                        : 'border-dashed border-border bg-muted/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 text-accent mt-0.5">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-serif font-bold text-foreground text-[11px] block">{promo.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-1 bg-muted border border-accent/25 rounded px-1.5 py-0.5">
                            <span className="bg-accent text-accent-foreground font-extrabold text-[5px] uppercase tracking-wide px-1 rounded scale-90">
                              {promo.badgeLabel}
                            </span>
                            <span className="text-foreground font-bold text-[7px]">{promo.badgeText}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <button
                        onClick={() => handleStatusToggle(promo)}
                        className={`px-2 py-1.5 rounded-lg border text-[9px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                          promo.active 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {promo.active ? 'Active' : 'Paused'}
                      </button>

                      <button
                        onClick={() => handleEditClick(promo)}
                        className="p-2 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all text-foreground/70 cursor-pointer"
                        title="Edit Settings"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 rounded-lg bg-card border border-border hover:bg-rose-500 hover:text-white transition-all text-foreground/70 cursor-pointer"
                        title="Delete Promotion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
