'use client'

import React from 'react'
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
} from 'lucide-react'
import { GY_28_DESIGN_ELEMENTS } from '@/lib/interior-packages'

export function Services() {

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
              <span>/ TURNKEY CAPABILITIES · 3D DESIGN &amp; MEASUREMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#121614] tracking-tight">
              Interior Architecture &amp;<br /> Turnkey Services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#2C3531]/75 max-w-xl font-sans leading-relaxed">
            From bare-shell 3D laser measurement to factory-calibrated German millwork, explore our comprehensive interior solutions for luxury residences across Delhi NCR.
          </p>
        </div>

        




        {/* Cinematic Video Showcase & 3D Interior Configurator Banner */}
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden mb-16 shadow-2xl border border-[#2C3531]/15 group min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center p-6 sm:p-10 md:p-14 text-center">
          {/* Background Loop Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-bg-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out pointer-events-none"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Dark & Gold Atmosphere Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/95 via-[#0B0F0D]/75 to-[#0B0F0D]/60 pointer-events-none" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.2)_0%,transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Center Interactive Hero Card */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/40 text-[#E8D8C4] text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              <span>/ BESPOKE INTERIOR CONFIGURATOR</span>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
              Design Your Luxury Home, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#C5A880] via-[#F4E6D0] to-[#C5A880] bg-clip-text text-transparent">
                Space by Space
              </span>
            </h3>

            {/* Narrative Subtitle */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-white/80 max-w-2xl font-sans leading-relaxed text-balance">
              Take complete architectural control. Select your room, explore curated German joinery and Italian stone finishes, assemble your custom combinations, and receive a tailored quotation.
            </p>

            {/* 6-Step Visual Journey Flow */}
            <div className="hidden md:flex items-center gap-2 my-7 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/70">
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
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Gallery Explorer */}
              <Link
                href="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
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
              Seamless Turnkey Experience
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {/* 01: Meet Designer */}
            <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFBA73]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg  border border-white/10 flex items-center justify-center text-green/70 bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-base font-mono font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">01</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                  Meet Designer
                </h4>
                <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                  One-on-one session with our senior interior designer to understand your vision, lifestyle, and floor plan.
                </p>
              </div>
              <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                <span className="h-full rounded-full bg-[#DFBA73] w-10 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
              </div>
            </div>

            {/* 02: Creative Design */}
            <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFBA73]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <span className="text-base font-mono font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">02</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                  Creative Design
                </h4>
                <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                  Custom 3D walkthroughs, moodboards, and space planning tailored to your exact taste and budget.
                </p>
              </div>
              <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                <span className="h-full rounded-full bg-[#DFBA73] w-10 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
              </div>
            </div>

            {/* 03: Fast Execution */}
            <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFBA73]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-base font-mono font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">03</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                  Fast Execution
                </h4>
                <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                  Factory-calibrated modular manufacturing and rapid on-site assembly with zero delay guarantee.
                </p>
              </div>
              <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                <span className="h-full rounded-full bg-[#DFBA73] w-10 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
              </div>
            </div>

            {/* 04: Material Guarantee */}
            <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFBA73]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-base font-mono font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">04</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                  Material Guarantee
                </h4>
                <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                  10-year warranty with 100% genuine BWR marine plywood, German Blum hardware, and certified materials.
                </p>
              </div>
              <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                <span className="h-full rounded-full bg-[#DFBA73] w-10 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
              </div>
            </div>

            {/* 05: Live CCTV Feed */}
            <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DFBA73]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-base font-mono font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">05</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                  Live CCTV Feed
                </h4>
                <p className="text-xs text-[#8E9F96] leading-relaxed mb-3.5">
                  24/7 high-definition live site cameras accessible right from your smartphone for complete peace of mind.
                </p>
              </div>
              <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                <span className="h-full rounded-full bg-[#DFBA73] w-10 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
