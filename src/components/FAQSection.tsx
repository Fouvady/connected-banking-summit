'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const faqs = [
  {
    q: 'When and where is the Connected Banking Summit 2026?',
    a: 'The summit takes place March 15-17, 2026 at the Dubai International Financial Centre (DIFC). The venue is easily accessible from Dubai International Airport and all major hotels in the city.',
  },
  {
    q: 'What is included in the summit pass?',
    a: 'All passes include access to keynote sessions, networking areas, and digital summit materials. The Visionary pass adds workshop access, speaker meet & greets, and an exclusive dinner. The Titan pass includes all benefits plus backstage access, private boardroom sessions, and personal concierge service.',
  },
  {
    q: 'Is there a virtual attendance option?',
    a: 'Yes! We offer a Virtual Explorer Pass at $199 that includes live-streamed keynotes, select workshop recordings, and access to the digital networking platform. All recordings are available for 90 days post-summit.',
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'Full refunds are available until January 15, 2026. Between January 16 and February 28, a 50% refund is available. After March 1, no refunds are offered, but you may transfer your pass to a colleague at no additional cost.',
  },
  {
    q: 'Are group discounts available?',
    a: 'Absolutely! Groups of 5-9 attendees receive 20% off. Groups of 10+ receive 30% off. Contact our team at groups@connectedbanking.com for custom enterprise packages.',
  },
  {
    q: 'Will there be translation services?',
    a: 'Yes, we provide real-time translation in Arabic, Mandarin, French, Japanese, and Spanish for all keynote sessions. Workshop translation is available in Arabic and Mandarin.',
  },
  {
    q: 'What COVID-19 or health protocols are in place?',
    a: 'We follow all UAE health authority guidelines. Hand sanitization stations are available throughout the venue. Any specific requirements will be communicated to registered attendees 2 weeks before the event.',
  },
  {
    q: 'How can I become a speaker or submit a talk proposal?',
    a: 'Speaker applications are open until December 31, 2025. Submit your proposal through our website with your topic, abstract, and bio. Our advisory board reviews all submissions and notifies selected speakers by January 15, 2026.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">FAQ</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Got <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto">
              Everything you need to know about the summit experience
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05} direction="up">
              <div
                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'border-cyan-500/20' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                    openIndex === i ? 'text-cyan-400' : 'text-white/30'
                  }`} />
                  <span className="flex-1 font-medium text-sm text-white/80">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-white/30" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <div className="px-5 pb-5 pt-0 ml-9">
                        <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
