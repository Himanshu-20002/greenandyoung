'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowUpRight,
  Search,
  BookOpen,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  ARTICLES,
  CATEGORIES,
  ArticleItem,
} from '@/lib/market-intelligence-data'

export default function MarketIntelligenceListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Insights')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Insights' || article.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      {/* Universal Global Header */}
      <Header />

      {/* Hero Header Band (Dark Oceanic/Obsidian Band Matching Reference Image 1) */}
      <section className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#06120B] via-[#0A1C12] via-75% to-[#08150E] text-[#FAF8F5]">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute -top-24 left-1/4 w-[700px] h-[320px] bg-[#C5A880]/[0.08] rounded-full blur-[140px] transform-gpu"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumbs Row */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#A8A29E] mb-6 sm:mb-8"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/60 shrink-0" />
            <span className="text-[#D8BC95] font-semibold">
              Market Intelligence
            </span>
          </nav>

          {/* Small Top Tag */}
          <span className="text-[#C5A880] text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase block mb-3">
            GREEN &amp; YOUNG KNOWLEDGE DESK
          </span>

          {/* Big Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FAF8F5] tracking-tight leading-[0.98] uppercase mb-5">
            LATEST INSIGHTS &amp; <span className="text-[#D8BC95]">ARTICLES</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#A8A29E] font-normal leading-relaxed max-w-3xl">
            Authoritative architectural briefings, lifecycle material audits, and turnkey intelligence curated by Green &amp; Young&apos;s senior project engineers.
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="relative w-full py-10 sm:py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Filter Bar with Search (Matching Reference Image 1) */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E7E3DC] shadow-xs mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All Insights'
                    ? ARTICLES.length
                    : ARTICLES.filter((a) => a.category === cat).length
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0A110D] text-[#D8BC95] font-bold shadow-xs'
                        : 'bg-[#FAF8F5] border border-[#E7E3DC] text-[#57534E] hover:text-[#1C1917] hover:border-[#C5A880]'
                    }`}
                  >
                    {cat} {cat === 'All Insights' && `(${count})`}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-hidden focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Articles Grid (Matching Reference Card Style) */}
          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <BookOpen className="w-10 h-10 text-[#C5A880] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                No articles found
              </h3>
              <p className="text-xs text-[#78716C] mt-1">
                Try searching with different terms or selecting another category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/market-intelligence/${article.id}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-[#E7E3DC] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Frame */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A110D]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md text-[#D8BC95] border border-white/10 font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Meta Row */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A29E] uppercase mb-3">
                        <span className="text-[#8C6D3F] font-semibold">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C5A880]" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors line-clamp-2 leading-snug mb-3">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-semibold text-[#8C6D3F]">
                      <span className="inline-flex items-center gap-1 group-hover:text-[#1C1917] transition-colors">
                        <span>Read Full Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="text-[11px] font-mono text-[#A8A29E]">
                        {article.date}
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
