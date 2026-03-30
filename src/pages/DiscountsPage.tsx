import { useState } from 'react'
import { MapPin, Star, Search, Ticket, CheckCircle, Copy } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

interface Discount {
  id: string
  name: string
  category: string
  address: string
  rating: number
  reviews: number
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  discount_title: string
  discount_description: string
  logo: string
  featured: boolean
}

const formatDiscount = (discount: Discount) => {
  if (discount.discount_type === 'percentage') {
    return `${discount.discount_value}%`
  } else {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(discount.discount_value)
  }
}

// Mock discounts data
const mockAliados: Discount[] = [
  {
    id: '1',
    name: 'Veterinaria Huellitas',
    category: 'veterinaria',
    address: 'Av. Santa Fe 1234, Palermo',
    rating: 4.8,
    reviews: 234,
    discount_type: 'percentage',
    discount_value: 20,
    discount_title: '20% OFF en alimentos premium',
    discount_description: 'Descuento válido en todas las líneas de alimento premium para perros y gatos',
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
    discount_type: 'fixed',
    discount_value: 1500,
    discount_title: '$1500 OFF en cualquier producto',
    discount_description: 'Descuento fijo en tu próxima compra',
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
    discount_type: 'percentage',
    discount_value: 10,
    discount_title: '10% OFF en todo',
    discount_description: 'En tu consumición y la de tu mascota',
    logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    featured: false,
  },
]

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'veterinaria', label: 'Veterinarias' },
  { value: 'petshop', label: 'Pet Shops' },
  { value: 'cafe', label: 'Cafés' },
]

// Generate random redemption code
function generateRedemptionCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function DiscountsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [redeemedDiscount, setRedeemedDiscount] = useState<{ discount: Discount; code: string } | null>(null)

  // Only show businesses that have at least 1 active discount
  const filteredAliados = mockAliados.filter(a => {
    const matchesCategory = category === 'all' || a.category === category
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.address.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRedeem = (discount: Discount) => {
    const code = generateRedemptionCode()
    setRedeemedDiscount({ discount, code })
  }

  const copyCode = () => {
    if (redeemedDiscount) {
      navigator.clipboard.writeText(redeemedDiscount.code)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ background: '#331B7E' }}>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Descuentos</h1>
        <p className="text-white/80 text-sm">Mostrá el código al local y obtén tu descuento</p>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-3 bg-white border-b border-carbon/10">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar negocios..."
              className="w-full pl-10 pr-4 py-2.5 bg-cream border border-carbon/10 rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                category === cat.value
                  ? 'text-white'
                  : 'bg-cream text-carbon/70'
              }`}
              style={category === cat.value ? { background: '#331B7E' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {category === 'all' && !search && (
        <div className="px-4 pb-3">
          <h2 className="font-display font-bold text-lg text-carbon mb-3">⭐ Destacados</h2>
          <div className="grid grid-cols-1 gap-3">
            {mockAliados.filter(a => a.featured).map((aliado) => (
              <Card key={aliado.id} className="p-4">
                <div className="flex items-center gap-3">
                  <img src={aliado.logo} alt={aliado.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-carbon truncate">{aliado.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-carbon/60">
                      <MapPin className="w-3 h-3" />
                      {aliado.address}
                    </div>
                  </div>
                  <Badge variant="primary">-{formatDiscount(aliado)}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Discounts */}
      <div className="px-4 pb-6">
        <h2 className="font-display font-bold text-lg text-carbon mb-3">
          {category === 'all' ? 'Todos los descuentos' : categories.find(c => c.value === category)?.label}
        </h2>
        
        <div className="space-y-4">
          {filteredAliados.map((aliado) => (
            <Card key={aliado.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <img src={aliado.logo} alt={aliado.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-carbon">{aliado.name}</h3>
                    <Badge variant="primary">-{formatDiscount(aliado)}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-carbon/60 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{aliado.rating}</span>
                    <span>•</span>
                    <span>{aliado.reviews} reseñas</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-carbon/60 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {aliado.address}
                  </div>
                </div>
              </div>

              {/* Discount Info */}
              <div className="p-3 bg-cream rounded-xl mb-3">
                <p className="font-semibold text-carbon text-sm">{aliado.discount_title}</p>
                <p className="text-xs text-carbon/60 mt-1">{aliado.discount_description}</p>
              </div>

              <Button 
                onClick={() => handleRedeem(aliado)}
                className="w-full"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Canjear descuento
              </Button>
            </Card>
          ))}

          {filteredAliados.length === 0 && (
            <div className="text-center py-12">
              <span className="text-5xl">🔍</span>
              <p className="text-carbon/60 mt-4">No hay descuentos en esta categoría</p>
            </div>
          )}
        </div>
      </div>

      {/* Redemption Modal */}
      {redeemedDiscount && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <h3 className="font-bold text-lg text-carbon mb-1">¡Código generado!</h3>
              <p className="text-sm text-carbon/60 mb-4">
                Mostrá este código al local para obtener tu descuento
              </p>

              <div className="bg-cream p-4 rounded-xl mb-4">
                <p className="text-xs text-carbon/60 mb-1">{redeemedDiscount.discount.discount_title}</p>
                <p className="text-3xl font-mono font-bold tracking-widest text-carbon">
                  {redeemedDiscount.code}
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={copyCode}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button 
                  onClick={() => setRedeemedDiscount(null)}
                  className="flex-1"
                >
                  Listo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
