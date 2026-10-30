'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Star, Sparkles, Shield, User, Award, ArrowRight, Calendar, Users, ChevronLeft, ChevronRight, Compass, Layers, Video } from 'lucide-react'
import { useEffect, useState, useRef, TouchEvent, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useSessionContext } from '@/components/session-provider'
import { trackHeroEvent } from '@/app/admin/actions/heroSlides'
import { siteConfig } from '@/lib/site-config'


interface PortfolioItem {
  id?: string
  imageUrl: string
  title?: string | null
}

interface HeroSlide {
  id: string
  bgImage: string
  frameImage: string
  badgeText: string
  badgeLabel: string
  imageAlt?: string | null
  campaignName?: string | null
  categoryId: string
  packageId: string | null
  category: {
    id: string
    name: string
    slug: string
    gender: string
  }
  package?: {
    id: string
    title: string
    slug: string
    portfolioItems: PortfolioItem[]
  } | null
}

interface Props {
  slides?: HeroSlide[]
}

const fallbackSlides: HeroSlide[] = [
  {
    id: 'slide-penthouse',
    bgImage: '/images/interiors/penthouse-living.jpg',
    frameImage: '/images/interiors/penthouse-living.jpg',
    badgeText: 'Free 3D Laser Measurement',
    badgeLabel: 'TURNKEY FIT-OUT',
    imageAlt: 'Turnkey Luxury Living & Penthouse Fit-Out by Green & Young',
    campaignName: 'Penthouse Campaign',
    categoryId: 'turnkey-residences',
    packageId: 'pkg-3bhk-turnkey',
    category: {
      id: 'turnkey-residences',
      name: 'Turnkey Residences',
      slug: 'turnkey-residences',
      gender: 'RESIDENTIAL'
    },
    package: {
      id: 'pkg-3bhk-turnkey',
      title: '3 BHK Turnkey Fit-Out',
      slug: '3-bhk-turnkey',
      portfolioItems: [
        { imageUrl: '/images/interiors/penthouse-living.jpg', title: 'Duplex Living Lounge' },
        { imageUrl: '/images/interiors/dining-suite.jpg', title: 'Monolith Quartzite Dining' },
        { imageUrl: '/images/interiors/modular-kitchen.jpg', title: 'German Blum Island' },
        { imageUrl: '/images/interiors/master-suite.jpg', title: 'Master Bedroom Suite' }
      ]
    }
  },
  {
    id: 'slide-kitchen',
    bgImage: '/images/interiors/modular-kitchen.jpg',
    frameImage: '/images/interiors/modular-kitchen.jpg',
    badgeText: 'German Blum Modular Joinery',
    badgeLabel: '10-YEAR WARRANTY',
    imageAlt: 'German Modular Kitchen Architecture by Green & Young',
    campaignName: 'Modular Kitchen Campaign',
    categoryId: 'modular-kitchens',
    packageId: 'pkg-island-kitchen',
    category: {
      id: 'modular-kitchens',
      name: 'Modular Kitchens',
      slug: 'modular-kitchens',
      gender: 'RESIDENTIAL'
    },
    package: {
      id: 'pkg-island-kitchen',
      title: 'Island Modular Kitchen',
      slug: 'island-modular-kitchen',
      portfolioItems: [
        { imageUrl: '/images/interiors/modular-kitchen.jpg', title: 'Quartz Waterfall Island' },
        { imageUrl: '/images/interiors/modular-kitchen-2.jpg', title: 'Concealed Appliance Wall' },
        { imageUrl: '/images/interiors/dining-suite.jpg', title: 'Integrated Breakfast Bar' },
        { imageUrl: '/images/interiors/walkin-wardrobe.jpg', title: 'Fluted Glass Storage' }
      ]
    }
  },
  {
    id: 'slide-suite',
    bgImage: '/images/interiors/master-suite.jpg',
    frameImage: '/images/interiors/master-suite.jpg',
    badgeText: 'Master Suites & Dressing Ateliers',
    badgeLabel: '45-DAY HANDOVER',
    imageAlt: 'Bespoke Master Suite & Walk-In Wardrobe by Green & Young',
    campaignName: 'Master Suite Campaign',
    categoryId: 'master-suites',
    packageId: 'pkg-master-suite',
    category: {
      id: 'master-suites',
      name: 'Master Suites',
      slug: 'master-suites',
      gender: 'RESIDENTIAL'
    },
    package: {
      id: 'pkg-master-suite',
      title: 'Master Bedroom Suite',
      slug: 'master-suite',
      portfolioItems: [
        { imageUrl: '/images/interiors/master-suite.jpg', title: 'Acoustic Headboard Wall' },
        { imageUrl: '/images/interiors/walkin-wardrobe.jpg', title: 'Walk-In Dressing Suite' },
        { imageUrl: '/images/interiors/mandir-sanctuary.jpg', title: 'Backlit Onyx Mandir' },
        { imageUrl: '/images/interiors/spa-bathroom.jpg', title: 'Calacatta Spa Washroom' }
      ]
    }
  }
]

export function Hero({ slides = [] }: Props) {
  const activeSlides = slides.length > 0 ? slides : fallbackSlides
  const router = useRouter()
  const { session } = useSessionContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState<{ id: number; left: string; size: number; delay: number; duration: number }[]>([])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))
  }, [activeSlides.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1))
  }, [activeSlides.length])

  useEffect(() => {
    // Generate tiny, star-like falling glitter particles on slide change
    const newParticles = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`, // Spanned across full width so they are visible on the sides
      size: Math.random() * 2.2 + 1.2,      // 1.2px to 3.4px (tiny star-like)
      delay: Math.random() * 0.9,          // Spread delay up to 0.9s
      duration: Math.random() * 0.8 + 2.6  // ~3 seconds fall time
    }))
    setParticles(newParticles)

    const timer = setTimeout(() => {
      setParticles([])
    }, 4500)

    return () => clearTimeout(timer)
  }, [currentIndex])


  // Touch Swipes
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const filmStripRef = useRef<HTMLDivElement>(null)
  const activeSlide = activeSlides[currentIndex]
  const trackedSlidesRef = useRef<Set<string>>(new Set())

  // Impression & A/B Shuffling on Load
  useEffect(() => {
    setIsLoaded(true)
    // A/B Testing traffic split: randomly start on one of the active slides
    if (activeSlides.length > 1) {
      const randomIndex = Math.floor(Math.random() * activeSlides.length)
      setCurrentIndex(randomIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeSlide && !activeSlide.id.startsWith('fallback-')) {
      if (!trackedSlidesRef.current.has(activeSlide.id)) {
        trackedSlidesRef.current.add(activeSlide.id)
        trackHeroEvent(activeSlide.id, 'IMPRESSION')
      }
    }
  }, [currentIndex, activeSlide])

  // Autoplay Rotation (7.5 Seconds)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 7500)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx)
  }

  const handleCTAClick = (e: React.MouseEvent) => {
    if (activeSlide && !activeSlide.id.startsWith('fallback-')) {
      trackHeroEvent(activeSlide.id, 'CLICK')
    }
    if (!session) {
      e.preventDefault()
      router.push('/auth?redirect=%23services')
    }
  }


  // Swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    setIsPaused(true)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    setIsPaused(false)
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  const values = [
    { title: '3D Laser Survey', desc: '0.5mm Bare-Shell Precision Scan', icon: Compass },
    { title: 'German Millwork', desc: 'Factory CNC & Blum Hardware', icon: Layers },
    { title: '10-Year Warranty', desc: 'Termite & Moisture Shield', icon: Shield },
    { title: 'Live CCTV Feed', desc: '24/7 Mobile Site Transparency', icon: Video }
  ]

  const defaultFilmStrip = [
    { name: 'Duplex Living', image: '/images/interiors/penthouse-living.jpg' },
    { name: 'Modular Kitchens', image: '/images/interiors/modular-kitchen.jpg' },
    { name: 'Master Suites', image: '/images/interiors/master-suite.jpg' },
    { name: 'Dining Suites', image: '/images/interiors/dining-suite.jpg' },
    { name: 'Walk-In Closets', image: '/images/interiors/walkin-wardrobe.jpg' },
    { name: 'Sacred Mandirs', image: '/images/interiors/mandir-sanctuary.jpg' }
  ]

  // Choose display list for film strip based on active slide package portfolio
  const hasPackagePortfolio = activeSlide?.package?.portfolioItems && activeSlide.package.portfolioItems.length > 0
  const portfolioItems = hasPackagePortfolio
    ? activeSlide.package!.portfolioItems
    : []

  const linkedHref = '#services'

  return (
    <>
      {/* SECTION 1: Clean 100vh First Viewport Fold (Zero Cutoffs) */}
      <section
        id="home"
        className="min-h-[100dvh] lg:h-[100dvh] bg-[#0F0D0C] pt-40 sm:pt-32 lg:pt-22 pb-4 sm:pb-6 px-4 md:px-8 relative overflow-hidden flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides Carousel - Covers the full first fold; dark fade only on the bottom 20% */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        {activeSlides.map((slide, idx) => {
          // Lazy load non-active slides (only mount image tag for current, next or previous slides)
          const isNear = Math.abs(idx - currentIndex) <= 1 || (idx === 0 && currentIndex === activeSlides.length - 1) || (idx === activeSlides.length - 1 && currentIndex === 0)
          if (!isNear) return null

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <Image
                src={slide.bgImage}
                alt={slide.imageAlt || 'Luxury backdrop'}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center scale-105"
              />
            </div>
          )
        })}
        {/* Light overall tint for text legibility + dark fade covering only the bottom 20% */}
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0F0D0C 0%, rgba(15,13,12,0.9) 6%, rgba(15,13,12,0) 20%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/40" />
      </div>

      {/* Glow overlays */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Split Grid (Content & Model) */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex items-center z-10 py-1 sm:py-2 relative">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center w-full">

          {/* LEFT COLUMN: Text Content & Actions */}
          <div
            className={`lg:col-span-7 space-y-3 sm:space-y-4 md:space-y-4 transform transition-all duration-1000 order-2 lg:order-1 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Tagline */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-accent font-semibold text-[11px] sm:text-xs tracking-[0.3em] uppercase block">
                Welcome to {siteConfig.name}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-serif font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-md">
                Design Your Home<br />
                With The <span className="bg-gradient-to-r from-[#DFBA73] via-[#FFEAA7] to-[#B59250] bg-clip-text text-transparent font-serif italic font-medium drop-shadow-[0_0_12px_rgba(223,186,115,0.4)]">Experts.</span><br />
                3D Design &amp; Measurement.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed font-medium drop-shadow line-clamp-2">
              5+ Years of Design Excellence. Turning bare-shell houses into luxury dream homes across Noida &amp; Delhi NCR.
            </p>

            {/* Dynamic Custom Promotions Badge */}
            <div className="inline-flex items-center gap-3 bg-black/60 border border-accent/20 rounded-xl p-2 sm:p-2.5 pr-4 max-w-md shadow-xl backdrop-blur-md">
              <div className="bg-gradient-to-r from-accent to-[#A38865] text-black font-extrabold text-[8.5px] uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm">
                {activeSlide.badgeLabel || 'FREE 3D CONSULTATION'}
              </div>
              <div className="text-left">
                <span className="block text-white font-serif font-bold text-xs sm:text-sm tracking-wide leading-tight">
                  {activeSlide.badgeText || '3D Design & Measurement'}
                </span>
                <span className="block text-[8px] uppercase tracking-widest text-white/50 mt-0.5">
                  Turnkey Interior Execution
                </span>
              </div>
            </div>

            {/* Stats Badges */}
            <div className="grid grid-cols-3 gap-2.5 max-w-md border-t border-b border-white/5 py-2.5">
              <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-accent/35 flex items-center justify-center bg-accent/5 shrink-0">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight">500+</span>
                  <span className="block text-[8.5px] text-white/60 uppercase font-bold tracking-wider mt-0.5">Homes Crafted</span>
                </div>
              </div>
              <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-2 border-l border-r border-white/5 px-2">
                <div className="w-8 h-8 rounded-full border border-accent/35 flex items-center justify-center bg-accent/5 shrink-0">
                  <Star className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight">5+ Years</span>
                  <span className="block text-[8.5px] text-white/60 uppercase font-bold tracking-wider mt-0.5">Excellence</span>
                </div>
              </div>
              <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-accent/35 flex items-center justify-center bg-accent/5 shrink-0">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="block text-sm sm:text-base font-extrabold text-white tracking-wide leading-tight">10-Year</span>
                  <span className="block text-[8.5px] text-white/60 uppercase font-bold tracking-wider mt-0.5">Warranty</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={linkedHref}
                onClick={handleCTAClick}
                className="bg-gradient-to-r from-[#DFBA73] to-[#B59250] text-black text-center font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-lg shadow-accent/10 hover:from-[#8A7142] hover:to-[#6E5932] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </a>
                <a
                  href={`tel:${siteConfig.phone.primaryRaw}`}
                  className="bg-black/40 border border-white/10 hover:bg-black/60 text-white text-center font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  Let&apos;s Talk
                </a>
                <a
                  href={siteConfig.whatsapp.directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 border border-white/10 hover:bg-black/60 text-white text-center font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Glowing Gold Circle & Model Portrait */}
            <div
              className={`lg:col-span-5 flex flex-col justify-center items-center order-1 lg:order-2 relative py-4 sm:py-6 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } transition-all duration-1000`}
            >
              {/* Glowing Golden Circle (Behind Model) */}
              <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-accent/30 bg-gradient-to-tr from-accent/5 via-accent/20 to-transparent shadow-[0_0_80px_rgba(197,168,128,0.15)] animate-pulse" />
              <div className="absolute w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] rounded-full border-[0.5px] border-accent/10" />

              {/* Falling Golden Glitter Particles (Behind Mirror) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ y: -60, opacity: 0, scale: 0.3, rotate: 0 }}
                      animate={{
                        y: [-50, 550],
                        opacity: [0, 0.9, 0.4, 0.9, 0.4, 0.9, 0],
                        scale: [0.3, 1, 0.7, 1, 0.7, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        delay: p.delay,
                        duration: p.duration,
                        ease: 'linear',
                      }}
                      className="absolute rounded-full bg-gradient-to-tr from-[#FFEAA7] via-[#DFBA73] to-[#B59250]"
                      style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        boxShadow: '0 0 5px rgba(223, 186, 115, 0.95)',
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Mirror Frame Wrapper */}
              <div className="relative w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] z-10">
                {/* Traditional Indian Palace Jharokha Arch Crown */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-24 h-10 z-20 text-[#DFBA73] drop-shadow-[0_4px_10px_rgba(223,186,115,0.6)] pointer-events-none">
                  <svg viewBox="0 0 100 40" fill="currentColor" className="w-full h-full">
                    <circle cx="50" cy="2" r="3" fill="#FFFFFF" className="animate-pulse" />
                  </svg>
                </div>

                {/* Top Left Gold Leaf Scroll Flourish */}
                <div className="absolute top-2 left-6 w-10 h-10 sm:w-12 sm:h-12 text-[#DFBA73]/95 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 22 C6 18, 12 18, 14 12 C14 8, 10 10, 8 12 C6 14, 8 8, 12 6 C16 4, 20 2, 22 2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Top Right Gold Leaf Scroll Flourish */}
                <div className="absolute top-2 right-6 w-10 h-10 sm:w-12 sm:h-12 text-[#DFBA73]/95 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] scale-x-[-1]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 22 C6 18, 12 18, 14 12 C14 8, 10 10, 8 12 C6 14, 8 8, 12 6 C16 4, 20 2, 22 2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Indian Golden Premium Mirror Outer Ring */}
                <div className="absolute inset-[-10px] sm:inset-[-12px] rounded-t-full rounded-b-[2.5rem] border-[4px] border-[#DFBA73] pointer-events-none z-10 shadow-[0_20px_45px_rgba(0,0,0,0.45),0_0_25px_rgba(223,186,115,0.4)]">
                  <div className="absolute inset-[3px] rounded-t-full rounded-b-[2.2rem] border-[1.5px] border-dashed border-[#B59250]" />
                  <div className="absolute inset-[-6px] rounded-t-full rounded-b-[2.7rem] border border-[#FFEAA7]/30" />
                </div>

                {/* Model Image Frame - Linked to the package / category detail */}
                <a
                  href={linkedHref}
                  onClick={handleCTAClick}
                  className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border border-accent/30 shadow-inner bg-black/40 group block cursor-pointer"
                >
                  <Image
                    src={activeSlide.frameImage}
                    alt={activeSlide.imageAlt || `${siteConfig.name} Interior Showcase`}
                    fill
                    priority
                    sizes="(max-width: 640px) 300px, 340px"
                    className="object-cover object-center scale-[1.03] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </a>
              </div>

              {/* Mini Floating Offer Badge on Right (Desktop Only) */}
              <div className="hidden xl:flex absolute -right-10 top-1/6 bg-black/85 border border-accent/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex-col items-center gap-1.5 w-48 text-center z-10">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-accent">{activeSlide.badgeLabel}</span>
                <span className="font-serif text-base font-bold text-white leading-tight">{activeSlide.badgeText}</span>
                <span className="text-[8px] uppercase tracking-wider text-white/70 font-semibold leading-normal">Exclusive Experience</span>
                <a
                  href={linkedHref}
                  onClick={handleCTAClick}
                  className="mt-1.5 text-[8px] font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-[#DFBA73] to-[#B59250] px-3.5 py-1.5 rounded-lg flex items-center gap-1 hover:from-[#8A7142] hover:to-[#6E5932] transition-all cursor-pointer"
                >
                  Book <ArrowRight className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Indicator Dots and Navigation Controls */}
              <div className="flex items-center gap-4 mt-5 justify-center z-20">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full border border-white/10 bg-black/40 hover:border-accent hover:text-accent flex items-center justify-center text-white/75 transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2.5">
                  {activeSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all ${
                        idx === currentIndex ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40 w-1.5'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full border border-white/10 bg-black/40 hover:border-accent hover:text-accent flex items-center justify-center text-white/75 transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Scroll Cue */}
        <div className="w-full flex justify-center pb-2 z-10">
          <a
            href="#hero-lookbook"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#DFBA73] hover:text-white transition-colors"
          >
            <span>Explore Spaces &amp; Guarantees</span>
            <span className="animate-bounce text-xs">↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 2: Turnkey Spaces Lookbook & 4 Value Proposition Cards (Seamless Gradient & High Contrast) */}
      <section
        id="hero-lookbook"
        className="relative bg-gradient-to-b from-[#0F0D0C] via-[#F3E5CA] to-[#FAF8F5] pt-12 pb-16 px-4 md:px-8 overflow-hidden select-none"
      >
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Dynamic Lookbook/Portfolio Film-strip Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFBA73] block drop-shadow-xs">
                {hasPackagePortfolio ? `${activeSlide.package?.title} lookbook` : 'Turnkey Spaces'}
              </span>
              <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                Real residential transformations &amp; turnkey execution across Delhi NCR
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => filmStripRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 hover:border-[#DFBA73] flex items-center justify-center text-white hover:text-[#DFBA73] transition-all text-xs cursor-pointer shadow-sm backdrop-blur-md"
                aria-label="Scroll Lookbook Left"
              >
                ←
              </button>
              <button
                onClick={() => filmStripRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 hover:border-[#DFBA73] flex items-center justify-center text-white hover:text-[#DFBA73] transition-all text-xs cursor-pointer shadow-sm backdrop-blur-md"
                aria-label="Scroll Lookbook Right"
              >
                →
              </button>
            </div>
          </div>

          {/* Film Strip Body */}
          <div
            ref={filmStripRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x"
          >
            {hasPackagePortfolio ? (
              portfolioItems.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-36 sm:w-44 snap-start group cursor-pointer"
                >
                  {/* Premium dashed border */}
                  <div className="relative border-t-2 border-b-2 border-dashed border-[#8C765C]/30 py-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/10 shadow-sm">
                      <Image
                        src={item.imageUrl}
                        alt={item.title || 'Portfolio Work'}
                        fill
                        sizes="(max-width: 640px) 144px, 176px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Hover light reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                    </div>
                  </div>
                  <span className="block text-[10px] font-bold text-center uppercase tracking-wider text-[#1C1611] group-hover:text-[#8C6D45] mt-2 transition-colors truncate">
                    {item.title || `Curated Living Space ${idx + 1}`}
                  </span>
                </div>
              ))
            ) : (
              defaultFilmStrip.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-36 sm:w-44 snap-start group cursor-pointer"
                >
                  {/* Premium dashed border */}
                  <div className="relative border-t-2 border-b-2 border-dashed border-[#8C765C]/30 py-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/10 shadow-sm">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 144px, 176px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Hover light reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                    </div>
                  </div>
                  <span className="block text-[11px] font-bold text-center uppercase tracking-wider text-[#1C1611] group-hover:text-[#8C6D45] mt-2 transition-colors">
                    {cat.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Value Proposition Cards at the bottom (Preserved Original Luxury Ivory Cards) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {values.map((v, idx) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-[#FCF9F2] to-[#F5ECD7] border border-accent/25 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md hover:border-accent/50 hover:shadow-md transition-all duration-500 group overflow-hidden relative shadow-sm cursor-pointer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Subtle gold shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center bg-accent/5 text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 relative z-10">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="relative z-10">
                    <span className="block text-xs font-extrabold text-[#1A140E] uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                      {v.title}
                    </span>
                    <span className="block text-[10px] text-[#4A3E36] mt-0.5 leading-normal font-medium group-hover:text-[#1A140E] transition-colors duration-300">
                      {v.desc}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}