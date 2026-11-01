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
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section
      id="advantage"
      className={`relative w-full py-10 sm:py-20 md:py-24 bg-[#FAF8F5] text-[#1C1917] overflow-hidden ${className}`}
      aria-label="The Advantage - Engineered for Impact"
    >
      <div id="why-gy" className="-top-24 relative" />
      <div id="why-choose-us" className="-top-24 relative" />
      {/* Subtle Warm & Brass Ambient Radial Glow (Zero-GPU-Blur) */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[450px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,168,128,0.09) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[450px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,168,128,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8 mb-6 sm:mb-16">
          {/* Left: Monospace Tag + Massive Monumental Typography */}
          <div className="space-y-2 sm:space-y-3">
            <span className="text-[#C5A880] text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase block">
              / THE ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1C1917] tracking-tight leading-[0.95] uppercase">
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

        {/* 4 Cards Grid - Compact on Mobile, Slender on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-7 max-w-[1300px] pt-1" onMouseLeave={() => setActiveCard(null)}>
          {ADVANTAGE_CARDS.map((card, idx) => {
            const Icon = card.icon
            const isActive = activeCard === idx

            return (
              <div
                key={card.number}
                onClick={() => setActiveCard((prev) => (prev === idx ? null : idx))}
                onTouchStart={() => setActiveCard((prev) => (prev === idx ? null : idx))}
                onMouseEnter={() => setActiveCard(idx)}
                className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-0 sm:min-h-[290px] md:min-h-[310px] transition-all duration-300 cursor-default sm:cursor-pointer touch-manipulation select-none active:transform-none ${
                  isActive
                    ? 'bg-white border border-[#E7E5E4] sm:border-t-2 sm:border-l-2 sm:border-[#C5A880] sm:border-r sm:border-b sm:border-[#C5A880]/30 sm:shadow-[0_12px_32px_rgba(197,168,128,0.2)] sm:-translate-y-1'
                    : 'bg-white/90 backdrop-blur-sm border border-[#E7E5E4] sm:hover:border-[#C5A880]/40 sm:hover:bg-white sm:hover:shadow-lg sm:hover:-translate-y-0.5'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Top Row: Icon + Watermark Number */}
                <div className="flex items-start justify-between">
                  {/* Icon Squircle Pill */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#F5F2EB] border border-[#E7E5E4] text-[#1C1917] sm:bg-gradient-to-br sm:from-[#D8BC95] sm:to-[#C5A880] sm:text-[#0A110D] sm:shadow-md sm:shadow-[#C5A880]/30 sm:scale-105'
                        : 'bg-[#F5F2EB] border border-[#E7E5E4] text-[#1C1917] sm:group-hover:bg-[#C5A880]/15 sm:group-hover:text-[#C5A880]'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  {/* Watermark Number */}
                  <span
                    className={`text-xl sm:text-3xl md:text-4xl font-black font-mono select-none transition-colors duration-300 ${
                      isActive
                        ? 'text-[#1C1917]/10 sm:text-[#C5A880]/30'
                        : 'text-[#1C1917]/[0.08] sm:group-hover:text-[#1C1917]/15'
                    }`}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Bottom Row: Title + Description */}
                <div className="mt-3 sm:mt-8">
                  <h3
                    className={`text-sm sm:text-lg font-bold tracking-tight mb-1 sm:mb-2 transition-colors duration-300 ${
                      isActive ? 'text-[#1C1917] sm:text-[#C5A880]' : 'text-[#1C1917] sm:group-hover:text-[#C5A880]'
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
