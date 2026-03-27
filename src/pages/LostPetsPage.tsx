import { MapPin, Search, Filter, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// Mock data - replace with Supabase queries
const mockReports = [
  {
    id: '1',
    type: 'lost',
    pet_name: 'Luna',
    species: 'perro',
    breed: 'Golden Retriever',
    location: 'Palermo, CABA',
    date: '2026-03-26',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    description: 'Se perdió cerca del parque. Tiene collar azul con numero de contacto.',
    status: 'active',
  },
  {
    id: '2',
    type: 'found',
    pet_name: 'Gato atigrado',
    species: 'gato',
    breed: 'Doméstico',
    location: 'Villa Crespo, CABA',
    date: '2026-03-25',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    description: 'Gato encontrado en la calle, parece bien alimentado. Busca dueño.',
    status: 'active',
  },
  {
    id: '3',
    type: 'lost',
    pet_name: 'Max',
    species: 'perro',
    breed: 'Labrador',
    location: 'Belgrano, CABA',
    date: '2026-03-24',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    description: 'Perro muy manso, responde al nombre Max. Se asustó con un petardo.',
    status: 'active',
  },
]

export function LostPetsPage() {
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')

  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(r => r.type === filter)

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-nunito font-bold text-3xl text-carbon">Mascotas Perdidas</h1>
            <p className="text-carbon/60 mt-1">Ayudá a reunitar mascotas con sus familias</p>
          </div>
          <Link
            to="/reportar-mascota"
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            Reportar Mascota
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-carbon/5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-carbon/60">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtrar:</span>
            </div>
            <div className="flex gap-2">
              {(['all', 'lost', 'found'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    filter === f
                      ? 'bg-primary text-white'
                      : 'bg-carbon/5 text-carbon/70 hover:bg-carbon/10'
                  }`}
                >
                  {f === 'all' ? 'Todos' : f === 'lost' ? 'Perdidas' : 'Encontradas'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-secondary/10 rounded-2xl p-8 mb-6 text-center border border-secondary/20">
          <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-nunito font-bold text-lg text-carbon mb-2">Mapa de tu zona</h3>
          <p className="text-carbon/60 text-sm">
            Visualizá todas las mascotas perdidas y encontradas en tu área
          </p>
          <button className="mt-4 bg-secondary text-white px-6 py-2 rounded-xl text-sm font-medium">
            Ver mapa completo
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl overflow-hidden border border-carbon/5 hover:shadow-md transition">
              <div className="relative h-48">
                <img
                  src={report.photo}
                  alt={report.pet_name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  report.type === 'lost' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {report.type === 'lost' ? '🔴 Perdida' : '🟢 Encontrada'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-nunito font-bold text-lg text-carbon">{report.pet_name}</h3>
                <p className="text-carbon/60 text-sm">{report.breed}</p>
                <div className="flex items-center gap-1 text-carbon/50 text-sm mt-2">
                  <MapPin className="w-4 h-4" />
                  {report.location}
                </div>
                <p className="text-carbon/70 text-sm mt-3 line-clamp-2">{report.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-carbon/5">
                  <span className="text-xs text-carbon/40">{report.date}</span>
                  <button className="text-primary text-sm font-medium hover:underline">
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-carbon/20 mx-auto mb-4" />
            <p className="text-carbon/60">No hay reportes en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
