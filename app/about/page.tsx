import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/site-config'
import {
  Award,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Compass,
  Building2,
  Users2,
  Layers,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Green & Young | Turnkey Luxury Interior Designers in Delhi NCR',
  description:
    'Learn about Green & Young Interiors. Founded in 2019, Green & Young delivers bespoke turnkey residential interiors, German modular engineering, and architectural luxury across Noida, Greater Noida, and Delhi NCR.',
}

const PILLARS = [
  {
    icon: Clock,
    title: '45-Day Guaranteed Handover',
    desc: 'Strict timeline commitments with financial penalties if delayed. We respect your move-in schedule with precision-engineered milestones.',
  },
  {
    icon: ShieldCheck,
    title: '10-Year Comprehensive Warranty',
    desc: 'Full warranty coverage on all modular cabinetry, German fittings, and structural millwork crafted with BWP marine-grade plywood.',
  },
  {
    icon: Layers,
    title: 'Zero Hidden Costs',
    desc: '100% bottom-line pricing upfront. No surprise variation bills or mid-project price escalations. What we quote is what you pay.',
  },
  {
    icon: Users2,
    title: 'Dedicated Project Guardians',
    desc: 'A single, experienced site engineer on your premises every single day, coordinating all MEP, carpentry, civil, and finishing teams.',
  },
]

const KEY_METRICS = [
  { value: '500+', label: 'Luxury Residences Crafted' },
  { value: '45 Days', label: 'Average Turnkey Handover' },
  { value: '10 Years', label: 'Modular Cabinetry Warranty' },
  { value: '8+', label: 'National Industry Awards' },
]

const BRAND_PARTNERS = [
  { name: 'Blum Austria', desc: 'Concealed Soft-Close Hinges & Servo-Drive' },
  { name: 'Häfele Germany', desc: 'Architectural Hardware & Storage Systems' },
  { name: 'Saint-Gobain', desc: 'Ultra-Clear Fluted & Lacquered Glass' },
  { name: 'CenturyPly', desc: 'Club Prime Marine Grade BWP Plywood' },
  { name: 'Greenlam', desc: 'High-Pressure Anti-Fingerprint Laminates' },
  { name: 'Asian Paints Royale', desc: 'Luxury Italian Stucco & Velvet Finishes' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] antialiased selection:bg-[#E4D7BE] selection:text-[#0A140F]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 md:pt-48 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#0A140F] text-[#FAF8F5] overflow-hidden">
        {/* Ambient Radial Haze */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-white/5 backdrop-blur-md text-[#C5A880] text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>THE GREEN &amp; YOUNG STORY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05] mb-6">
              Architectural Sanctuaries,{' '}
              <span className="text-[#C5A880] italic font-serif">Engineered to Last.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#A2B3AA] leading-relaxed mb-8">
              Founded in 2019, Green &amp; Young Interiors was born from a simple conviction: luxury interior design should never be a stressful ordeal of unreliable contractors and broken promises. We pair German modular engineering precision with bespoke architectural design.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E4D7BE] hover:bg-white text-[#0A140F] font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs sm:text-sm tracking-wide transition-all"
              >
                <span>View Our Portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-[#111F17] border-y border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {KEY_METRICS.map((metric, i) => (
            <div key={i} className="text-center sm:text-left border-l-2 border-[#C5A880]/40 pl-4 sm:pl-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#E4D7BE] tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-[#A2B3AA] mt-1 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Narrative Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Images Collage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#E7E3DC] shadow-xl">
              <Image
                src="/images/interiors/penthouse-living.jpg"
                alt="Green & Young Interiors Living Room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#E7E3DC] shadow-md">
                <Image
                  src="/images/interiors/modular-kitchen.jpg"
                  alt="Green & Young Modular Kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#E7E3DC] shadow-md">
                <Image
                  src="/images/interiors/master-suite.jpg"
                  alt="Green & Young Master Suite"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Right: Detailed Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/40 bg-white text-[#8C6D3F] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-[#8C6D3F]" />
              <span>THE ARCHITECTURAL DIFFERENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
              We Don&apos;t Just Decorate Rooms.{' '}
              <span className="text-[#8C6D3F] italic font-serif">We Build Legacies.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              At Green &amp; Young, every interior journey begins with architectural discipline. We do not operate like conventional contractors who make ad-hoc promises on a scrap of paper. We utilize high-precision 3D CAD modeling, virtual reality walk-throughs, and calibrated factory-manufactured modular components.
            </p>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              From sprawling penthouses in ATS Knightsbridge to duplexes in DLF Camellias and Gulshan Dynasty, our clients trust Green &amp; Young for transparent pricing, meticulous attention to acoustic and spatial detailing, and an unwavering commitment to on-time handover.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'Factory-manufactured modular precision',
                'Calibrated laser-edge band finish',
                'Zero on-site dust & noise pollution',
                'Dedicated 24/7 client concierge',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1917] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6D3F] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20 bg-[#F4F1EA] border-y border-[#E7E3DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8C6D3F] uppercase block mb-2">
              WHY GREEN &amp; YOUNG
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
              The Four Pillars of Our Studio
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#78716C]">
              Engineered standards designed to protect your investment and eliminate homeowner stress.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E3DC] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#C5A880]/30 text-[#8C6D3F] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1C1917] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Material Standards & Partner Brands */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8C6D3F] uppercase block mb-2">
              ZERO-COMPROMISE SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
              Material Partners &amp; German Hardware
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#78716C]">
              We exclusively use certified grade materials from the world&apos;s leading manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAND_PARTNERS.map((brand, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#E7E3DC] shadow-xs hover:border-[#C5A880] transition-colors"
              >
                <div className="text-base sm:text-lg font-bold text-[#1C1917] mb-1">
                  {brand.name}
                </div>
                <div className="text-xs sm:text-sm text-[#78716C]">
                  {brand.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Studio Location & Consultation CTA */}
      <section id="consultation" className="py-20 bg-[#0A140F] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-white/5 text-[#C5A880] text-xs font-semibold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>STUDIO IN NOIDA SECTOR 62 &middot; NCR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Ready to Build Your Home with{' '}
            <span className="text-[#C5A880] italic font-serif">Green &amp; Young?</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#A2B3AA] leading-relaxed">
            Schedule a complimentary 3D design consultation at our studio or request an on-site architectural evaluation with our principal designers.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.whatsapp.directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E4D7BE] hover:bg-white text-[#0A140F] font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all"
            >
              <span>WhatsApp Principal Designer</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${siteConfig.phone.primaryRaw}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm tracking-wide transition-all"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Call {siteConfig.phone.primary}</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

