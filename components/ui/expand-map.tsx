"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  address?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Urda Mahalla, Labzak Street",
  address = "Building 1A, Shaykhantakhur District, Tashkent, Uzbekistan",
  coordinates = "41.3274° N, 69.2547° E",
  className,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-140, 140], [8, -8])
  const rotateY = useTransform(mouseX, [-180, 180], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=41.3274,69.2547"
      target="_blank"
      rel="noopener noreferrer"
      className={`block text-decoration-none ${className}`}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-[#111317] border border-slate-800 w-[360px] h-[280px] max-w-full cursor-pointer select-none shadow-lg"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none z-10" />

        <div className="absolute inset-0 bg-[#111317]" />

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {/* Main roads */}
          <motion.line
            x1="0%"
            y1="35%"
            x2="100%"
            y2="35%"
            className="stroke-slate-700"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <motion.line
            x1="0%"
            y1="65%"
            x2="100%"
            y2="65%"
            className="stroke-slate-700"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Vertical main roads */}
          <motion.line
            x1="30%"
            y1="0%"
            x2="30%"
            y2="100%"
            className="stroke-slate-800"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.line
            x1="70%"
            y1="0%"
            x2="70%"
            y2="100%"
            className="stroke-slate-800"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          {/* Secondary streets */}
          {[20, 50, 80].map((y, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              className="stroke-slate-900"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            />
          ))}
          {[15, 45, 55, 85].map((x, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${x}%`}
              y1="0%"
              x2={`${x}%`}
              y2="100%"
              className="stroke-slate-900"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Buildings */}
        <motion.div
          className="absolute top-[40%] left-[10%] w-[15%] h-[20%] rounded-sm bg-slate-800/40 border border-slate-800/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        <motion.div
          className="absolute top-[15%] left-[35%] w-[12%] h-[15%] rounded-sm bg-slate-800/30 border border-slate-800/15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-[70%] left-[75%] w-[18%] h-[18%] rounded-sm bg-slate-800/35 border border-slate-800/18"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        <motion.div
          className="absolute top-[20%] right-[10%] w-[10%] h-[25%] rounded-sm bg-slate-800/25 border border-slate-800/15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        />
        <motion.div
          className="absolute top-[55%] left-[5%] w-[8%] h-[12%] rounded-sm bg-slate-800/20 border border-slate-800/12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        />
        <motion.div
          className="absolute top-[8%] left-[75%] w-[14%] h-[10%] rounded-sm bg-slate-800/25 border border-slate-800/15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.25 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-lg text-slate-400"
            style={{ filter: "drop-shadow(0 0 10px rgba(110, 128, 138, 0.4))" }}
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
            <circle cx="12" cy="9" r="2.5" className="fill-background" />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5 pointer-events-none">
          {/* Top section */}
          <div className="flex items-start justify-between">
            <div className="relative">
              {/* Map Icon SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </svg>
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-1">
            <motion.h3
              className="text-white font-medium text-sm tracking-tight"
              animate={{
                x: 0,
              }}
            >
              {location}
            </motion.h3>

            <div className="flex flex-col gap-0.5">
              <p className="text-slate-400 text-[10px] leading-tight">
                {address}
              </p>
              <p className="text-slate-500 text-[10px] font-mono leading-tight">
                {coordinates}
              </p>
            </div>

            {/* Underline */}
            <div className="h-px bg-gradient-to-r from-slate-600 via-slate-800 to-transparent w-full" />
          </div>
        </div>
      </motion.div>
    </a>
  )
}
