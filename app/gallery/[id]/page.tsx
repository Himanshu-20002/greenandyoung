'use client'

import React, { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Compass,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  ShieldCheck,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  GALLERY_PROJECTS,
  ProjectCaseStudy,
} from '@/lib/gallery-data'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const project = GALLERY_PROJECTS.find((p) => p.id === resolvedParams.id)

  if (!project) {
    notFound()
  }

  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  // Related projects
  const relatedProjects = GALLERY_PROJECTS.filter(
    (p) => p.id !== project.id
  ).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#121614] selection:bg-[#C5A880]/30 selection:text-[#121614]">
      {/* Global Header */}
      <Header />

      {/* Hero Header Section */}
      <section className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-10 sm:pb-14 overflow-hidden border-b border-[#2C3531]/10 bg-white">
        {/* Subtle CAD Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #121614 1px, transparent 1px), linear-gradient(to bottom, #121614 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#2C3531]/60 mb-6"
          >
            <Link href="/" className="hover:text-[#121614] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <Link href="/gallery" className="hover:text-[#121614] transition-colors">
              Portfolio Gallery
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="text-[#8C6D3F] font-semibold truncate max-w-xs sm:max-w-sm">
              {project.title}
            </span>
          </nav>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#DFBA73]/15 text-[#8C6D3F] border border-[#C5A880]/30">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2C3531]/80 bg-[#FAF8F5] border border-[#2C3531]/10">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              {project.society}, {project.location}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-[#2C3531]/80 bg-[#FAF8F5] border border-[#2C3531]/10">
              Handover: {project.handoverYear}
            </span>
          </div>

          {/* Big Project Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#121614] tracking-tight leading-[1.1] mb-4">
            {project.title}
          </h1>

          {/* Subtitle / Scope */}
          <p className="text-sm sm:text-base md:text-lg text-[#2C3531]/75 max-w-3xl font-sans leading-relaxed mb-8">
            {project.subtitle}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/919999999999?text=Hello%20Green%20%26%20Young%20Team%2C%20I%20am%20interested%20in%20a%20turnkey%20design%20similar%20to%20${encodeURIComponent(
                project.title
              )}%20at%20${encodeURIComponent(project.society)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Consult on WhatsApp</span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121614] hover:bg-[#222924] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-[#DFBA73]" />
              <span>Request Similar Turnkey Proposal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Showcase Section - Pure Crisp White */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Main Visual Showcase (Large Photo Viewer + Thumbnails) */}
          <div className="mb-14">
            {/* Primary Main Photo */}
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden shadow-xl border border-[#2C3531]/10 bg-[#121614] mb-4">
              <Image
                src={project.galleryImages[activePhotoIndex] || project.heroImage}
                alt={project.title}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Watermark / Archival Stamp */}
              <div className="absolute bottom-4 left-4 sm:left-6 z-10 flex items-center gap-2 text-white/90 text-xs sm:text-sm font-mono tracking-wider">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  GREEN &amp; YOUNG ARCHIVAL · 35MM TURNKEY HANDOVER
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {project.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-[#C5A880] scale-[1.03] shadow-md ring-2 ring-[#DFBA73]/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2-Column Overview: Architectural Narrative & Technical Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 mb-16">
            {/* Left Column: Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Executive Summary */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#2C3531]/10 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#121614] mb-4">
                  Turnkey Architectural Narrative
                </h2>
                <p className="text-sm sm:text-base text-[#2C3531]/80 leading-relaxed font-sans mb-6">
                  {project.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-[#2C3531]/10">
                  {project.architecturalStory.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-xs sm:text-sm text-[#2C3531]/75 leading-relaxed font-sans"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#2C3531]/10 shadow-xs">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#121614] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C5A880]" />
                  <span>Engineering &amp; Execution Precision</span>
                </h3>
                <ul className="space-y-3">
                  {project.engineeringHighlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#2C3531]/80 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Spec Sheet & Material Palette (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Technical Specifications Sheet */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#2C3531]/10 shadow-xs">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#121614] mb-5 pb-3 border-b border-[#2C3531]/10">
                  Project Factsheet
                </h3>
                <dl className="divide-y divide-[#2C3531]/10 text-xs sm:text-sm">
                  {project.specs.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <dt className="text-[#2C3531]/60 font-mono">{item.label}</dt>
                      <dd className="font-semibold text-[#121614] text-right font-sans">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Curated Material Palette */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121614] text-white shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#DFBA73]" />
                  <h3 className="text-lg font-serif font-bold text-[#FAF8F5]">
                    Material Palette &amp; Finishes
                  </h3>
                </div>
                <p className="text-xs text-[#8E9F96] mb-5 leading-relaxed">
                  Only authentic European stones, German joinery hardware, and PVD architectural metals were deployed for this build.
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 text-[#DFBA73] border border-white/15"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          <div className="pt-12 border-t border-[#2C3531]/15">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3F] block mb-1">
                  MORE RESIDENTIAL EXECUTIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#121614]">
                  Explore Adjacent Projects
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#121614] hover:text-[#C5A880] transition-colors"
              >
                View Full Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/gallery/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#2C3531]/10 hover:border-[#C5A880]/60 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-48 bg-[#121614] overflow-hidden">
                    <Image
                      src={rel.heroImage}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/60 text-[#DFBA73]">
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-mono text-[#8E9F96] block mb-1">
                      {rel.society}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#121614] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  )
}
