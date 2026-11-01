'use client'

import { useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GALLERY_PROJECTS } from '@/lib/gallery-data'

const shimmerDataUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzE1MTUxNSIgb2Zmc2V0PSIyMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjIyIiBvZmZzZXQ9IjUwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMxNTE1MTUiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxNTE1MTUiLz48cmVjdCBpZD0iciIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4='

interface GalleryImageData {
  id: string
  imageUrl: string
  caption: string | null
  category: string
  active: boolean
}

interface Props {
  initialImages?: GalleryImageData[]
}

const categories = [
  'All',
  'Living & Lounges',
  'Modular Kitchens',
  'Master Suites',
  'Walk-In Wardrobes',
  'Sacred Mandirs',
  'Spa Bathrooms',
]

function getProjectSlug(image: GalleryImageData): string {
  // 1. Match by exact heroImage or gallery image URL
  const byImage = GALLERY_PROJECTS.find(
    (p) => p.heroImage === image.imageUrl || p.galleryImages.includes(image.imageUrl)
  )
  if (byImage) return byImage.id

  // 2. Match by caption keywords (society, title)
  if (image.caption) {
    const captionLower = image.caption.toLowerCase()
    const bySociety = GALLERY_PROJECTS.find(
      (p) =>
        captionLower.includes(p.society.toLowerCase()) ||
        captionLower.includes(p.title.toLowerCase())
    )
    if (bySociety) return bySociety.id
  }

  // 3. Fallback to category first match
  const byCategory = GALLERY_PROJECTS.find((p) => p.category === image.category)
  if (byCategory) return byCategory.id

  return GALLERY_PROJECTS[0].id
}

export function Gallery({ initialImages = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const filteredImages =
    selectedCategory === 'All'
      ? initialImages
      : initialImages.filter((img) => {
          const dbCat = (img.category || '').toLowerCase().trim()
          const selected = selectedCategory.toLowerCase().trim()
          return (
            dbCat === selected ||
            dbCat.replace(/s$/, '') === selected.replace(/s$/, '') ||
            dbCat.replace(/\s+/g, '') === selected.replace(/\s+/g, '')
          )
        })

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredImages.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)

  return (
    <section id="gallery" className="py-24 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4 mb-6">
            Gallery
          </h2>
          <p className="text-lg text-foreground opacity-70 max-w-2xl mx-auto">
            Explore our portfolio of transformations and interior excellence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mb-10 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-background border border-border text-foreground hover:border-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Clicking opens Project Detail Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentItems.map((image) => {
            const projectSlug = getProjectSlug(image)
            return (
              <Link
                key={image.id}
                href={`/gallery/${projectSlug}`}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300 block"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.caption || 'Green & Young Interior'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={shimmerDataUrl}
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Minimal Top-Left Category Micro-Pill */}
                <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wider uppercase bg-black/40 backdrop-blur-[2px] text-[#DFBA73] border border-white/15">
                    <span className="w-1 h-1 rounded-full bg-[#DFBA73]" />
                    {image.category}
                  </span>
                </div>

                {/* Minimal Bottom Fade Scrim (Reduced tint, image stays clear & vibrant) */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/25 to-transparent pt-8 pb-3 px-3.5 flex flex-col justify-end">
                  <h3 className="text-white font-serif font-bold text-xs sm:text-[13px] leading-snug line-clamp-1 drop-shadow-md group-hover:text-[#FFEAA7] transition-colors">
                    {image.caption || 'Bespoke Complete Home Setup'}
                  </h3>
                  <div className="mt-0.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white/60 text-[9px] uppercase tracking-wider">
                      Complete Setup
                    </span>
                    <span className="text-[#DFBA73] font-medium inline-flex items-center gap-1 group-hover:text-[#FFEAA7] transition-colors">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-accent hover:text-accent cursor-pointer'
              }`}
              aria-label="Previous Page"
            >
              ←
            </button>
            <span className="text-sm font-semibold text-foreground/80">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:border-accent hover:text-accent cursor-pointer'
              }`}
              aria-label="Next Page"
            >
              →
            </button>
          </div>
        )}

        {/* Explore Full Archive CTA linking to /gallery */}
        <div className="mt-12 flex justify-center">
          <a
            href="/gallery"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#121614] hover:bg-[#222924] text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
          >
            <span>Explore Complete Project Archive</span>
            <ArrowUpRight className="w-4 h-4 text-[#DFBA73] stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-3xl aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImg = initialImages.find((img) => img.id === selectedImage)
                if (!currentImg) return null
                return (
                  <>
                    <Image
                      src={currentImg.imageUrl}
                      alt={currentImg.caption || 'Green & Young Interior'}
                      fill
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl}
                      className="object-contain"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm border border-white/10 px-6 py-2.5 rounded-full text-center max-w-sm">
                      <p className="text-white font-bold text-sm">
                        {currentImg.caption || 'Complete Home Project'}
                      </p>
                      <p className="text-[#DFBA73] text-[10px] font-bold uppercase tracking-wider mt-0.5">
                        {currentImg.category}
                      </p>
                    </div>
                  </>
                )
              })()}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white p-2.5 rounded-full hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
