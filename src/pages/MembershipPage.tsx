import { Check, Star, Crown, Sparkles } from 'lucide-react'
import { Card, Button, Badge } from '../components/ui'

const plans = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: 1990,
    period: 'mes',
    description: 'Perfecto para empezar',
    features: [
      'Acceso a todos los descuentos',
      '5% de cashback en compras',
      'Puntos dobles por actividad',
      'Soporte prioritario',
    ],
    highlighted: false,
  },
  {
    id: 'yearly',
    name: 'Anual',
    price: 1590,
    period: 'mes',
    description: 'Ahorrá 20%',
    features: [
      'Todo lo del plan Mensual',
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
    <div className="px-4 py-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display font-bold text-2xl text-carbon mb-2">
          Membresía PetoClub
        </h1>
        <p className="text-carbon-light">
          Desbloqueá beneficios exclusivos para vos y tu mascota
        </p>
      </div>

      {/* Free vs Premium */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 text-center border-2 border-transparent opacity-60">
          <Sparkles className="w-6 h-6 text-carbon/30 mx-auto mb-2" />
          <h3 className="font-semibold text-carbon text-sm mb-1">Gratis</h3>
          <p className="text-xs text-carbon-light">Uso básico</p>
        </Card>
        <Card className="p-4 text-center border-2 border-primary bg-primary/5">
          <Star className="w-6 h-6 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-primary text-sm mb-1">Premium</h3>
          <p className="text-xs text-primary">Beneficios exclusivos</p>
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
                <Check className="w-4 h-4 text-carbon/30" />
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
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-carbon">{plan.name}</h3>
                  {plan.highlighted && (
                    <Badge variant="primary">Más popular</Badge>
                  )}
                </div>
                <p className="text-xs text-carbon-light">{plan.description}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-xl text-primary">
                  ${plan.price.toLocaleString('es-AR')}
                </span>
                <span className="text-carbon-light text-xs">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-carbon">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
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
      <div className="mt-8 p-4 bg-carbon/5 rounded-2xl">
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
