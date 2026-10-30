'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Home, Award, Clock, ShieldCheck } from 'lucide-react'

interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  icon: React.ElementType
}

const STATS: StatItem[] = [
  { id: 'homes', value: 500, suffix: '+', label: 'Homes Crafted', icon: Home },
  { id: 'years', value: 7, suffix: '+', label: 'Years of Excellence', icon: Award },
  { id: 'handover', value: 45, suffix: ' Days', label: 'Typical Handover', icon: Clock },
  { id: 'warranty', value: 10, suffix: ' Yr', label: 'Warranty on Execution', icon: ShieldCheck },
]

function CountUp({ value, start, instant }: { value: number; start: boolean; instant: boolean }) {
  const [n, setN] = useState(instant ? value : 0)

  useEffect(() => {
    if (!start || instant) {
      if (instant) setN(value)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const duration = 1600
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value, instant])

  return <>{n}</>
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="stats"
      style={{
        background: 'linear-gradient(180deg, #F3E5CA 0%, #F3E5CA 30%, #ffffffff 100%)',
      }}
      className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-10"
      >
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.id}
              className="group relative flex flex-col items-center text-center rounded-2xl px-5 py-8 sm:py-9 bg-gradient-to-b from-[#0E281A] via-[#0A1F14] to-[#07170F] border border-[#DFBA73]/30 shadow-[0_12px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#DFBA73]/50 overflow-hidden"
            >
              {/* Rough surface texture - Layer 1: High-frequency stone/mineral grain */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.38] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stoneGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stoneGrain)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '140px 140px',
                }}
                aria-hidden="true"
              />

              {/* Rough surface texture - Layer 2: Tactile stucco / rough slate topography */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-soft-light"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughRelief'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.28' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughRelief)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '180px 180px',
                }}
                aria-hidden="true"
              />

              {/* Rough surface texture - Layer 3: Tactile micro-highlight grain */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-color-dodge"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mineralGrit'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mineralGrit)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '110px 110px',
                }}
                aria-hidden="true"
              />

              {/* Tactile inner edge bevel & rough slab depth */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_0_28px_rgba(0,0,0,0.55)]"
                aria-hidden="true"
              />

              {/* Top gold accent line */}
              <span
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-14 h-px bg-gradient-to-r from-transparent via-[#DFBA73] to-transparent z-10"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border border-[#DFBA73]/40 text-[#DFBA73] mb-5 bg-[#0E281A]/40 backdrop-blur-sm">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <div className="relative z-10 font-serif text-4xl sm:text-5xl font-semibold text-white leading-none tracking-tight">
                <CountUp value={s.value} start={inView} instant={!!reduceMotion} />
                <span className="text-2xl sm:text-3xl font-medium text-[#DFBA73]">{s.suffix}</span>
              </div>

              <span className="relative z-10 block w-8 h-px bg-[#DFBA73]/50 my-4" aria-hidden="true" />

              <div className="relative z-10 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E9DCC0]/85">
                {s.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
