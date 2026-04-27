'use client'

import { useEffect, useRef } from 'react'

interface GlobePoint {
  lat: number
  lng: number
  label: string
}

const GLOBE_POINTS: GlobePoint[] = [
  { lat: 25.2, lng: 55.3, label: 'Dubai' },
  { lat: 51.5, lng: -0.1, label: 'London' },
  { lat: 40.7, lng: -74.0, label: 'New York' },
  { lat: 35.7, lng: 139.7, label: 'Tokyo' },
  { lat: 1.3, lng: 103.8, label: 'Singapore' },
  { lat: -33.9, lng: 18.4, label: 'Cape Town' },
  { lat: 48.9, lng: 2.3, label: 'Paris' },
  { lat: 37.6, lng: 127.0, label: 'Seoul' },
  { lat: -23.5, lng: -46.6, label: 'São Paulo' },
  { lat: 19.1, lng: 72.9, label: 'Mumbai' },
  { lat: 55.8, lng: 37.6, label: 'Moscow' },
  { lat: 39.9, lng: 116.4, label: 'Beijing' },
  { lat: -1.3, lng: 36.8, label: 'Nairobi' },
  { lat: 13.8, lng: 100.5, label: 'Bangkok' },
  { lat: 52.5, lng: 13.4, label: 'Berlin' },
  { lat: 28.6, lng: 77.2, label: 'Delhi' },
  { lat: 22.3, lng: 114.2, label: 'Hong Kong' },
  { lat: -34.6, lng: -58.4, label: 'Buenos Aires' },
  { lat: 30.0, lng: 31.2, label: 'Cairo' },
  { lat: 6.5, lng: 3.4, label: 'Lagos' },
]

export default function GlobeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 400
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const radius = 160

    const latLngTo3D = (lat: number, lng: number, rot: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + rot) * (Math.PI / 180)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)
      return { x: cx + x, y: cy - y, z }
    }

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      rotationRef.current += 0.15
      const rot = rotationRef.current

      // Draw globe circle
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw grid lines (longitude)
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath()
        for (let lat = -90; lat <= 90; lat += 2) {
          const { x, y, z } = latLngTo3D(lat, lng, rot)
          if (z > 0) {
            if (lat === -90) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          } else {
            ctx.moveTo(x, y)
          }
        }
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw grid lines (latitude)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        for (let lng = 0; lng <= 360; lng += 2) {
          const { x, y, z } = latLngTo3D(lat, lng, rot)
          if (z > 0) {
            if (lng === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          } else {
            ctx.moveTo(x, y)
          }
        }
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw points
      const dubaiPoint = GLOBE_POINTS[0]
      const dubai3D = latLngTo3D(dubaiPoint.lat, dubaiPoint.lng, rot)

      GLOBE_POINTS.forEach((point, i) => {
        const { x, y, z } = latLngTo3D(point.lat, point.lng, rot)
        if (z > 0) {
          const opacity = 0.3 + (z / radius) * 0.7
          const pointSize = 2 + (z / radius) * 3

          // Glow
          ctx.beginPath()
          ctx.arc(x, y, pointSize * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 240, 255, ${opacity * 0.15})`
          ctx.fill()

          // Point
          ctx.beginPath()
          ctx.arc(x, y, pointSize, 0, Math.PI * 2)
          ctx.fillStyle = i === 0 ? `rgba(255, 215, 0, ${opacity})` : `rgba(0, 240, 255, ${opacity})`
          ctx.fill()

          // Connection line to Dubai
          if (i > 0 && dubai3D.z > 0) {
            ctx.beginPath()
            ctx.moveTo(dubai3D.x, dubai3D.y)
            // Arc connection
            const midX = (dubai3D.x + x) / 2
            const midY = (dubai3D.y + y) / 2 - 20
            ctx.quadraticCurveTo(midX, midY, x, y)
            ctx.strokeStyle = `rgba(0, 212, 170, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      // Dubai pulse effect
      if (dubai3D.z > 0) {
        const pulseSize = 6 + Math.sin(Date.now() / 500) * 4
        ctx.beginPath()
        ctx.arc(dubai3D.x, dubai3D.y, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(Date.now() / 500) * 0.2})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Outer glow ring
      const gradient = ctx.createRadialGradient(cx, cy, radius - 2, cx, cy, radius + 8)
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.05)')
      gradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}
