'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const emptyTimeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now()
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return emptyTimeLeft
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) return null

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="glass-strong rounded-lg px-3 py-2 sm:px-5 sm:py-3 min-w-[60px] sm:min-w-[80px] relative overflow-hidden">
            {/* Scan line effect */}
            <div className="absolute inset-0 animate-shimmer" />
            <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold glow-text relative z-10">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-2 text-cyan-400/60 font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
