'use client'

import React, { useState } from 'react'
import { Clock, Layers, IndianRupee, ShieldCheck } from 'lucide-react'

interface AdvantageCard {
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const ADVANTAGE_CARDS: AdvantageCard[] = [
  {
    number: '01',
    title: 'Precision Execution',
    description:
      'We hand over your space well before the agreed deadline. Zero last-minute scrambles, total peace of mind.',
    icon: Clock,
  },
  {
    number: '02',
    title: 'Engineering Aesthetics',
    description:
      'Our designs are meticulously engineered for real-world functionality, German joinery, and striking spatial aesthetics.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Zero Hidden Costs',
    description:
      'Transparent, bottom-line pricing. No post-handover surprise invoices or hidden service fees. Complete milestone visibility.',
    icon: IndianRupee,
  },
  {
    number: '04',
    title: 'Dedicated Guardians',
    description:
      'A single, reliable touchpoint. Dedicated project engineers continuously on the project site from day one to final handover.',
    icon: ShieldCheck,
  },
]

export function GyAdvantage({ className = '' }: { className?: string }) {
  const [activeCard, setActiveCard] = useState<number>(0)

  return (
    <section
      id="advantage"
      className={`relative w-full py-16 sm:py-20 md:py-24 bg-[#FAF8F5] text-[#1C1917] overflow-hidden ${className}`}
      aria-label="The Advantage - Engineered for Impact"
    >
      {/* Subtle Warm & Brass Ambient Radial Haze */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[450px] bg-[#C5A880]/[0.05] rounded-full blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[450px] bg-[#C5A880]/[0.06] rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left: Monospace Tag + Massive Monumental Typography */}
          <div className="space-y-3">
            <span className="text-[#C5A880] text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase block">
              / THE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1C1917] tracking-tight leading-[0.95] uppercase">
              ENGINEERED<br />
              FOR <span className="text-[#C5A880]">IMPACT.</span>
            </h2>
          </div>

          {/* Right: Subtitle Narrative */}
          <div className="max-w-lg lg:pb-2">
            <p className="text-xs sm:text-sm md:text-base text-[#57534E] font-normal leading-relaxed">
              We don&apos;t just craft interiors; we create tactical spaces that dominate modern luxury living.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid - Slender, Tailored Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-7 max-w-[1300px]">
          {ADVANTAGE_CARDS.map((card, idx) => {
            const Icon = card.icon
            const isActive = activeCard === idx

            return (
              <div
                key={card.number}
                onMouseEnter={() => setActiveCard(idx)}
                className={`group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[270px] sm:min-h-[290px] md:min-h-[310px] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white border-t-2 border-l-2 border-[#C5A880] border-r border-b border-[#C5A880]/30 shadow-[0_12px_32px_rgba(197,168,128,0.2)] -translate-y-1'
                    : 'bg-white/80 backdrop-blur-sm border border-[#E7E5E4] hover:border-[#C5A880]/40 hover:bg-white hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {/* Top Row: Icon + Watermark Number */}
                <div className="flex items-start justify-between">
                  {/* Icon Squircle Pill */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#D8BC95] to-[#C5A880] text-[#0A110D] shadow-md shadow-[#C5A880]/30 scale-105'
                        : 'bg-[#F5F2EB] border border-[#E7E5E4] text-[#1C1917] group-hover:bg-[#C5A880]/15 group-hover:text-[#C5A880]'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  {/* Watermark Number */}
                  <span
                    className={`text-2xl sm:text-3xl md:text-4xl font-black font-mono select-none transition-colors duration-300 ${
                      isActive ? 'text-[#C5A880]/30' : 'text-[#1C1917]/[0.08] group-hover:text-[#1C1917]/15'
                    }`}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Bottom Row: Title + Description */}
                <div className="mt-6 sm:mt-8">
                  <h3
                    className={`text-base sm:text-lg font-bold tracking-tight mb-2 transition-colors duration-300 ${
                      isActive ? 'text-[#C5A880]' : 'text-[#1C1917] group-hover:text-[#C5A880]'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[#57534E] text-xs sm:text-[13px] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
