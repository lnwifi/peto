import { Check, Star, Crown } from 'lucide-react'
import { Card, Button, Badge } from '../components/ui'

const plans = [
  {
    id: 'monthly',
    name: 'PetoClub+ Mensual',
    price: 2900,
    period: 'mes',
    description: 'Todos los beneficios',
    features: [
      'Acceso a todos los descuentos',
      '5% de cashback en compras',
      'Reportes destacados gratis',
      'Puntos triples por actividad',
      'Soporte prioritario',
    ],
    highlighted: false,
  },
  {
    id: 'yearly',
    name: 'PetoClub+ Anual',
    price: 24900,
    period: 'año',
    description: 'Ahorrá 28%',
    features: [
      'Todo lo de Mensual',
      '2 meses gratis',
      'Acceso anticipado a eventos',
      'Badge exclusivo en perfil',
      '10% a refugios de tu parte',
    ],
    highlighted: true,
  },
]

const freeFeatures = [
  'Publicar mascotas perdidas',
  'Usar PetoMatch',
  'Chat con la comunidad',
  'Ver blog y consejos',
]

export function MembershipPage() {
  return (
    <div className="min-h-screen px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <div 
          className="inline-flex items-center justify-center p-4 rounded-2xl mb-4"
          style={{ background: '#331B7E' }}
        >
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-carbon mb-2">
          PetoClub+
        </h1>
        <p className="text-carbon-light text-sm sm:text-base">
          Desbloqueá beneficios exclusivos para vos y tu mascota
        </p>
      </div>

      {/* Free vs Premium */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 text-center border-2 border-transparent opacity-60">
          <Star className="w-6 h-6 text-carbon/30 mx-auto mb-2" />
          <h3 className="font-semibold text-carbon text-sm mb-1">Gratis</h3>
          <p className="text-xs text-carbon-light">Uso básico</p>
        </Card>
        <Card className="p-4 text-center border-2 border-primary bg-primary/5">
          <Star className="w-6 h-6 mx-auto mb-2" style={{ color: '#331B7E' }} />
          <h3 className="font-semibold text-sm mb-1" style={{ color: '#331B7E' }}>Premium</h3>
          <p className="text-xs" style={{ color: '#331B7E' }}>Beneficios exclusivos</p>
        </Card>
      </div>

      {/* Features Comparison */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-lg text-carbon mb-3">
          ¿Qué incluye cada plan?
        </h2>
        
        {/* Free Features */}
        <Card className="p-4 mb-3">
          <h3 className="font-semibold text-carbon mb-3">Gratis</h3>
          <ul className="space-y-2">
            {freeFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-carbon-light">
                <Check className="w-4 h-4 text-carbon/30 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </Card>

        {/* Premium Plans */}
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`p-4 mb-3 ${plan.highlighted ? 'border-2 border-primary' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-carbon">{plan.name}</h3>
                  {plan.highlighted && (
                    <Badge variant="primary" size="sm">Más popular</Badge>
                  )}
                </div>
                <p className="text-xs text-carbon-light">{plan.description}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-bold text-xl" style={{ color: '#331B7E' }}>
                  ${plan.price.toLocaleString('es-AR')}
                </span>
                <span className="text-carbon-light text-xs">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-carbon">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(51,27,126,0.1)' }}>
                    <Check className="w-3 h-3" style={{ color: '#331B7E' }} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <Button fullWidth size="lg">
          Suscribirme ahora
        </Button>
        <p className="text-center text-carbon-light text-xs">
          Podes cancelar cuando quieras. Sin compromisos.
        </p>
      </div>

      {/* Trust */}
      <div className="mt-8 p-4 rounded-2xl" style={{ background: 'rgba(51,27,126,0.05)' }}>
        <h3 className="font-semibold text-carbon text-sm mb-3 text-center">
          💝 10% de cada membresía va a refugios
        </h3>
        <p className="text-xs text-carbon-light text-center">
          Al suscribirte, estás ayudando a mascotas necesitadas en toda Argentina.
        </p>
      </div>
    </div>
  )
}
