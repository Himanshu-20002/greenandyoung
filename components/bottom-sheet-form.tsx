'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  Zap,
  Lock,
  Compass,
  User,
  Phone,
  Mail,
  Building2,
  Home,
  Sparkles,
  Layers,
  Briefcase,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const PROPERTY_TYPES = [
  { id: '3-bhk', label: '3 BHK Complete Setup', icon: Home },
  { id: '4-bhk-penthouse', label: '4 BHK / Penthouse', icon: Sparkles },
  { id: 'luxury-villa', label: 'Luxury Villa', icon: Compass },
  { id: 'modular-kitchen', label: 'Modular Kitchen', icon: Layers },
  { id: 'commercial', label: 'Commercial / Office', icon: Briefcase },
]

const LOCATIONS = [
  'Noida Expressway & Sectors',
  'Greater Noida & Pari Chowk',
  'Central & South Delhi',
  'Gurugram / Golf Course Ext.',
  'Other Delhi NCR',
]

interface BottomSheetFormProps {
  isOpen?: boolean
  onClose?: () => void
}

export function BottomSheetForm({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: BottomSheetFormProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalOpen

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalOpen(false)
    }
  }

  // Global event listener & hash listener to open from anywhere
  useEffect(() => {
    const handleGlobalTrigger = (e?: Event) => {
      e?.preventDefault()
      if (isControlled && controlledOnClose) {
        // Parent controlled
      } else {
        setInternalOpen(true)
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#plan-dream-home' || hash === '#estimate' || hash === '#booking') {
        setInternalOpen(true)
      }
    }

    window.addEventListener('open-estimate-sheet', handleGlobalTrigger)
    window.addEventListener('hashchange', handleHashChange)

    // Check initial hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash === '#plan-dream-home' || hash === '#estimate') {
        setInternalOpen(true)
      }
    }

    return () => {
      window.removeEventListener('open-estimate-sheet', handleGlobalTrigger)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [isControlled, controlledOnClose])

  // Prevent background scroll when open without frame-0 layout reflow
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }
    // Delay scroll lock slightly so GPU slide-up animation begins with zero layout reflow
    const timer = setTimeout(() => {
      document.body.style.overflow = 'hidden'
    }, 120)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Form State
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [propertyName, setPropertyName] = useState('')
  const [selectedType, setSelectedType] = useState('3 BHK Complete Setup')
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone / WhatsApp number.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          propertyName,
          propertyType: selectedType,
          location: selectedLocation,
          notes,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit estimate request.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try WhatsApp directly.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setFullName('')
    setPhone('')
    setEmail('')
    setPropertyName('')
    setNotes('')
    setErrorMessage('')
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* High-Performance Backdrop Overlay (zero filter blur lag on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 sm:bg-black/75 sm:backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Bottom Sheet Container (Hardware-Accelerated GPU Sheet Animation) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
            className="relative w-full max-w-xl bg-[#090F0C] border-t sm:border border-[#C5A880]/30 sm:rounded-3xl rounded-t-[28px] shadow-2xl max-h-[92vh] sm:max-h-[88vh] h-auto flex flex-col overflow-hidden text-neutral-200 z-10 transform-gpu"
          >
            {/* Ambient Radial Luxury Glow (GPU gradient instead of CPU blur filter) */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, transparent 70%)',
              }}
            />

            {/* Mobile Drag Handle Pill */}
            <div className="pt-2.5 pb-1 flex justify-center items-center sm:hidden shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header Bar - Slightly taller & balanced */}
            <div className="px-5 sm:px-7 pt-2.5 pb-3 border-b border-white/10 flex items-center justify-between gap-3 shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase font-serif leading-tight">
                    Plan Your Dream Home
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-none mt-0.5">
                    3D Measurement &amp; Complete Home Quotation
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body - Fits all content directly without internal scrollbar */}
            <div className="px-5 sm:px-7 py-3.5 space-y-3.5 flex-grow overflow-hidden">
              {submitted ? (
                /* Success Confirmation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-serif font-bold text-white">
                      Request Confirmed
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{fullName}</span>. Our Senior Design Architect will review your specifications for <span className="text-[#C5A880]">{selectedType}</span> and contact you within 2 business hours.
                    </p>
                  </div>

                  {/* Immediate WhatsApp Action */}
                  <div className="pt-2 max-w-sm mx-auto space-y-2.5">
                    <a
                      href={`https://wa.me/+919971813161?text=Hi%20Green%20%26%20Young%2C%20I%20just%20submitted%20a%20request%20for%20my%20${encodeURIComponent(selectedType)}%20at%20${encodeURIComponent(propertyName || selectedLocation)}.%20Looking%20forward%20to%20the%203D%20blueprint!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Instant Chat on WhatsApp
                    </a>
                    <button
                      onClick={resetForm}
                      className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Balanced Form with Slightly Increased Height & Zero Scrolling */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* 3 Trust Highlight Cards - Sleek Micro Strip */}
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-semibold text-white">&lt; 24h Turnaround</span>
                    </div>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold text-white">100% Confidential</span>
                    </div>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span className="font-semibold text-white">Senior Lead Direct</span>
                    </div>
                  </div>

                  {/* Section 1: Homeowner Contact Details */}
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A880] uppercase block mb-1.5">
                      1. HOMEOWNER CONTACT DETAILS
                    </span>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Full Name */}
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name *"
                          className="w-full bg-[#111A15] border border-white/10 rounded-xl pl-8 pr-2.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone / WhatsApp *"
                          className="w-full bg-[#111A15] border border-white/10 rounded-xl pl-8 pr-2.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-[#111A15] border border-white/10 rounded-xl pl-8 pr-2.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all"
                        />
                      </div>

                      {/* Society / Property Name */}
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                        <input
                          type="text"
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                          placeholder="Society / Property"
                          className="w-full bg-[#111A15] border border-white/10 rounded-xl pl-8 pr-2.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Property Configuration & Scope */}
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A880] uppercase block mb-1.5">
                      2. PROPERTY CONFIGURATION &amp; LOCATION
                    </span>

                    {/* Compact Chips Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                      {PROPERTY_TYPES.map((type) => {
                        const Icon = type.icon
                        const isSelected = selectedType === type.label
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() => setSelectedType(type.label)}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-center border text-[11px] font-medium transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#C5A880]/25 to-[#A38356]/20 border-[#C5A880] text-white shadow-xs'
                                : 'bg-[#111A15] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#C5A880]' : 'text-neutral-500'}`} />
                            <span className="truncate">{type.label.replace(' Complete Setup', '')}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Location Selector */}
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full bg-[#111A15] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-all appearance-none cursor-pointer"
                      >
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#090F0C] text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Section 3: Aspirations & Timeline */}
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A880] uppercase block mb-1.5">
                      3. DESIGN ASPIRATIONS &amp; TIMELINE (OPTIONAL)
                    </span>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Possession in 60 days, minimalist German Blum kitchen..."
                      className="w-full bg-[#111A15] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit CTA Button - Slightly taller & prominent */}
                  <div className="pt-1 space-y-1.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#FFEAA7] to-[#B59250] hover:from-[#F0D598] hover:to-[#C5A880] text-black font-extrabold text-xs sm:text-[13px] uppercase tracking-wider shadow-[0_4px_20px_rgba(223,186,115,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Request Estimate</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>Strict NDA Protected • Free 3D Measurement &amp; Blueprint</span>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Quick Bar */}
            <div className="px-5 sm:px-7 py-2.5 bg-[#060B08] border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 shrink-0">
              <span className="text-[11px]">Need immediate consultation?</span>
              <a
                href={siteConfig.whatsapp.directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium text-[11px] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Utility trigger for buttons anywhere on the site
export function openEstimateSheet() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-estimate-sheet'))
  }
}
