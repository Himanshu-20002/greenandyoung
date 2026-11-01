'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  PhoneCall,
  UserCheck,
  PenTool,
  Zap,
  ShieldCheck,
  Video,
  Compass,
  Layers,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { GY_28_DESIGN_ELEMENTS } from '@/lib/interior-packages'

const PILLARS = [
  {
    number: '01',
    title: 'Meet Designer',
    icon: UserCheck,
    desc: 'One-on-one session with our senior interior designer to understand your vision, lifestyle, and floor plan.',
  },
  {
    number: '02',
    title: 'Creative Design',
    icon: PenTool,
    desc: 'Custom 3D walkthroughs, moodboards, and space planning tailored to your exact taste and budget.',
  },
  {
    number: '03',
    title: 'Fast Execution',
    icon: Zap,
    desc: 'Factory-calibrated modular manufacturing and rapid on-site assembly with zero delay guarantee.',
  },
  {
    number: '04',
    title: 'Material Guarantee',
    icon: ShieldCheck,
    desc: '10-year warranty with 100% genuine BWR marine plywood, German Blum hardware, and certified materials.',
  },
  {
    number: '05',
    title: 'Live CCTV Feed',
    icon: Video,
    desc: '24/7 high-definition live site cameras accessible right from your smartphone for complete peace of mind.',
  },
]

const isHoverDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function Services() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activePillar, setActivePillar] = useState<number | null>(null)

  // 120 FPS Optimization: Pause video decoding when scrolled off-screen or during fast scrolling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isVisible = false
    let scrollTimeout: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1, rootMargin: '100px 0px' }
    )

    observer.observe(video)

    // Smooth scroll boost: pause video decoding during active scrolling to free GPU compositor
    const handleScroll = () => {
      if (!isVisible) return
      if (!video.paused) {
        video.pause()
      }
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (isVisible) {
          video.play().catch(() => {})
        }
      }, 180)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] relative overflow-hidden select-none border-b border-[#2C3531]/10">
      {/* Subtle CAD Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #121614 1px, transparent 1px), linear-gradient(to bottom, #121614 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1700px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-[#2C3531]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121614]/5 border border-[#121614]/10 text-[#8C6D3F] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>/ COMPLETE HOME SETUP · 3D DESIGN &amp; MEASUREMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#121614] tracking-tight">
              Interior Architecture &amp;<br /> Complete Home Setup
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2C3531]/75 max-w-xl font-sans leading-relaxed">
            From bare-shell 3D laser measurement to factory-calibrated German millwork, explore our comprehensive interior solutions for luxury residences across Delhi NCR.
          </p>
        </div>

        




        {/* Cinematic Video Showcase & 3D Interior Configurator Banner (Optimized for locked 120 FPS) */}
        <div
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden mb-16 shadow-xl border border-[#2C3531]/15 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center p-6 sm:p-10 md:p-14 text-center"
        >
          {/* Background Loop Video with Intelligent Pause */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            poster="/videos/hero-bg-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Dark & Gold Atmosphere Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/60 via-[#0B0F0D]/35 to-[#0B0F0D]/20 pointer-events-none" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.2)_0%,transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Center Interactive Hero Card (Uses clean translucent fills instead of costly backdrop-blur for 120 FPS) */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18201C]/85 border border-[#C5A880]/40 text-[#E8D8C4] text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>/ BESPOKE INTERIOR CONFIGURATOR</span>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance drop-shadow-md">
              Design Your Luxury Home, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#C5A880] via-[#F4E6D0] to-[#C5A880] bg-clip-text text-transparent">
                Space by Space
              </span>
            </h3>

            {/* Narrative Subtitle */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-white/95 max-w-2xl font-sans leading-relaxed text-balance drop-shadow">
              Take complete architectural control. Select your room, explore curated German joinery and Italian stone finishes, assemble your custom combinations, and receive a tailored quotation.
            </p>

            {/* 6-Step Visual Journey Flow */}
            <div className="hidden md:flex items-center gap-2 my-7 px-5 py-2.5 rounded-full bg-[#111613]/90 border border-white/10 text-[11px] font-mono text-white/70">
              <span className="text-[#C5A880] font-semibold">1. Select Space</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span>2. Explore Designs</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span>3. Customize Finishes</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span>4. Build Combination</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#C5A880] font-semibold">5. Get Custom Quote</span>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mt-6 md:mt-0">
              {/* Primary Configurator Launch CTA */}
              <Link
                href="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#E2CDAE] to-[#C5A880] text-[#121614] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(197,168,128,0.35)] hover:shadow-[0_0_45px_rgba(197,168,128,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
              >
                <Compass className="w-4 h-4 text-[#121614] group-hover/btn:rotate-45 transition-transform duration-300" />
                <span>Launch Interior Configurator</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>

              {/* Secondary Gallery Explorer */}
              <Link
                href="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#18201C]/85 hover:bg-[#202B25] border border-white/20 text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Explore Design Gallery</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 28-Element Interactive Design Cloud (Directly from greenandyoung.in) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#2C3531]/10 shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#2C3531]/10">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C6D3F] block mb-1">
                COMPREHENSIVE RESIDENTIAL CATALOG
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#121614]">
                We Design &amp; Fabricate All 28 Spaces Across Your Home
              </h3>
            </div>
            <a
              href="tel:+919971813161"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121614]/5 hover:bg-[#121614] text-[#121614] hover:text-white text-xs font-mono font-bold tracking-wider transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct Talk: +91 99718 13161</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {GY_28_DESIGN_ELEMENTS.map((element, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#2C3531]/15 text-[#2C3531] text-xs font-medium font-sans hover:border-[#C5A880] hover:bg-white hover:text-[#121614] transition-all cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                {element}
              </span>
            ))}
          </div>
        </div>

        {/* 5 Pillars: Meet Designer, Creative Design, Fast Execution, Material Guarantee, Live CCTV Feed */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121614] text-white shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-mono tracking-widest uppercase text-[#DFBA73] block mb-2">
              THE GREEN &amp; YOUNG STANDARD
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5]">
              Seamless Complete Home Setup
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pt-1" onMouseLeave={() => { if (isHoverDevice()) setActivePillar(null) }}>
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              const isActive = activePillar === idx

              return (
                <div
                  key={pillar.number}
                  onPointerDown={(e) => {
                    if (e.pointerType === 'touch') {
                      setActivePillar(idx)
                    }
                  }}
                  onPointerUp={() => setActivePillar(null)}
                  onPointerCancel={() => setActivePillar(null)}
                  onPointerLeave={() => setActivePillar(null)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse' && isHoverDevice()) {
                      setActivePillar(idx)
                    }
                  }}
                  onClick={() => setActivePillar(null)}
                  className={`group p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none touch-manipulation ${
                    isActive
                      ? 'bg-white/[0.08] border border-[#DFBA73]/60 -translate-y-1 shadow-[0_8px_25px_rgba(223,186,115,0.15)]'
                      : 'bg-white/5 border border-white/10 sm:hover:border-[#DFBA73]/50 sm:hover:-translate-y-1 sm:hover:bg-white/[0.07]'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                          isActive
                            ? 'bg-[#DFBA73] text-[#121614] border-[#DFBA73] scale-105 shadow-sm shadow-[#DFBA73]/30'
                            : 'bg-white/5 border-white/10 text-white/70 sm:group-hover:bg-[#DFBA73] sm:group-hover:text-[#121614] sm:group-hover:border-[#DFBA73] sm:group-hover:scale-105'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-base font-mono font-bold transition-colors duration-300 ${
                          isActive
                            ? 'text-[#DFBA73]/60'
                            : 'text-white/20 sm:group-hover:text-[#DFBA73]/40'
                        }`}
                      >
                        {pillar.number}
                      </span>
                    </div>
                    <h4
                      className={`text-sm font-serif font-bold mb-1.5 transition-colors duration-300 ${
                        isActive
                          ? 'text-[#DFBA73]'
                          : 'text-white sm:group-hover:text-[#DFBA73]'
                      }`}
                    >
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1 overflow-hidden">
                    <span
                      className={`h-full rounded-full bg-[#DFBA73] transition-all duration-500 ease-out ${
                        isActive
                          ? 'w-full shadow-[0_0_16px_rgba(223,186,115,0.85)]'
                          : 'w-10 sm:group-hover:w-full shadow-[0_0_8px_rgba(223,186,115,0.4)] sm:group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
