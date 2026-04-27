'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'

export default function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl aspect-video glass-strong rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>

            {/* Video placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0e27] to-[#111640]">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center mx-auto">
                    <Play className="w-8 h-8 text-cyan-400 ml-1" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-cyan-400/30 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Summit Highlights 2025</h3>
                <p className="text-sm text-white/40">Relive the best moments from last year&apos;s summit</p>
              </div>

              {/* Animated scan line */}
              <div className="absolute inset-0 scan-line pointer-events-none" />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-teal-500/20 rounded-br-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
