'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const testimonials = [
  {
    name: 'Alexandra Petrov',
    role: 'CIO, NordFin Bank',
    text: 'The most transformative banking summit I&apos;ve attended in 20 years. The AI governance panel alone was worth the entire trip.',
    rating: 5,
  },
  {
    name: 'Raj Krishnamurthy',
    role: 'CTO, FinTech Ventures',
    text: 'Connected Banking is where the real deals happen. We closed three partnership agreements during last year&apos;s networking sessions.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'VP Innovation, Atlantic Capital',
    text: 'The quality of speakers and depth of content is unmatched. Every session gave us actionable insights we implemented within weeks.',
    rating: 5,
  },
  {
    name: 'Dr. Wei Zhang',
    role: 'Chief Data Scientist, Pacific Digital',
    text: 'From quantum computing demos to live AI trading systems — this summit showcases technology you won&apos;t see anywhere else.',
    rating: 5,
  },
  {
    name: 'Mohammed Al-Farsi',
    role: 'CEO, Gulf Finance House',
    text: 'The Dubai edition exceeded all expectations. The caliber of attendees and the curated networking was phenomenal.',
    rating: 5,
  },
  {
    name: 'Emma Johansson',
    role: 'Head of Digital, ScandiBank',
    text: 'I came skeptical about DeFi and left convinced. The speakers didn&apos;t just present — they transformed perspectives.',
    rating: 5,
  },
  {
    name: 'Carlos Rivera',
    role: 'Director of Strategy, LatAm FinServ',
    text: 'Best ROI of any conference we attend. The insights on open banking regulation saved us months of research.',
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    role: 'SVP Technology, NeoBank Asia',
    text: 'The innovation lab was extraordinary. Live POCs with real banking data — that&apos;s rare and incredibly valuable.',
    rating: 5,
  },
]

export default function TestimonialsMarquee() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">Testimonials</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              What Leaders <span className="gradient-text">Say</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Hear from past attendees who have experienced the transformation firsthand
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-6">
        <div className="flex gap-6 animate-marquee">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`row1-${i}`}
              className="glass-card rounded-xl p-6 min-w-[350px] max-w-[380px] shrink-0 group cursor-default"
            >
              <Quote className="w-6 h-6 text-cyan-400/30 mb-3" />
              <p className="text-sm text-white/50 leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold glow-text">{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold group-hover:text-cyan-400 transition-colors">{t.name}</div>
                  <div className="text-[10px] text-white/30">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee-reverse">
          {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)].map((t, i) => (
            <div
              key={`row2-${i}`}
              className="glass-card rounded-xl p-6 min-w-[350px] max-w-[380px] shrink-0 group cursor-default"
            >
              <Quote className="w-6 h-6 text-teal-400/30 mb-3" />
              <p className="text-sm text-white/50 leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold glow-text">{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold group-hover:text-cyan-400 transition-colors">{t.name}</div>
                  <div className="text-[10px] text-white/30">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
