import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MapPin, MessageCircle, PawPrint, CheckCircle, Clock, AlertCircle, ExternalLink, ArrowLeft } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

// Mock shelter data
const mockShelter = {
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
}

// Mock pets - available for adoption
const mockAvailablePets = [
  { id: '1', name: 'Luna', breed: 'Mestiza', age: '2 años', gender: 'hembra', size: 'mediano', photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'], status: 'available' },
  { id: '2', name: 'Rocky', breed: 'Ovejero', age: '1 año', gender: 'macho', size: 'grande', photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'], status: 'available' },
  { id: '3', name: 'Mishi', breed: 'Doméstico', age: '6 meses', gender: 'hembra', size: 'chico', photos: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400'], status: 'available' },
  { id: '4', name: 'Max', breed: 'Labrador', age: '3 años', gender: 'macho', size: 'grande', photos: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400'], status: 'available' },
]

// Mock pets - already adopted
const mockAdoptedPets = [
  { id: '5', name: 'Nube', breed: 'Mestiza', age: '4 años', adoption_date: '2025-12-15', photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'] },
  { id: '6', name: 'Simba', breed: 'Siames', age: '2 años', adoption_date: '2026-01-20', photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'] },
  { id: '7', name: 'Bella', breed: 'Golden', age: '1 año', adoption_date: '2026-02-10', photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'] },
]

// Mock causes
const mockCauses = [
  { id: '1', title: 'Comida para 30 días', goal_amount: 150000, current_amount: 87500, is_urgent: true },
  { id: '2', title: 'Vacunas de emergencia', goal_amount: 80000, current_amount: 20000, is_urgent: false },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

const getProgress = (current: number, goal: number) => {
  return Math.min(Math.round((current / goal) * 100), 100)
}

export function ShelterDetailPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'available' | 'adopted' | 'causes'>('available')

  const openWhatsApp = () => {
    window.open(`https://wa.me/${mockShelter.whatsapp.replace('+549', '')}`, '_blank')
  }

  const openInstagram = () => {
    window.open(mockShelter.instagram_url, '_blank')
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="relative">
        <div className="h-40 bg-primary">
          <img 
            src={mockShelter.cover_url} 
            alt={mockShelter.name}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <button
          onClick={() => navigate('/refugios')}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
        >
          <ArrowLeft className="w-5 h-5 text-carbon" />
        </button>
      </div>

      {/* Shelter Info */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="flex items-end gap-4">
          <img 
            src={mockShelter.logo_url} 
            alt={mockShelter.name}
            className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
          />
          <div className="flex-1 pb-2">
            <h1 className="font-display font-bold text-xl text-carbon">{mockShelter.name}</h1>
            <div className="flex items-center gap-1 text-xs text-carbon/60">
              <MapPin className="w-3 h-3" />
              {mockShelter.address}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="px-4 mt-4 flex gap-2">
        <button
          onClick={openWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={openInstagram}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Instagram
        </button>
      </div>

      {/* Description */}
      <div className="px-4 mt-4">
        <p className="text-sm text-carbon/70">{mockShelter.description}</p>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex border-b border-carbon/10">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'available' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <PawPrint className="w-4 h-4" />
              En Adopción ({mockAvailablePets.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('adopted')}
            className={`flex-1 pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'adopted' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Adoptadas ({mockAdoptedPets.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('causes')}
            className={`flex-1 pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'causes' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Heart className="w-4 h-4" />
              Causas ({mockCauses.length})
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-4">
        {/* Available Pets */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-2 gap-3">
            {mockAvailablePets.map((pet) => (
              <Card key={pet.id} className="p-3 overflow-hidden">
                <img 
                  src={pet.photos[0]} 
                  alt={pet.name}
                  className="w-full h-32 object-cover rounded-xl mb-2"
                />
                <h4 className="font-semibold text-carbon text-sm">{pet.name}</h4>
                <p className="text-xs text-carbon/60">{pet.breed}</p>
                <p className="text-xs text-carbon/50">{pet.age} • {pet.gender}</p>
                <Button size="sm" className="w-full mt-2">
                  Adoptar
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Adopted Pets */}
        {activeTab === 'adopted' && (
          <div className="space-y-3">
            {mockAdoptedPets.map((pet) => (
              <Card key={pet.id} className="p-4 flex items-center gap-3">
                <img 
                  src={pet.photos[0]} 
                  alt={pet.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-carbon">{pet.name}</h4>
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Adoptado
                    </Badge>
                  </div>
                  <p className="text-sm text-carbon/60">{pet.breed}</p>
                  <p className="text-xs text-carbon/50 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Adoptado el {new Date(pet.adoption_date).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Causes */}
        {activeTab === 'causes' && (
          <div className="space-y-4">
            {mockCauses.map((cause) => (
              <Card key={cause.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {cause.is_urgent && (
                      <Badge variant="error" size="sm">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        URGENTE
                      </Badge>
                    )}
                  </div>
                </div>
                <h4 className="font-semibold text-carbon mb-2">{cause.title}</h4>
                
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary">
                      {formatPrice(cause.current_amount)}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {getProgress(cause.current_amount, cause.goal_amount)}%
                    </span>
                  </div>
                  <div className="h-3 bg-carbon/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%` }}
                    />
                  </div>
                  <p className="text-xs text-carbon/50 mt-1">
                    de {formatPrice(cause.goal_amount)}
                  </p>
                </div>

                <Button className="w-full" variant="secondary">
                  <Heart className="w-4 h-4 mr-2" />
                  Donar
                </Button>
              </Card>
            ))}

            {mockCauses.length === 0 && (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
                <p className="text-carbon/60">No hay causas activas</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
