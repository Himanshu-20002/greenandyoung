'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, Sparkles, Quote } from 'lucide-react'
import { openEstimateSheet } from './bottom-sheet-form'

interface ReviewItem {
  name: string
  initials: string
  property: string
  rating: number
  tag: string
  text: string
}

const reviews: ReviewItem[] = [
  {
    name: 'Vikram & Neha Malhotra',
    initials: 'VM',
    property: 'Godrej Woods, Sector 43, Noida (4 BHK)',
    rating: 5,
    tag: 'Complete Handover',
    text: 'From the Italian marble polishing to the custom fluted acoustic living room, Green & Young delivered pure perfection in 45 days. The 3D VR walkthrough matched the physical handover 1:1.',
  },
  {
    name: 'Col. Rajeshwar & Sunita Bakshi',
    initials: 'RB',
    property: 'ATS Knightsbridge, Sector 124, Noida (Penthouse)',
    rating: 5,
    tag: 'Super Luxury Handover',
    text: 'Flawless modular kitchen with Blum hardware, quartz island, and bespoke veneer millwork. Zero hidden charges and the site engineers maintained pristine cleanliness.',
  },
  {
    name: 'Dr. Ananya & Kunal Roy',
    initials: 'AR',
    property: 'Jaypee Greens, Greater Noida (Golf Villa)',
    rating: 5,
    tag: 'Villa Architecture',
    text: 'Our double-height chandelier feature wall and custom onyx-backlit Mandir are absolute showstoppers. Their complete interior team handled civil & MEP hurdles effortlessly.',
  },
  {
    name: 'Siddharth & Priya Singhania',
    initials: 'SS',
    property: 'DLF The Camellias, Gurgaon (Bespoke Suite)',
    rating: 5,
    tag: 'Bespoke Millwork',
    text: 'Exceptional craftsmanship in walk-in wardrobes, concealed sensor lighting, and acoustic ceilings. Truly a five-star hotel sanctuary inside our private residence.',
  },
  {
    name: 'Rohit & Tanvi Agarwal',
    initials: 'RA',
    property: 'Mahagun Mezzaria, Sector 78, Noida (3 BHK)',
    rating: 5,
    tag: 'On-Time Handover',
    text: 'Delivered in exactly 42 days with a comprehensive 10-year warranty document. Transparent milestone-based billing and remarkable attention to spatial ergonomics.',
  },
  {
    name: 'Harshvardhan & Divya Rao',
    initials: 'HR',
    property: 'Ace Starlit, Sector 152, Noida (4 BHK)',
    rating: 5,
    tag: 'Complete Handover',
    text: 'The master suite with its floating vanity and ambient warm cove lighting exceeded every expectation. Green & Young turned our bare apartment shell into an architectural masterpiece.',
  },
  {
    name: 'Deepak & Ritu Sen',
    initials: 'DS',
    property: 'Cleo County, Sector 121, Noida (3 BHK)',
    rating: 5,
    tag: 'Space Optimization',
    text: 'Superb space optimization. Their hidden pantry and minimalist Scandinavian TV console maximize every square inch while looking effortlessly sophisticated.',
  },
  {
    name: 'Abhishek & Pooja Chawla',
    initials: 'AC',
    property: 'Gulshan Dynasty, Sector 144, Noida (Luxury Residence)',
    rating: 5,
    tag: 'Executive Luxury',
    text: 'Unmatched quality of PU finish cabinetry, German architectural hardware, and daily WhatsApp site progress logs. Highly recommended for discerning homeowners.',
  },
]

export function Reviews() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: '200px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Duplicate reviews array to ensure seamless infinite looping
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section ref={sectionRef} id="reviews" className="py-12 sm:py-16 md:py-20 bg-[#060A07] relative overflow-hidden text-[#8E9F96]">
      {/* Luxury Editorial Ambient Backlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none transform-gpu" style={{ background: 'radial-gradient(ellipse at center, rgba(197,168,128,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[600px] h-[320px] rounded-full pointer-events-none transform-gpu" style={{ background: 'radial-gradient(ellipse at center, rgba(20,35,24,0.45) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#D8BC95] uppercase mb-3.5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>CLIENT EXPERIENCES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            500+ Happy Homeowners &amp; <span className="text-[#D8BC95] italic font-normal">Commercial Spaces</span>
          </h2>

          <div className="flex items-center justify-center gap-2.5 mt-3 sm:mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#D8BC95] text-[#D8BC95] drop-shadow-[0_0_6px_rgba(216,188,149,0.35)]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#C5A880]/90">
              4.7/5.0 Rating across Delhi NCR &middot; 100% On-Time Handover
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Slow Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Vignette Fade Masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-44 bg-gradient-to-r from-[#060A07] via-[#060A07]/80 to-transparent z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-44 bg-gradient-to-l from-[#060A07] via-[#060A07]/80 to-transparent z-20"
          aria-hidden="true"
        />

        {/* Moving Ticker with Smoked Obsidian & Champagne Brass Cards */}
        <div className="animate-marquee-reviews flex items-stretch gap-4 sm:gap-5 py-3 px-4" style={{ animationPlayState: isInView ? 'running' : 'paused' }}>
          {duplicatedReviews.map((review, idx) => {
            const isActive = activeIdx === idx
            return (
              <div
                key={`${review.name}-${idx}`}
                tabIndex={0}
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className={`relative shrink-0 w-[310px] sm:w-[360px] md:w-[390px] rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1611]/90 via-[#0B120E]/95 to-[#070D09] border transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer select-none touch-manipulation ${
                  isActive
                    ? 'border-[#C5A880] shadow-[0_0_35px_rgba(197,168,128,0.35),inset_0_0_25px_rgba(197,168,128,0.15)] -translate-y-1'
                    : 'border-[#C5A880]/20 hover:border-[#C5A880] active:border-[#C5A880] shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(197,168,128,0.12)] hover:shadow-[0_0_35px_rgba(197,168,128,0.3),inset_0_0_25px_rgba(197,168,128,0.1)] active:shadow-[0_0_35px_rgba(197,168,128,0.3),inset_0_0_25px_rgba(197,168,128,0.1)] hover:-translate-y-1 active:-translate-y-1'
                }`}
              >
                {/* Dynamic Golden Ambient Fill Sheen on Hover & Touch */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-[#C5A880]/15 via-[#C5A880]/5 to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'
                  }`}
                />
                <div
                  className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#C5A880]/[0.08] rounded-full blur-2xl transition-all duration-300 ${
                    isActive ? 'bg-[#C5A880]/30' : 'group-hover:bg-[#C5A880]/30 group-active:bg-[#C5A880]/30'
                  }`}
                />

                <div className="relative z-10">
                  {/* Top Row: Stars + Muted Champagne Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={13.5}
                          className="fill-[#D8BC95] text-[#D8BC95] drop-shadow-[0_0_4px_rgba(216,188,149,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(216,188,149,0.6)] transition-all"
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-sans font-medium tracking-wider uppercase transition-all ${
                        isActive
                          ? 'border-[#C5A880]/50 bg-[#C5A880]/20 text-[#FFF2DC]'
                          : 'bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#D8BC95] group-hover:border-[#C5A880]/50 group-hover:bg-[#C5A880]/20'
                      }`}
                    >
                      {review.tag}
                    </span>
                  </div>

                  {/* Decorative Quote Icon - Fills Solid Gold with Radiant Glow on Hover & Touch */}
                  <div className="relative inline-block mb-2">
                    <Quote
                      className={`w-6 h-6 transition-all duration-300 stroke-[1.5] ${
                        isActive
                          ? 'fill-[#D8BC95] text-[#FFEABF] drop-shadow-[0_0_14px_rgba(216,188,149,0.95)] drop-shadow-[0_0_24px_rgba(197,168,128,0.5)] scale-110'
                          : 'text-[#C5A880]/35 fill-transparent group-hover:fill-[#D8BC95] group-hover:text-[#FFEABF] group-hover:drop-shadow-[0_0_14px_rgba(216,188,149,0.95)] group-hover:drop-shadow-[0_0_24px_rgba(197,168,128,0.5)] group-hover:scale-110 group-active:fill-[#D8BC95] group-active:text-[#FFEABF] group-active:drop-shadow-[0_0_14px_rgba(216,188,149,0.95)] group-active:drop-shadow-[0_0_24px_rgba(197,168,128,0.5)] group-active:scale-110'
                      }`}
                    />
                  </div>

                  {/* Review Narrative in Editorial Warm Linen */}
                  <p
                    className={`leading-relaxed text-xs sm:text-[13px] font-normal italic transition-colors ${
                      isActive ? 'text-white' : 'text-[#EAE6DF] group-hover:text-white'
                    }`}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Client Identity with Signet Bronze Monogram */}
                <div
                  className={`pt-4 mt-4 border-t flex items-center gap-3 relative z-10 transition-colors ${
                    isActive ? 'border-[#C5A880]/35' : 'border-[#C5A880]/15 group-hover:border-[#C5A880]/35'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br from-[#1C261E] to-[#121A14] text-[#D8BC95] border font-serif font-bold text-xs flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'border-[#C5A880] bg-[#C5A880]/20 shadow-[0_0_15px_rgba(197,168,128,0.5)]'
                        : 'border-[#C5A880]/30 shadow-[0_2px_10px_rgba(0,0,0,0.3)] group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/20 group-hover:shadow-[0_0_15px_rgba(197,168,128,0.5)] group-active:border-[#C5A880] group-active:bg-[#C5A880]/20 group-active:shadow-[0_0_15px_rgba(197,168,128,0.5)]'
                    }`}
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`font-bold text-xs sm:text-sm truncate transition-colors ${
                        isActive ? 'text-[#F4E6D0]' : 'text-[#FAF8F5] group-hover:text-[#F4E6D0]'
                      }`}
                    >
                      {review.name}
                    </p>
                    <p
                      className={`text-[10px] sm:text-[11px] truncate mt-0.5 transition-colors ${
                        isActive ? 'text-[#D5CFC5]' : 'text-[#9E978C] group-hover:text-[#D5CFC5]'
                      }`}
                    >
                      {review.property}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Luxury Trust Consultation Bar below Marquee */}
      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-10 text-center relative z-10">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-full bg-[#0D140F]/80 border border-[#C5A880]/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(197,168,128,0.1)]">
          <span className="text-xs text-[#D5CFC5] px-3">
            Ready to turn your bare flat or villa into an architectural masterpiece?
          </span>
          <a
            href="#estimate" onClick={(e) => { e.preventDefault(); openEstimateSheet(); }} className="inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#D8BC95] via-[#EAE1D0] to-[#D8BC95] hover:from-white hover:to-[#EAE1D0] text-[#0A110D] font-bold text-xs tracking-wide shadow-md hover:shadow-[0_0_20px_rgba(197,168,128,0.35)] transition-all duration-300 cursor-pointer">Plan Your Dream Home
          </a>
        </div>
      </div>
    </section>
  )
}
