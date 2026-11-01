'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Award, Trophy, Star, ShieldCheck, Sparkles } from 'lucide-react'

export interface AwardItem {
  id: string
  awardName: string
  presenterName: string
  presenterRole: string
  category: string
  conclave: string
  description: string
  image: string
}

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'police-commissioner',
    awardName: 'Dainik Jagran Gaurav Ratan Award',
    presenterName: 'Smt. Laxmi Singh (IPS) & Shri Pankaj Singh (MLA)',
    presenterRole: 'Police Commissioner & Member of Legislative Assembly',
    category: 'STATE & MEDIA HONOR',
    conclave: 'Dainik Jagran Leadership Conclave',
    description:
      'Presented by Gautam Buddha Nagar Police Commissioner Laxmi Singh and MLA Pankaj Singh for exemplary integrity, execution speed, and quality in complete luxury interiors.',
    image: '/awards/Award0.jpg',
  },
  {
    id: 'suniel-shetty',
    awardName: 'Radio City Business Titans Award',
    presenterName: 'Suniel Shetty',
    presenterRole: 'Bollywood Icon & Serial Entrepreneur',
    category: 'INDUSTRY TITANS',
    conclave: 'Business Titans Dubai Conclave',
    description:
      'Awarded at the prestigious Business Titans Dubai Conclave for groundbreaking luxury home transformations and superior complete home execution.',
    image: '/awards/Award1.jpg',
  },
  {
    id: 'chitrangda-singh',
    awardName: 'Business Titan Luxury Designer Award',
    presenterName: 'Chitrangda Singh',
    presenterRole: 'Celebrated Bollywood Actress',
    category: 'BEST LUXURY DESIGNERS',
    conclave: 'National Design Conclave',
    description:
      'Won the award for "Best Luxury Interior Designers", celebrating visionary design aesthetics and architectural excellence.',
    image: '/awards/award-6.png',
  },
  {
    id: 'gulshan-grover',
    awardName: 'High-Rise Heroes Architecture Award',
    presenterName: 'Gulshan Grover & Sunil Pal',
    presenterRole: 'Cinema Icons & Renowned Entertainers',
    category: 'HIGH-RISE EXCELLENCE',
    conclave: 'Apartment Times Annual Gala',
    description:
      'Awarded by Apartment Times for architectural finesse and flawless interior execution across high-rise luxury apartment residences.',
    image: '/awards/Award2.jpg',
  },
  {
    id: 'padmini-kolhapure',
    awardName: 'Brand Brilliance Honor',
    presenterName: 'Ms. Padmini Kolhapure',
    presenterRole: 'Legendary Indian Cinema Actress',
    category: 'LUXURY INTERIORS',
    conclave: 'Harmony Conclave & Awards',
    description:
      'Honored at the Apartment Times Harmony Conclave for enduring luxury craftsmanship, fine materials, and unmatched client satisfaction.',
    image: '/awards/award7.png',
  },
  {
    id: 'vidit-gujrathi',
    awardName: 'Strategic Excellence Recognition',
    presenterName: 'Vidit Gujrathi',
    presenterRole: 'International Chess Grandmaster',
    category: 'MASTER’S RECOGNITION',
    conclave: 'Excellence Leadership Summit',
    description:
      'Awarded by Chess Grandmaster Vidit Gujrathi for precision planning, zero-defect engineering, and on-time turnarounds in modern luxury interiors.',
    image: '/awards/award-5.png',
  },
  {
    id: 'sunil-gupta',
    awardName: 'Brand Brilliance Conclave Award',
    presenterName: 'Dr. Sunil Gupta',
    presenterRole: 'Founder, KDSG Super-Speciality Hospital',
    category: 'HARMONY CONCLAVE',
    conclave: 'Harmony Estate & AOA Conclave',
    description:
      'Presented at the Harmony Estate & AOA Conclave in recognition of elite commercial precision and premium living standards.',
    image: '/awards/award3.jpeg',
  },
  {
    id: 'mla-tejpal-nagar',
    awardName: 'High-Rise Heroes Civic Distinction',
    presenterName: 'Shri Tejpal Nagar',
    presenterRole: 'MLA, Dadri Constituency',
    category: 'CIVIC & DESIGN DISTINCTION',
    conclave: 'NCR Civic & Infrastructure Forum',
    description:
      'Awarded for setting new benchmarks in premium residential interiors and transforming NCR homes into modern architectural marvels.',
    image: '/awards/award-4.jpeg',
  },
]

export function WallOfFame() {
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

  // Seamless loop marquee data
  const duplicatedAwards = [...AWARDS_DATA, ...AWARDS_DATA]

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 bg-[#FAF8F5] overflow-hidden"
      aria-label="Achievements - Awards and Recognitions"
    >
      <div id="wall-of-fame" className="-top-24 relative" />
      {/* 120 FPS Hardware-Accelerated Marquee Animation */}
      <style>{`
        @keyframes fameMarqueeTrack {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .fame-marquee-track {
          display: flex;
          width: max-content;
          animation: fameMarqueeTrack 44s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-backface-visibility: hidden;
        }
        .fame-marquee-track:hover {
          animation-play-state: paused;
        }
        .fame-card {
          contain: layout paint;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
      `}</style>

      {/* Subtle Warm Luxury Ambient Radial Glow (Zero-GPU-Blur) */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,168,128,0.14) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/40 bg-white/80 text-[#8C6D3F] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-xs backdrop-blur-md">
          <Trophy className="w-3.5 h-3.5 text-[#8C6D3F]" />
          <span>NATIONAL HONORS & RECOGNITION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight">
          Our <span className="text-[#8C6D3F] italic font-serif">Achievements</span>
        </h2>

        <p className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base text-[#78716C] leading-relaxed">
          Awarded by Bollywood icons, government leaders, and media conclaves. Certified proof of our quality and commitment to luxury home interiors.
        </p>

        {/* Accolade Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-white/90 border border-[#E7E3DC] px-3.5 py-1.5 rounded-full shadow-xs text-[#44403C]">
            <Award className="w-3.5 h-3.5 text-[#8C6D3F]" />
            <span className="font-semibold">8+ National Awards</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 border border-[#E7E3DC] px-3.5 py-1.5 rounded-full shadow-xs text-[#44403C]">
            <Star className="w-3.5 h-3.5 text-[#8C6D3F] fill-[#8C6D3F]/20" />
            <span className="font-semibold">Celebrity Endorsed</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 border border-[#E7E3DC] px-3.5 py-1.5 rounded-full shadow-xs text-[#44403C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D3F]" />
            <span className="font-semibold">Presented by VIP Dignitaries</span>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Ribbon */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft Fade Edge Gradients */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Moving Cards Track - 120 FPS Optimized */}
        <div className="fame-marquee-track px-4 gap-5 sm:gap-6" style={{ animationPlayState: isInView ? 'running' : 'paused' }}>
          {duplicatedAwards.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="fame-card group relative flex-shrink-0 w-[310px] sm:w-[345px] md:w-[360px] rounded-2xl bg-white border border-[#E7E3DC] hover:border-[#C5A880]/70 transition-transform duration-300 ease-out hover:-translate-y-1.5 overflow-hidden shadow-[0_4px_20px_rgba(28,25,23,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(197,168,128,0.25)] flex flex-col select-none"
            >
              {/* Passe-Partout Gallery Photo Inset - Height increased and framed with headroom */}
              <div className="p-3 sm:p-3.5 pb-0">
                <div className="relative w-full h-56 sm:h-60 rounded-xl overflow-hidden bg-[#F2EDE4] border border-[#EFECE6]">
                  <Image
                    src={item.image}
                    alt={`${item.awardName} - Presented by ${item.presenterName}`}
                    fill
                    sizes="(max-width: 640px) 310px, (max-width: 768px) 345px, 360px"
                    className="object-cover object-[center_8%] transition-transform duration-500 ease-out group-hover:scale-105"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    quality={80}
                  />

                  {/* Top-Left Category Transparent Glass Micro-Pill */}
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-black/35 backdrop-blur-[3px] text-white/90 border border-white/20">
                      <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Vignette with Simple Wording: "Presented by" */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-7 pb-2.5 px-3 z-10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 truncate">
                      <Award className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                      <span className="text-xs font-medium tracking-tight truncate text-white/95">
                        Presented by {item.presenterName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plaque Card Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Hero Award Title */}
                  <h3 className="text-base sm:text-[17px] font-serif font-bold text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors leading-snug line-clamp-1">
                    {item.awardName}
                  </h3>

                  {/* Presenter Role Subtitle */}
                  <p className="mt-1 text-xs text-[#78716C] font-sans line-clamp-1">
                    {item.presenterRole}
                  </p>

                  {/* Citation Statement */}
                  <div className="mt-3 relative pl-3 border-l-2 border-[#C5A880]/50 py-0.5 bg-[#FAF8F5]/60 rounded-r-md pr-2">
                    <p className="text-[11.5px] sm:text-xs text-[#57534E] line-clamp-2 leading-relaxed italic">
                      &ldquo;{item.description}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Meta Footer */}
                <div className="mt-4 pt-3 border-t border-[#F2EDE4] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#A8A29E] font-medium truncate">
                    {item.conclave}
                  </span>
                  <span className="text-[10px] font-semibold text-[#8C6D3F] uppercase tracking-wider">
                    Verified Award
                  </span>
                </div>
              </div>

              {/* Bottom Golden Animated Progress Bar on Hover or Touch */}
              <div className="w-full h-1 bg-[#F2EDE4]/80 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#8C6D3F] w-0 group-hover:w-full group-active:w-full transition-all duration-700 ease-out" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


