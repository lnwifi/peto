import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Custom paw marker icons
const createPawIcon = (type: 'lost' | 'found') => {
  const bgColor = type === 'lost' ? '#CF5B55' : '#27AE60'
  const emoji = '🐾'
  
  return L.divIcon({
    html: `
      <div style="
        background: ${bgColor};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-paw-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

const lostIcon = createPawIcon('lost')
const foundIcon = createPawIcon('found')

export interface Report {
  id: string
  type: 'lost' | 'found'
  name: string
  breed: string
  location: string
  photo: string
  latitude: number
  longitude: number
}

interface MapViewProps {
  reports?: Report[]
  center?: [number, number]
  zoom?: number
  selectedReport?: Report | null
  onReportClick?: (report: Report) => void
  className?: string
}

export function MapView({ 
  reports = [], 
  center = [-34.6037, -58.3816],
  zoom = 12,
  selectedReport,
  onReportClick,
  className = '',
}: MapViewProps) {
  const displayCenter = selectedReport 
    ? [selectedReport.latitude, selectedReport.longitude] as [number, number]
    : center

  return (
    <div className={className}>
      <MapContainer
        center={displayCenter}
        zoom={zoom}
        className="w-full h-full rounded-xl"
        style={{ background: '#e5e5e5' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={report.type === 'lost' ? lostIcon : foundIcon}
            eventHandlers={{
              click: () => onReportClick?.(report),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <img 
                  src={report.photo} 
                  alt={report.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-semibold">{report.name}</h4>
                <p className="text-sm text-gray-500">{report.breed}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {report.location}
                </p>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-xs text-white ${
                  report.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {report.type === 'lost' ? 'Perdida' : 'Encontrada'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

// Simple location picker for forms
interface LocationPickerProps {
  value?: { lat: number; lng: number; address: string }
  onChange: (location: { lat: number; lng: number; address: string }) => void
  className?: string
}

const pickerIcon = L.divIcon({
  html: `
    <div style="
      background: #331B7E;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">
      📍
    </div>
  `,
  className: 'custom-picker-marker',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
})

export function LocationPicker({ value, onChange, className = '' }: LocationPickerProps) {
  const [address, setAddress] = useState(value?.address || '')
  const [position, setPosition] = useState<[number, number]>(
    value ? [value.lat, value.lng] : [-34.6037, -58.3816]
  )

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setPosition([lat, lng])
    onChange({ 
      lat, 
      lng, 
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` 
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Buscá tu ubicación o tocá el mapa..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600"
        />
      </div>
      <div className="h-48 rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={position} 
            icon={pickerIcon}
            eventHandlers={{ click: handleMapClick }}
          />
        </MapContainer>
      </div>
      <p className="text-xs text-gray-400">
        📍 Tocá el mapa para seleccionar la ubicación exacta
      </p>
    </div>
  )
}
