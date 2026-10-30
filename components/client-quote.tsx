'use client'

import React from 'react'

interface ClientQuoteProps {
  quote?: string
}

export function ClientQuote({
  quote = "“Green & Young didn’t just decorate our rooms; they took all the stress out of building our home. From the first 3D drawing to the final key handover, everything was delivered on time with zero contractor hassle. Walking into our home now feels like coming home to a private, peaceful sanctuary.”",
}: ClientQuoteProps) {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#2C3531]/10 overflow-hidden select-none">
      {/* Subtle CAD Blueprint Grid */}
     

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Editorial Serif Quotation Mark */}
        <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8C6D3F] mb-2 sm:mb-3 select-none opacity-80 leading-none">
          ❝
        </div>

        {/* The Quote */}
        <blockquote className="text-base sm:text-lg md:text-xl font-serif italic text-[#121614] leading-relaxed tracking-tight mb-4 sm:mb-5 font-normal">
          {quote}
        </blockquote>


      </div>
    </section>
  )
}
