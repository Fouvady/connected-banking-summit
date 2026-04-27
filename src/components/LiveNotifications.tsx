'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const notificationPool = [
  { name: 'Ahmed K.', location: 'Dubai, UAE', action: 'registered for the Visionary Pass' },
  { name: 'Sarah L.', location: 'London, UK', action: 'registered for the Titan Pass' },
  { name: 'Kenji T.', location: 'Tokyo, Japan', action: 'registered for the Explorer Pass' },
  { name: 'Maria R.', location: 'São Paulo, Brazil', action: 'registered for the Visionary Pass' },
  { name: 'Chen W.', location: 'Singapore', action: 'registered for the Titan Pass' },
  { name: 'Olga P.', location: 'Moscow, Russia', action: 'registered for the Explorer Pass' },
  { name: 'Jean D.', location: 'Paris, France', action: 'registered for the Visionary Pass' },
  { name: 'David M.', location: 'New York, USA', action: 'registered for the Titan Pass' },
  { name: 'Aisha B.', location: 'Nairobi, Kenya', action: 'registered for the Explorer Pass' },
  { name: 'Hans M.', location: 'Berlin, Germany', action: 'registered for the Visionary Pass' },
  { name: 'Priya S.', location: 'Mumbai, India', action: 'registered for the Explorer Pass' },
  { name: 'Luis G.', location: 'Mexico City, Mexico', action: 'registered for the Visionary Pass' },
]

export default function LiveNotifications() {
  const [notification, setNotification] = useState<typeof notificationPool[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const showNotification = () => {
      const random = notificationPool[Math.floor(Math.random() * notificationPool.length)]
      setNotification(random)
      setIsVisible(true)

      // Hide after 4 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 4000)
    }

    // First notification after 5 seconds
    const initialDelay = setTimeout(() => {
      showNotification()

      // Then show every 12-20 seconds
      const interval = setInterval(() => {
        showNotification()
      }, 12000 + Math.random() * 8000)

      return () => clearInterval(interval)
    }, 5000)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="fixed bottom-24 left-4 sm:left-6 z-[60] pointer-events-none">
      <AnimatePresence>
        {isVisible && notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="glass-strong rounded-xl px-4 py-3 max-w-[300px] pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 animate-pulse shrink-0" />
              <div>
                <p className="text-xs text-white/70">
                  <span className="font-semibold text-cyan-400">{notification.name}</span>
                  {' '}from{' '}
                  <span className="text-white/50">{notification.location}</span>
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">{notification.action}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
