'use client'

import React, { useState, useEffect, useRef } from 'react'

interface StripItem {
  text: string
  highlight?: string
  badge?: string
  symbol: string
}

const STRIP_ITEMS: StripItem[] = [
  {
    text: 'LUXURY INTERIOR DESIGN',
    highlight: 'Bespoke Craftsmanship',
    badge: 'COMPLETE SETUP',
    symbol: '✦',
  },
  {
    text: 'CUSTOM ARCHITECTURAL SOLUTIONS',
    highlight: 'Tailored Living',
    symbol: '★',
  },
  {
    text: 'MODULAR KITCHEN & WARDROBE SUITES',
    highlight: 'German Hardware',
    badge: 'BLUM & HETTICH',
    symbol: '✶',
  },
  {
    text: 'GUARANTEED 45-DAY ON-TIME HANDOVER',
    highlight: 'Zero Compromise',
    symbol: '✦',
  },
  {
    text: 'COMPREHENSIVE 10-YEAR WARRANTY',
    highlight: 'Peace of Mind',
    badge: 'CERTIFIED',
    symbol: '★',
  },
  {
    text: '3D VIRTUAL MEASUREMENT & VR PREVIEW',
    highlight: 'Precision First',
    symbol: '◆',
  },
  {
    text: 'CELEBRATED & AWARD-WINNING DESIGNS',
    highlight: 'National Honors',
    badge: 'EST. 2019',
    symbol: '✦',
  },
  {
    text: 'HIGH-RISE APARTMENTS & LUXURY VILLAS',
    highlight: 'Noida & Delhi NCR',
    symbol: '✶',
  },
]

export function FilmStrip() {
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
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

  // Triple the array for an unbroken, perfectly seamless marquee loop
  const ribbon = [...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS]

  return (
    <div
      ref={containerRef}
      className="relative w-full py-2 sm:py-3 bg-[#FAF8F5] overflow-hidden select-none"
      aria-label="Green and Young Highlights"
    >
      {/* Self-contained CSS keyframes for ultra-smooth 60fps continuous glide */}
      <style>{`
        @keyframes textStripScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .text-strip-track {
          display: flex;
          width: max-content;
          animation: textStripScroll 32s linear infinite;
          will-change: transform;
        }
        .text-strip-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Sleek Dark Obsidian Ribbon Strip */}
      <div className="relative w-full bg-[#07110C] border-y border-[#182C22] py-3 sm:py-3.5 shadow-md">
        {/* Soft edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#07110C] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#07110C] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Scrolling Typography Track */}
        <div className="text-strip-track flex items-center gap-6 sm:gap-10" style={{ animationPlayState: isInView ? 'running' : 'paused' }}>
          {ribbon.map((item, index) => (
            <div
              key={`${item.text}-${index}`}
              className="flex items-center gap-4 sm:gap-6 shrink-0 group"
            >
              {/* Star / Character Symbol */}
              <span className="text-[#C5A880] text-sm sm:text-base font-serif drop-shadow-[0_0_8px_rgba(197,168,128,0.5)] transition-transform duration-300 group-hover:scale-125">
                {item.symbol}
              </span>

              {/* Main Text */}
              <span className="text-[11px] sm:text-xs md:text-sm font-sans uppercase tracking-[0.22em] text-[#E8ECE9] font-medium transition-colors group-hover:text-white whitespace-nowrap">
                {item.text}
              </span>

              {/* Italic Champagne Accent Text */}
              {item.highlight && (
                <span className="text-xs sm:text-sm font-serif italic text-[#C5A880] whitespace-nowrap font-normal">
                  — {item.highlight}
                </span>
              )}

              {/* Optional Minimalist Micro-Badge */}
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-[#C5A880]/15 text-[#D8BC95] border border-[#C5A880]/30 whitespace-nowrap">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
