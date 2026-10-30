'use client'

import React from 'react'
import Image from 'next/image'

interface FilmFrame {
  id: string
  src: string
  title: string
  caption: string
  frameNumber: string
}

const FILM_FRAMES: FilmFrame[] = [
  {
    id: 'f-1',
    src: '/images/interiors/penthouse-living.jpg',
    title: 'THE DUPLEX SUITE',
    caption: 'Double-Height Turnkey Living',
    frameNumber: '01A',
  },
  {
    id: 'f-2',
    src: '/images/interiors/modular-kitchen.jpg',
    title: 'GERMAN PRECISION',
    caption: 'Bespoke Quartzite Island Kitchen',
    frameNumber: '02A',
  },
  {
    id: 'f-3',
    src: '/images/interiors/master-suite.jpg',
    title: 'SANCTUARY SUITE',
    caption: 'Acoustic Fluted Walnut Millwork',
    frameNumber: '03A',
  },
  {
    id: 'f-4',
    src: '/images/interiors/mandir-sanctuary.jpg',
    title: 'ONYX PUJA MANDIR',
    caption: 'Backlit Translucent Stone & Brass',
    frameNumber: '04A',
  },
  {
    id: 'f-5',
    src: '/images/interiors/walkin-wardrobe.jpg',
    title: 'BOUTIQUE ATELIER',
    caption: 'Walk-In Dressing Wardrobe Suite',
    frameNumber: '05A',
  },
  {
    id: 'f-6',
    src: '/images/interiors/dining-suite.jpg',
    title: 'FORMAL BANQUET',
    caption: '10-Seater Monolith Quartzite Suite',
    frameNumber: '06A',
  },
  {
    id: 'f-7',
    src: '/images/interiors/spa-bathroom.jpg',
    title: 'SPA RETREAT',
    caption: 'Calacatta Marble & Freestanding Tub',
    frameNumber: '07A',
  },
  {
    id: 'f-8',
    src: '/images/interiors/media-lounge.jpg',
    title: 'PRIVATE CINEMA',
    caption: 'Acoustic Midnight Media Lounge',
    frameNumber: '08A',
  },
]

export function PhotoFilmStrip() {
  // Duplicated for continuous horizontal marquee glide
  const frames = [...FILM_FRAMES, ...FILM_FRAMES]

  return (
    <div className="relative w-full pt-8 pb-4 bg-[#FAF8F5] overflow-hidden select-none">
      {/* Self-contained CSS Animation for seamless glide */}
      <style>{`
        @keyframes photoFilmStripScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .photo-film-strip-track {
          display: flex;
          width: max-content;
          animation: photoFilmStripScroll 42s linear infinite;
          will-change: transform;
        }
        .photo-film-strip-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Cinematic 35mm Outer Shell */}
      <div className="relative w-full bg-[#0B0D0C] border-y border-[#222924] shadow-2xl py-3.5">
        {/* Top 35mm Sprocket Perforations Bar */}
        <div className="flex items-center justify-between px-2 pb-2.5 border-b border-white/[0.08] overflow-hidden opacity-80">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[10px] font-mono tracking-widest text-[#8E9F96]/80 uppercase">
            <span>◆ KODACHROME COLOR FILM ◆</span>
            <span>35MM ARCHIVE</span>
            <span>ISO 400</span>
            <span>G&Y CINEMATIC</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-top-${i}`}
                className="w-3.5 h-2.5 rounded-[2px] bg-[#050706] border border-white/20 shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Soft Left and Right Edge Vignette */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0B0D0C] via-[#0B0D0C]/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0B0D0C] via-[#0B0D0C]/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Moving Film Frames */}
        <div className="photo-film-strip-track flex items-center gap-4 sm:gap-6 py-3 px-4">
          {frames.map((frame, index) => (
            <div
              key={`${frame.id}-${index}`}
              className="group relative shrink-0 w-[250px] sm:w-[290px] md:w-[330px] bg-[#0E1210] border border-white/20 p-2 sm:p-2.5 rounded-xs shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-[#C5A880]/60"
            >
              {/* Frame Margin Info */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#8E9F96] pb-1.5 px-0.5 tracking-wider">
                <span className="text-[#C5A880] font-bold">▶ {frame.frameNumber}</span>
                <span className="truncate max-w-[150px] uppercase font-semibold text-white/90">{frame.title}</span>
                <span>35mm</span>
              </div>

              {/* Photo in 100% Full Natural Color - Zero Black Tint */}
              <div className="relative w-full h-48 sm:h-56 bg-neutral-900 overflow-hidden">
                <Image
                  src={frame.src}
                  alt={frame.title}
                  fill
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 290px, 330px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={95}
                />
              </div>

              {/* Bottom Frame Stamp with Clean Archival Typography */}
              <div className="pt-2 px-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] sm:text-xs font-serif font-bold text-white tracking-wide truncate">
                    {frame.title}
                  </div>
                  <span className="text-[9px] font-mono text-[#C5A880] shrink-0 font-semibold">EXP 24+</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-neutral-300 truncate">
                  <span className="truncate font-sans text-neutral-400">{frame.caption}</span>
                  <span className="font-mono text-[#8E9F96]/70 text-[8px] shrink-0 uppercase tracking-widest pl-2">G&amp;Y ARCHIVAL</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 35mm Sprocket Perforations Bar */}
        <div className="flex items-center justify-between px-2 pt-2.5 border-t border-white/[0.08] overflow-hidden opacity-80">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sprocket-bottom-${i}`}
                className="w-3.5 h-2.5 rounded-[2px] bg-[#050706] border border-white/20 shrink-0"
              />
            ))}
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[10px] font-mono tracking-widest text-[#8E9F96]/80 uppercase">
            <span>◆ FRAME SYNC ◆</span>
            <span>HANDOVER REEL</span>
            <span>NOIDA SEC 62</span>
          </div>
        </div>
      </div>
    </div>
  )
}
