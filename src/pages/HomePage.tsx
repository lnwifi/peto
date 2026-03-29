import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, Star, Shield, Truck, ChevronRight, Sparkles, Flame, Award } from 'lucide-react'
import { Card, Badge, Avatar } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'

// Get user from localStorage
function getUser() {
  const userData = localStorage.getItem('petoclub_user')
  return userData ? JSON.parse(userData) : null
}

// Mock featured businesses
const mockFeaturedBusiness = [
  {
    id: '1',
    name: 'Veterinaria Huellitas',
    category: 'veterinaria',
    address: 'Capital, San Juan',
    rating: 4.8,
    discount: 20,
    logo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=200',
    featured: true,
  },
  {
    id: '2',
    name: 'Pet Shop El Amigo',
    category: 'petshop',
    address: 'Rivadavia, San Juan',
    rating: 4.5,
    discount: 15,
    logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200',
    featured: true,
  },
  {
    id: '3',
    name: 'Café Pet Friendly',
    category: 'cafe',
    address: 'Pocito, San Juan',
    rating: 4.7,
    discount: 10,
    logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200',
    featured: true,
  },
]

// Mock shop offers
const mockOffers = [
  {
    id: '1',
    name: 'Alimento Premium Perro Adulto',
    brand: 'Royal Canin',
    originalPrice: 15000,
    currentPrice: 12500,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200',
    badge: 'Más vendido',
  },
  {
    id: '2',
    name: 'Collar Reflectante Premium',
    brand: 'Hurtta',
    originalPrice: 4000,
    currentPrice: 2800,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200',
    badge: 'Oferta',
  },
  {
    id: '3',
    name: 'Cama Ortopédica Grande',
    brand: 'Igloo',
    originalPrice: 22000,
    currentPrice: 16900,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200',
    badge: null,
  },
]

// Mock nearby pets
const mockNearbyPets = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    location: 'Capital, San Juan',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
    status: 'lost',
  },
  {
    id: '2',
    name: 'Michi',
    breed: 'Siamés',
    location: 'Rivadavia, San Juan',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300',
    status: 'found',
  },
  {
    id: '3',
    name: 'Rocky',
    breed: 'Bulldog Francés',
    location: 'Pocito, San Juan',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300',
    status: 'lost',
  },
]

const stats = [
  { value: '2,500+', label: 'Mascotas Reunidas' },
  { value: '850+', label: 'Negocios Aliados' },
  { value: '12,000+', label: 'Miembros' },
]

const categoryEmojis: Record<string, string> = {
  veterinaria: '🏥',
  petshop: '🛒',
  peluqueria: '✂️',
  cafe: '☕',
  paseador: '🚶',
}

export function HomePage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Load user data
    const localUser = getUser()
    setUserData(localUser)
    
    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          // Default to San Juan
          setUserLocation({ lat: -31.5311, lng: -68.5366 })
        }
      )
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const userName = userData?.name || user?.user_metadata?.full_name?.split(' ')[0] || 'Amigo'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="text-white px-4 pt-6 pb-16 sm:pb-24 rounded-b-3xl"
        style={{ backgroundColor: '#331B7E' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-sm">
              ¡Hola, {userName}! 👋
            </p>
            {userData?.points && (
              <p className="text-amber-400 text-sm font-medium">
                ⭐ {userData.points} puntos
              </p>
            )}
          </div>
          <Link to="/perfil" className="relative">
            <Avatar 
              src={user?.user_metadata?.avatar_url} 
              fallback={userName?.charAt(0) || 'P'} 
              size="md"
            />
            {userData?.badges?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs" style={{ color: '#331B7E' }}>
                {userData.badges.length}
              </span>
            )}
          </Link>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color: '#FFCF5C' }}>
          PetoClub
        </h1>
        <p className="text-white/80 text-base mb-6">
          Todo para tu mascota en un solo lugar 🐾
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/reportar?type=lost"
            className="flex-1 text-white px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 transition hover:scale-[1.02]"
            style={{ background: '#F27131' }}
          >
            <span>🐕</span> Perdí mi Mascota
          </Link>
          <Link 
            to="/reportar?type=found"
            className="flex-1 bg-white/20 text-white px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 transition hover:scale-[1.02]"
          >
            <span>🐱</span> Encontré una
          </Link>
        </div>

        {/* Location Badge */}
        {userLocation && (
          <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Mostrando mascotas cerca de tu ubicación</span>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="px-4 -mt-12 mb-6">
        <Card variant="elevated" className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-lg sm:text-xl" style={{ color: '#331B7E' }}>
                  {stat.value}
                </div>
                <div className="text-carbon-light text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Featured Businesses */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: '#F27131' }} />
            <h2 className="font-display font-bold text-lg sm:text-xl text-carbon">
              Lugares Destacados
            </h2>
          </div>
          <Link to="/descuentos" className="text-primary text-sm font-medium flex items-center gap-1">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {mockFeaturedBusiness.map((biz) => (
            <Link 
              key={biz.id} 
              to={`/descuentos/${biz.id}`}
              className="flex-shrink-0 w-36"
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-20">
                  <img 
                    src={biz.logo} 
                    alt={biz.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    variant="warning"
                    className="absolute top-2 left-2"
                  >
                    ⭐
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-carbon text-sm line-clamp-1">{biz.name}</h3>
                  <p className="text-carbon-light text-xs flex items-center gap-1">
                    {categoryEmojis[biz.category]} {biz.address}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium">{biz.rating}</span>
                    </div>
                    <Badge variant="secondary" size="sm">-{biz.discount}%</Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop Offers */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5" style={{ color: '#F27131' }} />
            <h2 className="font-display font-bold text-lg sm:text-xl text-carbon">
              Ofertas de la Semana
            </h2>
          </div>
          <Link to="/tienda" className="text-primary text-sm font-medium flex items-center gap-1">
            Ver tienda <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {mockOffers.map((offer) => (
            <Link 
              key={offer.id} 
              to={`/tienda/producto/${offer.id}`}
              className="flex-shrink-0 w-40"
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-28">
                  <img 
                    src={offer.image} 
                    alt={offer.name}
                    className="w-full h-full object-cover"
                  />
                  {offer.badge && (
                    <Badge 
                      variant={offer.badge === 'Oferta' ? 'error' : 'secondary'}
                      className="absolute top-2 left-2 text-[10px]"
                    >
                      {offer.badge === 'Oferta' ? '🔥' : '⭐'} {offer.badge}
                    </Badge>
                  )}
                  <Badge 
                    variant="primary"
                    className="absolute top-2 right-2 text-[10px]"
                  >
                    -{offer.discount}%
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-xs text-carbon/40">{offer.brand}</p>
                  <h3 className="font-semibold text-carbon text-sm line-clamp-2">{offer.name}</h3>
                  <div className="mt-1">
                    <span className="font-bold text-sm" style={{ color: '#331B7E' }}>{formatPrice(offer.currentPrice)}</span>
                    <span className="text-[10px] text-carbon/40 line-through ml-1">
                      {formatPrice(offer.originalPrice)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearby Pets */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg sm:text-xl text-carbon">
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
              className="flex-shrink-0 w-32 sm:w-36"
            >
              <Card className="overflow-hidden">
                <div className="relative h-24 sm:h-28">
                  <img 
                    src={pet.photo} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    variant={pet.status === 'lost' ? 'error' : 'success'}
                    className="absolute top-2 left-2 text-[10px]"
                  >
                    {pet.status === 'lost' ? '🔴' : '🟢'}
                  </Badge>
                </div>
                <div className="p-2 sm:p-3">
                  <h3 className="font-semibold text-carbon text-sm truncate">{pet.name}</h3>
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

      {/* Quick Access Grid */}
      <section className="px-4 mb-6">
        <h2 className="font-display font-bold text-lg text-carbon mb-3">Explorar</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/tinder">
            <Card className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(51,27,126,0.1)' }}>
                <Heart className="w-6 h-6" style={{ color: '#331B7E' }} />
              </div>
              <h3 className="font-semibold text-carbon text-sm">PetoMatch</h3>
              <p className="text-xs text-carbon/60">Encontrá play dates</p>
            </Card>
          </Link>
          <Link to="/logros">
            <Card className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(242,113,49,0.1)' }}>
                <Award className="w-6 h-6" style={{ color: '#F27131' }} />
              </div>
              <h3 className="font-semibold text-carbon text-sm">Logros</h3>
              <p className="text-xs text-carbon/60">Ganá puntos</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 mb-8">
        <Card variant="outlined" className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Shield className="w-5 h-5 mx-auto mb-1" style={{ color: '#331B7E' }} />
              <p className="text-carbon-light text-xs">Verificado</p>
            </div>
            <div>
              <Heart className="w-5 h-5 mx-auto mb-1" style={{ color: '#F27131' }} />
              <p className="text-carbon-light text-xs">10% a Refugios</p>
            </div>
            <div>
              <Truck className="w-5 h-5 mx-auto mb-1" style={{ color: '#331B7E' }} />
              <p className="text-carbon-light text-xs">Envío gratis*</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Membership CTA */}
      {(!userData || !userData.memberSince) && (
        <section className="px-4 mb-8">
          <Card 
            variant="elevated" 
            className="p-4 sm:p-6 text-white"
            style={{ background: '#331B7E' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,207,92,0.2)' }}>
                <Star className="w-5 h-5 sm:w-6" style={{ color: '#FFCF5C' }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg">PetoClub+</h3>
                <p className="text-white/80 text-xs sm:text-sm">Acceso a descuentos exclusivos</p>
              </div>
            </div>
            <Link 
              to="/membresia"
              className="block w-full text-sm sm:text-base font-semibold text-center py-3 rounded-xl transition hover:scale-[1.02]"
              style={{ background: '#FFCF5C', color: '#331B7E' }}
            >
              Obtener PetoClub+
            </Link>
          </Card>
        </section>
      )}

      <div className="h-16 sm:h-20" />
    </div>
  )
}
