import { useState } from 'react'
import { MapPin, Search, Star, Ticket, Lock } from 'lucide-react'

// Mock data - replace with Supabase queries
const mockDiscounts = [
  {
    id: '1',
    title: '20% OFF en consultationes',
    business: 'Veterinaria Huellitas',
    category: 'veterinaria',
    location: 'Palermo, CABA',
    discount: 20,
    code: 'PATITAS20',
    validUntil: '2026-04-30',
    logo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=100',
    rating: 4.8,
  },
  {
    id: '2',
    title: '15% OFF en alimentos premium',
    business: 'Pet Shop El Amigo',
    category: 'petshop',
    location: 'Belgrano, CABA',
    discount: 15,
    code: 'PREMIO15',
    validUntil: '2026-05-15',
    logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100',
    rating: 4.5,
  },
  {
    id: '3',
    title: '2x1 en pasajes de grooming',
    business: 'Pet Beauty Center',
    category: 'peluqueria',
    location: 'Villa Crespo, CABA',
    discount: 50,
    code: 'GROOMING2X1',
    validUntil: '2026-04-20',
    logo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=100',
    rating: 4.9,
  },
  {
    id: '4',
    title: '10% OFF en toda la tienda',
    business: 'Café Pet Friendly',
    category: 'cafe',
    location: 'San Telmo, CABA',
    discount: 10,
    code: 'CAFEPET10',
    validUntil: '2026-06-30',
    logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    rating: 4.7,
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

export function DiscountsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  // Simulated membership check - replace with actual auth check
  const hasMembership = false

  const filteredDiscounts = mockDiscounts.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                         d.business.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || d.category === category
    return matchesSearch && matchesCategory
  })

  if (!hasMembership) {
    return (
      <div className="min-h-[calc(100vh-64px)] py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 text-center border border-carbon/5">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-nunito font-bold text-2xl text-carbon mb-4">
              Descuentos Exclusivos para Miembros
            </h1>
            <p className="text-carbon/60 mb-6">
              Unite a Club Patitas como miembro para acceder a descuentos exclusivos en veterinarias, pet shops, cafés pet-friendly y más.
            </p>
            <div className="bg-cream rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-carbon mb-2">Beneficios de ser miembro:</h3>
              <ul className="text-sm text-carbon/70 space-y-1 text-left">
                <li>✓ Acceso a todos los descuentos</li>
                <li>✓ 5% de cashback en compras de tienda</li>
                <li>✓ Prioridad en adopciones</li>
                <li>✓ Puntos acumulables</li>
              </ul>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold">
              Obtener Membresía
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-nunito font-bold text-3xl text-carbon">Descuentos</h1>
          <p className="text-carbon/60 mt-1">Descuentos exclusivos para miembros de Club Patitas</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-carbon/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
              <input
                type="text"
                placeholder="Buscar descuentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                    category === cat.value
                      ? 'bg-primary text-white'
                      : 'bg-carbon/5 text-carbon/70 hover:bg-carbon/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-secondary/10 rounded-2xl p-8 mb-6 text-center border border-secondary/20">
          <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-nunito font-bold text-lg text-carbon mb-2">Ver descuentos en el mapa</h3>
          <p className="text-carbon/60 text-sm">
            Encontrá negocios cerca de vos
          </p>
          <button className="mt-4 bg-secondary text-white px-6 py-2 rounded-xl text-sm font-medium">
            Abrir mapa
          </button>
        </div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDiscounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-2xl p-4 border border-carbon/5 hover:shadow-md transition">
              <div className="flex gap-4">
                <img
                  src={discount.logo}
                  alt={discount.business}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-carbon">{discount.title}</h3>
                    <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0">
                      -{discount.discount}%
                    </div>
                  </div>
                  <p className="text-sm text-carbon/70 mt-1">{discount.business}</p>
                  <div className="flex items-center gap-1 text-carbon/50 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {discount.location}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-carbon/70">{discount.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-carbon/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-secondary" />
                  <code className="bg-carbon/5 px-3 py-1 rounded-lg text-sm font-mono">
                    {discount.code}
                  </code>
                </div>
                <span className="text-xs text-carbon/40">
                  Válido hasta {new Date(discount.validUntil).toLocaleDateString('es-AR')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDiscounts.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="w-12 h-12 text-carbon/20 mx-auto mb-4" />
            <p className="text-carbon/60">No hay descuentos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
