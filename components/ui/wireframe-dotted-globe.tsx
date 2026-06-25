"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    // Center initially on Central Asia (Uzbekistan: 69.2° E, 41.3° N)
    const rotation = [-69.2, -41.3]
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .rotate(rotation as [number, number])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
      isUzbekistan: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background matching off-white page background)
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#F6F5F0" // Bone color matching the page background
      context.fill()
      context.strokeStyle = "rgba(117, 143, 92, 0.15)"
      context.lineWidth = 1 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(117, 143, 92, 0.08)"
        context.lineWidth = 0.75 * scaleFactor
        context.stroke()

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "rgba(117, 143, 92, 0.12)"
        context.lineWidth = 0.75 * scaleFactor
        context.stroke()

        // Draw Uzbekistan's border outline boldly
        const uzbekistanFeature = landFeatures.features.find(
          (feature: any) => feature.properties?.ISO_A3 === "UZB" || feature.properties?.NAME === "Uzbekistan"
        )
        if (uzbekistanFeature) {
          context.beginPath()
          path(uzbekistanFeature)
          context.strokeStyle = "#758F5C" // Brand khaki border
          context.lineWidth = 2 * scaleFactor
          context.stroke()
        }

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            const dotRadius = dot.isUzbekistan ? 2.2 * scaleFactor : 1.2 * scaleFactor
            context.beginPath()
            context.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI)
            
            let dotColor = "#D5D4D0"
            let drawStroke = false

            if (dot.isUzbekistan) {
              const lat = dot.lat
              // Coloring Uzbekistan based on UZ flag colors (blue, red stripe, white, red stripe, green)
              if (lat >= 42.9) {
                dotColor = "#0099B5" // Azure Blue
              } else if (lat >= 42.5 && lat < 42.9) {
                dotColor = "#E30A17" // Red Stripe
              } else if (lat >= 40.3 && lat < 42.5) {
                dotColor = "#FFFFFF" // White
                drawStroke = true
              } else if (lat >= 39.9 && lat < 40.3) {
                dotColor = "#E30A17" // Red Stripe
              } else {
                dotColor = "#1E9F5E" // Green
              }
            }

            context.fillStyle = dotColor
            context.fill()

            if (drawStroke) {
              context.strokeStyle = "rgba(117, 143, 92, 0.4)"
              context.lineWidth = 0.5 * scaleFactor
              context.stroke()
            }
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        // Load cultural boundaries with individual country geometries
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json",
        )
        if (!response.ok) throw new Error("Failed to load countries data")

        landFeatures = await response.json()

        // Generate dots for all land features
        let totalDots = 0
        landFeatures.features.forEach((feature: any) => {
          const isUzbek = feature.properties?.ISO_A3 === "UZB" || feature.properties?.NAME === "Uzbekistan"
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true, isUzbekistan: isUzbek })
            totalDots++
          })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.25
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation as [number, number])
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.95 : 1.05
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)

    // Handle touch interactions for mobile devices
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const startX = event.touches[0].clientX
        const startY = event.touches[0].clientY
        const startRotation = [...rotation]

        const handleTouchMove = (moveEvent: TouchEvent) => {
          if (moveEvent.touches.length === 1) {
            const sensitivity = 0.25
            const dx = moveEvent.touches[0].clientX - startX;
            const dy = moveEvent.touches[0].clientY - startY;

            rotation[0] = startRotation[0] + dx * sensitivity
            rotation[1] = startRotation[1] - dy * sensitivity
            rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

            projection.rotate(rotation as [number, number])
            render()
          }
        }

        const handleTouchEnd = () => {
          document.removeEventListener("touchmove", handleTouchMove)
          document.removeEventListener("touchend", handleTouchEnd)
        }

        document.addEventListener("touchmove", handleTouchMove, { passive: true })
        document.addEventListener("touchend", handleTouchEnd)
      }
    }

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })

    // Load the world data (static, focused on UZB rotation)
    loadWorldData()

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("touchstart", handleTouchStart)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl bg-background dark"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
