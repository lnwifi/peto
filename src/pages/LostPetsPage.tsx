import { useState } from 'react'
import { Search, Eye, X, ChevronRight, Bell, Star, AlertTriangle, List, MapPin } from 'lucide-react'
import { Card } from '../components/ui'
import { MapView } from '../components/ui/Map'

// Mock reports with coordinates
interface ReportData {
  id: string
  type: 'lost' | 'found'
  name: string
  species?: string
  breed: string
  location: string
  date?: string
  photo: string
  description?: string
  views?: number
  owner?: string
  phone?: string
  isFeatured?: boolean
  latitude: number
  longitude: number
}

const mockReports: ReportData[] = [
  {
    id: '1',
    type: 'lost',
    name: 'Luna',
    species: 'perro',
    breed: 'Golden Retriever',
    location: 'Capital, San Juan',
    date: '2026-03-27',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    description: 'Se perdió cerca del parque. Tiene collar azul con número de contacto.',
    views: 234,
    owner: 'María G.',
    phone: '+54 9 11 1234 5678',
    isFeatured: true,
    latitude: -31.5311,
    longitude: -68.5366,
  },
  {
    id: '2',
    type: 'found',
    name: 'Gato atigrado',
    species: 'gato',
    breed: 'Doméstico',
    location: 'Rivadavia, San Juan',
    date: '2026-03-26',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    description: 'Gato encontrado en la calle, parece bien alimentado. Busca dueño.',
    views: 156,
    owner: 'Carlos R.',
    phone: '+54 9 11 2345 6789',
    isFeatured: false,
    latitude: -31.5420,
    longitude: -68.5200,
  },
  {
    id: '3',
    type: 'lost',
    name: 'Rocky',
    species: 'perro',
    breed: 'Labrador',
    location: 'Pocito, San Juan',
    date: '2026-03-26',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    description: 'Perro muy manso, responde al nombre Max. Se asustó con un petardo.',
    views: 445,
    owner: 'Ana P.',
    phone: '+54 9 11 3456 7890',
    isFeatured: true,
    latitude: -31.5450,
    longitude: -68.5100,
  },
  {
    id: '4',
    type: 'lost',
    name: 'Nube',
    species: 'gato',
    breed: 'Persa',
    location: 'Santa Lucía, San Juan',
    date: '2026-03-25',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
    description: 'Gata blanca muy mansa. Tiene cinta rosa en el collar.',
    views: 189,
    owner: 'Sofia L.',
    phone: '+54 9 11 4567 8901',
    isFeatured: false,
    latitude: -31.5200,
    longitude: -68.5500,
  },
]

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    type: 'featured',
    title: '🔴 Luna perdida',
    message: 'Golden Retriever perdida en Palermo hace 2 horas',
    time: 'Hace 10 min',
    read: false,
  },
  {
    id: '2',
    type: 'found',
    title: '🟢 Gato encontrado',
    message: 'Gato atigrado encontrado en Villa Crespo',
    time: 'Hace 1 hora',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: '⭐ Reporte destacado',
    message: 'Rocky perdido en Belgrano fue destacado',
    time: 'Hace 3 horas',
    read: true,
  },
]

export function LostPetsPage() {
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [search, setSearch] = useState('')
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [mapCenter] = useState<[number, number]>([-34.6037, -58.3816])
  const [mapReports] = useState<ReportData[]>(mockReports)

  const handleReportClick = (report: ReportData) => {
    setSelectedReport(report)
  }

  // Sort: featured first
  const sortedReports = [...mockReports].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })

  const filteredReports = sortedReports.filter(r => {
    const matchesFilter = filter === 'all' || r.type === filter
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.breed.toLowerCase().includes(search.toLowerCase()) ||
                          r.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadNotifications = mockNotifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Search & Filter Bar */}
      <div className="px-4 py-3 bg-white border-b border-carbon/5 sticky top-14 z-30">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, raza o zona..."
              className="w-full pl-10 pr-4 py-2.5 bg-carbon/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-carbon/5 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-2 rounded-lg transition ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
          
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 bg-carbon/5 rounded-xl flex items-center justify-center relative"
            >
              <Bell className="w-5 h-5 text-carbon/60" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-lg border border-carbon/10 overflow-hidden z-50">
                <div className="p-3 border-b border-carbon/10 flex items-center justify-between">
                  <h3 className="font-semibold text-carbon">Notificaciones</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-carbon/40 hover:text-carbon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-3 border-b border-carbon/5 hover:bg-carbon/5 transition ${
                        !notif.read ? 'bg-secondary/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-carbon text-sm">{notif.title}</p>
                          <p className="text-xs text-carbon/60 mt-0.5">{notif.message}</p>
                          <p className="text-xs text-carbon/40 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-carbon/10">
                  <button className="w-full text-center text-sm text-primary font-medium py-1">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { value: 'all', label: 'Todos', emoji: '🐾' },
            { value: 'lost', label: 'Perdidas', emoji: '🔴' },
            { value: 'found', label: 'Encontradas', emoji: '🟢' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as 'all' | 'lost' | 'found')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex-shrink-0 ${
                filter === f.value
                  ? 'text-white'
                  : 'bg-carbon/5 text-carbon/70'
              }`}
              style={filter === f.value ? { background: '#331B7E' } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Alert Banner */}
      <div className="px-4 py-3">
        <Card className="p-3 bg-amber-50 border border-amber-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-carbon text-sm">Reportes destacados</p>
            <p className="text-xs text-carbon/60">Los reportes destacados aparecen primero y notifican a más usuarios</p>
          </div>
        </Card>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="px-4 pb-3">
          <div className="h-[calc(100vh-280px)] rounded-2xl overflow-hidden shadow-lg">
            <MapView
              reports={mapReports}
              center={mapCenter}
              zoom={12}
              selectedReport={selectedReport}
              onReportClick={handleReportClick}
              className="h-full"
            />
          </div>
          
          {/* Report Preview Cards on Map */}
          <div className="flex gap-3 overflow-x-auto pb-2 mt-3 -mx-4 px-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`flex-shrink-0 w-48 bg-white rounded-xl p-3 shadow-md cursor-pointer transition ${
                  selectedReport?.id === report.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex gap-2">
                  <img
                    src={report.photo}
                    alt={report.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{report.name}</h4>
                    <p className="text-xs text-carbon/60 truncate">{report.breed}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${
                      report.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {report.type === 'lost' ? 'Perdida' : 'Encontrada'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="px-4 space-y-3 pb-20">
          {filteredReports.map((report) => (
            <Card 
              key={report.id}
              className={`p-0 overflow-hidden ${report.isFeatured ? 'border-2 border-amber-300' : ''}`}
              onClick={() => setSelectedReport(report)}
            >
              {report.isFeatured && (
                <div className="bg-amber-400 px-3 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-white text-xs font-semibold">DESTACADO</span>
                </div>
              )}
              <div className="flex gap-3">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                  <img
                    src={report.photo}
                    alt={report.name}
                    className="w-full h-full object-cover"
                  />
                  <span 
                    className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                      report.type === 'lost' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {report.type === 'lost' ? 'Perdida' : 'Encontrada'}
                  </span>
                </div>
                <div className="flex-1 py-2 pr-2">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-carbon truncate">{report.name}</h3>
                      <p className="text-xs text-carbon/60 truncate">{report.breed}</p>
                    </div>
                    <div className="flex items-center gap-1 text-carbon/40 text-xs ml-2 flex-shrink-0">
                      <Eye className="w-3 h-3" />
                      {report.views}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-carbon/50 mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{report.location}</span>
                  </div>
                  <p className="text-xs text-carbon/60 mt-1 line-clamp-1 hidden sm:line-clamp-2">{report.description}</p>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-carbon/30" />
                </div>
              </div>
            </Card>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <span className="text-5xl">🔍</span>
              <p className="text-carbon/60 mt-4">No hay reportes en esta categoría</p>
            </div>
          )}
        </div>
      )}

      {/* Report Detail Modal - Full Screen */}
      {selectedReport && (
        <div 
          className="fixed inset-0 z-50 flex flex-col"
          onClick={() => setSelectedReport(null)}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 flex-shrink-0"
            style={{ backgroundColor: '#331B7E' }}
          >
            <button 
              onClick={() => setSelectedReport(null)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <h2 className="font-display font-bold text-lg text-white">{selectedReport.name}</h2>
            <div className="w-10" />
          </div>
          
          {/* Content - Scrollable */}
          <div 
            className="flex-1 overflow-y-auto pb-24"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="relative">
              <img
                src={selectedReport.photo}
                alt={selectedReport.name}
                className="w-full h-72 sm:h-80 object-cover"
              />
              {/* Status Badge Overlay */}
              <div className="absolute bottom-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-white ${
                  selectedReport.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {selectedReport.type === 'lost' ? 'Perdida' : 'Encontrada'}
                </span>
              </div>
              {/* Featured Badge */}
              {selectedReport.isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1" style={{ backgroundColor: '#FFCF5C', color: '#331B7E' }}>
                    <Star className="w-4 h-4 fill-current" />
                    DESTACADO
                  </span>
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="p-4" style={{ backgroundColor: '#F8F6FF' }}>
              {/* Map Placeholder */}
              <div 
                className="w-full h-40 rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#E8E5F0' }}
              >
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2" style={{ color: '#331B7E' }} />
                  <p className="font-medium text-carbon">{selectedReport.location}</p>
                  <p className="text-xs text-carbon/50">Ver en mapa</p>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-4 border border-carbon/10">
                  <p className="text-xs text-carbon/50 mb-1">Raza</p>
                  <p className="font-semibold text-carbon">{selectedReport.breed}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-carbon/10">
                  <p className="text-xs text-carbon/50 mb-1">Fecha</p>
                  <p className="font-semibold text-carbon">{selectedReport.date}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-carbon/10 col-span-2">
                  <p className="text-xs text-carbon/50 mb-1">Contacto</p>
                  <p className="font-semibold text-carbon">{selectedReport.owner} • {selectedReport.phone}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-4 border border-carbon/10 mb-4">
                <p className="text-xs text-carbon/50 mb-2">Descripción</p>
                <p className="text-carbon">{selectedReport.description}</p>
              </div>

              {/* Featured Notice */}
              {selectedReport.isFeatured && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-carbon/70 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Este reporte está destacado. Los usuarios cercanos fueron notificados.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <a 
                  href={`tel:${selectedReport.phone}`}
                  className="block w-full text-white py-4 rounded-xl font-bold text-center text-lg"
                  style={{ background: '#F27131' }}
                >
                  📞 Llamar a {selectedReport.owner}
                </a>
                <button 
                  className="block w-full bg-white border-2 py-4 rounded-xl font-bold text-center text-lg"
                  style={{ borderColor: '#331B7E', color: '#331B7E' }}
                >
                  💬 Enviar mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
