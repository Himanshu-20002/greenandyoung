'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Phone,
  MessageCircle,
  Sparkles,
  Award,
  ChevronDown,
  Compass,
  Layers,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { openEstimateSheet } from './bottom-sheet-form'
import { trackHeroEvent } from '@/app/admin/actions/heroSlides'

interface RoomShowcase {
  id: string
  title: string
  category: string
  image: string
  location: string
  specs: {
    title: string
    description: string
    x: number // percentage
    y: number // percentage
  }[]
}

const ROOM_SHOWCASES: RoomShowcase[] = [
  {
    id: 'penthouse-living',
    title: 'Duplex Penthouse Living',
    category: 'Complete Turnkey',
    image: '/images/interiors/penthouse-living.jpg',
    location: 'Jaypee Greens, Greater Noida',
    specs: [
      {
        title: 'Italian Statuario Marble',
        description: 'Double-slab continuous bookmatch with acoustic fluted walnut cladding.',
        x: 32,
        y: 42,
      },
      {
        title: 'Circadian Architectural Cove',
        description: 'Automated 2700K–4000K Kelvin shifting synchronized to Noida daylight.',
        x: 62,
        y: 18,
      },
      {
        title: 'Bespoke Low-Slung Lounge',
        description: 'Curved boucle upholstery with floating solid-oak cocktail monolith.',
        x: 48,
        y: 72,
      },
    ],
  },
  {
    id: 'modular-kitchen',
    title: 'German Minimalist Kitchen',
    category: 'Modular Architecture',
    image: '/images/interiors/modular-kitchen.jpg',
    location: 'Godrej Woods, Sector 43 Noida',
    specs: [
      {
        title: 'Silestone Quartz Monolith',
        description: 'Waterfall edge island with integrated induction flush-mount surface.',
        x: 42,
        y: 58,
      },
      {
        title: 'German Blum Legrabox',
        description: 'Zero-protrusion electric touch-to-open system rated for 200k cycles.',
        x: 68,
        y: 74,
      },
      {
        title: 'Concealed Appliance Wall',
        description: 'Smoked oak pocket doors with integrated climate-controlled cellar.',
        x: 75,
        y: 35,
      },
    ],
  },
  {
    id: 'master-suite',
    title: 'Acoustic Master Suite',
    category: 'Private Residence',
    image: '/images/interiors/master-suite.jpg',
    location: 'Ambience Tiverton, Sector 50 Noida',
    specs: [
      {
        title: 'Acoustic Suede Panelling',
        description: 'STC-rated sound isolation with integrated reading sconces.',
        x: 52,
        y: 36,
      },
      {
        title: 'Walk-in Glass Atelier',
        description: 'Bronze fluted glass partitions with automated internal strip illuminators.',
        x: 24,
        y: 52,
      },
      {
        title: 'Natural Herringbone Walnut',
        description: 'Triple-lacquered European white oak treated against NCR seasonal humidity.',
        x: 46,
        y: 82,
      },
    ],
  },
  {
    id: 'spa-bathroom',
    title: 'Calacatta Spa Sanctuary',
    category: 'Bath Architecture',
    image: '/images/interiors/spa-bathroom.jpg',
    location: 'ATS Knightsbridge, Sector 124 Noida',
    specs: [
      {
        title: 'Freestanding Resin Monolith',
        description: 'Cast mineral composite bath positioned against floor-to-ceiling glass.',
        x: 50,
        y: 65,
      },
      {
        title: 'Thermostatic Rain Canopy',
        description: 'Concealed Grohe smart-control valving with dual chromatherapy jets.',
        x: 50,
        y: 22,
      },
    ],
  },
]

interface Props {
  slides?: any[]
}

export function HeroAppleScroll({ slides = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  const activeRoom = ROOM_SHOWCASES[activeRoomIndex]

  // Track overall scroll progress through the runway (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // STAGE 1: Editorial Headline & Tagline fade out and blur upwards
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.22], [0, -60])
  const headlineScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.96])

  // STAGE 2: The Portal Doorway Zoom
  // Scales smoothly from an arched portrait card (1x) into a full-bleed window (3.2x)
  const portalScale = useTransform(scrollYProgress, [0.08, 0.55], [1, 3.1])
  const portalRadius = useTransform(scrollYProgress, [0.12, 0.52], [36, 0])
  const portalBorderOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.8, 0])
  const portalShadowOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.6, 0])

  // Sub-layer Parallax: Counter-scale inside the portal for realistic 2.5D depth
  const innerImageScale = useTransform(scrollYProgress, [0.08, 0.55], [1.3, 1.05])
  const innerImageY = useTransform(scrollYProgress, [0.08, 0.55], ['4%', '0%'])

  // STAGE 3: Spatial Hotspots & Controls fade in once the room expands
  const roomControlsOpacity = useTransform(scrollYProgress, [0.48, 0.62], [0, 1])
  const roomControlsY = useTransform(scrollYProgress, [0.48, 0.62], [30, 0])

  // Scroll cue helper
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (val) => {
      if (val > 0.05 && !hasScrolled) {
        setHasScrolled(true)
      }
    })
    return () => unsub()
  }, [scrollYProgress, hasScrolled])

  const handleCTAClick = (e?: React.MouseEvent) => {
    e?.preventDefault()
    trackHeroEvent(activeRoom.id, 'CLICK')
    openEstimateSheet()
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[270vh] sm:h-[300vh] bg-[#12100E] text-[#FBF9F5] select-none"
    >
      {/* Ambient Architectural Lighting Gradients (Warm Champagne & Soft Travertine) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-35 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(223,186,115,0.22) 0%, rgba(197,168,128,0.08) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(181,146,80,0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* STICKY VIEWPORT: Pinned on screen while user scrolls through the runway */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center z-10 px-4 sm:px-8 py-6 sm:py-8">
        
        {/* ==================================================================== */}
        {/* TOP STATUS BAR: Subtle Apple-Style Pill Nav Header */}
        {/* ==================================================================== */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative z-30 flex items-center justify-between w-full max-w-7xl pt-16 sm:pt-20 pointer-events-auto"
        >
          {/* Studio Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#DFBA73]/25 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-[#E8D4B8] font-semibold">
              Green &amp; Young · Architectural Atelier
            </span>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#DFBA73]" />
              <strong className="text-white font-medium">10-Year</strong> Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
              <strong className="text-white font-medium">500+</strong> Delivered Homes
            </span>
          </div>
        </motion.div>

        {/* ==================================================================== */}
        {/* EDITORIAL HERO HEADLINE (Fades & blurs upward on initial scroll) */}
        {/* ==================================================================== */}
        <motion.div
          style={{
            opacity: headlineOpacity,
            y: headlineY,
            scale: headlineScale,
          }}
          className="relative z-20 text-center max-w-3xl mx-auto px-4 my-auto pointer-events-none"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-[#DFBA73] block mb-2 sm:mb-3">
            Bespoke Residential Architecture · Noida &amp; Delhi NCR
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-md">
            Homes Conceived in Precision.{' '}
            <span className="bg-gradient-to-r from-[#DFBA73] via-[#FFEAA7] to-[#B59250] bg-clip-text text-transparent italic font-serif font-normal">
              Built for Generations.
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-white/75 font-normal max-w-xl mx-auto leading-relaxed">
            Turning bare-shell penthouses and villas into turn-key architectural masterpieces with German engineering and Italian marble craftsmanship.
          </p>
        </motion.div>

        {/* ==================================================================== */}
        {/* THE ARCHITECTURAL PORTAL (Expands into 3D Full-Bleed Living Room) */}
        {/* ==================================================================== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <motion.div
            style={{
              scale: portalScale,
              borderRadius: portalRadius,
            }}
            className="relative w-[280px] h-[390px] sm:w-[350px] sm:h-[480px] lg:w-[400px] lg:h-[530px] overflow-hidden will-change-transform shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
          >
            {/* The Hairline Champagne Border (dissolves as room goes full-bleed) */}
            <motion.div
              style={{
                opacity: portalBorderOpacity,
                borderRadius: portalRadius,
              }}
              className="absolute inset-0 border-[2px] border-[#DFBA73]/50 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(223,186,115,0.2)]"
            />

            {/* Arched Top Golden Leaf Scroll Accent (dissolves smoothly) */}
            <motion.div
              style={{ opacity: portalBorderOpacity }}
              className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-[#DFBA73]/30 text-[8px] font-mono tracking-widest text-[#DFBA73] uppercase z-20 pointer-events-none"
            >
              Step Inside
            </motion.div>

            {/* Inner Room Photography with Counter-Parallax Scale */}
            <motion.div
              style={{
                scale: innerImageScale,
                y: innerImageY,
              }}
              className="relative w-full h-full will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeRoom.image}
                    alt={activeRoom.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle Cinematic Film Vignette & Warm Twilight Tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* SPATIAL CRAFTSMANSHIP HOTSPOTS (Visible once room is scaled) */}
            <motion.div
              style={{ opacity: roomControlsOpacity }}
              className="absolute inset-0 pointer-events-auto z-30"
            >
              {activeRoom.specs.map((spec, idx) => {
                const isSelected = activeHotspot === idx

                return (
                  <div
                    key={spec.title}
                    className="absolute"
                    style={{ left: `${spec.x}%`, top: `${spec.y}%` }}
                  >
                    {/* Pulsing Beacon Dot */}
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isSelected ? null : idx)}
                      className="group relative flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                      aria-label={`Inspect detail: ${spec.title}`}
                    >
                      <span className="absolute w-7 h-7 rounded-full bg-[#DFBA73]/30 animate-ping pointer-events-none" />
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/85 border-[1.5px] border-[#DFBA73] text-[#DFBA73] shadow-lg group-hover:scale-110 transition-transform">
                        <Sparkles className="w-3 h-3 text-[#DFBA73]" />
                      </span>
                    </button>

                    {/* Expandable Glass Tooltip Card */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 top-9 w-64 sm:w-72 p-3 sm:p-4 rounded-2xl bg-black/85 border border-[#DFBA73]/35 backdrop-blur-xl shadow-2xl z-40 text-left pointer-events-auto"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#DFBA73] block">
                              Architectural Spec
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              className="text-white/50 hover:text-white"
                              aria-label="Close detail"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-white mt-1 leading-snug">
                            {spec.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-white/70 mt-1 leading-relaxed">
                            {spec.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* ==================================================================== */}
        {/* BOTTOM STICKY CONTROLS: Apple-Style Floating Bar & Room Navigator */}
        {/* ==================================================================== */}
        <motion.div
          style={{
            opacity: roomControlsOpacity,
            y: roomControlsY,
          }}
          className="relative z-30 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pointer-events-auto pb-4"
        >
          {/* Room Selector Tab Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-xl shadow-xl overflow-x-auto max-w-full">
            {ROOM_SHOWCASES.map((room, idx) => (
              <button
                key={room.id}
                type="button"
                onClick={() => {
                  setActiveRoomIndex(idx)
                  setActiveHotspot(null)
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeRoomIndex === idx
                    ? 'bg-gradient-to-r from-[#DFBA73] to-[#B59250] text-black font-bold shadow-md shadow-[#DFBA73]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {room.title}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCTAClick}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] to-[#B59250] text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#DFBA73]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Your Residence</span>
            </button>

            <a
              href={`tel:${siteConfig.phone.primaryRaw}`}
              className="p-2.5 rounded-full bg-black/60 border border-white/15 text-white/90 hover:text-[#DFBA73] hover:border-[#DFBA73]/40 backdrop-blur-md transition-colors"
              aria-label="Direct consultation phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.whatsapp.directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-black/60 border border-white/15 text-emerald-400 hover:border-emerald-400/40 backdrop-blur-md transition-colors"
              aria-label="WhatsApp consultation"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator Prompt (Visible before initial scroll) */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 pointer-events-none"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#DFBA73]">
            Scroll to Walk Inside
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#DFBA73]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
