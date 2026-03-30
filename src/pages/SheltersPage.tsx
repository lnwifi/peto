import { useState } from 'react'
import { Heart, MapPin, MessageCircle, Search, PawPrint, ExternalLink } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

// Mock shelters data
const mockShelters = [
  {
    id: '1',
    name: 'Refugio Patitas',
    description: 'Refugio sin fines de lucro. Ayudamos a mascotas abandonadas desde 2015. Contamos con más de 50 animales esperando una familia.',
    address: 'Av. Corrientes 1234, Buenos Aires',
    phone: '+5491112345678',
    whatsapp: '+5491112345678',
    instagram_url: 'https://instagram.com/refugiopatitas',
    facebook_url: 'https://facebook.com/refugiopatitas',
    logo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200',
    cover_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    pets_count: 45,
    adoptions_count: 320,
    active_causes: 2,
  },
  {
    id: '2',
    name: 'Ayuda Animal',
    description: 'Nos dedicamos al rescate y rehabilitación de animales en situación de calle. Todos nuestros animales están castrados y vacúnados.',
    address: 'Juramento 890, Núñez',
    phone: '+54911567890',
    whatsapp: '+54911567890',
    instagram_url: 'https://instagram.com/ayudaanimal',
    logo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200',
    cover_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
    pets_count: 28,
    adoptions_count: 156,
    active_causes: 1,
  },
  {
    id: '3',
    name: 'Paw Rescue',
    description: 'Rescate, rehabilitación y adopción responsable.每了一只 mascota encuentra un hogar definitivo.',
    address: 'Defensa 567, San Telmo',
    phone: '+54911987654',
    whatsapp: '+54911987654',
    instagram_url: 'https://instagram.com/pawrescue',
    logo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200',
    cover_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800',
    pets_count: 35,
    adoptions_count: 210,
    active_causes: 0,
  },
]

export function SheltersPage() {
  const [search, setSearch] = useState('')

  const filteredShelters = mockShelters.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  )

  const openWhatsApp = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp.replace('+549', '')}`, '_blank')
  }

  const openInstagram = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div 
        className="px-4 pt-6 pb-8"
        style={{ background: '#331B7E' }}
      >
        <h1 className="font-display font-bold text-2xl text-white mb-1">Refugios</h1>
        <p className="text-white/80 text-sm">Conocé a los refugios de la comunidad</p>
      </div>

      {/* Search & Filter */}
      <div className="px-4 -mt-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar refugios..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-carbon/10 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Shelters List */}
      <div className="px-4 space-y-4">
        {filteredShelters.map((shelter) => (
          <Card key={shelter.id} className="p-0 overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-32 -mx-4 -mt-4 mb-4">
              <img 
                src={shelter.cover_url} 
                alt={shelter.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Logo */}
              <div className="absolute -bottom-6 left-4">
                <div className="w-16 h-16 rounded-2xl border-4 border-white overflow-hidden shadow-lg">
                  <img 
                    src={shelter.logo_url} 
                    alt={shelter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pt-2">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-carbon text-lg">{shelter.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-carbon/60">
                    <MapPin className="w-3 h-3" />
                    {shelter.address}
                  </div>
                </div>
                {shelter.active_causes > 0 && (
                  <Badge variant="primary" size="sm">
                    {shelter.active_causes} causa{shelter.active_causes > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-carbon/70 mb-3 line-clamp-2">{shelter.description}</p>

              {/* Stats */}
              <div className="flex gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <PawPrint className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-carbon">{shelter.pets_count}</span>
                  <span className="text-xs text-carbon/50">mascotas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-carbon">{shelter.adoptions_count}</span>
                  <span className="text-xs text-carbon/50">adopciones</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mb-4">
                {shelter.whatsapp && (
                  <button
                    onClick={() => openWhatsApp(shelter.whatsapp)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                )}
                {shelter.instagram_url && (
                  <button
                    onClick={() => openInstagram(shelter.instagram_url)}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Instagram
                  </button>
                )}
              </div>

              {/* Donations CTA */}
              {shelter.active_causes > 0 && (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => window.location.href = '/donaciones'}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Ver causas de donación
                </Button>
              )}
            </div>
          </Card>
        ))}

        {filteredShelters.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl">🔍</span>
            <p className="text-carbon/60 mt-4">No hay refugios que coincidan</p>
          </div>
        )}
      </div>
    </div>
  )
}
