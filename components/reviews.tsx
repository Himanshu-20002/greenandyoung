'use client'

import { Star, Sparkles, Quote } from 'lucide-react'

interface ReviewItem {
  name: string
  initials: string
  property: string
  rating: number
  tag: string
  text: string
}

const reviews: ReviewItem[] = [
  {
    name: 'Vikram & Neha Malhotra',
    initials: 'VM',
    property: 'Godrej Woods, Sector 43, Noida (4 BHK)',
    rating: 5,
    tag: 'Turnkey Handover',
    text: 'From the Italian marble polishing to the custom fluted acoustic living room, G&Y delivered pure perfection in 45 days. The 3D VR walkthrough matched the physical handover 1:1.',
  },
  {
    name: 'Col. Rajeshwar & Sunita Bakshi',
    initials: 'RB',
    property: 'ATS Knightsbridge, Sector 124, Noida (Penthouse)',
    rating: 5,
    tag: 'Super Luxury Handover',
    text: 'Flawless modular kitchen with Blum hardware, quartz island, and bespoke veneer millwork. Zero hidden charges and the site engineers maintained pristine cleanliness.',
  },
  {
    name: 'Dr. Ananya & Kunal Roy',
    initials: 'AR',
    property: 'Jaypee Greens, Greater Noida (Golf Villa)',
    rating: 5,
    tag: 'Villa Architecture',
    text: 'Our double-height chandelier feature wall and custom onyx-backlit Mandir are absolute showstoppers. Their turnkey design team handled civil & MEP hurdles effortlessly.',
  },
  {
    name: 'Siddharth & Priya Singhania',
    initials: 'SS',
    property: 'DLF The Camellias, Gurgaon (Bespoke Suite)',
    rating: 5,
    tag: 'Bespoke Millwork',
    text: 'Exceptional craftsmanship in walk-in wardrobes, concealed sensor lighting, and acoustic ceilings. Truly a five-star hotel sanctuary inside our private residence.',
  },
  {
    name: 'Rohit & Tanvi Agarwal',
    initials: 'RA',
    property: 'Mahagun Mezzaria, Sector 78, Noida (3 BHK)',
    rating: 5,
    tag: 'On-Time Handover',
    text: 'Delivered in exactly 42 days with a comprehensive 10-year warranty document. Transparent milestone-based billing and remarkable attention to spatial ergonomics.',
  },
  {
    name: 'Harshvardhan & Divya Rao',
    initials: 'HR',
    property: 'Ace Starlit, Sector 152, Noida (4 BHK)',
    rating: 5,
    tag: 'Turnkey Handover',
    text: 'The master suite with its floating vanity and ambient warm cove lighting exceeded every expectation. G&Y turned our bare apartment shell into an architectural masterpiece.',
  },
  {
    name: 'Deepak & Ritu Sen',
    initials: 'DS',
    property: 'Cleo County, Sector 121, Noida (3 BHK)',
    rating: 5,
    tag: 'Space Optimization',
    text: 'Superb space optimization. Their hidden pantry and minimalist Scandinavian TV console maximize every square inch while looking effortlessly sophisticated.',
  },
  {
    name: 'Abhishek & Pooja Chawla',
    initials: 'AC',
    property: 'Gulshan Dynasty, Sector 144, Noida (Luxury Residence)',
    rating: 5,
    tag: 'Executive Luxury',
    text: 'Unmatched quality of PU finish cabinetry, German architectural hardware, and daily WhatsApp site progress logs. Highly recommended for discerning homeowners.',
  },
]

export function Reviews() {
  // Duplicate reviews array to ensure seamless infinite looping
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-[#060A07] relative overflow-hidden text-[#8E9F96]">
      {/* Luxury Editorial Ambient Backlights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/[0.04] rounded-full blur-[160px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[600px] h-[320px] bg-[#142318]/[0.3] rounded-full blur-[140px] pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#D8BC95] uppercase mb-3.5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>CLIENT EXPERIENCES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            500+ Happy Homeowners &amp; <span className="text-[#D8BC95] italic font-normal">Commercial Spaces</span>
          </h2>

          <div className="flex items-center justify-center gap-2.5 mt-3 sm:mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#D8BC95] text-[#D8BC95] drop-shadow-[0_0_6px_rgba(216,188,149,0.35)]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#C5A880]/90">
              4.9/5.0 Rating across Delhi NCR &middot; 100% On-Time Handover
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Slow Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Vignette Fade Masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-44 bg-gradient-to-r from-[#060A07] via-[#060A07]/80 to-transparent z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-44 bg-gradient-to-l from-[#060A07] via-[#060A07]/80 to-transparent z-20"
          aria-hidden="true"
        />

        {/* Moving Ticker with Smoked Obsidian & Champagne Brass Cards */}
        <div className="animate-marquee-reviews flex items-stretch gap-4 sm:gap-5 py-3 px-4">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.name}-${idx}`}
              className="relative shrink-0 w-[310px] sm:w-[360px] md:w-[390px] rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1611]/85 via-[#0B120E]/90 to-[#070D09]/95 backdrop-blur-xl border border-[#C5A880]/15 hover:border-[#C5A880]/40 shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(197,168,128,0.12)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(197,168,128,0.25)] transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Subtle Champagne Brass Sheen */}
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#C5A880]/[0.06] rounded-full blur-2xl group-hover:bg-[#C5A880]/[0.14] transition-all duration-500" />

              <div className="relative z-10">
                {/* Top Row: Stars + Muted Champagne Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={13.5} className="fill-[#D8BC95] text-[#D8BC95] drop-shadow-[0_0_4px_rgba(216,188,149,0.3)]" />
                    ))}
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#D8BC95] font-sans font-medium tracking-wider uppercase shadow-[inset_0_1px_1px_rgba(197,168,128,0.08)]">
                    {review.tag}
                  </span>
                </div>

                {/* Subtle Decorative Quote Icon */}
                <Quote className="w-5 h-5 text-[#C5A880]/20 mb-1.5 stroke-[1.5]" />

                {/* Review Narrative in Editorial Warm Linen */}
                <p className="text-[#EAE6DF] leading-relaxed text-xs sm:text-[13px] font-normal italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Bottom Row: Client Identity with Signet Bronze Monogram */}
              <div className="pt-4 mt-4 border-t border-[#C5A880]/15 flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1C261E] to-[#121A14] text-[#D8BC95] border border-[#C5A880]/30 font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.3)] group-hover:border-[#C5A880]/50 transition-colors">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#FAF8F5] text-xs sm:text-sm truncate group-hover:text-[#D8BC95] transition-colors">
                    {review.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#9E978C] truncate mt-0.5">
                    {review.property}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Trust Consultation Bar below Marquee */}
      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-10 text-center relative z-10">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-full bg-[#0D140F]/80 border border-[#C5A880]/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(197,168,128,0.1)]">
          <span className="text-xs text-[#D5CFC5] px-3">
            Ready to turn your bare flat or villa into an architectural masterpiece?
          </span>
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#D8BC95] via-[#EAE1D0] to-[#D8BC95] hover:from-white hover:to-[#EAE1D0] text-[#0A110D] font-bold text-xs tracking-wide shadow-md hover:shadow-[0_0_20px_rgba(197,168,128,0.35)] transition-all duration-300"
          >
            Book Free 3D Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
