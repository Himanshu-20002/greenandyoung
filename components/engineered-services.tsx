'use client'

import React from 'react'
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
    title: 'WHITE-GLOVE TURNKEY PM',
    description:
      'Dedicated on-site chartered project engineer, single-point accountability, 150-point audit, and strict timeline handover.',
    icon: ShieldCheck,
  },
]

export function EngineeredServices() {
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

      {/* Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#DFBA73]/5 rounded-full blur-[100px] pointer-events-none"
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
            We provide a complete turnkey ecosystem engineered for zero-compromise
            luxury residential architecture across Noida &amp; Delhi NCR.
          </p>
        </div>

        {/* 6-Card Capability Matrix (Sleek & Low Profile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {CAPABILITIES.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.id}
                className="group relative p-4.5 sm:p-5 rounded-xl bg-[#141916]/90 border border-white/8 hover:border-[#DFBA73]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#DFBA73] group-hover:text-[#121614] group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-lg font-bold text-white/20 group-hover:text-[#DFBA73]/40 transition-colors duration-300">
                      {item.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-white mb-1.5 group-hover:text-[#DFBA73] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-sans mb-3.5">
                    {item.description}
                  </p>
                </div>

                {/* Video Reference Hover Animation: Expanding Bottom Glow Bar */}
                <div className="relative w-full h-[2.5px] flex items-center justify-center mt-1">
                  <span className="h-full rounded-full bg-[#DFBA73] w-12 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(223,186,115,0.4)] group-hover:shadow-[0_0_16px_rgba(223,186,115,0.85)]" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
