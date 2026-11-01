'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Sparkles,
  MessageCircle,
  Compass,
  ArrowRight,
  Layers,
  MapPin,
  Clock,
  Award,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  GALLERY_PROJECTS,
  GALLERY_CATEGORIES,
  ProjectCaseStudy,
} from '@/lib/gallery-data'

export default function GalleryArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Projects': GALLERY_PROJECTS.length,
    }
    GALLERY_CATEGORIES.forEach((cat) => {
      if (cat !== 'All Projects') {
        counts[cat] = GALLERY_PROJECTS.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [])

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return GALLERY_PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All Projects' || project.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.society.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.scope.toLowerCase().includes(query) ||
        project.materials.some((m) => m.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#121614] selection:bg-[#C5A880]/30 selection:text-[#121614]">
      {/* Global Header */}
      <Header />

      {/* Hero Section with Grid Blueprint Background */}
      <section className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 overflow-hidden bg-[#FAF6EE] border-b border-[#E7E3DC]">
        {/* Subtle CAD Blueprint Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #121614 1px, transparent 1px), linear-gradient(to bottom, #121614 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#DFBA73]/[0.08] rounded-full blur-[140px] transform-gpu"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DFBA73]/15 border border-[#C5A880]/30 text-[#8C6D3F] text-xs font-mono tracking-widest uppercase mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>ARCHITECTURAL CASE STUDIES &amp; GALLERY</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#121614] tracking-tight leading-[1.08] max-w-4xl mb-5">
            Our Real-World{' '}
            <span className="bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#8C6D3F] bg-clip-text text-transparent">
              Complete Residences
            </span>{' '}
            &amp; Sanctuaries
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#2C3531]/75 max-w-3xl font-sans leading-relaxed mb-8">
            Explore our complete home builds across ATS Knightsbridge, DLF Magnolias, The Camellias, Jaypee Greens, and major luxury societies across Delhi NCR. Designed for refined living, built with zero-compromise German precision.
          </p>

          {/* Metric / Trust Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2C3531]/10 text-xs sm:text-[13px] font-medium text-[#2C3531] shadow-xs">
              <Award className="w-4 h-4 text-[#C5A880]" />
              <span>150+ Complete Homes Delivered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2C3531]/10 text-xs sm:text-[13px] font-medium text-[#2C3531] shadow-xs">
              <Clock className="w-4 h-4 text-[#22c55e]" />
              <span>100% On-Time Handover</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2C3531]/10 text-xs sm:text-[13px] font-medium text-[#2C3531] shadow-xs">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Delhi NCR &amp; PAN India</span>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="https://wa.me/919999999999?text=Hello%20Green%20%26%20Young%20Team%2C%20I%20would%20like%20to%20discuss%20a%20complete%20home%20setup%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#121614] hover:bg-[#222924] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-[#DFBA73]" />
              <span>Request Custom 3D Concept</span>
            </Link>
          </div>

          {/* Search Bar Input */}
          <div className="w-full max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#2C3531]/40 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by society, space, material, or style..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#2C3531]/15 text-xs sm:text-sm text-[#121614] placeholder-[#2C3531]/40 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-mono text-[#2C3531]/50 hover:text-[#121614]"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Archive Grid Section - Pure Crisp White, No Grid Visible */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Category Filter Pills with Item Count Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-8">
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category
              const count = categoryCounts[category] || 0
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#121614] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#2C3531] border border-[#2C3531]/15 hover:border-[#C5A880]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-mono ${
                      isActive
                        ? 'bg-[#C5A880] text-[#121614] font-bold'
                        : 'bg-[#2C3531]/10 text-[#2C3531]/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Counter Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2C3531]/10 mb-8">
            <h2 className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#2C3531]/70">
              Showing <span className="font-bold text-[#121614]">{filteredProjects.length}</span> Projects
            </h2>
            <span className="text-[11px] font-mono text-[#8E9F96]">
              All High-Resolution Archival Complete Handaways
            </span>
          </div>

          {/* 3-Column Card Grid Matching Reference Image */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#2C3531]/10">
              <Layers className="w-12 h-12 text-[#C5A880] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-serif font-bold text-[#121614] mb-2">
                No matching projects found
              </h3>
              <p className="text-sm text-[#2C3531]/70 max-w-md mx-auto mb-6">
                Try searching for a different society, space type (e.g. kitchen, mandir, penthouse), or clear your search filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Projects')
                  setSearchQuery('')
                }}
                className="px-6 py-2.5 rounded-full bg-[#121614] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/gallery/${project.id}`}
                  className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#2C3531]/10 hover:border-[#C5A880]/60 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-64 sm:h-72 bg-[#121614] overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Top Left Category Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#DFBA73] border border-[#C5A880]/30 shadow-xs">
                        {project.category}
                      </span>
                    </div>

                    {/* Top Right Photos / Renders Count Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-white/90 bg-black/60 backdrop-blur-md border border-white/20 shadow-xs">
                        {project.rendersCount} Photos · 35mm
                      </span>
                    </div>

                    {/* Society Tag Pill inside photo at bottom */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-[#E7E3DC]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C5A880]" />
                        {project.society}
                      </span>
                      <span className="text-[#8E9F96]">{project.handoverYear}</span>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#121614] leading-snug group-hover:text-[#C5A880] transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#2C3531]/75 line-clamp-2 leading-relaxed font-sans mb-4">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#2C3531]/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#8E9F96]">{project.area}</span>
                      <span className="font-semibold text-[#121614] group-hover:text-[#C5A880] flex items-center gap-1 transition-colors">
                        View Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  )
}
