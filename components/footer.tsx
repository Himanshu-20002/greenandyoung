'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, MapPin, MessageCircle, Star, Sparkles, Shield } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { openEstimateSheet } from './bottom-sheet-form'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const designSpaces = [
    { label: 'Living Room', href: '#services' },
    { label: 'Modular Kitchen', href: '#services' },
    { label: 'Mandir Space', href: '#services' },
    { label: 'Balcony Lounge', href: '#services' },
  ]

  const suitesMillwork = [
    { label: 'Master Bedroom', href: '#services' },
    { label: 'TV Units', href: '#services' },
    { label: 'Walk-in Wardrobe', href: '#services' },
    { label: 'Washroom Suites', href: '#services' },
  ]

  const exploreLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About Story', href: '/about' },
    { label: 'Achievements', href: '#achievements', badge: 'AWARDS' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: '3D Configurator', href: '#booking' },
  ]

  return (
    <footer id="contact" className="bg-background px-2 sm:px-4 md:px-6 pb-4 sm:pb-6 pt-6 sm:pt-12 antialiased">
      <div id="booking" className="-top-24 relative" />
      {/* Outer Floating Panoramic Card Shell */}
      <div className="relative w-full max-w-[1700px] mx-auto bg-[#07110C] text-[#8E9F96] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] border border-[#14281E] px-6 sm:px-10 md:px-12 py-7 sm:py-9 md:py-10 overflow-hidden shadow-2xl">
        
        {/* Subtle Ambient Radial Glow (Zero-GPU-Blur) */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.06) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

        {/* Top Header Row with Social Rail + Whimsical Badge */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Docked Pill Social Rail (Top Left) */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <a
              href={siteConfig.whatsapp.directLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Principal Designer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black flex items-center justify-center transition-all duration-300"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-600 text-white flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href={`tel:${siteConfig.phone.primaryRaw}`}
              aria-label="Direct Studio Call"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-[#C5A880] text-white hover:text-black flex items-center justify-center transition-all duration-300"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>

          {/* Whimsical / Playful Studio Badge (Top Right) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px] text-[#A2B3AA] tracking-wide">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Complete Architectural Luxury • Delhi NCR</span>
          </div>
        </div>

        {/* Main Content Grid (Compact & Wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
          
          {/* Column 1: High-Impact Question + CTA (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Do you like<br />
              <span className="bg-gradient-to-r from-white via-white/95 to-[#C5A880] bg-clip-text text-transparent">
                what you see?
              </span>
            </h2>

            {/* Pill CTA + Google Review Validation */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <motion.a
                href="#estimate"
                onClick={(e) => {
                  e.preventDefault()
                  openEstimateSheet()
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#E4D7BE] hover:bg-[#F2E7D0] text-[#0A140F] font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span>Plan Your Dream Home</span>
                <motion.span
                  className="inline-flex items-center justify-center"
                  initial={{ x: 0, y: 0, scale: 1 }}
                  whileInView={{
                    x: [0, 4, 1, 3, 0],
                    y: [0, -4, -1, -3, 0],
                    scale: [1, 1.2, 1, 1.08, 1],
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.35,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  <ArrowUpRight className="w-4 h-4 text-[#0A140F] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.span>
              </motion.a>

              {/* Rating validation badge */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                    <span className="text-[11px] font-bold text-white ml-1">4.7</span>
                  </div>
                  <p className="text-[9px] text-[#7E9388] tracking-wider uppercase">
                    500+ Residences
                  </p>
                </div>
              </div>
            </div>

            {/* Brief Narrative */}
            <p className="text-xs text-[#7E9388] leading-relaxed max-w-sm">
              Bespoke residential architectural execution, modular German fittings, and complete spatial elegance.
            </p>
          </div>

          {/* Column 2: Navigation Groups (8 cols on large screens) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Nav Group 1: Spaces */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                Spaces
              </h4>
              <ul className="space-y-2 text-xs">
                {designSpaces.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-[#8E9F96] hover:text-white transition-colors block">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Group 2: Millwork */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                Millwork
              </h4>
              <ul className="space-y-2 text-xs">
                {suitesMillwork.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-[#8E9F96] hover:text-white transition-colors block">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Group 3: Explore */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                Explore
              </h4>
              <ul className="space-y-2 text-xs">
                {exploreLinks.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5">
                    <a href={item.href} className="text-[#8E9F96] hover:text-white transition-colors">
                      {item.label}
                    </a>
                    {item.badge && (
                      <span className="text-[8px] px-1 py-0.2 rounded-full bg-[#C5A880]/20 text-[#C5A880] font-bold tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Group 4: Get in Touch */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                Get in touch
              </h4>
              <div className="space-y-2.5 text-xs text-[#8E9F96]">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <a href={`tel:${siteConfig.phone.primaryRaw}`} className="hover:text-white transition-colors font-medium">
                      {siteConfig.phone.primary}
                    </a>
                    <a href={`tel:${siteConfig.phone.consultationRaw}`} className="text-[11px] text-[#6E8278] hover:text-white transition-colors">
                      {siteConfig.phone.consultation}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-snug">
                    {siteConfig.address.fullDisplay}
                  </span>
                </div>

                <div className="pt-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#6E8278] block">
                    Studio Hours
                  </span>
                  <span className="text-[11px] text-[#A2B3AA]">
                    Mon – Sun: 10AM – 7:30PM
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 🌟 GIGANTIC MONUMENTAL TYPOGRAPHY BANNER WITH LUXURY MASKED REVEAL */}
        <div className="pt-6 sm:pt-8 md:pt-10 pb-3 sm:pb-4 overflow-hidden border-b border-[#14281E]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.04,
                },
              },
            }}
            className="flex items-center gap-x-[1.4vw] select-none whitespace-nowrap"
          >
            {[
              { text: "Let's", highlight: false },
              { text: "Build", highlight: false },
              { text: "Your", highlight: false },
              { text: "Masterpiece", highlight: true },
            ].map((item, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={{
                    hidden: { y: '120%', opacity: 0, rotate: 2 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className={`inline-block text-[5.8vw] sm:text-[5.4vw] md:text-[5.1vw] font-black tracking-tighter leading-none ${
                    item.highlight
                      ? 'bg-gradient-to-r from-white via-[#FFEAA7] to-[#DFBA73] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(223,186,115,0.3)]'
                      : 'text-white'
                  }`}
                >
                  {item.text}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Ultra-Clean Bottom Credits Bar */}
        <div className="pt-4 sm:pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6E8278]">
          {/* Brand Legal Name */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-xs sm:text-sm">Green &amp; Young Interiors.</span>
            <span>&copy; Green &amp; Young Interior Designers {currentYear}</span>
            <span className="hidden sm:inline">&middot; NCR Studio Reg.</span>
          </div>

          {/* Region Served & Legal Links */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-[11px] sm:text-xs">
            <span>Noida &middot; Greater Noida &middot; Ghaziabad &middot; Gurgaon</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <a
              href="https://www.greenandyoung.in/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.greenandyoung.in/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms
            </a>
            <span className="hidden sm:inline text-white/10">|</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[#C5A880]/80 hover:text-[#C5A880] transition-colors font-medium hover:underline"
              title="Studio Management Console"
            >
              <Shield className="w-3 h-3 text-[#C5A880]" />
              <span>Admin Studio</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
