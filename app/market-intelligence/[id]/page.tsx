import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Share2,
  Bookmark,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/site-config'
import {
  ARTICLES,
  getArticleById,
  getAllArticles,
} from '@/lib/market-intelligence-data'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    id: article.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = getArticleById(id)

  if (!article) {
    return {
      title: 'Article Not Found | Green & Young',
    }
  }

  return {
    title: `${article.title} | Green & Young Architectural Intelligence`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params
  const article = getArticleById(id)

  if (!article) {
    notFound()
  }

  const allArticles = getAllArticles()
  const currentIndex = allArticles.findIndex((item) => item.id === article.id)
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
  const relatedArticles = allArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      {/* Universal Global Header */}
      <Header />

      {/* Hero Header Band (Dark Luxurious Obsidian Gradient Matching Reference) */}
      <section className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#06120B] via-[#0A1C12] via-70% to-[#08150E] text-[#FAF8F5]">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute -top-24 left-1/4 w-[700px] h-[320px] bg-[#C5A880]/[0.08] rounded-full blur-[140px] transform-gpu"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 w-[550px] h-[280px] bg-[#0E2E1F]/[0.2] rounded-full blur-[130px] transform-gpu"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
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
            <Link
              href="/#market-intelligence"
              className="hover:text-white transition-colors duration-200"
            >
              Market Intelligence
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/60 shrink-0" />
            <span className="text-[#D8BC95] font-semibold truncate max-w-[220px] sm:max-w-md">
              {article.category}
            </span>
          </nav>

          {/* Badge & Read Time Meta Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-[#D8BC95] to-[#C5A880] text-[#0A110D] shadow-md">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D5CFC5]">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              {article.readTime}
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-bold text-[#FAF8F5] leading-[1.12] tracking-tight max-w-5xl mb-6">
            {article.title}
          </h1>

          {/* Subtitle / Excerpt Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-[#D5CFC5] font-light leading-relaxed max-w-4xl mb-8">
            {article.summary}
          </p>

          {/* Author & Publication Date Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#A8A29E]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#14281E] border border-[#C5A880]/40 flex items-center justify-center text-[#D8BC95] font-bold text-xs uppercase shadow-sm">
                GY
              </div>
              <div>
                <span className="block font-medium text-white">
                  By {article.author.name}
                </span>
                <span className="block text-[11px] text-[#A8A29E]">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#D5CFC5]">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                {article.date}
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${article.title} - Read executive briefing: ${siteConfig.url}/market-intelligence/${article.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#D8BC95] hover:text-[#0A110D] text-white/90 border border-white/10 transition-all duration-200 text-xs font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body Section (Clean, Editorial White/Cream Background Matching Reference Image) */}
      <section className="relative w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Main Hero Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-12 border border-[#E7E3DC] shadow-[0_12px_36px_rgba(0,0,0,0.06)] bg-[#F4F0EA]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-center"
            />
          </div>

          {/* Executive Takeaways Box */}
          <div className="p-6 sm:p-7 md:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] border-l-4 border-l-[#C5A880] mb-12 sm:mb-14 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#8C6D3F] uppercase mb-4">
              <TrendingUp className="w-4 h-4 text-[#8C6D3F]" />
              <span>Executive Architectural Takeaways</span>
            </div>
            <ul className="space-y-3">
              {article.takeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-[15px] text-[#44403C] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Numbered Sections (Matching Reference Image Style: "1. Heading", Paragraphs) */}
          <article className="prose prose-stone max-w-none space-y-10 sm:space-y-12">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-serif font-bold text-[#1C1917] leading-snug tracking-tight">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base sm:text-[17px] text-[#57534E] leading-[1.8] font-normal">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {/* Editorial Pull Quote */}
          <div className="my-12 sm:my-14 p-6 sm:p-8 rounded-2xl bg-[#07110C] text-[#FAF8F5] border border-[#14281E] relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 bg-[#C5A880]/10 rounded-full blur-2xl" />
            <Sparkles className="w-5 h-5 text-[#D8BC95] mb-3" />
            <p className="font-serif italic text-base sm:text-lg text-[#EAE6DF] leading-relaxed">
              &ldquo;True architectural luxury is not merely surface cosmetics,
              but institutional-grade millimeter joinery that preserves balance
              sheet appraisal value for decades.&rdquo;
            </p>
            <span className="block mt-4 text-xs font-mono text-[#C5A880] tracking-wider uppercase">
              &mdash; Green &amp; Young Engineering Standard
            </span>
          </div>

          {/* Author Signature Card */}
          <div className="pt-8 pb-8 border-t border-b border-[#E7E3DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#07110C] text-[#D8BC95] border border-[#C5A880]/30 flex items-center justify-center font-bold text-sm">
                GY
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1C1917]">
                  {article.author.name}
                </h4>
                <p className="text-xs text-[#78716C]">{article.author.role}</p>
              </div>
            </div>

            <Link
              href="/#market-intelligence"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D3F] hover:text-[#1C1917] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Previous / Next Article Navigation Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-2">
            {prevArticle ? (
              <Link
                href={`/market-intelligence/${prevArticle.id}`}
                className="group p-4 sm:p-5 rounded-xl border border-[#E7E3DC] hover:border-[#C5A880] bg-[#FAF8F5] transition-all duration-200 flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase mb-1">
                  &larr; Previous Briefing
                </span>
                <h5 className="text-sm font-serif font-semibold text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors line-clamp-1">
                  {prevArticle.title}
                </h5>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                href={`/market-intelligence/${nextArticle.id}`}
                className="group p-4 sm:p-5 rounded-xl border border-[#E7E3DC] hover:border-[#C5A880] bg-[#FAF8F5] transition-all duration-200 flex flex-col justify-between text-right sm:col-start-2"
              >
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase mb-1">
                  Next Briefing &rarr;
                </span>
                <h5 className="text-sm font-serif font-semibold text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors line-clamp-1">
                  {nextArticle.title}
                </h5>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related Briefings Section - Symmetrical Architecture Matching Footer */}
      <section className="py-14 sm:py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E7E3DC]">
        {/* Full-width Panoramic Container Matching Footer */}
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12">
          {/* Header Row: Title on Far Left with Architectural SVG, View All Button on Far Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
            <div className="max-w-2xl">
              <span className="text-[#8C6D3F] text-xs font-mono font-bold tracking-[0.25em] uppercase block mb-2">
                / MORE INTELLIGENCE
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1C1917] tracking-tight leading-snug">
                Related Executive Briefings
              </h3>

              {/* Lightweight Interior Architectural Elevation Wireframe Graphic */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3.5 pt-1">
                <div className="flex items-center gap-2.5">
                  <svg
                    className="w-44 sm:w-52 h-7 text-[#C5A880]"
                    viewBox="0 0 210 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Ceiling & Floor Datum Planes */}
                    <line x1="0" y1="2" x2="210" y2="2" stroke="#C5A880" strokeWidth="0.8" strokeOpacity="0.4" />
                    <line x1="0" y1="26" x2="210" y2="26" stroke="#8C6D3F" strokeWidth="1" strokeOpacity="0.6" />

                    {/* Fluted Timber Wall Cladding Ribs */}
                    <line x1="10" y1="2" x2="10" y2="26" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.35" />
                    <line x1="16" y1="2" x2="16" y2="26" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.35" />
                    <line x1="22" y1="2" x2="22" y2="26" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.35" />
                    <line x1="28" y1="2" x2="28" y2="26" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.35" />
                    <line x1="34" y1="2" x2="34" y2="26" stroke="#C5A880" strokeWidth="0.7" strokeOpacity="0.35" />

                    {/* Architectural Arched Portal & Light Drop */}
                    <path
                      d="M48 26V13C48 8.58172 51.5817 5 56 5H74C78.4183 5 82 8.58172 82 13V26"
                      stroke="#8C6D3F"
                      strokeWidth="1"
                    />
                    <line x1="65" y1="2" x2="65" y2="11" stroke="#C5A880" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                    <circle cx="65" cy="12" r="1.5" fill="#C5A880" />

                    {/* Bespoke Joinery Credenza */}
                    <rect x="98" y="15" width="56" height="8" rx="1" stroke="#8C6D3F" strokeWidth="0.9" fill="#FAF8F5" />
                    <line x1="126" y1="15" x2="126" y2="23" stroke="#C5A880" strokeWidth="0.6" />
                    {/* Art Horizon Frame */}
                    <rect x="108" y="5" width="36" height="7.5" rx="0.5" stroke="#C5A880" strokeWidth="0.75" strokeOpacity="0.65" />

                    {/* Architectural Dimension Ticks & Crosshairs */}
                    <line x1="172" y1="2" x2="172" y2="26" stroke="#C5A880" strokeWidth="0.75" strokeDasharray="2 2" />
                    <line x1="202" y1="2" x2="202" y2="26" stroke="#C5A880" strokeWidth="0.75" strokeDasharray="2 2" />
                    <path d="M187 11V17M184 14H190" stroke="#8C6D3F" strokeWidth="0.8" />
                  </svg>
                  <span className="text-[10px] font-mono font-semibold text-[#8C6D3F] uppercase tracking-widest hidden sm:inline-block">
                    ELEVATION // 01:25
                  </span>
                </div>
                <span className="text-xs text-[#78716C] font-normal leading-relaxed">
                  Curated architectural audits &amp; turnkey engineering intelligence.
                </span>
              </div>
            </div>

            <Link
              href="/market-intelligence"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#07110C] text-[#8C6D3F] hover:text-[#D8BC95] border border-[#E7E3DC] hover:border-[#07110C] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs self-start sm:self-auto shrink-0"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Centered: Exactly matching landing page */}
          <div className="w-full max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/market-intelligence/${item.id}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-[#E7E3DC] hover:border-[#C5A880] shadow-none hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A110D]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md text-[#D8BC95] border border-white/10">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[10px] font-mono text-[#A8A29E] uppercase mb-2">
                        {item.date} &bull; {item.readTime}
                      </div>
                      <h4 className="text-base font-serif font-semibold text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors line-clamp-2 mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#78716C] line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-semibold text-[#8C6D3F]">
                      <span>Read Full Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
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
