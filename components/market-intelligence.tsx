'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import {
  ARTICLES,
  CATEGORIES,
} from '@/lib/market-intelligence-data'

export function MarketIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Insights')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredArticles =
    selectedCategory === 'All Insights'
      ? ARTICLES
      : ARTICLES.filter((item) => item.category === selectedCategory)

  const updateScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)

    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null
    if (firstCard) {
      const step = firstCard.offsetWidth + 20
      const idx = Math.round(scrollLeft / step)
      setActiveIndex(Math.min(idx, Math.max(0, filteredArticles.length - 1)))
    }
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [filteredArticles])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const firstCard = el.firstElementChild as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 20 : 380
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const firstCard = el.firstElementChild as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 20 : 380
    el.scrollTo({
      left: index * step,
      behavior: 'smooth',
    })
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="market-intelligence"
      className="relative w-full py-10 sm:py-12 md:py-16 overflow-hidden select-none bg-gradient-to-b from-[#06120B] via-[#0A1C12] via-35% to-[#FAF8F5]"
      style={{
        background: 'linear-gradient(180deg, #06120B 0%, #091910 24%, #0D2418 42%, #EEF4F0 72%, #FAF8F5 100%)',
      }}
    >
      {/* Luxury Champagne Brass & Deep Forest Ambient Radial Glow (Zero-GPU-Blur) */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[700px] h-[320px] rounded-full transform-gpu"
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,168,128,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[550px] h-[280px] rounded-full transform-gpu"
        style={{ background: 'radial-gradient(ellipse at center, rgba(14,46,31,0.25) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Full-width Panoramic Container Matching Footer */}
      <div className="relative w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Wide Header Row - Heading Left, Description Offset Lower Right */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10 sm:mb-12">
          {/* Left: Monospace Tag + Architectural Typography */}
          <div className="space-y-4 max-w-2xl">
            <div className="space-y-3">
              <span className="text-[#C5A880] text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase block">
                / MARKET INTELLIGENCE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FAF8F5] tracking-tight leading-[0.98] uppercase">
                LATEST INSIGHTS<br />
                &amp; <span className="text-[#D8BC95]">ARTICLES.</span>
              </h2>
            </div>

            {/* Creative Lightweight Architectural Interior Blueprint Motif - 100% Transparent */}
            <div className="pt-2 max-w-xl">
              <svg
                className="w-full max-w-[420px] h-12 text-[#C5A880]"
                viewBox="0 0 380 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Grid Crosshairs (Drafting Alignment Points) */}
                <path d="M20 6V12M17 9H23" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <path d="M120 6V12M117 9H123" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <path d="M240 6V12M237 9H243" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />

                {/* Ceiling & Floor Structural Slab Lines */}
                <line x1="10" y1="9" x2="210" y2="9" stroke="#C5A880" strokeWidth="0.7" strokeDasharray="6 3" strokeOpacity="0.3" />
                <line x1="10" y1="38" x2="210" y2="38" stroke="#8C6D3F" strokeWidth="1" strokeOpacity="0.7" />

                {/* Fluted Walnut Acoustic Partition Wall (Vertical Slats) */}
                <line x1="28" y1="9" x2="28" y2="38" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="34" y1="9" x2="34" y2="38" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="40" y1="9" x2="40" y2="38" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="46" y1="9" x2="46" y2="38" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="52" y1="9" x2="52" y2="38" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />

                {/* Architectural Doorway Arch Portal & Suspended Chandelier */}
                <path
                  d="M72 38V21C72 14.3726 77.3726 9 84 9H106C112.627 9 118 14.3726 118 21V38"
                  stroke="#D8BC95"
                  strokeWidth="1.2"
                />
                <line x1="85" y1="9" x2="95" y2="20" stroke="#C5A880" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                <circle cx="95" cy="21" r="2" fill="#D8BC95" />

                {/* German Modular Joinery Credenza with Mitered Joints */}
                <rect x="140" y="24" width="76" height="14" rx="1.5" stroke="#DFBA73" strokeWidth="1" fill="none" />
                <line x1="178" y1="24" x2="178" y2="38" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.6" />
                {/* Fluted Carcass Drawers */}
                <line x1="152" y1="31" x2="166" y2="31" stroke="#C5A880" strokeWidth="0.75" />
                <line x1="190" y1="31" x2="204" y2="31" stroke="#C5A880" strokeWidth="0.75" />
                {/* Minimalist Art Plaque on Wall */}
                <rect x="156" y="11" width="44" height="9" rx="0.5" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.6" />




              </svg>
            </div>
          </div>

          {/* Right: Subtitle Narrative & Category Filters & Controls - Lowered down intentionally */}
          <div className="max-w-xl lg:text-right flex flex-col lg:items-end pt-2 sm:pt-4 lg:pt-14">
            <p className="text-xs sm:text-sm text-[#A8A29E] font-normal leading-relaxed">
              Authoritative architectural briefings, lifecycle material audits, and complete home intelligence curated by Green &amp; Young&apos;s senior project engineers.
            </p>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end mt-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${isActive
                        ? 'bg-[#D8BC95] text-[#0A110D] font-bold shadow-md shadow-black/20'
                        : 'bg-white/[0.05] border border-white/10 text-[#D5CFC5] hover:text-white hover:border-[#C5A880]/40 hover:bg-white/[0.1]'
                        }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* Snappy Navigation Arrows */}
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-white/10">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous article"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/80 hover:text-[#0A110D] hover:bg-[#D8BC95] hover:border-[#D8BC95] disabled:opacity-25 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next article"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white/80 hover:text-[#0A110D] hover:bg-[#D8BC95] hover:border-[#D8BC95] disabled:opacity-25 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Compact 3-Card Placement (No bottom shadow, crisp clean border) */}
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2"
            >
              {filteredArticles.map((article, idx) => (
                <Link
                  key={article.id}
                  href={`/market-intelligence/${article.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F1712]/95 via-[#0A120E]/95 to-[#060C08] border border-[#C5A880]/15 hover:border-[#C5A880]/45 shadow-none transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer select-none shrink-0 snap-start w-[86vw] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] hover:-translate-y-1 block"
                >
                  {/* Clean Aspect Image Frame with Minimalist Category Tag */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A110D]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Soft Editorial Ambient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09110B] via-transparent to-black/25 pointer-events-none" />

                    {/* Top-Left: Minimalist Glass Category Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/50 backdrop-blur-md text-[#E5D7C2] border border-white/10 shadow-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Top-Right: Discreet Editorial Index */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md text-[10px] font-mono font-medium text-[#D8BC95] border border-white/10 flex items-center justify-center">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body - Airy, Editorial Typographic Balance */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Meta Row: Clean Date & Read Time */}
                      <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-wider text-[#A8A29E] uppercase mb-2.5">
                        <span>{article.date}</span>
                        <span className="text-[#C5A880]/60">&bull;</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base sm:text-[18px] font-serif font-medium text-[#FAF8F5] leading-snug tracking-tight mb-2.5 min-h-[3rem] line-clamp-2 group-hover:text-[#D8BC95] transition-colors duration-200">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-[#9E988F] font-light leading-relaxed line-clamp-2 mb-4">
                        {article.summary}
                      </p>
                    </div>

                    {/* Bottom Minimalist Action Row */}
                    <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-[#D8BC95]">
                      <span className="group-hover:text-white transition-colors duration-200">
                        Read Executive Briefing
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#D8BC95] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                  </div>

                  {/* Bottom Golden Animated Progress Bar */}
                  <div className="w-full h-[2px] bg-white/[0.04] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#8C6D3F] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Interactive Slide Pagination Indicator (When more than 3 cards) */}
            {filteredArticles.length > 3 && (
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {filteredArticles.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === i ? 'w-7 bg-[#D8BC95]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Centered CTA Pill: Explore All Insights & Articles */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <Link
              href="/market-intelligence"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#08100C] hover:bg-[#D8BC95] text-white hover:text-[#0A110D] border border-white/15 hover:border-[#D8BC95] text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_24px_rgba(216,188,149,0.35)]"
            >
              <span>Explore All Insights &amp; Articles</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
