import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ExternalLink, Loader2, MapPin } from 'lucide-react'
import { Card, googleMapsUrlForAddress } from './shared'

export type MapCoordinates = { lat: number; lon: number }

type Props = {
  /** Service address — sent to geocoder for the pin */
  address: string
  /** If geocoding fails, center here so the map still works */
  fallbackCoordinates?: MapCoordinates
  className?: string
  /**
   * When true, render as an inner framed block (for use inside an existing Card).
   * When false, wrap in the shared outer Card.
   */
  embedded?: boolean
  /**
   * `standard` — default (Design 1 & 3).
   * `tall` — taller fixed frame (unused when `fillInCard` is true).
   * `compact` — shorter frame (optional).
   */
  mapFrameSize?: 'standard' | 'tall' | 'compact'
  /**
   * When `embedded`, stretch to fill remaining height in a flex column parent (Design 2).
   */
  fillInCard?: boolean
}

async function geocodeAddress(query: string): Promise<MapCoordinates | null> {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`
  const res = await fetch(url)
  if (!res.ok) return null
  const data: {
    features?: { geometry?: { coordinates?: [number, number] } }[]
  } = await res.json()
  const coords = data.features?.[0]?.geometry?.coordinates
  if (!coords) return null
  const [lon, lat] = coords
  if (typeof lat !== 'number' || typeof lon !== 'number') return null
  return { lat, lon }
}

const OSM_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a>'

function openStreetMapSearchUrl(address: string) {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`
}

const mapFrameHeightClass: Record<NonNullable<Props['mapFrameSize']>, string> = {
  standard: 'h-[232px] sm:h-[276px]',
  /** Design 3 (full-width section): taller than `standard` so the map reads clearly */
  tall: 'h-[300px] sm:h-[380px]',
  compact: 'h-[208px] sm:h-[244px]',
}

export function MapPlaceholderCard({
  address,
  fallbackCoordinates,
  className = '',
  embedded = false,
  mapFrameSize = 'standard',
  fillInCard = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading')
  const [usedFallback, setUsedFallback] = useState(false)

  const mapFillsCard = embedded && fillInCard

  const header = (
    <div
      className={`flex items-start gap-2 border-b border-slate-100 bg-white px-4 py-2.5 sm:px-5${mapFillsCard ? ' shrink-0' : ''}`}
    >
      <span
        className="mt-0.5 h-3.5 w-[3px] shrink-0 rounded-full bg-[#F83B3B]"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-900">Map</p>
        <p className="mt-0.5 truncate text-[11px] text-slate-500" title={address}>
          {address}
        </p>
      </div>
    </div>
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false

    async function init() {
      setPhase('loading')
      setUsedFallback(false)

      let coords: MapCoordinates | null = null
      try {
        coords = await geocodeAddress(address)
      } catch {
        coords = null
      }

      if (cancelled || !containerRef.current) return

      if (!coords && fallbackCoordinates) {
        coords = fallbackCoordinates
        setUsedFallback(true)
      }

      if (!coords) {
        setPhase('error')
        return
      }

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([coords.lat, coords.lon], 16)

      mapRef.current = map

      L.tileLayer(OSM_TILE, { attribution: OSM_ATTR, maxZoom: 19 }).addTo(map)

      const marker = L.circleMarker([coords.lat, coords.lon], {
        radius: 9,
        color: '#F83B3B',
        weight: 2,
        fillColor: '#F83B3B',
        fillOpacity: 0.35,
      }).addTo(map)

      const safe = address
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
      marker.bindPopup(`<strong>Service address</strong><br/>${safe}`)

      requestAnimationFrame(() => {
        map.invalidateSize()
        setTimeout(() => map.invalidateSize(), 200)
      })

      setPhase('ready')
    }

    void init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [address, fallbackCoordinates])

  useEffect(() => {
    if (!mapFillsCard || phase !== 'ready' || !mapRef.current) return
    const map = mapRef.current
    const el = containerRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(() => {
      map.invalidateSize()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [mapFillsCard, phase])

  const mapBlock = (
    <div
      className={
        mapFillsCard
          ? 'relative w-full flex-1 min-h-[200px] sm:min-h-[240px]'
          : 'relative w-full'
      }
    >
      <div
        ref={containerRef}
        className={
          mapFillsCard
            ? 'absolute inset-0 z-0 w-full bg-slate-100'
            : `relative z-0 w-full bg-slate-100 ${mapFrameHeightClass[mapFrameSize]}`
        }
        aria-label={`Interactive map for ${address}`}
        role="application"
      />

      {phase === 'loading' ? (
        <div
          className="pointer-events-none absolute inset-0 z-[400] flex items-center justify-center bg-white/75 backdrop-blur-[1px]"
          aria-busy
          aria-live="polite"
        >
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#F83B3B]" aria-hidden />
            Finding location…
          </span>
        </div>
      ) : null}

      {phase === 'error' ? (
        <div className="absolute inset-0 z-[400] flex flex-col items-center justify-center gap-3 bg-slate-50 p-4 text-center">
          <MapPin className="h-10 w-10 text-slate-400" strokeWidth={1.5} aria-hidden />
          <p className="max-w-sm text-sm text-slate-600">
            Could not place this address on the map. Open it in a maps app instead.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={openStreetMapSearchUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              OpenStreetMap
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
            <a
              href={googleMapsUrlForAddress(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Google Maps
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
          </div>
        </div>
      ) : null}

      {phase === 'ready' && usedFallback ? (
        <div className="absolute bottom-2 left-2 right-2 z-[400] rounded-md border border-amber-200/90 bg-amber-50/95 px-2.5 py-1.5 text-[10px] font-medium text-amber-900 shadow-sm backdrop-blur-sm sm:left-auto sm:max-w-sm">
          Approximate area (geocoding unavailable). Drag and zoom the map to refine.
        </div>
      ) : null}
    </div>
  )

  if (embedded) {
    return (
      <div
        className={
          mapFillsCard
            ? `mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] ${className}`
            : `mt-4 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] ${className}`
        }
      >
        {header}
        {mapBlock}
      </div>
    )
  }

  return (
    <Card className={`mt-4 overflow-hidden p-0 ${className}`}>
      {header}
      {mapBlock}
    </Card>
  )
}
