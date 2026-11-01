'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sparkles, ArrowUpRight, CheckCircle2, Flame, Compass } from 'lucide-react'

interface TrendItem {
  id: string
  title: string
  tag: string
  year: string
  description: string
  specifications: string[]
  image: string
  societies: string
}

const TRENDS: TrendItem[] = [
  {
    id: 'biophilic-lounge',
    title: 'Biophilic Warm Minimalism & Fluted Acoustics',
    tag: 'LIVING ROOMS',
    year: '2025/2026 TREND',
    description:
      'Seamless fusion of natural fluted timber millwork, curved organic silhouettes, integrated greenery planters, and microcement texture walls designed for acoustic peace.',
    specifications: [
      'Acoustic micro-fluted walnut wall paneling',
      'Curved sculptural seating in textured bouclé',
      'Human-centric 2700K ambient cove profiles',
      'Seamless Italian microcement architectural wash',
    ],
    image: '/images/interiors/penthouse-living.jpg',
    societies: 'ATS Knightsbridge & DLF Camellias',
  },
  {
    id: 'quartzite-kitchen',
    title: 'Monolith Quartzite Waterfall & Concealed German Islands',
    tag: 'MODULAR KITCHENS',
    year: 'SIGNATURE TREND',
    description:
      'Monolithic Brazilian quartzite with seamless 45-degree mitered waterfall drops, handleless Blum Servo-Drive motorized cabinetry, and flush invisible induction surfaces.',
    specifications: [
      'Seamless Brazilian quartzite island with backlit apron',
      'Häfele & Blum automated motorized lift-up flaps',
      'Anti-fingerprint matte nano-finish cabinetry',
      'Integrated under-counter champagne bar & chill zones',
    ],
    image: '/images/interiors/modular-kitchen.jpg',
    societies: 'The Camellias & Gulshan Dynasty',
  },
  {
    id: 'dressing-atelier',
    title: 'Fluted Glass Dressing Suites & Atelier Wardrobes',
    tag: 'WARDROBE SUITES',
    year: 'LUXURY ESSENTIAL',
    description:
      'Walk-in boutique dressing experience engineered with bronzed anodized aluminum frames, fluted toughened glass, integrated vertical LED illumination, and velvet drawer trays.',
    specifications: [
      'Bronzed aluminum slimline framework with fluted glass',
      'Automated magnetic reed door sensor illumination',
      'Handcrafted Italian leather & velvet accessories trays',
      'Concealed full-length swivel dressing mirror',
    ],
    image: '/images/interiors/walkin-wardrobe.jpg',
    societies: 'Experion Windchants & Jaypee Greens',
  },
  {
    id: 'onyx-mandir',
    title: 'Translucent Onyx & Precision Brass Sanctums',
    tag: 'SACRED MANDIRS',
    year: 'CULTURAL LUXURY',
    description:
      'Modern spiritual serenity combining imported translucent backlit onyx, laser-cut unlacquered brass filigree jaali, and concealed acoustic chanting soundscapes.',
    specifications: [
      'Backlit Brazilian white/honey onyx stone altar',
      'Custom laser-cut brass mandir jaali partition',
      'Smoke-sealed motorized incense ventilation channel',
      'Hidden push-to-open teakwood puja storage drawers',
    ],
    image: '/images/interiors/mandir-sanctuary.jpg',
    societies: 'Supernova Spira & DLF Magnolias',
  },
  {
    id: 'spa-bath',
    title: 'Calacatta Bookmatched Spa Suites with Freestanding Soak',
    tag: 'SPA BATHROOMS',
    year: 'WELLNESS LIVING',
    description:
      'Hotel-suite wellness experience featuring wall-to-wall bookmatched Italian Calacatta marble, matte black wall-mounted mixers, thermostatic rain suites, and soaking tubs.',
    specifications: [
      'Bookmatched Italian marble slabs with water-jet precision',
      'Freestanding composite resin deep-soaking bathtub',
      'Thermostatic multi-jet ceiling rain cascade',
      'Anti-fog ambient backlit fluted stone vanity mirror',
    ],
    image: '/images/interiors/spa-bathroom.jpg',
    societies: 'Godrej Woods & Jaypee Pavilion Court',
  },
]

export function LatestTrends() {
  const [selectedTrend, setSelectedTrend] = useState<string>(TRENDS[0].id)
  const current = TRENDS.find((t) => t.id === selectedTrend) || TRENDS[0]

  return (
    <section
      id="latest-trends"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-[#0A140F] text-[#FAF8F5] overflow-hidden"
      aria-label="Latest Trends - 2025/2026 Luxury Interior Design Directions"
    >
      <div id="trends" className="-top-24 relative" />
      {/* Ambient Radial Haze */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[450px] bg-[#C5A880]/[0.08] rounded-full blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[600px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-white/5 backdrop-blur-md text-[#C5A880] text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>FORECAST &amp; INNOVATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Latest <span className="text-[#C5A880] italic font-serif">Trends</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#A2B3AA] leading-relaxed">
            The architectural materials, spatial palettes, and engineering innovations defining ultra-luxury homes across Delhi NCR in 2025/2026.
          </p>
        </div>

        {/* Interactive Category Selector Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-none mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {TRENDS.map((trend) => {
            const active = trend.id === selectedTrend
            return (
              <button
                key={trend.id}
                onClick={() => setSelectedTrend(trend.id)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-[#E4D7BE] text-[#0A140F] border-[#E4D7BE] shadow-lg shadow-[#E4D7BE]/20 scale-102'
                    : 'bg-white/5 text-[#A2B3AA] hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                <span>{trend.tag}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0A140F]" />}
              </button>
            )
          })}
        </div>

        {/* Featured Trend Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch bg-[#111F17]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Left Column: Visual Photography */}
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-white/10 group">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating pill badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#E4D7BE] tracking-wide">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>{current.year}</span>
            </div>

            {/* Society Reference Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <span className="text-[#A2B3AA]">Executed in</span>
              <span className="font-semibold text-[#E4D7BE]">{current.societies}</span>
            </div>
          </div>

          {/* Right Column: Architectural Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#C5A880] uppercase">
                <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{current.tag} SPECIFICATION</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#A2B3AA] leading-relaxed">
                {current.description}
              </p>

              {/* Specifications checklist */}
              <div className="pt-2 space-y-2.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#7E9388] block">
                  Material &amp; Craft Details
                </span>
                {current.specifications.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#FAF8F5]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E4D7BE] hover:bg-white text-[#0A140F] font-semibold text-xs tracking-wide transition-all shadow-md group"
              >
                <span>Consult on this Trend</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[11px] text-[#7E9388] font-mono">Turnkey Execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

