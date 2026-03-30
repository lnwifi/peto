import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, MapPin, MessageCircle, PawPrint, CheckCircle, Clock, ExternalLink, ArrowLeft } from 'lucide-react'
import { Card } from '../components/ui'
import { mockShelters, mockPets, mockCauses, formatPrice, getProgress } from '../data/shelters'

export function ShelterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'available' | 'adopted' | 'causes'>('available')

  // Find shelter by ID
  const shelter = mockShelters.find(s => s.id === id)

  // If shelter not found, show error
  if (!shelter) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <span className="text-5xl">🔍</span>
          <h2 className="text-xl font-bold text-carbon mt-4">Refugio no encontrado</h2>
          <p className="text-carbon/60 mt-2">Este refugio no existe o fue eliminado.</p>
          <button
            onClick={() => navigate('/refugios')}
            className="mt-4 px-6 py-3 rounded-xl text-white font-semibold"
            style={{ background: '#331B7E' }}
          >
            Volver a refugios
          </button>
        </div>
      </div>
    )
  }

  // Get shelter's pets
  const availablePets = mockPets[id!]?.filter(p => p.status === 'available') || []
  const adoptedPets = mockPets[id!]?.filter(p => p.status === 'adopted') || []
  const shelterCauses = mockCauses[id!] || []

  const openWhatsApp = () => {
    window.open(`https://wa.me/${shelter.whatsapp.replace('+549', '')}`, '_blank')
  }

  const openInstagram = () => {
    window.open(shelter.instagram_url, '_blank')
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header with cover */}
      <div className="relative">
        <div className="h-40" style={{ background: '#331B7E' }}>
          <img 
            src={shelter.cover_url} 
            alt={shelter.name}
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
            src={shelter.logo_url} 
            alt={shelter.name}
            className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
          />
          <div className="flex-1 pb-2">
            <h1 className="font-display font-bold text-xl text-carbon">{shelter.name}</h1>
            <div className="flex items-center gap-1 text-xs text-carbon/60">
              <MapPin className="w-3 h-3" />
              {shelter.address}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="px-4 mt-4 flex gap-2">
        <button
          onClick={openWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#25D366' }}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </button>
        <button
          onClick={openInstagram}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
        >
          <ExternalLink className="w-5 h-5" />
          Instagram
        </button>
      </div>

      {/* Description */}
      <div className="px-4 mt-4">
        <p className="text-sm text-carbon/70">{shelter.description}</p>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4">
        <div className="flex gap-4 p-3 bg-white rounded-xl">
          <div className="flex items-center gap-2">
            <PawPrint className="w-5 h-5" style={{ color: '#331B7E' }} />
            <span className="text-sm font-bold text-carbon">{shelter.pets_count}</span>
            <span className="text-xs text-carbon/60">mascotas</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm font-bold text-carbon">{shelter.adoptions_count}</span>
            <span className="text-xs text-carbon/60">adopciones</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex border-b border-carbon/10">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'available' 
                ? 'border-[#331B7E] text-[#331B7E]' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <PawPrint className="w-4 h-4" />
              En Adopción ({availablePets.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('adopted')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'adopted' 
                ? 'border-[#331B7E] text-[#331B7E]' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Adoptadas ({adoptedPets.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('causes')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'causes' 
                ? 'border-[#331B7E] text-[#331B7E]' 
                : 'border-transparent text-carbon/60'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4" />
              Causas ({shelterCauses.length})
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-4">
        {/* Available Pets */}
        {activeTab === 'available' && (
          <>
            {availablePets.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {availablePets.map((pet) => (
                  <Card key={pet.id} className="p-3 overflow-hidden">
                    <img 
                      src={pet.photos[0]} 
                      alt={pet.name}
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <h4 className="font-semibold text-carbon text-sm">{pet.name}</h4>
                    <p className="text-xs text-carbon/60">{pet.breed}</p>
                    <p className="text-xs text-carbon/50">{pet.age} • {pet.gender}</p>
                    <button 
                      className="w-full mt-2 py-2 rounded-lg text-sm font-semibold text-white"
                      style={{ background: '#331B7E' }}
                    >
                      Adoptar
                    </button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl">🐾</span>
                <p className="text-carbon/60 mt-3">No hay mascotas en adopción</p>
              </div>
            )}
          </>
        )}

        {/* Adopted Pets */}
        {activeTab === 'adopted' && (
          <>
            {adoptedPets.length > 0 ? (
              <div className="space-y-3">
                {adoptedPets.map((pet) => (
                  <Card key={pet.id} className="p-4 flex items-center gap-3">
                    <img 
                      src={pet.photos[0]} 
                      alt={pet.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-carbon">{pet.name}</h4>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                          ✓ Adoptado
                        </span>
                      </div>
                      <p className="text-sm text-carbon/60">{pet.breed}</p>
                      {pet.adoption_date && (
                        <p className="text-xs text-carbon/50 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          Adoptado el {new Date(pet.adoption_date).toLocaleDateString('es-AR')}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl">🏠</span>
                <p className="text-carbon/60 mt-3">No hay adopciones completadas aún</p>
              </div>
            )}
          </>
        )}

        {/* Causes */}
        {activeTab === 'causes' && (
          <>
            {shelterCauses.length > 0 ? (
              <div className="space-y-4">
                {shelterCauses.map((cause) => (
                  <Card key={cause.id} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {cause.is_urgent && (
                        <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-red-500">
                          ⚠️ URGENTE
                        </span>
                      )}
                    </div>
                    <img 
                      src={cause.image_url} 
                      alt={cause.title}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                    />
                    <h4 className="font-semibold text-carbon text-lg mb-2">{cause.title}</h4>
                    <p className="text-sm text-carbon/60 mb-3">{cause.description}</p>
                    
                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold" style={{ color: '#331B7E' }}>
                          {formatPrice(cause.current_amount)}
                        </span>
                        <span className="text-sm font-bold" style={{ color: '#331B7E' }}>
                          {getProgress(cause.current_amount, cause.goal_amount)}%
                        </span>
                      </div>
                      <div className="h-3 bg-carbon/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%`, background: '#331B7E' }}
                        />
                      </div>
                      <p className="text-xs text-carbon/50 mt-1">
                        de {formatPrice(cause.goal_amount)}
                      </p>
                    </div>

                    <button 
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                      style={{ background: '#F27131' }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" />
                        Donar ahora
                      </span>
                    </button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
                <p className="text-carbon/60">No hay causas activas</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
