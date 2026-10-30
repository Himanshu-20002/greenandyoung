'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import TopBar from './TopBar'
import { siteConfig } from '@/lib/site-config'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const primaryNavLinks = [
    { href: '#services', label: 'Designs' },
    { href: '#gallery', label: 'Portfolio' },
    { href: '#transformations', label: 'Transformations' },
    { href: '#about', label: 'About' },
  ]

  const mobileNavLinks = [
    { href: '#services', label: 'Designs & Services' },
    { href: '#gallery', label: 'Portfolio' },
    { href: '#transformations', label: 'Room Transformations' },
    { href: '#wall-of-fame', label: 'Wall of Fame' },
    { href: '#why-choose-us', label: 'Why G&Y' },
    { href: '#about', label: 'About Us' },
    { href: '#reviews', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact Studio' },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 transition-all">
      <TopBar />
      <div className="bg-white backdrop-blur-xl border-b border-[#FAF8F5]/30 shadow-md transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center text-[#0A140F] group flex-shrink-0">
            {!logoError ? (
              <Image
                src={siteConfig.assets.logo}
                alt={`${siteConfig.name} Logo`}
                width={180}
                height={42}
                style={{ width: 'auto' }}
                className="object-contain h-8 sm:h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0A140F] text-[#D8BC95] font-serif font-bold text-xs flex items-center justify-center border border-[#C5A880]/30 shadow-sm">
                  G&amp;Y
                </div>
                <span className="font-serif font-bold text-base sm:text-lg text-[#0A140F] tracking-tight">
                  G&amp;Y <span className="text-[#C5A880] font-sans text-xs tracking-widest uppercase font-semibold">Interiors</span>
                </span>
              </div>
            )}
          </Link>

          {/* Minimal Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {primaryNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#0A140F]/85 hover:text-[#0A140F] transition-colors duration-200 text-[13px] font-bold tracking-wide relative py-1 hover:drop-shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0A140F] hover:bg-[#15241D] text-[#FAF8F5] font-bold text-xs tracking-wide shadow-md hover:shadow-xl transition-all duration-300"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#0A140F] hover:text-black p-2 rounded-lg hover:bg-black/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile & Expanded Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A140F]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex flex-col gap-3">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium text-sm py-1.5 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 text-center py-3 rounded-full bg-[#E4D7BE] hover:bg-white text-[#0A140F] font-semibold text-xs tracking-wide shadow-md transition-all block"
              >
                Book Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}


