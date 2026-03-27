import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapPin, Search, Filter, Eye, X, ChevronRight } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

// Mock data
const mockReports = [
  {
    id: '1',
    type: 'lost',
    name: 'Luna',
    species: 'perro',
    breed: 'Golden Retriever',
    location: 'Palermo, CABA',
    date: '2026-03-26',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    description: 'Se perdió cerca del parque. Tiene collar azul con número de contacto.',
    views: 234,
    owner: 'María G.',
    phone: '+54 9 11 1234 5678',
  },
  {
    id: '2',
    type: 'found',
    name: 'Gato atigrado',
    species: 'gato',
    breed: 'Doméstico',
    location: 'Villa Crespo, CABA',
    date: '2026-03-25',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    description: 'Gato encontrado en la calle, parece bien alimentado. Busca dueño.',
    views: 156,
    owner: 'Carlos R.',
    phone: '+54 9 11 2345 6789',
  },
  {
    id: '3',
    type: 'lost',
    name: 'Rocky',
    species: 'perro',
    breed: 'Labrador',
    location: 'Belgrano, CABA',
    date: '2026-03-24',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    description: 'Perro muy manso, responde al nombre Max. Se asustó con un petardo.',
    views: 445,
    owner: 'Ana P.',
    phone: '+54 9 11 3456 7890',
  },
  {
    id: '4',
    type: 'lost',
    name: 'Nube',
    species: 'gato',
    breed: 'Persa',
    location: 'Recoleta, CABA',
    date: '2026-03-23',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
    description: 'Gata blanca muy mansa. Tiene cinta rosa en el collar.',
    views: 189,
    owner: 'Sofia L.',
    phone: '+54 9 11 4567 8901',
  },
]

export function LostPetsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = searchParams.get('filter') || 'all'
  const [search, setSearch] = useState('')
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null)

  const filteredReports = mockReports.filter(r => {
    const matchesFilter = filter === 'all' || r.type === filter
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.breed.toLowerCase().includes(search.toLowerCase()) ||
                          r.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const setFilter = (newFilter: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('filter', newFilter)
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-cream">
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
          <button className="w-10 h-10 bg-carbon/5 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-carbon/60" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { value: 'all', label: 'Todos', emoji: '🐾' },
            { value: 'lost', label: 'Perdidas', emoji: '🔴' },
            { value: 'found', label: 'Encontradas', emoji: '🟢' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                filter === f.value
                  ? 'bg-primary text-white'
                  : 'bg-carbon/5 text-carbon/70'
              }`}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="px-4 py-3">
        <Card className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-medium text-carbon text-sm">Ver en mapa</span>
            </div>
            <Button size="sm" variant="secondary">
              Abrir mapa
            </Button>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <div className="px-4 space-y-3 pb-20">
        {filteredReports.map((report) => (
          <Card 
            key={report.id} 
            className="p-0 overflow-hidden"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex">
              <div className="relative w-28 h-28 flex-shrink-0">
                <img
                  src={report.photo}
                  alt={report.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  variant={report.type === 'lost' ? 'error' : 'success'}
                  className="absolute top-2 left-2 text-xs"
                >
                  {report.type === 'lost' ? 'Perdida' : 'Encontrada'}
                </Badge>
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-carbon">{report.name}</h3>
                    <p className="text-xs text-carbon/60">{report.breed}</p>
                  </div>
                  <div className="flex items-center gap-1 text-carbon/40 text-xs">
                    <Eye className="w-3 h-3" />
                    {report.views}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-carbon/50 mt-1">
                  <MapPin className="w-3 h-3" />
                  {report.location}
                </div>
                <p className="text-xs text-carbon/60 mt-1 line-clamp-1">{report.description}</p>
              </div>
              <div className="flex items-center pr-2">
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

      {/* Report Detail Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b border-carbon/5 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">{selectedReport.name}</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 bg-carbon/5 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4">
              <img
                src={selectedReport.photo}
                alt={selectedReport.name}
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />
              
              <div className="flex gap-2 mb-4">
                <Badge variant={selectedReport.type === 'lost' ? 'error' : 'success'} size="md">
                  {selectedReport.type === 'lost' ? '🔴 Perdida' : '🟢 Encontrada'}
                </Badge>
                <Badge variant="default">{selectedReport.breed}</Badge>
              </div>

              <p className="text-carbon/70 mb-4">{selectedReport.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-carbon/40" />
                  <span className="text-carbon">{selectedReport.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-carbon/40">📅</span>
                  <span className="text-carbon">{selectedReport.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-carbon/40">👤</span>
                  <span className="text-carbon">{selectedReport.owner}</span>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${selectedReport.phone}`}
                  className="block w-full bg-primary text-white py-3 rounded-xl font-semibold text-center"
                >
                  📞 Llamar a {selectedReport.owner}
                </a>
                <Button variant="outline" fullWidth>
                  💬 Enviar mensaje
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
