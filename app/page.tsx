import {
  getHomepageSlides,
  getHomepageGalleryImages,
  getHomepageBeforeAfterImages,
} from '@/lib/db-queries'
import dynamicImport from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { EngineeredServices } from '@/components/engineered-services'
import { Services } from '@/components/services'
import { ClientQuote } from '@/components/client-quote'
import { StatsStrip } from '@/components/stats-strip'
import { ErrorBoundary } from '@/components/error-boundary'
import { BottomSheetForm } from '@/components/bottom-sheet-form'

const GyAdvantage = dynamicImport(() => import('@/components/gy-advantage').then(mod => mod.GyAdvantage), {
  ssr: true,
  loading: () => <div className="h-80 animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const MarketIntelligence = dynamicImport(() => import('@/components/market-intelligence').then(mod => mod.MarketIntelligence), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const BrandShowcase = dynamicImport(() => import('@/components/brand-showcase').then(mod => mod.BrandShowcase), { ssr: true })
const Reviews = dynamicImport(() => import('@/components/reviews').then(mod => mod.Reviews), {
  ssr: true,
  loading: () => <div className="h-72 animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const Gallery = dynamicImport(() => import('@/components/gallery').then(mod => mod.Gallery), {
  ssr: true,
  loading: () => <div className="h-[500px] animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const BeforeAfter = dynamicImport(() => import('@/components/before-after').then(mod => mod.BeforeAfter), {
  ssr: true,
  loading: () => <div className="h-[400px] animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const WallOfFame = dynamicImport(() => import('@/components/wall-of-fame').then(mod => mod.WallOfFame), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const LatestTrends = dynamicImport(() => import('@/components/latest-trends').then(mod => mod.LatestTrends), {
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-card/10 rounded-[32px] my-10" />
})
const FilmStrip = dynamicImport(() => import('@/components/film-strip').then(mod => mod.FilmStrip), {
  ssr: true,
  loading: () => <div className="h-16 animate-pulse bg-card/10 my-2" />
})
const PhotoFilmStrip = dynamicImport(() => import('@/components/photo-film-strip').then(mod => mod.PhotoFilmStrip), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse bg-card/10 rounded-[32px] my-4" />
})
const Footer = dynamicImport(() => import('@/components/footer').then(mod => mod.Footer), { ssr: true })

export const revalidate = 60

export default async function Page() {
  let plainSlides: any[] = []
  let plainGalleryImages: any[] = [
    {
      id: 'gallery-1',
      imageUrl: '/images/interiors/penthouse-living.jpg',
      caption: 'The Duplex Living Suite — ATS Knightsbridge, Noida',
      category: 'Living & Lounges',
      active: true,
    },
    {
      id: 'gallery-2',
      imageUrl: '/images/interiors/modular-kitchen.jpg',
      caption: 'German Precision Quartzite Waterfall Island — The Camellias',
      category: 'Modular Kitchens',
      active: true,
    },
    {
      id: 'gallery-3',
      imageUrl: '/images/interiors/master-suite.jpg',
      caption: 'Sanctuary Suite with Fluted Walnut Millwork — Gulshan Dynasty',
      category: 'Master Suites',
      active: true,
    },
    {
      id: 'gallery-4',
      imageUrl: '/images/interiors/mandir-sanctuary.jpg',
      caption: 'Backlit Translucent Onyx & Brass Jaali Mandir — Supernova Noida',
      category: 'Sacred Mandirs',
      active: true,
    },
    {
      id: 'gallery-5',
      imageUrl: '/images/interiors/walkin-wardrobe.jpg',
      caption: 'Boutique Fluted Glass Dressing Atelier — Experion Windchants',
      category: 'Walk-In Wardrobes',
      active: true,
    },
    {
      id: 'gallery-6',
      imageUrl: '/images/interiors/dining-suite.jpg',
      caption: '10-Seater Monolith Quartzite Dining — DLF Magnolias',
      category: 'Living & Lounges',
      active: true,
    },
    {
      id: 'gallery-7',
      imageUrl: '/images/interiors/spa-bathroom.jpg',
      caption: 'Calacatta Bookmatched Spa Bath with Freestanding Tub — Godrej Woods',
      category: 'Spa Bathrooms',
      active: true,
    },
    {
      id: 'gallery-8',
      imageUrl: '/images/interiors/media-lounge.jpg',
      caption: 'Midnight Acoustic Private Cinema — Jaypee Greens',
      category: 'Living & Lounges',
      active: true,
    },
  ]
  let plainBeforeAfterImages: any[] = []

  const dbSlides = await getHomepageSlides()
  if (dbSlides && dbSlides.length > 0) {
    plainSlides = dbSlides
  }

  const dbGallery = await getHomepageGalleryImages()
  if (dbGallery && dbGallery.length > 0) {
    plainGalleryImages = dbGallery
  }

  const dbBeforeAfter = await getHomepageBeforeAfterImages()
  if (dbBeforeAfter && dbBeforeAfter.length > 0) {
    plainBeforeAfterImages = dbBeforeAfter
  }

  return (
    <main className="bg-background">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <Hero slides={plainSlides} />
      </ErrorBoundary>
      <ErrorBoundary>
        <EngineeredServices />
      </ErrorBoundary>
      <ErrorBoundary>
        <StatsStrip />
      </ErrorBoundary>
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>

      <ErrorBoundary>
        <Gallery initialImages={plainGalleryImages} />
      </ErrorBoundary>
      <ErrorBoundary>
        <BrandShowcase />
      </ErrorBoundary>
      <ErrorBoundary>
        <Reviews />
      </ErrorBoundary>

      <ErrorBoundary>
        <BeforeAfter initialImages={plainBeforeAfterImages} />
      </ErrorBoundary>
      <ErrorBoundary>
        <PhotoFilmStrip />
      </ErrorBoundary>
      <ErrorBoundary>
        <ClientQuote />
      </ErrorBoundary>
      <div className="section-render-optimize">
        <ErrorBoundary>
          <WallOfFame />
        </ErrorBoundary>
      </div>

      <div className="section-render-optimize">
        <ErrorBoundary>
          <LatestTrends />
        </ErrorBoundary>
      </div>

      <div className="section-render-optimize">
        <ErrorBoundary>
          <GyAdvantage />
        </ErrorBoundary>
      </div>

      <div className="section-render-optimize">
        <ErrorBoundary>
          <MarketIntelligence />
        </ErrorBoundary>
      </div>

      <Footer />
      <ErrorBoundary>
        <FilmStrip />
      </ErrorBoundary>
      <BottomSheetForm />
    </main>
  )
}
