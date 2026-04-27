'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const pricingTiers = [
  {
    name: 'Explorer',
    price: '$499',
    originalPrice: '$699',
    description: 'Perfect for getting a taste of the summit experience',
    icon: Zap,
    color: 'from-cyan-500 to-teal-500',
    borderColor: 'border-cyan-500/20',
    glowColor: 'rgba(0, 240, 255, 0.1)',
    features: [
      '3-Day General Admission',
      'Keynote Session Access',
      'Networking Lounge Entry',
      'Digital Summit Materials',
      'Community App Access',
    ],
    popular: false,
  },
  {
    name: 'Visionary',
    price: '$1,299',
    originalPrice: '$1,799',
    description: 'For leaders who want the full immersive experience',
    icon: Star,
    color: 'from-amber-400 to-yellow-500',
    borderColor: 'border-amber-500/30',
    glowColor: 'rgba(255, 215, 0, 0.15)',
    features: [
      'All Explorer Benefits',
      'VIP Seating at Keynotes',
      'Workshop Access (All)',
      'Speaker Meet & Greet',
      'Exclusive Dinner Invitation',
      'Priority Networking Sessions',
      'Post-Summit Video Access',
    ],
    popular: true,
  },
  {
    name: 'Titan',
    price: '$3,499',
    originalPrice: '$4,999',
    description: 'The ultimate executive experience with backstage access',
    icon: Crown,
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/30',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    features: [
      'All Visionary Benefits',
      'Backstage Speaker Lounge',
      'Private Boardroom Sessions',
      '1-on-1 Mentor Meetings',
      'Helicopter Venue Transfer',
      'Personal Summit Concierge',
      'Lifetime Alumni Network',
      'Exclusive Titan Dinner',
    ],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">Secure Your Pass</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Choose Your <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Early bird pricing — save up to 30% when you register before February 15, 2026
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.15} direction="up">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative glass-card rounded-2xl p-6 md:p-8 h-full border ${tier.borderColor} ${
                  tier.popular ? 'ring-1 ring-amber-500/30' : ''
                }`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                <div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: tier.glowColor }}
                />

                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <tier.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-sm text-white/40">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold glow-text">{tier.price}</span>
                    <span className="text-sm text-white/30 line-through">{tier.originalPrice}</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">per attendee</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] ${
                    tier.popular
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:shadow-lg hover:shadow-amber-500/25'
                      : 'glass hover:bg-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  {tier.popular ? 'Register Now' : 'Select Pass'}
                </button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Group discount */}
        <AnimatedSection delay={0.5}>
          <div className="text-center mt-12">
            <div className="glass rounded-xl px-6 py-4 inline-flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              <div className="text-left">
                <span className="text-sm font-semibold text-white/80">Group Discount</span>
                <span className="text-xs text-white/40 ml-2">5+ tickets = 20% off</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
