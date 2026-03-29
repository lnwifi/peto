import { Link } from 'react-router-dom'
import { User, MapPin, Heart, ShoppingBag, Settings, LogOut, Crown, ChevronRight, Plus, Edit2, Stethoscope } from 'lucide-react'
import { Card, Badge, Button, Avatar } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'

// Mock user's pets
const mockPets = [
  {
    id: '1',
    name: 'Firulais',
    species: 'perro',
    breed: 'Golden Retriever',
    age: '3 años',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200',
  },
  {
    id: '2',
    name: 'Michi',
    species: 'gato',
    breed: 'Siamés',
    age: '2 años',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
  },
]

// Mock user data
const mockUser = {
  name: 'María García',
  email: 'maria@email.com',
  avatar: null,
  isMember: true,
  memberUntil: '2027-03-27',
  points: 2450,
  stats: {
    lostPets: 3,
    foundPets: 1,
    matches: 12,
    purchases: 8,
  },
}

export function ProfilePage() {
  const { user, signOut } = useAuth()

  // Use mock data for demo
  const profile = mockUser

  if (!user && !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-carbon/5 rounded-full flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-carbon/30" />
        </div>
        <h2 className="font-display font-bold text-xl text-carbon mb-2">
          Iniciá sesión
        </h2>
        <p className="text-carbon-light text-center mb-6">
          Creá una cuenta o iniciá sesión para ver tu perfil
        </p>
        <Link to="/login">
          <Button>Iniciar Sesión</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Profile Header */}
      <div className="text-white px-4 pt-6 pb-20 rounded-b-3xl" style={{ background: '#331B7E' }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-xl">Mi Perfil</h1>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <Avatar 
            src={profile.avatar || undefined}
            fallback={profile.name?.charAt(0) || 'U'}
            size="xl"
            className="border-4 border-white/30"
          />
          <div>
            <h2 className="font-display font-bold text-xl">{profile.name}</h2>
            <p className="text-white/80 text-sm">{profile.email}</p>
            {profile.isMember && (
              <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                Premium hasta {new Date(profile.memberUntil).toLocaleDateString('es-AR')}
              </Badge>
            )}
          </div>
        </div>

        {/* Points */}
        <div className="mt-6 bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Tus puntos</p>
              <p className="font-display font-bold text-3xl">{profile.points.toLocaleString()}</p>
            </div>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30"
            >
              Canjear
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-10 mb-4">
        <Card className="p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: 'Reportes', value: profile.stats.lostPets, emoji: '📍' },
              { label: 'Encontrados', value: profile.stats.foundPets, emoji: '🎉' },
              { label: 'Matches', value: profile.stats.matches, emoji: '❤️' },
              { label: 'Compras', value: profile.stats.purchases, emoji: '🛒' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-bold text-carbon text-lg">{stat.value}</div>
                <div className="text-xs text-carbon/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Membership CTA */}
      {!profile.isMember && (
        <div className="px-4 pb-4">
          <Card className="p-4 text-white" style={{ background: '#F27131' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">PetoClub+</h3>
                <p className="text-white/80 text-sm">Accedé a descuentos exclusivos</p>
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
      )}

      {/* My Pets */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-carbon">Mis Mascotas</h2>
          <button 
            onClick={() => alert('Próximamente: agregar mascota')}
            className="text-primary text-sm font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {mockPets.map((pet) => (
            <Card key={pet.id} className="p-0 overflow-hidden">
              <div className="relative h-24">
                <img 
                  src={pet.photo} 
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                  <Edit2 className="w-3 h-3 text-carbon" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-carbon text-sm">{pet.name}</h3>
                <p className="text-xs text-carbon/60">{pet.breed}</p>
                <p className="text-xs text-carbon/50">{pet.age}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pb-20">
        <Card className="overflow-hidden">
          <Link to="/mascotas-perdidas/mis-reportes" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Reportes</p>
              <p className="text-xs text-carbon/60">Mascotas perdidas/encontradas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/chat" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Matches</p>
              <p className="text-xs text-carbon/60">Chats con otros dueños</p>
            </div>
            <Badge variant="primary" size="sm">3 nuevos</Badge>
          </Link>

          <Link to="/tienda/mis-pedidos" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Pedidos</p>
              <p className="text-xs text-carbon/60">Historial de compras</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/carnet-salud" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Carnet de Salud</p>
              <p className="text-xs text-carbon/60">Vacunas, desparasitación y más</p>
            </div>
            <Badge variant="success" size="sm">⭐ PRO</Badge>
          </Link>

          <Link to="/membresia" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">PetoClub+</p>
              <p className="text-xs text-carbon/60">Gestionar suscripción</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>
        </Card>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="w-full mt-4 bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
