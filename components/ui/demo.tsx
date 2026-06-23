import { LocationMap } from "@/components/ui/expand-map"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center w-full">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,107,115,0.03)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Optional subtle label */}
        <p className="text-neutral-600 text-xs font-medium tracking-[0.2em] uppercase">Current Location</p>

        <LocationMap 
          location="Urda Mahalla, Labzak Street" 
          address="Building 1A, Shaykhantakhur District, Tashkent, Uzbekistan"
          coordinates="41.3274° N, 69.2547° E" 
        />
      </div>
    </main>
  )
}
