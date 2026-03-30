import { useState } from 'react'
import { Heart, Clock, AlertCircle, Share2 } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

// Mock urgent causes data
const mockCauses = [
  {
    id: '1',
    shelter_id: 'shelter-1',
    shelter_name: 'Refugio Patitas',
    shelter_logo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100',
    title: 'Comida para 30 días',
    description: 'Necesitamos alimentos para 45 mascotas que tenemos en el refugio. La comida de calidad es esencial para su salud.',
    goal_amount: 150000,
    current_amount: 87500,
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    is_active: true,
    is_urgent: true,
    expires_at: '2026-04-30',
    donors_count: 34,
  },
  {
    id: '2',
    shelter_id: 'shelter-1',
    shelter_name: 'Refugio Patitas',
    shelter_logo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100',
    title: 'Vacunas de emergencia',
    description: 'Vacunas para todos los cachorros que llegaron recently al refugio. Necesitamos protegerlos de enfermedades.',
    goal_amount: 80000,
    current_amount: 20000,
    image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
    is_active: true,
    is_urgent: false,
    expires_at: '2026-05-15',
    donors_count: 12,
  },
  {
    id: '3',
    shelter_id: 'shelter-2',
    shelter_name: 'Ayuda Animal',
    shelter_logo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100',
    title: 'Cirugía urgente - Luna',
    description: 'Luna necesita una cirugía de cadera. Es una perrita abandonada que救 ourselves en la calle.',
    goal_amount: 250000,
    current_amount: 180000,
    image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400',
    is_active: true,
    is_urgent: true,
    expires_at: '2026-04-05',
    donors_count: 89,
  },
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

const daysLeft = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function DonationsPage() {
  const [filter, setFilter] = useState<'all' | 'urgent'>('all')

  const filteredCauses = mockCauses.filter(c => {
    if (filter === 'urgent') return c.is_urgent && c.is_active
    return c.is_active
  })

  // Sort: urgent first, then by progress (closest to goal first)
  const sortedCauses = [...filteredCauses].sort((a, b) => {
    if (a.is_urgent !== b.is_urgent) return a.is_urgent ? -1 : 1
    const aProgress = getProgress(a.current_amount, a.goal_amount)
    const bProgress = getProgress(b.current_amount, b.goal_amount)
    return bProgress - aProgress
  })

  const handleDonate = (cause: typeof mockCauses[0]) => {
    // TODO: Integrate with Mercado Pago
    alert(`Donar a: ${cause.title}\nMeta: ${formatPrice(cause.goal_amount)}`)
  }

  const handleShare = (cause: typeof mockCauses[0]) => {
    if (navigator.share) {
      navigator.share({
        title: cause.title,
        text: `Ayudá a ${cause.shelter_name} con: ${cause.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.href} - Ayudá a ${cause.shelter_name} con: ${cause.title}`)
      alert('Link copiado al portapapeles')
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div 
        className="px-4 pt-6 pb-8"
        style={{ background: '#331B7E' }}
      >
        <h1 className="font-display font-bold text-2xl text-white mb-1">Donaciones</h1>
        <p className="text-white/80 text-sm">Ayudá a los refugios con sus causas</p>
      </div>

      {/* Filter */}
      <div className="px-4 -mt-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'all'
                ? 'text-white'
                : 'bg-white text-carbon/70 border border-carbon/10'
            }`}
            style={filter === 'all' ? { background: '#331B7E' } : {}}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1 ${
              filter === 'urgent'
                ? 'text-white'
                : 'bg-white text-red-500 border border-red-200'
            }`}
            style={filter === 'urgent' ? { background: '#DC2626' } : {}}
          >
            <AlertCircle className="w-4 h-4" />
            Urgentes
          </button>
        </div>
      </div>

      {/* Causes List */}
      <div className="px-4 space-y-4">
        {sortedCauses.map((cause) => (
          <Card key={cause.id} className="p-4 overflow-hidden">
            {/* Image */}
            <div className="relative -mx-4 -mt-4 mb-3">
              <img 
                src={cause.image_url} 
                alt={cause.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {cause.is_urgent && (
                  <Badge variant="error" className="shadow-lg">
                    ⚠️ URGENTE
                  </Badge>
                )}
              </div>
              <button
                onClick={() => handleShare(cause)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              >
                <Share2 className="w-4 h-4 text-carbon/60" />
              </button>
            </div>

            {/* Shelter Info */}
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={cause.shelter_logo} 
                alt={cause.shelter_name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-carbon/60">{cause.shelter_name}</span>
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-carbon text-lg mb-1">{cause.title}</h3>
            <p className="text-sm text-carbon/60 line-clamp-2 mb-3">{cause.description}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: '#331B7E' }}>
                  {formatPrice(cause.current_amount)}
                </span>
                <span className="text-xs text-carbon/50">
                  de {formatPrice(cause.goal_amount)}
                </span>
              </div>
              <div className="h-3 bg-carbon/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                  style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-carbon/50">
                  {cause.donors_count} donors
                </span>
                {cause.expires_at && (
                  <span className="text-xs text-carbon/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {daysLeft(cause.expires_at)} días restantes
                  </span>
                )}
              </div>
            </div>

            {/* Donate Button */}
            <Button 
              onClick={() => handleDonate(cause)}
              className="w-full"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donar ahora
            </Button>
          </Card>
        ))}

        {sortedCauses.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
            <p className="text-carbon/60">No hay causas activas</p>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="px-4 mt-6">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-carbon mb-1">¿Por qué donate?</h4>
              <p className="text-sm text-carbon/60">
                Tus donaciones ayudan a los refugios a cubrir necesidades básicas como 
                comida, vacunas, medicamentos y más. Cada peso cuenta.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
