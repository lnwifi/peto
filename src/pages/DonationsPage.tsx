import { useState } from 'react'
import { Heart, Clock, AlertCircle, Share2, User } from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'
import { mockShelters, mockCauses, formatPrice, getProgress } from '../data/shelters'

// Combine causes with shelter info
const allCauses = Object.values(mockCauses).flat()
  .map(cause => {
    const shelter = mockShelters.find(s => s.id === cause.shelter_id)
    return {
      ...cause,
      shelter_name: shelter?.name || 'Refugio',
      shelter_logo: shelter?.logo_url || '',
    }
  })
  .sort((a, b) => {
    // Urgent first, then by progress
    if (a.is_urgent !== b.is_urgent) return a.is_urgent ? -1 : 1
    return getProgress(b.current_amount, b.goal_amount) - getProgress(a.current_amount, a.goal_amount)
  })

const daysLeft = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function DonationsPage() {
  const [filter, setFilter] = useState<'all' | 'urgent'>('all')

  // Filter causes based on tab
  const filteredCauses = filter === 'urgent' 
    ? allCauses.filter(c => c.is_urgent && c.is_active)
    : allCauses.filter(c => c.is_active)

  const handleDonate = (cause: typeof allCauses[0]) => {
    alert(`Donar a: ${cause.title}\nMeta: ${formatPrice(cause.goal_amount)}`)
  }

  const handleShare = (cause: typeof allCauses[0]) => {
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
      <div className="px-4 pt-6 pb-6 bg-primary">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Donaciones</h1>
        <p className="text-white/80 text-sm">Ayudá a los refugios con sus causas</p>
      </div>

      {/* Filter */}
      <div className="px-4 py-4 bg-white border-b border-carbon/10">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-cream text-carbon/70 border border-carbon/10'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1 ${
              filter === 'urgent'
                ? 'bg-red-500 text-white'
                : 'bg-cream text-red-500 border border-red-200'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Urgentes
          </button>
        </div>
      </div>

      {/* Causes List */}
      <div className="px-4 py-4 space-y-4">
        {filteredCauses.map((cause) => (
          <Card key={cause.id} className="overflow-hidden">
            {/* Image */}
            <div className="relative">
              <img 
                src={cause.image_url} 
                alt={cause.title}
                className="w-full h-40 object-cover"
              />
              {cause.is_urgent && (
                <div className="absolute top-3 left-3">
                  <Badge variant="error">
                    ⚠️ URGENTE
                  </Badge>
                </div>
              )}
              <button
                onClick={() => handleShare(cause)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
              >
                <Share2 className="w-4 h-4 text-carbon/60" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
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
              <p className="text-sm text-carbon/60 line-clamp-2 mb-4">{cause.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">
                    {formatPrice(cause.current_amount)}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {getProgress(cause.current_amount, cause.goal_amount)}%
                  </span>
                </div>
                <div className="h-3 bg-carbon/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-carbon/50">
                    de {formatPrice(cause.goal_amount)}
                  </span>
                  {cause.expires_at && (
                    <span className="text-xs text-carbon/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysLeft(cause.expires_at)} días
                    </span>
                  )}
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4 p-3 bg-cream rounded-xl">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-carbon/40" />
                  <span className="text-xs text-carbon/60">{cause.donors_count} donors</span>
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
            </div>
          </Card>
        ))}

        {filteredCauses.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
            <p className="text-carbon/60">No hay causas activas</p>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="px-4 mt-4">
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
