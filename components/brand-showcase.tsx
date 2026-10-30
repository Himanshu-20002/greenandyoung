'use client'

import { motion } from 'framer-motion'

const brands = [
  { name: 'Blum', category: 'German Kitchen Fittings', id: 1 },
  { name: 'Hettich', category: 'Hardware Systems', id: 2 },
  { name: 'Hafele', category: 'Architectural Fittings', id: 3 },
  { name: 'Saint-Gobain', category: 'Glass & Mirrors', id: 4 },
  { name: 'Asian Paints', category: 'Royale Luxury Paints', id: 5 },
  { name: 'CenturyPly', category: 'BWP Marine Plywood', id: 6 },
  { name: 'Greenlam', category: 'Luxury Laminates', id: 7 },
  { name: 'Kohler', category: 'Designer Sanitaryware', id: 8 },
  { name: 'Livspace Partner', category: 'Execution Standards', id: 9 },
]

// Duplicate brands for seamless infinite loop
const duplicatedBrands = [...brands, ...brands]

export function BrandShowcase() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-card/5 to-background overflow-hidden relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-accent/[0.02] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-primary/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3.5 tracking-tight"
          >
            World-Class Material & Hardware Partners
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-balance leading-relaxed"
          >
            We partner with global architectural and interior brands to guarantee five-star luxury, structural safety, and lasting finishes.
          </motion.p>
        </div>

        {/* Infinite Scrolling Brands */}
        <div className="relative overflow-hidden py-2">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 z-10 w-16 md:w-32 h-full bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 w-16 md:w-32 h-full bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none"></div>

          {/* Scrolling Container */}
          <motion.div
            className="flex gap-4 md:gap-8 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <motion.div
                key={`${brand.id}-${idx}`}
                whileHover={{ scale: 1.03, y: -3 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="px-6 md:px-8 py-3.5 md:py-4 rounded-2xl border border-border/40 bg-gradient-to-br from-card/65 to-card/45 backdrop-blur-md hover:border-accent/30 hover:bg-card transition-all duration-300 flex flex-col items-center justify-center min-w-max shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                  <p className="font-semibold text-sm md:text-base text-foreground/90 group-hover:text-accent transition-colors duration-300 whitespace-nowrap tracking-wide">
                    {brand.name}
                  </p>
                  <span className="text-[10px] text-foreground/40 uppercase tracking-widest mt-0.5">
                    {brand.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-foreground/50 text-xs sm:text-sm max-w-[340px] sm:max-w-none mx-auto text-balance">
            100% Genuine, certified materials with up to 10-year manufacturer warranty across every installation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
