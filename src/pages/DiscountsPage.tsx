import { useState } from 'react'
import { MapPin, Star, Search, Ticket } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

// Mock discounts data
const mockAliados = [
  {
    id: '1',
    name: 'Veterinaria Huellitas',
    category: 'veterinaria',
    address: 'Av. Santa Fe 1234, Palermo',
    rating: 4.8,
    reviews: 234,
    discount: 20,
    discountTitle: '20% OFF en consultas',
    code: 'PATITAS20',
    validUntil: '2026-04-30',
    logo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=100',
    featured: true,
  },
  {
    id: '2',
    name: 'Pet Shop El Amigo',
    category: 'petshop',
    address: 'Av. Corrientes 5678, Belgrano',
    rating: 4.5,
    reviews: 156,
    discount: 15,
    discountTitle: '15% OFF en alimentos premium',
    code: 'PREMIO15',
    validUntil: '2026-05-15',
    logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100',
    featured: true,
  },
  {
    id: '3',
    name: 'Café Pet Friendly',
    category: 'cafe',
    address: 'Defensa 890, San Telmo',
    rating: 4.7,
    reviews: 89,
    discount: 10,
    discountTitle: '10% OFF en todo',
    code: 'CAFEPET10',
    validUntil: '2026-06-30',
    logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    featured: false,
  },
  {
    id: '4',
    name: 'Peluquería Canina Style',
    category: 'peluqueria',
    address: 'Juramento 234, Núñez',
    rating: 4.9,
    reviews: 312,
    discount: 25,
    discountTitle: '2x1 en grooming',
    code: 'STYLE25',
    validUntil: '2026-04-15',
    logo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=100',
    featured: false,
  },
]

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'veterinaria', label: 'Veterinarias' },
  { value: 'petshop', label: 'Pet Shops' },
  { value: 'peluqueria', label: 'Peluquería' },
  { value: 'cafe', label: 'Cafés' },
  { value: 'paseador', label: 'Paseadores' },
]

const categoryEmojis: Record<string, string> = {
  veterinaria: '🏥',
  petshop: '🛒',
  peluqueria: '✂️',
  cafe: '☕',
  paseador: '🚶',
}

export function DiscountsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [showMap, setShowMap] = useState(false)

  const filteredAliados = mockAliados.filter(a => {
    const matchesCategory = category === 'all' || a.category === category
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.address.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-cream">
      {/* Search & Filter */}
      <div className="sticky top-14 z-30 bg-cream pt-3 px-4 pb-2">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar negocios..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-carbon/10 rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button 
            onClick={() => setShowMap(!showMap)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
              showMap ? 'bg-primary text-white' : 'bg-white border border-carbon/10 text-carbon/60'
            }`}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                category === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-carbon/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="px-4 pb-3">
          <Card className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center border border-secondary/30">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-carbon font-medium">Mapa de aliados</p>
              <p className="text-carbon/60 text-sm">Próximamente con ubicación real</p>
            </div>
          </Card>
        </div>
      )}

      {/* Premium Banner */}
      <div className="px-4 pb-3">
        <Card className="p-4 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Acceso Exclusivo</h3>
              <p className="text-white/80 text-sm">Los descuentos son para miembros Premium</p>
            </div>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => window.location.href = '/membresia'}
            >
              Obtener
            </Button>
          </div>
        </Card>
      </div>

      {/* Featured */}
      {category === 'all' && !search && (
        <div className="px-4 pb-3">
          <h2 className="font-display font-bold text-lg text-carbon mb-3">⭐ Destacados</h2>
          <div className="grid grid-cols-1 gap-3">
            {mockAliados.filter(a => a.featured).map((aliado) => (
              <Card key={aliado.id} className="p-4">
                <div className="flex gap-3">
                  <img 
                    src={aliado.logo} 
                    alt={aliado.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-carbon">{aliado.name}</h3>
                        <p className="text-xs text-carbon/60">{categoryEmojis[aliado.category]} {aliado.category}</p>
                      </div>
                      <Badge variant="primary">-{aliado.discount}%</Badge>
                    </div>
                    <p className="text-sm text-carbon/70 mt-1">{aliado.discountTitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-medium">{aliado.rating}</span>
                        <span className="text-xs text-carbon/40">({aliado.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Allies */}
      <div className="px-4 space-y-3 pb-20">
        <h2 className="font-display font-bold text-lg text-carbon">
          {category !== 'all' ? 'Resultados' : 'Todos los aliados'}
        </h2>
        {filteredAliados.map((aliado) => (
          <Card key={aliado.id} className="p-4">
            <div className="flex gap-3">
              <img 
                src={aliado.logo} 
                alt={aliado.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-carbon text-sm">{aliado.name}</h3>
                    <p className="text-xs text-carbon/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {aliado.address}
                    </p>
                  </div>
                  <Badge variant="primary" size="sm">-{aliado.discount}%</Badge>
                </div>
                <p className="text-xs text-carbon/70 mt-1">{aliado.discountTitle}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium">{aliado.rating}</span>
                  </div>
                  <button className="text-xs text-primary font-medium flex items-center gap-1">
                    <Ticket className="w-3 h-3" />
                    {aliado.code}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredAliados.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl">🔍</span>
            <p className="text-carbon/60 mt-4">No hay aliados en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
