import { Heart, X, PawPrint, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock data - replace with Supabase queries
const mockPets = [
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
  },
]

export function TinderPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])

  const currentPet = mockPets[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Check if it's a match (mock: 50% chance)
      if (Math.random() > 0.5) {
        setMatches(prev => [...prev, currentPet.id])
      }
    }
    
    if (currentIndex < mockPets.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (!currentPet) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="w-16 h-16 text-primary/30 mx-auto mb-4" />
          <h2 className="font-nunito font-bold text-2xl text-carbon mb-2">¡Ya viste todas!</h2>
          <p className="text-carbon/60 mb-6">Volvé mañana para ver más mascotas</p>
          <Link to="/perfil/mascotas" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold">
            Agregar mi mascota
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-nunito font-bold text-3xl text-carbon">Tinder de Mascotas</h1>
          <p className="text-carbon/60 mt-1">Encontrá play dates para tu peludo</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-carbon/5">
          <div className="relative h-96">
            <img
              src={currentPet.photos[0]}
              alt={currentPet.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="font-nunito font-bold text-2xl text-white">{currentPet.name}</h2>
              <p className="text-white/80 text-sm">{currentPet.breed} • {currentPet.age}</p>
              <p className="text-white/60 text-sm mt-1">📍 {currentPet.distance} • {currentPet.owner}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-carbon/70 mb-4">"{currentPet.temperament}"</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-carbon/5 flex items-center justify-center hover:bg-red-50 transition"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition"
              >
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Matches */}
        {matches.length > 0 && (
          <div className="mt-8">
            <h3 className="font-nunito font-bold text-lg text-carbon mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              Tus Matches ({matches.length})
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {matches.map(matchId => {
                const pet = mockPets.find(p => p.id === matchId)
                if (!pet) return null
                return (
                  <div key={matchId} className="flex-shrink-0 bg-white rounded-xl p-3 border border-carbon/5">
                    <img src={pet.photos[0]} alt={pet.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <p className="text-xs font-medium text-carbon text-center">{pet.name}</p>
                  </div>
                )
              })}
            </div>
            <Link 
              to="/chat"
              className="mt-4 bg-secondary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chatear con matches
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
