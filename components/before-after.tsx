'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Sparkles, ChevronLeft, ChevronRight, Home, BedDouble, Utensils } from 'lucide-react'

export interface SlideItem {
  id: string
  roomIndex: number
  roomType: string
  roomTitle: string
  roomTag: string
  label: string
  isAfter: boolean
  image: string
}

// 6 Permanent Slides: Mounted once in the DOM, never swapped or re-rendered
export const SIX_SLIDES: SlideItem[] = [
  // Room 0: Penthouse Living Lounge
  {
    id: 'living-before',
    roomIndex: 0,
    roomType: 'Living Lounge',
    roomTitle: 'Penthouse Living Lounge',
    roomTag: 'Living Lounge Design',
    label: 'Before: Empty Room',
    isAfter: false,
    image: '/images/transformations/living-before.jpg',
  },
  {
    id: 'living-after',
    roomIndex: 0,
    roomType: 'Living Lounge',
    roomTitle: 'Penthouse Living Lounge',
    roomTag: 'Living Lounge Design',
    label: 'After: Luxury Living Room',
    isAfter: true,
    image: '/images/transformations/living-after.jpg',
  },
  // Room 1: Bespoke Master Bedroom Suite
  {
    id: 'bedroom-before',
    roomIndex: 1,
    roomType: 'Master Suite',
    roomTitle: 'Bespoke Master Bedroom Suite',
    roomTag: 'Master Bedroom Design',
    label: 'Before: Empty Space',
    isAfter: false,
    image: '/images/transformations/bedroom-before.jpg',
  },
  {
    id: 'bedroom-after',
    roomIndex: 1,
    roomType: 'Master Suite',
    roomTitle: 'Bespoke Master Bedroom Suite',
    roomTag: 'Master Bedroom Design',
    label: 'After: Finished Bedroom',
    isAfter: true,
    image: '/images/transformations/bedroom-after.jpg',
  },
  // Room 2: German Modular Island Kitchen
  {
    id: 'kitchen-before',
    roomIndex: 2,
    roomType: 'Modular Kitchen',
    roomTitle: 'German Modular Island Kitchen',
    roomTag: 'Modular Kitchen Design',
    label: 'Before: Raw Space',
    isAfter: false,
    image: '/images/transformations/kitchen-before.jpg',
  },
  {
    id: 'kitchen-after',
    roomIndex: 2,
    roomType: 'Modular Kitchen',
    roomTitle: 'German Modular Island Kitchen',
    roomTag: 'Modular Kitchen Design',
    label: 'After: Modular Kitchen',
    isAfter: true,
    image: '/images/transformations/kitchen-after.jpg',
  },
]

const ROOM_TABS = [
  { id: 'living', roomType: 'Living Lounge', icon: Home, startStep: 0 },
  { id: 'bedroom', roomType: 'Master Suite', icon: BedDouble, startStep: 2 },
  { id: 'kitchen', roomType: 'Modular Kitchen', icon: Utensils, startStep: 4 },
]

export function BeforeAfter({ initialImages }: { initialImages?: any[] } = {}) {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)

  // Direct DOM Refs for locked 120 FPS performance (zero React re-renders during motion)
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const dividerLineRef = useRef<HTMLDivElement>(null)
  const titleTextRef = useRef<HTMLSpanElement>(null)
  const titleTagRef = useRef<HTMLSpanElement>(null)

  const animFrameRef = useRef<number | null>(null)
  const isVisibleRef = useRef<boolean>(false)
  const currentPosRef = useRef<number>(100)

  // Double-buffering choreography state: 6 continuous forward steps
  const stepRef = useRef<number>(0)
  const phaseRef = useRef<'SWEEPING' | 'HOLDING'>('SWEEPING')
  const phaseStartTimeRef = useRef<number>(0)

  // Pre-warm remaining images in idle time without blocking LCP or initial page load
  useEffect(() => {
    const warmUpImages = () => {
      // Slides 0 & 1 load with eager priority. Pre-decode remaining slides 2-5 when CPU is idle.
      for (let i = 2; i < SIX_SLIDES.length; i++) {
        const img = new window.Image()
        img.src = SIX_SLIDES[i].image
      }
    }

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(warmUpImages, { timeout: 2000 })
      } else {
        setTimeout(warmUpImages, 1000)
      }
    }
  }, [])

  // Smoothly set golden line opacity for invisible resets
  const setLineOpacity = useCallback((opacity: number) => {
    if (dividerLineRef.current) {
      dividerLineRef.current.style.opacity = `${opacity}`
    }
  }, [])

  // Directly apply slider position to DOM nodes (Bypasses React render tree for locked 120 FPS)
  const applyPosition = useCallback((percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent))
    currentPosRef.current = clamped

    const step = stepRef.current
    const topIndex = (step + 1) % 6
    const topLayer = layerRefs.current[topIndex]

    if (topLayer) {
      // Top layer is revealed strictly from Right to Left (clamped% to 100%)
      topLayer.style.clipPath = `polygon(${clamped}% 0, 100% 0, 100% 100%, ${clamped}% 100%)`
    }
    if (dividerLineRef.current) {
      dividerLineRef.current.style.left = `${clamped}%`
    }
  }, [])

  // Seamless Zero-Flash Step Advance: Pure DOM z-index and clip-path handoff
  const advanceToStep = useCallback((targetStep: number, resetLine = true) => {
    stepRef.current = targetStep
    const newBaseIndex = targetStep
    const newTopIndex = (targetStep + 1) % 6

    for (let i = 0; i < 6; i++) {
      const layer = layerRefs.current[i]
      if (!layer) continue

      if (i === newBaseIndex) {
        // Base layer: full screen underneath (already 100% visible from previous step)
        layer.style.visibility = 'visible'
        layer.style.zIndex = '1'
        layer.style.clipPath = 'none'
      } else if (i === newTopIndex) {
        // Top layer: prepared at right edge with 0 width (completely hidden)
        layer.style.visibility = 'visible'
        layer.style.zIndex = '2'
        layer.style.clipPath = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
      } else {
        // All other layers: hidden behind
        layer.style.visibility = 'hidden'
        layer.style.zIndex = '0'
        layer.style.clipPath = 'none'
      }
    }

    if (resetLine) {
      currentPosRef.current = 100
      if (dividerLineRef.current) dividerLineRef.current.style.left = '100%'
    }

    // Direct DOM mutation for floating header (avoids React re-renders during motion)
    const incomingSlide = SIX_SLIDES[newTopIndex]
    if (titleTextRef.current) titleTextRef.current.textContent = incomingSlide.roomTitle
    if (titleTagRef.current) titleTagRef.current.textContent = `• ${incomingSlide.roomTag}`

    // Update active tab buttons
    setActiveRoomIndex(incomingSlide.roomIndex)
  }, [])

  // Smooth cubic ease-in-out curve
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  // Unified RequestAnimationFrame Choreography Loop (Locked 120 FPS, 0 CPU waste offscreen)
  useEffect(() => {
    // Initial placement at Step 0
    advanceToStep(0)
    setLineOpacity(1)
    phaseRef.current = 'SWEEPING'
    phaseStartTimeRef.current = performance.now()

    const updateLoop = (now: number) => {
      if (!isVisibleRef.current) {
        // If scrolled out of view, don't schedule new frames (saves 100% CPU/GPU)
        return
      }

      const step = stepRef.current
      const isReveal = step % 2 === 0
      const duration = isReveal ? 4500 : 4000
      const holdDuration = isReveal ? 2200 : 1400
      const elapsed = now - phaseStartTimeRef.current

      if (phaseRef.current === 'SWEEPING') {
        const progress = Math.min(1, elapsed / duration)
        const eased = easeInOutCubic(progress)
        const pos = 100 - eased * 100
        applyPosition(pos)

        if (progress >= 1) {
          applyPosition(0)
          phaseRef.current = 'HOLDING'
          phaseStartTimeRef.current = now
        }
      } else if (phaseRef.current === 'HOLDING') {
        // Softly dissolve golden line at left border right before advancing
        if (elapsed >= holdDuration - 300) {
          setLineOpacity(0)
        }

        if (elapsed >= holdDuration) {
          const nextStep = (step + 1) % 6
          advanceToStep(nextStep)
          setLineOpacity(1) // Materialize at right edge
          phaseRef.current = 'SWEEPING'
          phaseStartTimeRef.current = now
        }
      }

      animFrameRef.current = requestAnimationFrame(updateLoop)
    }

    // High-performance IntersectionObserver: pauses loop entirely when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current
        isVisibleRef.current = entry.isIntersecting

        if (entry.isIntersecting && !wasVisible) {
          // Restart loop cleanly
          phaseStartTimeRef.current = performance.now()
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
          animFrameRef.current = requestAnimationFrame(updateLoop)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Document visibility listener: pause in background tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      } else {
        isVisibleRef.current = true
        phaseStartTimeRef.current = performance.now()
        animFrameRef.current = requestAnimationFrame(updateLoop)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [applyPosition, advanceToStep, setLineOpacity])

  // Navigation Tab Selection
  const handleSelectTab = (roomIdx: number) => {
    const targetStep = roomIdx * 2
    advanceToStep(targetStep)
    setLineOpacity(1)
    phaseRef.current = 'SWEEPING'
    phaseStartTimeRef.current = performance.now()
  }

  // Next / Previous Room Controls
  const handleNextSlide = () => {
    const nextRoom = (activeRoomIndex + 1) % 3
    handleSelectTab(nextRoom)
  }

  const handlePrevSlide = () => {
    const prevRoom = (activeRoomIndex - 1 + 3) % 3
    handleSelectTab(prevRoom)
  }

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative w-full py-16 sm:py-24 md:py-28 bg-[#FAF8F5] overflow-hidden select-none"
    >
      {/* Background Soft Glow (Optimized blur radius) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/15 rounded-full blur-[90px] transform-gpu"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#8C6D3F] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D3F]" />
            <span>BEFORE & AFTER TRANSFORMATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight">
            See the Space <span className="text-[#8C6D3F] italic">Transformed</span>
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#78716C] leading-relaxed">
            Witness empty spaces effortlessly turn into luxurious, fully finished living spaces.
          </p>

          {/* Room Selector Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1.5 rounded-full bg-white border border-[#E7E3DC] shadow-sm">
              {ROOM_TABS.map((tab, idx) => {
                const IconComponent = tab.icon
                const isActive = activeRoomIndex === idx
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSelectTab(idx)}
                    className={`inline-flex items-center gap-2 m-1 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-out cursor-pointer ${isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm scale-105'
                      : 'text-[#78716C] hover:text-[#1C1917] hover:bg-black/5'
                      }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{tab.roomType}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* The Comparison Showcase Frame with Side Arrows */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Showcase Canvas: Layout-isolated for 120 FPS paint performance */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E7E3DC] bg-black select-none pointer-events-auto transform-gpu"
            style={{ contain: 'paint layout' }}
          >
            {/* 6 PERMANENT MOUNTED SLIDE LAYERS: Zero-flash double-buffering architecture */}
            {SIX_SLIDES.map((slide, idx) => {
              // Eager load only the first room (idx 0 & 1), lazy load the remaining for fast LCP
              const isInitialRoom = idx < 2

              return (
                <div
                  key={slide.id}
                  ref={(el) => {
                    layerRefs.current[idx] = el
                  }}
                  className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path] pointer-events-none select-none transform-gpu translate-z-0"
                  style={{
                    zIndex: idx === 0 ? 1 : idx === 1 ? 2 : 0,
                    clipPath: idx === 1 ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'none',
                    visibility: idx === 0 || idx === 1 ? 'visible' : 'hidden',
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.label}
                    fill
                    priority={isInitialRoom}
                    loading={isInitialRoom ? 'eager' : 'lazy'}
                    draggable={false}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                    className="object-cover object-center transform-gpu pointer-events-none select-none"
                  />

                  {/* Badge Tag: Lightweight, high-performance styling without expensive backdrop blur */}
                  {slide.isAfter ? (
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 pointer-events-none select-none transition-all duration-300 ease-out">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#1C1917]/90 text-[#D8BC95] border border-[#C5A880]/50 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                        {slide.label}
                      </span>
                    </div>
                  ) : (
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 pointer-events-none select-none transition-all duration-300 ease-out">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/85 text-white/95 border border-white/20 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-neutral-400" />
                        {slide.label}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Luminous Golden Divider Reveal Line: Hardware-accelerated 120 FPS beam */}
            <div
              ref={dividerLineRef}
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A880]/30 via-[#FFF4D0] to-[#C5A880]/30 shadow-[0_0_12px_rgba(212,175,55,0.75)] z-20 pointer-events-none will-change-[left,opacity] transition-opacity duration-300 select-none transform-gpu"
              style={{ left: '100%', opacity: 1 }}
            />

            {/* Room Title Floating Header: Direct DOM updated for 0 React re-renders */}
            <div className="absolute top-4 left-4 z-30 pointer-events-none select-none transition-all duration-300 ease-out">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold text-white bg-black/80 border border-white/20 shadow-md">
                <span ref={titleTextRef} className="transition-opacity duration-300">
                  {SIX_SLIDES[0].roomTitle}
                </span>
                <span ref={titleTagRef} className="text-[10px] font-mono text-[#D8BC95] font-normal transition-opacity duration-300">
                  • {SIX_SLIDES[0].roomTag}
                </span>
              </span>
            </div>

            {/* Carousel Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevSlide()
              }}
              aria-label="Previous room"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white hover:text-[#C5A880] border border-white/20 hover:border-[#C5A880]/50 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Carousel Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleNextSlide()
              }}
              aria-label="Next room"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white hover:text-[#C5A880] border border-white/20 hover:border-[#C5A880]/50 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Carousel Pagination Progress Indicator Dots */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {ROOM_TABS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTab(idx)}
                aria-label={`Go to room ${idx + 1}`}
                className={`transition-all duration-500 ease-out rounded-full cursor-pointer ${activeRoomIndex === idx
                  ? 'w-8 h-2 bg-[#8C6D3F]'
                  : 'w-2 h-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
