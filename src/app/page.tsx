'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Building2,
  Brain,
  Lock,
  Sparkles,
  Play,
  Menu,
  X,
  ExternalLink,
  Clock,
  Star,
  Award,
  Rocket,
  MessageSquare,
} from 'lucide-react'
import ParticleBackground from '@/components/ParticleBackground'
import CountdownTimer from '@/components/CountdownTimer'
import AnimatedSection from '@/components/AnimatedSection'

// ===== DATA =====
const EVENT_DATE = '2026-03-15T09:00:00'
const EVENT_LOCATION = 'Dubai International Financial Centre'
const EVENT_YEAR = '2026'

const stats = [
  { value: '5000+', label: 'Attendees', icon: Users },
  { value: '120+', label: 'Speakers', icon: MessageSquare },
  { value: '50+', label: 'Countries', icon: Globe },
  { value: '80+', label: 'Sessions', icon: Play },
]

const keyThemes = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Revolutionizing risk assessment, fraud detection, and personalized banking experiences through advanced neural networks.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Resilience',
    description: 'Building impregnable digital fortresses to protect financial assets and customer trust in an interconnected world.',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Digital Payments Revolution',
    description: 'The future of transactions — instant, borderless, and invisible payment infrastructure for the next decade.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Building2,
    title: 'Open Banking & APIs',
    description: 'Unlocking unprecedented collaboration between financial institutions and fintech through open architecture.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Lock,
    title: 'Blockchain & DeFi',
    description: 'Decentralized finance reshaping the foundations of banking — from settlements to smart contracts.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Sustainable Finance',
    description: 'ESG-driven investment strategies and green finance initiatives powering the transition to a sustainable economy.',
    color: 'from-lime-500 to-green-500',
  },
]

const speakers = [
  { name: 'Dr. Sarah Chen', role: 'Chief AI Officer', org: 'Global Finance Corp', specialty: 'AI Governance' },
  { name: 'Marcus Al-Rashid', role: 'CEO', org: 'NeoBank Holdings', specialty: 'Digital Banking' },
  { name: 'Elena Volkov', role: 'VP Cybersecurity', org: 'SecureNet International', specialty: 'Cyber Defense' },
  { name: 'James Okafor', role: 'Head of Innovation', org: 'Atlantic Capital Group', specialty: 'FinTech Innovation' },
  { name: 'Priya Sharma', role: 'Director of DeFi', org: 'ChainVault Protocol', specialty: 'DeFi Strategy' },
  { name: 'David Kim', role: 'CTO', org: 'Pacific Digital Bank', specialty: 'Cloud Architecture' },
  { name: 'Amara Diallo', role: 'Chief Risk Officer', org: 'Sahara Financial', specialty: 'Risk Analytics' },
  { name: 'Thomas Weber', role: 'Head of Payments', org: 'EuroPay Solutions', specialty: 'Payment Systems' },
]

const agendaDays = [
  {
    day: 'Day 1',
    date: 'March 15',
    title: 'Foundation & Vision',
    sessions: [
      { time: '09:00', title: 'Opening Ceremony: The Future is Now', speaker: 'Marcus Al-Rashid', type: 'keynote' },
      { time: '10:30', title: 'AI-Driven Risk Management in Real-Time', speaker: 'Dr. Sarah Chen', type: 'talk' },
      { time: '12:00', title: 'Networking Lunch & Innovation Showcase', speaker: '', type: 'break' },
      { time: '14:00', title: 'Zero Trust Architecture for Banking', speaker: 'Elena Volkov', type: 'talk' },
      { time: '15:30', title: 'Panel: Open Banking — Opportunity or Threat?', speaker: 'Multiple Speakers', type: 'panel' },
      { time: '17:00', title: 'VIP Reception & Awards Ceremony', speaker: '', type: 'special' },
    ],
  },
  {
    day: 'Day 2',
    date: 'March 16',
    title: 'Innovation & Disruption',
    sessions: [
      { time: '09:00', title: 'DeFi: The New Financial Frontier', speaker: 'Priya Sharma', type: 'keynote' },
      { time: '10:30', title: 'Cloud-Native Banking Architecture', speaker: 'David Kim', type: 'talk' },
      { time: '12:00', title: 'Innovation Lab: Live Demos & POCs', speaker: '', type: 'break' },
      { time: '14:00', title: 'Sustainable Finance: ESG Meets Technology', speaker: 'Amara Diallo', type: 'talk' },
      { time: '15:30', title: 'Workshop: Building a Digital-First Bank', speaker: 'James Okafor', type: 'workshop' },
      { time: '17:00', title: 'Fireside Chat: The Next Decade of Banking', speaker: 'All Keynote Speakers', type: 'special' },
    ],
  },
  {
    day: 'Day 3',
    date: 'March 17',
    title: 'Strategy & Action',
    sessions: [
      { time: '09:00', title: 'Quantum Computing & Financial Security', speaker: 'Elena Volkov', type: 'keynote' },
      { time: '10:30', title: 'The Invisible Payment Revolution', speaker: 'Thomas Weber', type: 'talk' },
      { time: '12:00', title: 'Closing Networking Brunch', speaker: '', type: 'break' },
      { time: '14:00', title: 'Roundtable: Regulatory Frameworks for AI', speaker: 'Dr. Sarah Chen', type: 'panel' },
      { time: '15:30', title: 'Hackathon Finals & Startup Pitches', speaker: '', type: 'special' },
      { time: '17:00', title: 'Grand Closing & 2027 Vision Unveil', speaker: 'Marcus Al-Rashid', type: 'keynote' },
    ],
  },
]

const sponsors = [
  { name: 'NeoBank Global', tier: 'platinum' },
  { name: 'SecureNet International', tier: 'platinum' },
  { name: 'ChainVault Protocol', tier: 'gold' },
  { name: 'Atlantic Capital', tier: 'gold' },
  { name: 'Pacific Digital', tier: 'gold' },
  { name: 'Sahara Financial', tier: 'silver' },
  { name: 'EuroPay Solutions', tier: 'silver' },
  { name: 'QuantumLedger', tier: 'silver' },
  { name: 'FinCore Systems', tier: 'silver' },
  { name: 'DataStream AI', tier: 'bronze' },
  { name: 'VaultTech', tier: 'bronze' },
  { name: 'CyberShield Pro', tier: 'bronze' },
]

// ===== COMPONENTS =====

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['About', 'Themes', 'Speakers', 'Agenda', 'Sponsors']

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg rotate-45 scale-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm relative z-10">CB</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">Connected</span>
            <span className="glow-text font-bold text-lg ml-1">Banking</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/60 hover:text-cyan-400 transition-colors duration-300 tracking-wide uppercase"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
            Register Now
          </button>
        </div>

        {/* Mobile Menu */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/80">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-cyan-500/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-cyan-400 py-2 transition-colors"
                >
                  {link}
                </a>
              ))}
              <button className="mt-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold text-sm">
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Futuristic banking conference"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/80 via-[#0a0e27]/60 to-[#0a0e27]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-[1]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-white/80 tracking-wide">The Premier Banking Summit of {EVENT_YEAR}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="gradient-text-subtle">Connected</span>
          <br />
          <span className="gradient-text">Banking Summit</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 font-light"
        >
          Where the future of finance converges with technology, innovation, and human potential
        </motion.p>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-white/40"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm tracking-wide">March 15-17, {EVENT_YEAR}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span className="text-sm tracking-wide">{EVENT_LOCATION}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="text-sm tracking-wide">5,000+ Leaders</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-10 flex justify-center"
        >
          <CountdownTimer targetDate={EVENT_DATE} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-base hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-2">
            Secure Your Spot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-medium text-base transition-all duration-300 flex items-center gap-2">
            <Play className="w-5 h-5 text-cyan-400" />
            Watch Highlights
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 bg-cyan-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="relative py-16 border-y border-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1} direction="up">
              <div className="glass-card rounded-xl p-6 text-center group cursor-default">
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl md:text-4xl font-bold glow-text mb-1">{stat.value}</div>
                <div className="text-sm text-white/40 tracking-wide uppercase">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-cyan-400" />
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">About the Summit</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Redefining the <br />
                <span className="gradient-text">Future of Finance</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
                The Connected Banking Summit brings together the world&apos;s most influential banking leaders,
                fintech innovators, and technology pioneers for three transformative days of insight,
                innovation, and impact.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-white/40 text-base leading-relaxed mb-8">
                From AI-driven risk management to decentralized finance, from quantum security to
                sustainable investing — this is where the financial industry&apos;s future is forged.
                Join 5,000+ decision-makers shaping the next decade of banking.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 glass rounded-lg px-4 py-3">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-sm font-semibold">7th Edition</div>
                    <div className="text-xs text-white/40">Most Anticipated Yet</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 glass rounded-lg px-4 py-3">
                  <Globe className="w-5 h-5 text-teal-400" />
                  <div>
                    <div className="text-sm font-semibold">Global Reach</div>
                    <div className="text-xs text-white/40">50+ Countries</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Visual */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="relative">
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                {/* Abstract BG Image */}
                <img
                  src="/abstract-bg.png"
                  alt="Futuristic fintech visualization"
                  className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 opacity-80"
                />
                {/* Overlay stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold glow-text-gold">3</div>
                    <div className="text-xs text-white/40 mt-1">Days of Innovation</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold glow-text">80+</div>
                    <div className="text-xs text-white/40 mt-1">Expert Sessions</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold glow-text">40+</div>
                    <div className="text-xs text-white/40 mt-1">Workshops</div>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold glow-text-gold">20+</div>
                    <div className="text-xs text-white/40 mt-1">Product Launches</div>
                  </div>
                </div>
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-500/20 rounded-br-2xl" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function ThemesSection() {
  return (
    <section id="themes" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">Key Themes</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Explore the <span className="gradient-text">Frontier</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Six pivotal themes driving the transformation of global banking and financial services
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyThemes.map((theme, i) => (
            <AnimatedSection key={theme.title} delay={i * 0.1} direction="up">
              <div className="glass-card rounded-xl p-6 h-full group cursor-default relative overflow-hidden">
                {/* Gradient glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${theme.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <theme.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {theme.title}
                </h3>

                <p className="text-sm text-white/40 leading-relaxed">
                  {theme.description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-cyan-400/60 group-hover:text-cyan-400 transition-colors text-sm">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpeakersSection() {
  return (
    <section id="speakers" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">World-Class Speakers</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Voices That <span className="gradient-text">Shape Finance</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Hear from the visionaries, builders, and leaders transforming the global financial landscape
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, i) => (
            <AnimatedSection key={speaker.name} delay={i * 0.08} direction="up">
              <div className="glass-card rounded-xl p-6 text-center group cursor-default">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#111640] to-[#0a0e27] flex items-center justify-center">
                    <span className="text-2xl font-bold glow-text">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {/* Rotating ring */}
                  <div className="absolute inset-0 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors duration-500" style={{ borderTopColor: 'rgba(0,240,255,0.5)' }} />
                </div>

                <h4 className="font-bold text-base mb-1 group-hover:text-cyan-400 transition-colors">{speaker.name}</h4>
                <p className="text-xs text-cyan-400/70 font-medium mb-0.5">{speaker.role}</p>
                <p className="text-xs text-white/30 mb-3">{speaker.org}</p>

                <div className="inline-flex items-center gap-1 glass rounded-full px-3 py-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-white/50">{speaker.specialty}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* View All */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
              View All 120+ Speakers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function AgendaSection() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="agenda" className="relative py-24 md:py-32">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">Summit Agenda</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Three Days of <span className="gradient-text">Impact</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Day Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-3 mb-12">
            {agendaDays.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(i)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeDay === i
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'glass text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div>{day.day}</div>
                <div className="text-xs opacity-70">{day.date}</div>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Sessions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-3xl mx-auto">
              {/* Day Title */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold glow-text">{agendaDays[activeDay].title}</h3>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {agendaDays[activeDay].sessions.map((session, i) => {
                  const typeStyles: Record<string, { border: string; badge: string; badgeText: string }> = {
                    keynote: { border: 'border-l-cyan-400', badge: 'bg-cyan-500/20 text-cyan-400', badgeText: 'Keynote' },
                    talk: { border: 'border-l-teal-400', badge: 'bg-teal-500/20 text-teal-400', badgeText: 'Talk' },
                    panel: { border: 'border-l-purple-400', badge: 'bg-purple-500/20 text-purple-400', badgeText: 'Panel' },
                    workshop: { border: 'border-l-amber-400', badge: 'bg-amber-500/20 text-amber-400', badgeText: 'Workshop' },
                    break: { border: 'border-l-white/20', badge: 'bg-white/10 text-white/50', badgeText: 'Networking' },
                    special: { border: 'border-l-amber-400', badge: 'bg-amber-500/20 text-amber-400', badgeText: 'Special' },
                  }
                  const style = typeStyles[session.type] || typeStyles.talk

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`glass-card rounded-xl p-5 border-l-2 ${style.border} group cursor-default`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 sm:w-32 shrink-0">
                          <Clock className="w-4 h-4 text-white/30" />
                          <span className="text-sm font-mono text-white/50">{session.time}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div>
                              <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                                {session.title}
                              </h4>
                              {session.speaker && (
                                <p className="text-xs text-white/30 mt-1">{session.speaker}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${style.badge}`}>
                          {style.badgeText}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function SponsorsSection() {
  const tierConfig: Record<string, { label: string; glow: string; size: string }> = {
    platinum: { label: 'Platinum Partners', glow: 'from-cyan-400 to-teal-400', size: 'text-lg font-bold' },
    gold: { label: 'Gold Partners', glow: 'from-amber-400 to-yellow-400', size: 'text-base font-semibold' },
    silver: { label: 'Silver Partners', glow: 'from-gray-300 to-gray-400', size: 'text-sm font-semibold' },
    bronze: { label: 'Bronze Partners', glow: 'from-amber-600 to-amber-700', size: 'text-sm font-medium' },
  }

  const tiers = ['platinum', 'gold', 'silver', 'bronze']

  return (
    <section id="sponsors" className="relative py-24 md:py-32">
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">Our Partners</span>
              <div className="w-8 h-[1px] bg-cyan-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Backed by <span className="gradient-text">Industry Leaders</span>
            </h2>
          </div>
        </AnimatedSection>

        {tiers.map((tier, tierIdx) => {
          const tierSponsors = sponsors.filter(s => s.tier === tier)
          const config = tierConfig[tier]
          if (tierSponsors.length === 0) return null

          return (
            <AnimatedSection key={tier} delay={tierIdx * 0.15}>
              <div className="mb-12">
                <div className="text-center mb-6">
                  <span className={`text-xs uppercase tracking-[0.2em] bg-gradient-to-r ${config.glow} bg-clip-text text-transparent font-medium`}>
                    {config.label}
                  </span>
                </div>
                <div className={`grid gap-4 ${
                  tier === 'platinum' ? 'grid-cols-1 sm:grid-cols-2' :
                  tier === 'gold' ? 'grid-cols-2 sm:grid-cols-3' :
                  'grid-cols-2 sm:grid-cols-4'
                }`}>
                  {tierSponsors.map((sponsor) => (
                    <div
                      key={sponsor.name}
                      className="glass-card rounded-xl p-6 text-center group cursor-default flex items-center justify-center min-h-[80px]"
                    >
                      <span className={`${config.size} text-white/50 group-hover:text-white/80 transition-colors duration-300`}>
                        {sponsor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )
        })}

        <AnimatedSection delay={0.5}>
          <div className="text-center mt-8">
            <button className="group inline-flex items-center gap-2 glass rounded-xl px-6 py-3 text-sm text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
              <span>Become a Sponsor</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 animate-gradient-shift" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-teal-500/20 rounded-br-2xl" />

            {/* Animated ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/5" style={{ animation: 'rotate-glow 20s linear infinite' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
            </div>

            <Rocket className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Shape the Future?</span>
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto mb-8">
              Join 5,000+ banking leaders, innovators, and visionaries at the most anticipated financial technology summit of the year.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-base hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 flex items-center gap-2">
                Register Now — Early Bird
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-white/25 mt-4">Early bird pricing ends February 15, {EVENT_YEAR}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/5 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg rotate-45 scale-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm relative z-10">CB</span>
                </div>
              </div>
              <div>
                <span className="font-bold tracking-tight">Connected</span>
                <span className="glow-text font-bold ml-1">Banking</span>
              </div>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              The world&apos;s premier banking technology summit, connecting leaders who are shaping the future of financial services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/60">Summit</h4>
            <ul className="space-y-2">
              {['About', 'Themes', 'Speakers', 'Agenda', 'Sponsors'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-white/30 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Attend */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/60">Attend</h4>
            <ul className="space-y-2">
              {['Register', 'Pricing', 'Travel', 'Visa Info', 'FAQ'].map(link => (
                <li key={link}>
                  <span className="text-sm text-white/30 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/60">Connect</h4>
            <ul className="space-y-2">
              {['Contact Us', 'Media Kit', 'Newsletter', 'Partnership', 'Press'].map(link => (
                <li key={link}>
                  <span className="text-sm text-white/30 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {EVENT_YEAR} Connected Banking Summit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20 hover:text-cyan-400/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-white/20 hover:text-cyan-400/60 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-xs text-white/20 hover:text-cyan-400/60 cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===== MAIN PAGE =====
export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 rotate-45 animate-pulse" />
          <span className="text-white/30 text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e27]">
      <ParticleBackground />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ThemesSection />
        <SpeakersSection />
        <AgendaSection />
        <SponsorsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
