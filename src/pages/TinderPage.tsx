import { Heart, X, PawPrint, MessageCircle, Home } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Regular pets for play dates
const regularPets = [
  {
    id: '1',
    name: 'Luna',
    species: 'perro',
    breed: 'Golden Retriever',
    age: '2 años',
    temperament: 'Muy juguetona y friendly',
    owner: 'María G.',
    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=500'],
    distance: '2.5 km',
    isAdoption: false,
    ownerLiked: false, // Simulates if the other party liked us
  },
  {
    id: '2',
    name: 'Michi',
    species: 'gato',
    breed: 'Siamés',
    age: '1 año',
    temperament: 'Independiente pero cariñoso',
    owner: 'Carlos R.',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'],
    distance: '1.8 km',
    isAdoption: false,
    ownerLiked: true, // This one already liked us!
  },
  {
    id: '3',
    name: 'Rocky',
    species: 'perro',
    breed: 'Bulldog Francés',
    age: '3 años',
    temperament: 'Tranquilo, le encanta dormir',
    owner: 'Ana P.',
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500'],
    distance: '3.2 km',
    isAdoption: false,
    ownerLiked: false,
  },
  {
    id: '4',
    name: 'Nube',
    species: 'gato',
    breed: 'Persa',
    age: '4 años',
    temperament: 'Muy mansa, le gusta estar en brazos',
    owner: 'Sofia L.',
    photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500'],
    distance: '4.1 km',
    isAdoption: false,
    ownerLiked: true, // Already liked us!
  },
  {
    id: '5',
    name: 'Toby',
    species: 'perro',
    breed: 'Beagle',
    age: '2 años',
    temperament: 'Energético y curioso',
    owner: 'Diego M.',
    photos: ['https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500'],
    distance: '2.1 km',
    isAdoption: false,
    ownerLiked: false,
  },
  {
    id: '6',
    name: 'Lola',
    species: 'gato',
    breed: 'Maine Coon',
    age: '3 años',
    temperament: 'Divertida y juguetona',
    owner: 'Valentina R.',
    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500'],
    distance: '5.0 km',
    isAdoption: false,
    ownerLiked: false,
  },
  {
    id: '7',
    name: 'Max',
    species: 'perro',
    breed: 'Pastor Alemán',
    age: '5 años',
    temperament: 'Leal y protector',
    owner: 'Martín B.',
    photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500'],
    distance: '3.5 km',
    isAdoption: false,
    ownerLiked: false,
  },
  {
    id: '8',
    name: 'Peluza',
    species: 'gato',
    breed: 'British Shorthair',
    age: '2 años',
    temperament: 'Calmado y regalón',
    owner: 'Florencia G.',
    photos: ['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500'],
    distance: '1.2 km',
    isAdoption: false,
    ownerLiked: true, // Already liked us!
  },
]

// Shelter pets for adoption
const shelterPets = [
  {
    id: 's1',
    name: 'Sol',
    species: 'perro',
    breed: 'Mestizo',
    age: '1 año',
    temperament: 'Muy affectionate y listo para dar amor',
    shelter: 'Refugio Patitas',
    photos: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500'],
    distance: '8.0 km',
    isAdoption: true,
    ownerLiked: false,
  },
  {
    id: 's2',
    name: 'Negro',
    species: 'perro',
    breed: 'Ovejero',
    age: '6 meses',
    temperament: 'Juguetón y amigable',
    shelter: 'Rescate Animal',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500'],
    distance: '10.2 km',
    isAdoption: true,
    ownerLiked: true,
  },
  {
    id: 's3',
    name: 'Mishi',
    species: 'gato',
    breed: 'Doméstico',
    age: '8 meses',
    temperament: 'Curioso y mimoso',
    shelter: 'Huellas de Amor',
    photos: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500'],
    distance: '6.5 km',
    isAdoption: true,
    ownerLiked: false,
  },
]

// Interleave: every 5 regular pets, show 1 adoption pet
function interleavePets(regular: typeof regularPets, adoption: typeof shelterPets) {
  const result: (typeof regularPets[0] | typeof shelterPets[0])[] = []
  let adoptionIndex = 0
  
  for (let i = 0; i < regular.length; i++) {
    result.push(regular[i])
    if ((i + 1) % 5 === 0 && adoptionIndex < adoption.length) {
      result.push(adoption[adoptionIndex])
      adoptionIndex++
    }
  }
  
  while (adoptionIndex < adoption.length) {
    result.push(adoption[adoptionIndex])
    adoptionIndex++
  }
  
  return result
}

const allPets = interleavePets(regularPets, shelterPets)

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: string
  temperament: string
  owner?: string
  shelter?: string
  photos: string[]
  distance: string
  isAdoption: boolean
  ownerLiked: boolean
}

export function TinderPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])
  const [pendingLikes, setPendingLikes] = useState<string[]>([])
  const [showMatchAnimation, setShowMatchAnimation] = useState<Pet | null>(null)
  const [showPendingMessage, setShowPendingMessage] = useState<Pet | null>(null)

  const currentPet = allPets[currentIndex] as Pet

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentPet) return

    if (direction === 'right') {
      // User liked this pet
      if (currentPet.isAdoption) {
        // Adoption pets - direct match if interested
        if (!matches.includes(currentPet.id)) {
          setMatches(prev => [...prev, currentPet.id])
          setShowMatchAnimation(currentPet)
        }
      } else {
        // Regular pets - check if the other party already liked us
        if (currentPet.ownerLiked) {
          // Mutual like = MATCH!
          if (!matches.includes(currentPet.id)) {
            setMatches(prev => [...prev, currentPet.id])
            setShowMatchAnimation(currentPet)
          }
        } else {
          // They haven't liked us yet - pending
          if (!pendingLikes.includes(currentPet.id)) {
            setPendingLikes(prev => [...prev, currentPet.id])
            setShowPendingMessage(currentPet)
          }
        }
      }
    }
    
    if (currentIndex < allPets.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const closeMatchAnimation = () => {
    setShowMatchAnimation(null)
  }

  const closePendingMessage = () => {
    setShowPendingMessage(null)
  }

  if (!currentPet) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="w-16 h-16 mx-auto mb-4" style={{ color: '#331B7E30' }} />
          <h2 className="font-display font-bold text-2xl text-carbon mb-2">¡Ya viste todas!</h2>
          <p className="text-carbon/60 mb-6">Volvé mañana para ver más mascotas</p>
          <Link to="/perfil/mascotas" className="text-white px-6 py-3 rounded-xl font-semibold inline-block" style={{ background: '#331B7E' }}>
            Agregar mi mascota
          </Link>
        </div>
      </div>
    )
  }

  const isAdoption = currentPet.isAdoption

  return (
    <div className="min-h-[calc(100vh-64px)] py-6 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="font-display font-bold text-2xl text-center text-carbon mb-2">
          {isAdoption ? '🐾 Adopción' : 'PetoMatch'}
        </h1>
        <p className="text-carbon/60 text-center text-sm mb-6">
          {isAdoption 
            ? `De ${currentPet.shelter} - ¡Considerá adoptar!` 
            : 'Deslizá para encontrar play dates'}
        </p>

        {/* Card */}
        <div 
          className="rounded-3xl overflow-hidden shadow-lg mb-6"
          style={{ border: isAdoption ? '3px solid #F27131' : '1px solid rgba(0,0,0,0.1)' }}
        >
          <div className="relative h-96">
            <img
              src={currentPet.photos[0]}
              alt={currentPet.name}
              className="w-full h-full object-cover"
            />
            
            {/* Adoption Badge */}
            {isAdoption && (
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-white rounded-xl p-3 shadow-lg flex items-center gap-2">
                  <Home className="w-5 h-5" style={{ color: '#F27131' }} />
                  <div>
                    <p className="font-semibold text-sm text-carbon">🐾 ¡En adopción!</p>
                    <p className="text-xs text-carbon/60">{currentPet.shelter}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h2 className="font-display font-bold text-2xl text-white">{currentPet.name}</h2>
              <p className="text-white/80 text-sm">
                {currentPet.breed} • {currentPet.age}
                {isAdoption && ` • ${currentPet.shelter}`}
              </p>
              {!isAdoption && (
                <p className="text-white/60 text-sm">📍 {currentPet.distance} • {currentPet.owner}</p>
              )}
              {isAdoption && (
                <p className="text-white/60 text-sm">📍 {currentPet.distance}</p>
              )}
            </div>
          </div>
          <div className="p-6 bg-white">
            <p className="text-carbon/70 mb-4">"{currentPet.temperament}"</p>
            
            {isAdoption ? (
              /* Adoption Actions */
              <div className="space-y-3">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition"
                    style={{ background: 'rgba(0,0,0,0.05)' }}
                  >
                    <span className="text-2xl">🙅</span>
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition"
                    style={{ background: 'rgba(242,113,49,0.1)' }}
                  >
                    <Heart className="w-8 h-8" style={{ color: '#F27131' }} />
                  </button>
                </div>
                <p className="text-center text-xs text-carbon/50">
                  ❤️ = Postular para adoptar
                </p>
              </div>
            ) : (
              /* Regular Pet Actions */
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 rounded-full flex items-center justify-center transition"
                  style={{ background: 'rgba(0,0,0,0.05)' }}
                >
                  <X className="w-8 h-8 text-red-500" />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 rounded-full flex items-center justify-center transition"
                  style={{ background: 'rgba(51,27,126,0.1)' }}
                >
                  <Heart className="w-8 h-8" style={{ color: '#331B7E', fill: '#331B7E' }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pending Likes Badge */}
        {pendingLikes.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-sm text-carbon">
              ⏳ Tenés <strong>{pendingLikes.length}</strong> like(s) esperando confirmación
            </p>
          </div>
        )}

        {/* Matches */}
        {matches.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display font-bold text-lg text-carbon mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: '#331B7E', fill: '#331B7E' }} />
              Matches ({matches.length})
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {matches.map(matchId => {
                const pet = allPets.find(p => p.id === matchId) as Pet | undefined
                if (!pet) return null
                return (
                  <div key={matchId} className="flex-shrink-0 bg-white rounded-xl p-3 border-2" style={{ borderColor: '#331B7E' }}>
                    <img src={pet.photos[0]} alt={pet.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <p className="text-xs font-medium text-carbon text-center">{pet.name}</p>
                    {pet.isAdoption && (
                      <p className="text-[10px] text-center" style={{ color: '#F27131' }}>En adopción</p>
                    )}
                  </div>
                )
              })}
            </div>
            <Link 
              to="/chat"
              className="mt-4 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              style={{ background: '#331B7E' }}
            >
              <MessageCircle className="w-5 h-5" />
              Chatear con tus matches
            </Link>
          </div>
        )}
      </div>

      {/* Match Animation Modal */}
      {showMatchAnimation && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={closeMatchAnimation}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display font-bold text-2xl text-carbon mb-2">
              {showMatchAnimation.isAdoption ? '¡Te postulaste!' : '¡Es Match!'}
            </h2>
            <p className="text-carbon/70 mb-4">
              {showMatchAnimation.isAdoption 
                ? `Tu solicitud para adoptar a ${showMatchAnimation.name} fue enviada a ${showMatchAnimation.shelter}`
                : `Vos y ${showMatchAnimation.name} se gustaron mutuamente! Pueden chatear ahora.`
              }
            </p>
            <div className="mb-4">
              <img 
                src={showMatchAnimation.photos[0]} 
                alt={showMatchAnimation.name}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4"
                style={{ borderColor: showMatchAnimation.isAdoption ? '#F27131' : '#331B7E' }}
              />
              <p className="font-semibold text-carbon mt-2">{showMatchAnimation.name}</p>
              <p className="text-sm text-carbon/60">{showMatchAnimation.breed}</p>
            </div>
            {showMatchAnimation.isAdoption ? (
              <button
                onClick={closeMatchAnimation}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{ background: '#F27131' }}
              >
                Continuar viendo
              </button>
            ) : (
              <Link 
                to="/chat"
                className="block w-full py-3 rounded-xl font-semibold text-white text-center"
                style={{ background: '#331B7E' }}
              >
                💬 Empezar a chatear
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Pending Like Modal */}
      {showPendingMessage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={closePendingMessage}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">💌</div>
            <h2 className="font-display font-bold text-2xl text-carbon mb-2">
              ¡Le gustaste a {showPendingMessage.name}!
            </h2>
            <p className="text-carbon/70 mb-4">
              Tu like fue enviado. Si {showPendingMessage.owner} también te da like, ¡será match y podrán chatear!
            </p>
            <div className="mb-4">
              <img 
                src={showPendingMessage.photos[0]} 
                alt={showPendingMessage.name}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4"
                style={{ borderColor: '#331B7E' }}
              />
              <p className="font-semibold text-carbon mt-2">{showPendingMessage.name}</p>
              <p className="text-sm text-carbon/60">{showPendingMessage.breed}</p>
            </div>
            <button
              onClick={closePendingMessage}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: '#331B7E' }}
            >
              Continuar viendo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
