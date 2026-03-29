import { useState } from 'react'
import { Trophy, Check, Star, PawPrint } from 'lucide-react'

const achievements = [
  {
    id: 'first_steps',
    title: 'Primer Huellazo',
    description: 'Completaste tu perfil de dueño responsable',
    icon: '🐾',
    points: 50,
    unlocked: true,
    category: 'perfil',
  },
  {
    id: 'first_match',
    title: 'Match Perfeito',
    description: 'Hiciste match con otra mascota para un play date',
    icon: '💘',
    points: 100,
    unlocked: true,
    category: 'social',
  },
  {
    id: 'helper',
    title: 'Héroe de Patitas',
    description: 'Reportaste una mascota perdida para ayudar',
    icon: '🦮',
    points: 50,
    unlocked: true,
    category: 'reportes',
  },
  {
    id: 'reunited',
    title: 'Reunidor Feliz',
    description: 'Ayudaste a que una mascota vuelva a casa',
    icon: '🎉',
    points: 200,
    unlocked: false,
    category: 'reportes',
  },
  {
    id: 'shopper',
    title: 'Comprador VIP',
    description: 'Tu primera compra en la tienda',
    icon: '🛒',
    points: 50,
    unlocked: false,
    category: 'tienda',
  },
  {
    id: 'adopter',
    title: 'Familia Adoptiva',
    description: 'Te postulaste para adoptar un peludo',
    icon: '🏠',
    points: 150,
    unlocked: false,
    category: 'adopcion',
  },
  {
    id: 'social_butterfly',
    title: 'Amigo de los Peludos',
    description: 'Chateaste con 10 familias de mascotas',
    icon: '🦋',
    points: 100,
    unlocked: false,
    category: 'social',
  },
  {
    id: 'pet_lover',
    title: 'Pack Completo',
    description: 'Tenés 3 o más mascotas registradas',
    icon: '🐕‍🦺',
    points: 75,
    unlocked: false,
    category: 'perfil',
  },
  {
    id: 'member',
    title: 'Club PetoClub+',
    description: 'Te suscribiste a PetoClub+',
    icon: '⭐',
    points: 0,
    unlocked: false,
    category: 'especial',
  },
  {
    id: 'explorer',
    title: 'Explorador',
    description: 'Viste todas las mascotas perdidas de tu zona',
    icon: '🧭',
    points: 30,
    unlocked: false,
    category: 'reportes',
  },
  {
    id: 'super_like',
    title: 'Super Like',
    description: 'Diste 5 likes seguidos sin parar',
    icon: '🔥',
    points: 25,
    unlocked: false,
    category: 'social',
  },
  {
    id: 'foodie',
    title: 'Foodie de Mascotas',
    description: 'Compraste 10 productos de comida',
    icon: '🦴',
    points: 60,
    unlocked: false,
    category: 'tienda',
  },
]

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'perfil', label: 'Mi Perfil' },
  { id: 'social', label: 'Social' },
  { id: 'reportes', label: 'Reportes' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'adopcion', label: 'Adopción' },
  { id: 'especial', label: 'Especial' },
]

export function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'perfil' | 'social' | 'reportes' | 'tienda' | 'adopcion' | 'especial'>('all')

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === filter)

  return (
    <div className="min-h-screen pb-20">
      {/* Header - gradient replaced with solid */}
      <div 
        className="px-4 pt-6 pb-8 text-center"
        style={{ backgroundColor: '#331B7E' }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(255,207,92,0.2)' }}>
          <Trophy className="w-8 h-8" style={{ color: '#FFCF5C' }} />
        </div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Logros 🐾</h1>
        <p className="text-white/70 text-sm">Completá logros para ganar puntos</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6">
        <div 
          className="rounded-2xl p-4 shadow-lg"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Progress */}
            <div className="flex-1">
              <p className="text-xs text-carbon/60 mb-1">Progreso</p>
              <p className="font-bold text-lg" style={{ color: '#331B7E' }}>
                {unlockedCount}/{achievements.length}
              </p>
              <div className="h-2 mt-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(unlockedCount / achievements.length) * 100}%`,
                    backgroundColor: '#331B7E'
                  }}
                />
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-12" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
            
            {/* Points */}
            <div className="flex-shrink-0 text-center">
              <p className="text-xs text-carbon/60 mb-1">Puntos</p>
              <p className="font-bold text-xl" style={{ color: '#FFCF5C' }}>
                ⭐ {totalPoints}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter - horizontal scroll */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as typeof filter)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition"
              style={{
                background: filter === cat.id ? '#331B7E' : '#FFFFFF',
                color: filter === cat.id ? '#FFFFFF' : '#636E72',
                border: filter === cat.id ? 'none' : '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="rounded-2xl p-4 transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                border: achievement.unlocked 
                  ? '2px solid #FFCF5C' 
                  : '1px solid rgba(0,0,0,0.08)',
                opacity: achievement.unlocked ? 1 : 0.6,
              }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ 
                    background: achievement.unlocked ? '#FFF9E6' : '#F5F5F5',
                  }}
                >
                  {achievement.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-carbon truncate">
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#27AE60' }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-carbon/60 line-clamp-2">
                    {achievement.description}
                  </p>
                  
                  {/* Points Badge */}
                  {achievement.points > 0 && (
                    <div 
                      className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        background: achievement.unlocked ? '#331B7E' : '#F5F5F5',
                        color: achievement.unlocked ? '#FFFFFF' : '#636E72',
                      }}
                    >
                      <Star className="w-3 h-3" />
                      +{achievement.points}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="px-4 mt-8">
        <h2 className="font-display font-bold text-lg text-carbon mb-4 flex items-center gap-2">
          <PawPrint className="w-5 h-5" style={{ color: '#F27131' }} />
          ¿Cómo ganar puntos?
        </h2>
        <div 
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {[
            { icon: '📝', action: 'Completar tu perfil', points: '+50' },
            { icon: '📍', action: 'Reportar mascota perdida', points: '+50' },
            { icon: '💘', action: 'Hacer un match', points: '+100' },
            { icon: '🏠', action: 'Ayudar a reunir una mascota', points: '+200' },
            { icon: '🛒', action: 'Comprar en la tienda', points: '1/$100' },
            { icon: '❤️', action: 'Postularte para adoptar', points: '+150' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-carbon">{item.action}</span>
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ color: '#331B7E' }}
              >
                {item.points}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-8" />
    </div>
  )
}
