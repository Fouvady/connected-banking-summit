'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Static knowledge base for GitHub Pages (no server required)
const KNOWLEDGE_BASE: Record<string, string> = {
  pricing: 'We offer three pricing tiers: Explorer Pass ($499, was $699), Visionary Pass ($1,299, was $1,799), and Titan Pass ($3,499, was $4,999). Early bird pricing ends February 15, 2026. Group discounts available: 5-9 attendees = 20% off, 10+ = 30% off. Virtual Explorer Pass available at $199.',
  speaker: 'Our keynote speakers include Dr. Sarah Chen (Chief AI Officer, Global Finance Corp), Marcus Al-Rashid (CEO, NeoBank Holdings), Elena Volkov (VP Cybersecurity, SecureNet International), James Okafor (Head of Innovation, Atlantic Capital Group), Priya Sharma (Director of DeFi, ChainVault Protocol), David Kim (CTO, Pacific Digital Bank), Amara Diallo (Chief Risk Officer, Sahara Financial), and Thomas Weber (Head of Payments, EuroPay Solutions). 120+ speakers total!',
  venue: 'The summit takes place at the Dubai International Financial Centre (DIFC), Dubai, UAE — one of the world\'s leading financial hubs with state-of-the-art conference facilities.',
  theme: 'Six key themes: 1) AI & Machine Learning, 2) Cybersecurity & Resilience, 3) Digital Payments Revolution, 4) Open Banking & APIs, 5) Blockchain & DeFi, 6) Sustainable Finance. Each theme features dedicated keynotes, panels, and workshops.',
  date: 'The summit runs March 15-17, 2026 — three days of keynotes, panels, workshops, and networking. Day 1: Foundation & Vision, Day 2: Innovation & Disruption, Day 3: Strategy & Action.',
  agenda: 'Day 1 (March 15) — Foundation & Vision: Opening Ceremony, AI-Driven Risk Management, Zero Trust Architecture, Open Banking Panel, VIP Reception. Day 2 (March 16) — Innovation & Disruption: DeFi Keynote, Cloud-Native Banking, Sustainable Finance, Digital-First Bank Workshop, Fireside Chat. Day 3 (March 17) — Strategy & Action: Quantum Computing & Security, Invisible Payment Revolution, Regulatory Roundtable, Hackathon Finals, Grand Closing.',
  refund: 'Full refunds until January 15, 2026. 50% refund until February 28, 2026. Contact info@connectedbanking.com for refund requests.',
  translation: 'Translation services are available in Arabic, Mandarin, French, Japanese, and Spanish across all keynotes and main sessions.',
  virtual: 'Yes! The Virtual Explorer Pass is available at $199 and includes live streaming of all keynotes in 4K with real-time AI translation and digital networking opportunities.',
  contact: 'You can reach us at info@connectedbanking.com for any questions about registration, sponsorship, or logistics. Our team typically responds within 24 hours.',
  sponsor: 'We offer Platinum, Gold, Silver, and Bronze sponsorship tiers. Each includes branding, exhibition space, and speaking opportunities. Contact info@connectedbanking.com for the sponsorship deck.',
}

function getSmartResponse(message: string): string {
  const lower = message.toLowerCase()

  // Check for matching topics
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lower.includes(key)) return response
  }

  // Pattern matching for common questions
  if (lower.includes('how much') || lower.includes('cost') || lower.includes('price') || lower.includes('ticket')) {
    return KNOWLEDGE_BASE.pricing
  }
  if (lower.includes('who') && (lower.includes('speak') || lower.includes('keynote') || lower.includes('present'))) {
    return KNOWLEDGE_BASE.speaker
  }
  if (lower.includes('where') && (lower.includes('location') || lower.includes('place') || lower.includes('held'))) {
    return KNOWLEDGE_BASE.venue
  }
  if (lower.includes('when') || lower.includes('date') || lower.includes('schedule')) {
    return KNOWLEDGE_BASE.agenda
  }
  if (lower.includes('topic') || lower.includes('focus') || lower.includes('about the summit')) {
    return KNOWLEDGE_BASE.theme
  }
  if (lower.includes('refund') || lower.includes('cancel') || lower.includes('money back')) {
    return KNOWLEDGE_BASE.refund
  }
  if (lower.includes('language') || lower.includes('translate') || lower.includes('arabic')) {
    return KNOWLEDGE_BASE.translation
  }
  if (lower.includes('online') || lower.includes('virtual') || lower.includes('remote')) {
    return KNOWLEDGE_BASE.virtual
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('help')) {
    return KNOWLEDGE_BASE.contact
  }
  if (lower.includes('sponsor') || lower.includes('partner') || lower.includes('exhibit')) {
    return KNOWLEDGE_BASE.sponsor
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Hello! Welcome to the Connected Banking Summit 2026. I can help you with information about speakers, agenda, pricing, venue, and more. What would you like to know?'
  }
  if (lower.includes('thank')) {
    return 'You\'re welcome! If you have any more questions about the summit, feel free to ask. We look forward to seeing you in Dubai! 🎉'
  }

  return 'Great question! I can help with information about our speakers, agenda, pricing tiers, venue details, sponsorship opportunities, and more. Could you specify what you\'d like to know? You can also reach our team directly at info@connectedbanking.com.'
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Summit Assistant. I can help you with information about the Connected Banking Summit 2026 — speakers, agenda, pricing, venue details, and more. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate typing delay for a natural feel
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800))

    const response = getSmartResponse(userMessage)
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsLoading(false)
  }

  const quickQuestions = [
    'What are the pricing options?',
    'Who are the keynote speakers?',
    'Where is the venue?',
    'What are the key themes?',
  ]

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification badge */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[4.5rem] right-6 z-[70] w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-black">1</span>
        </motion.div>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[70] w-[360px] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-cyan-500/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold">AI Summit Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-white/40">Online • Powered by AI</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20'
                      : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'glass text-white/70'
                      : 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-white/80'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="glass rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-[10px] text-white/30 mb-2 uppercase tracking-wider">Quick Questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="text-[10px] glass rounded-full px-2.5 py-1 text-white/50 hover:text-cyan-400 hover:border-cyan-500/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-cyan-500/10">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the summit..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-30 disabled:hover:shadow-none"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
