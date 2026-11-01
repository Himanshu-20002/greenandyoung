'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import TopBar from './TopBar'
import { siteConfig } from '@/lib/site-config'
import { openEstimateSheet } from './bottom-sheet-form'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = siteConfig.navLinks

  useEffect(() => {
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 25
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu" style={{ transform: 'translateZ(0)' }}>
      {/* Collapsible Professional TopBar on scroll (Reflow-Free CSS Grid Transition) */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isScrolled ? 'grid-rows-[0fr] opacity-0 pointer-events-none' : 'grid-rows-[1fr] opacity-100'
          }`}
      >
        <div className="overflow-hidden">
          <TopBar />
        </div>
      </div>

      {/* Main Navbar with Glassmorphism and Consistent Padding */}
      <div
        className={`transition-all duration-300 border-b ${isScrolled
          ? 'bg-white/99 backdrop-blur-xl border-[#E7E5E4] shadow-md'
          : 'bg-white/99 backdrop-blur-lg border-[#FAF8F5]/50 shadow-sm'
          }`}
      >
        <nav
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6 transition-all duration-300 ${isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center text-[#0A140F] group flex-shrink-0 transition-transform duration-200 hover:scale-[1.01]">
            {!logoError ? (
              <Image
                src={siteConfig.assets.logo}
                alt="Green & Young Interiors — Luxury Complete Home Interior Designers"
                width={180}
                height={42}
                style={{ width: 'auto' }}
                className={`object-contain w-auto transition-all duration-300 ${isScrolled ? 'h-8 sm:h-8 md:h-9' : 'h-9 sm:h-9 md:h-10'
                  }`}
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0A140F] text-[#D8BC95] font-serif font-bold text-xs flex items-center justify-center border border-[#C5A880]/30 shadow-sm">
                  G
                </div>
                <span className="font-serif font-bold text-base sm:text-lg text-[#0A140F] tracking-tight">
                  Green &amp; Young <span className="text-[#C5A880] font-sans text-xs tracking-widest uppercase font-semibold">Interiors</span>
                </span>
              </div>
            )}
          </Link>

          {/* Balanced Desktop Navigation with Lightweight Animated Underline */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[#0A140F]/80 hover:text-[#0A140F] transition-colors duration-200 text-[13px] font-bold tracking-wide whitespace-nowrap"
              >
                <span>{link.label}</span>
                {/* Lightweight animated gold underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFBA73] to-[#B59250] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Distinct Modern Action CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => openEstimateSheet()}
              className="group relative inline-flex items-center gap-2.5 pl-4 pr-2 py-1.5 rounded-full bg-[#09110D] hover:bg-[#0E1A14] text-white border border-[#C5A880]/40 hover:border-[#DFBA73] shadow-[0_2px_12px_rgba(10,20,15,0.15)] hover:shadow-[0_4px_22px_rgba(197,168,128,0.3)] transition-all duration-300 cursor-pointer active:scale-95"
            >
              <span className="text-[12px] font-bold tracking-wide text-neutral-100 group-hover:text-white transition-colors">
                Get a Quote
              </span>
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C5A880] to-[#E8D4B8] text-[#09110D] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:from-[#DFBA73] group-hover:to-[#FFF0D0] shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#0A140F] hover:text-black p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer with Premium Translucent Green Glass Effect */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#0E2A1B]/85 via-[#14391F]/80 to-[#0E2A1B]/88 backdrop-blur-2xl text-neutral-100 border-b border-[#DFBA73]/30 py-6 px-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group text-neutral-100 hover:text-white transition-all duration-200 font-semibold text-sm py-3 border-b border-white/[0.08] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFBA73] stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openEstimateSheet()
              }}
              className="mt-5 flex items-center justify-between px-5 py-3 rounded-full bg-[#081810]/90 hover:bg-[#0c2418] text-white border border-[#DFBA73]/50 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 w-full cursor-pointer active:scale-95"
            >
              <span className="text-xs font-bold tracking-wider text-white uppercase">
                Get a Quote
              </span>
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C5A880] to-[#E8D4B8] text-[#09110D] flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.4]" />
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
