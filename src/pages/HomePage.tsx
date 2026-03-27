import { Link } from 'react-router-dom'
import { MapPin, Heart, ShoppingBag, Star, Shield, Truck, Video, Users } from 'lucide-react'
import { Card, Badge, Avatar } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'

const stats = [
  { value: '2,500+', label: 'Mascotas Reunidas' },
  { value: '850+', label: 'Negocios Aliados' },
  { value: '12,000+', label: 'Miembros' },
]

const features = [
  { 
    icon: <MapPin className="w-7 h-7" />, 
    title: 'Mascotas Perdidas', 
    description: 'Reporta y encuentra mascotas en tu zona',
    color: 'bg-red-50 text-red-500',
    href: '/mascotas-perdidas',
    badge: null,
  },
  { 
    icon: <Heart className="w-7 h-7" />, 
    title: 'PetoMatch', 
    description: 'Encontrá play dates para tu peludo',
    color: 'bg-pink-50 text-pink-500',
    href: '/tinder',
    badge: 'Nuevo',
  },
  { 
    icon: <ShoppingBag className="w-7 h-7" />, 
    title: 'Tienda', 
    description: 'Productos premium con envío a domicilio',
    color: 'bg-amber-50 text-amber-500',
    href: '/tienda',
    badge: null,
  },
  { 
    icon: <Star className="w-7 h-7" />, 
    title: 'Aliados', 
    description: 'Descuentos exclusivos en tu zona',
    color: 'bg-purple-50 text-purple-500',
    href: '/descuentos',
    badge: 'Premium',
  },
  { 
    icon: <Video className="w-7 h-7" />, 
    title: 'PetoDoc', 
    description: 'Consultas veterinarias online',
    color: 'bg-green-50 text-green-500',
    href: '/petodoc',
    badge: 'Pronto',
  },
  { 
    icon: <Users className="w-7 h-7" />, 
    title: 'Eventos', 
    description: 'Participá en encuentros y ferias',
    color: 'bg-blue-50 text-blue-500',
    href: '/eventos',
    badge: null,
  },
]

const mockNearbyPets = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    location: 'Palermo, CABA',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
    status: 'lost',
  },
  {
    id: '2',
    name: 'Michi',
    breed: 'Siamés',
    location: 'Villa Crespo',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300',
    status: 'found',
  },
  {
    id: '3',
    name: 'Rocky',
    breed: 'Bulldog Francés',
    location: 'Belgrano',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300',
    status: 'lost',
  },
]

export function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white px-4 pt-6 pb-24 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm">
              {user ? `¡Hola, ${user.user_metadata?.full_name?.split(' ')[0] || 'amigo'}! 👋` : 'La app de mascotas'}
            </p>
          </div>
          <Avatar 
            src={user?.user_metadata?.avatar_url} 
            fallback={user?.user_metadata?.full_name || 'P'} 
            size="md"
          />
        </div>
        
        <h1 className="font-display font-extrabold text-3xl mb-2">
          PetoClub
        </h1>
        <p className="text-white/80 text-base mb-6">
          Todo para tu mascota en un solo lugar 🐾
        </p>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link 
            to="/reportar?type=lost"
            className="flex-1 bg-white text-primary px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
          >
            <span>🐕</span> Perdí mi Mascota
          </Link>
          <Link 
            to="/reportar?type=found"
            className="flex-1 bg-white/20 text-white px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
          >
            <span>🐱</span> Encontré una
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 -mt-16 mb-6">
        <Card variant="elevated" className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-xl text-primary">
                  {stat.value}
                </div>
                <div className="text-carbon-light text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Nearby Pets */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-carbon">
            🚨 Cerca de vos
          </h2>
          <Link to="/mascotas-perdidas" className="text-primary text-sm font-medium">
            Ver todas
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {mockNearbyPets.map((pet) => (
            <Link 
              key={pet.id} 
              to={`/mascota/${pet.id}`}
              className="flex-shrink-0 w-36"
            >
              <Card className="overflow-hidden">
                <div className="relative h-28">
                  <img 
                    src={pet.photo} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    variant={pet.status === 'lost' ? 'error' : 'success'}
                    className="absolute top-2 left-2"
                  >
                    {pet.status === 'lost' ? '🔴 Perdida' : '🟢 Encontrada'}
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-carbon truncate">{pet.name}</h3>
                  <p className="text-carbon-light text-xs truncate">{pet.breed}</p>
                  <p className="text-carbon/50 text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {pet.location}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 mb-6">
        <h2 className="font-display font-bold text-lg text-carbon mb-3">
          Explorar
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.href}>
              <Card className="p-4 h-full">
                <div className={`inline-flex p-2.5 rounded-xl mb-3 ${feature.color}`}>
                  {feature.icon}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-carbon text-sm">{feature.title}</h3>
                  {feature.badge && (
                    <Badge variant={feature.badge === 'Nuevo' ? 'primary' : 'secondary'} size="sm">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-carbon-light text-xs line-clamp-2">
                  {feature.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 mb-8">
        <Card variant="outlined" className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-carbon-light">Verificado</p>
            </div>
            <div>
              <Heart className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-carbon-light">10% a Refugios</p>
            </div>
            <div>
              <Truck className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-carbon-light">Envío gratis*</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Membership CTA */}
      {!user && (
        <section className="px-4 mb-8">
          <Card variant="elevated" className="p-5 bg-gradient-to-r from-primary to-primary-dark text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold">Membresía Premium</h3>
                <p className="text-white/80 text-sm">Acceso a descuentos exclusivos</p>
              </div>
            </div>
            <Link 
              to="/membresia"
              className="block w-full bg-white text-primary py-3 rounded-xl font-semibold text-center"
            >
              Obtener Membresía
            </Link>
          </Card>
        </section>
      )}
    </div>
  )
}
