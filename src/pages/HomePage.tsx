import { Link } from 'react-router-dom'
import { PawPrint, Heart, MapPin, ShoppingBag, Building2, MessageCircle, Star, Shield, Truck } from 'lucide-react'

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Mascotas Perdidas',
    description: 'Reporta y encuentra mascotas perdidas en tu zona con nuestro mapa interactivo.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Tinder de Mascotas',
    description: 'Encuentra play dates y amigos peludos para tu mascota.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'Tienda',
    description: 'Todo lo que tu mascota necesita con delivery a domicilio.',
    color: 'bg-accent/20 text-amber-600',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Descuentos',
    description: 'Acceso exclusivo a ofertas en veterinarias, pet shops y más.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Chat Comunitario',
    description: 'Conecta con otros dueños de mascotas y refugio cercanos.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Sistema de Puntos',
    description: 'Ganá puntos por ayudar y canjealos por descuentos.',
    color: 'bg-amber-100 text-amber-600',
  },
]

const stats = [
  { value: '2,500+', label: 'Mascotas Reunidas' },
  { value: '850+', label: 'Negocios Partners' },
  { value: '12,000+', label: 'Miembros Activos' },
  { value: '45+', label: 'Refugios' },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PawPrint className="w-4 h-4" />
              La comunidad pet-friendly de Argentina
            </div>
            <h1 className="font-nunito font-bold text-4xl md:text-5xl lg:text-6xl text-carbon leading-tight mb-6">
              Donde cada <span className="text-primary">patita</span> importa
            </h1>
            <p className="text-carbon/60 text-lg md:text-xl mb-8">
              Ayudamos a reunitar mascotas con sus familias, conectamos amantes de los animales y apoyamos a los refugios de Argentina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25"
              >
                Unirme al Club
              </Link>
              <Link
                to="/mascotas-perdidas"
                className="bg-white text-carbon border-2 border-carbon/10 px-8 py-3 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition"
              >
                Ver Mascotas Perdidas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-carbon/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-nunito font-bold text-3xl md:text-4xl text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-carbon/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-carbon mb-4">
              Todo lo que necesitás para tu mascota
            </h2>
            <p className="text-carbon/60 max-w-2xl mx-auto">
              Una comunidad completa para dueños responsables. Encontrá, conectá y cuidá a tus mascotas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-carbon/5"
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-nunito font-bold text-xl text-carbon mb-2">
                  {feature.title}
                </h3>
                <p className="text-carbon/60 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-nunito font-bold text-3xl md:text-4xl text-white mb-4">
            ¿Tenés un negocio pet-friendly?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Unite a Club Patitas como partner. Mostrá tu negocio a miles de dueños de mascotas y ayudá a la comunidad.
          </p>
          <Link
            to="/register?role=business"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-semibold text-lg hover:bg-cream transition"
          >
            <Building2 className="w-5 h-5" />
            Registrar mi Negocio
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-nunito font-bold text-lg text-carbon mb-2">Verificación de Identidad</h3>
              <p className="text-carbon/60 text-sm">Todos los usuarios y refugios pasan por un proceso de verificación.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-nunito font-bold text-lg text-carbon mb-2">10% a Refugios</h3>
              <p className="text-carbon/60 text-sm">Un porcentaje de cada membresía y compra va directo a refugios.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-secondary/10 rounded-full mb-4">
                <Truck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-nunito font-bold text-lg text-carbon mb-2">Delivery en Argentina</h3>
              <p className="text-carbon/60 text-sm">Enviamos a todo el país. Gratis en compras superiores a $8,000.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
