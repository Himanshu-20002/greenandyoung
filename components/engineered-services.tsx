'use client'

import React, { useState } from 'react'
import {
  Compass,
  Layers,
  Sparkles,
  Wind,
  Volume2,
  ShieldCheck,
} from 'lucide-react'

interface CapabilityItem {
  id: string
  number: string
  title: string
  description: string
  icon: React.ElementType
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'bim-survey',
    number: '01',
    title: '3D BIM & LASER SURVEY',
    description:
      'Submillimeter 3D spatial scanning of bare-shell residences to build collision-free digital twin architectural blueprints.',
    icon: Compass,
  },
  {
    id: 'modular-joinery',
    number: '02',
    title: 'GERMAN MODULAR JOINERY',
    description:
      'Cleanroom factory CNC fabrication with Blum soft-close hardware, PUR laser edge-banding, and anti-termite marine ply.',
    icon: Layers,
  },
  {
    id: 'stone-masonry',
    number: '03',
    title: 'ITALIAN STONE & MASONRY',
    description:
      'Laser-cut Italian marble bookmatching, double-height fluted stone feature walls, and acoustic structural drywall.',
    icon: Sparkles,
  },
  {
    id: 'mep-climate',
    number: '04',
    title: 'CONCEALED MEP & CLIMATE',
    description:
      'Integrated Daikin VRV air conditioning plenums, acoustic drainage conduits, and automated DALI mood lighting coves.',
    icon: Wind,
  },
  {
    id: 'acoustics-cinema',
    number: '05',
    title: 'ACOUSTICS & HOME CINEMA',
    description:
      'Decibel-calibrated acoustic fabric wall panelling, concealed subwoofers, and motorized smart blackout drapery.',
    icon: Volume2,
  },
  {
    id: 'turnkey-pm',
    number: '06',
    title: 'WHITE-GLOVE PROJECT MANAGEMENT',
    description:
      'Dedicated on-site chartered project engineer, single-point accountability, 150-point audit, and strict timeline handover.',
    icon: ShieldCheck,
  },
]

const isHoverDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function EngineeredServices() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  return (
    <section
      id="capabilities"
      className="relative py-12 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#0D110F] text-white overflow-hidden select-none"
    >
      {/* Subtle CAD Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #DFBA73 1px, transparent 1px), linear-gradient(to bottom, #DFBA73 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Glow (Zero-GPU-Blur) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(223,186,115,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header (Compact) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#DFBA73] text-[10px] font-mono tracking-widest uppercase mb-2.5">
            <span className="w-1 h-1 rounded-full bg-[#DFBA73]" />
            <span>/ CORE CAPABILITIES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tight uppercase text-white mb-2">
            ENGINEERED <span className="text-[#DFBA73]">SERVICES.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#8E9F96] font-sans leading-relaxed">
            We provide a complete home setup ecosystem engineered for zero-compromise
            luxury residential architecture across Noida &amp; Delhi NCR.
          </p>
        </div>

        {/* 6-Card Capability Matrix (Sleek & Low Profile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pt-1" onMouseLeave={() => { if (isHoverDevice()) setActiveCard(null) }}>
          {CAPABILITIES.map((item, idx) => {
            const IconComponent = item.icon
            const isActive = activeCard === idx
            return (
              <div
                key={item.id}
                onPointerDown={(e) => {
                  if (e.pointerType === 'touch') {
                    setActiveCard(idx)
                  }
                }}
                onPointerUp={() => setActiveCard(null)}
                onPointerCancel={() => setActiveCard(null)}
                onPointerLeave={() => setActiveCard(null)}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse' && isHoverDevice()) {
                    setActiveCard(idx)
                  }
                }}
                onClick={() => setActiveCard(null)}
                className={`group relative p-4.5 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none touch-manipulation active:scale-[0.99] ${
                  isActive
                    ? 'bg-[#18201b] border-[#DFBA73]/60 -translate-y-0.5 shadow-[0_8px_24px_rgba(223,186,115,0.18)]'
                    : 'bg-[#141916]/90 border-white/8 sm:hover:border-[#DFBA73]/40 sm:hover:-translate-y-0.5 sm:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#DFBA73] text-[#121614] border-[#DFBA73] scale-105 shadow-sm shadow-[#DFBA73]/30'
                          : 'bg-white/5 border-white/10 text-white/70 sm:group-hover:bg-[#DFBA73] sm:group-hover:text-[#121614] sm:group-hover:border-[#DFBA73] sm:group-hover:scale-105'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-mono text-lg font-bold transition-colors duration-300 ${
                        isActive ? 'text-[#DFBA73]/70' : 'text-white/20 sm:group-hover:text-[#DFBA73]/40'
                      }`}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase mb-1.5 transition-colors duration-300 ${
                      isActive ? 'text-[#DFBA73]' : 'text-white group-hover:text-[#DFBA73]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed font-sans mb-3.5 transition-colors duration-300 ${
                      isActive ? 'text-white/85' : 'text-white/60'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Video Reference Hover Animation: Expanding Bottom Glow Bar */}
                <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                  <span
                    className={`h-full rounded-full bg-[#DFBA73] transition-all duration-500 ease-out ${
                      isActive
                        ? 'w-full shadow-[0_0_16px_rgba(223,186,115,0.85)]'
                        : 'w-12 sm:group-hover:w-full shadow-[0_0_8px_rgba(223,186,115,0.4)] sm:group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]'
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
