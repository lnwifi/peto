import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Store, Heart, PawPrint, Bell, LogOut, 
  ChevronRight, Map, MessageCircle, Save, X, 
  Plus, Trash2, Edit2
} from 'lucide-react'
import { Card, Badge, Button } from '../../components/ui'

interface Cause {
  id: string
  title: string
  description: string
  goal_amount: number
  current_amount: number
  image_url: string
  is_urgent: boolean
  expires_at: string
}

interface ShelterDashboardProps {
  onLogout?: () => void
}

export function ShelterDashboard({ onLogout }: ShelterDashboardProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'causes' | 'settings'>('overview')
  const [causes, setCauses] = useState<Cause[]>([
    { id: '1', title: 'Comida para 30 días', description: 'Necesitamos alimentos para 45 mascotas', goal_amount: 150000, current_amount: 87500, image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', is_urgent: true, expires_at: '2026-04-30' },
    { id: '2', title: 'Vacunas de emergencia', description: 'Vacunas para cachorros', goal_amount: 80000, current_amount: 20000, image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', is_urgent: false, expires_at: '2026-05-15' },
  ])
  const [editingCause, setEditingCause] = useState<Cause | null>(null)
  const [showCauseModal, setShowCauseModal] = useState(false)
  const [isEditingShelter, setIsEditingShelter] = useState(false)
  const [shelterData, setShelterData] = useState({
    name: 'Refugio Patitas',
    email: 'patitas@refugio.org',
    phone: '+5491112345678',
    description: 'Refugio sin fines de lucro. Ayudamos a mascotas abandonadas desde 2015.',
    logo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200',
    instagram_url: 'https://instagram.com/refugiopatitas',
    facebook_url: 'https://facebook.com/refugiopatitas',
    whatsapp_phone: '+5491112345678',
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getProgress = (current: number, goal: number) => {
    return Math.round((current / goal) * 100)
  }

  const saveCause = (cause: Cause) => {
    if (cause.id) {
      setCauses(prev => prev.map(c => c.id === cause.id ? cause : c))
    } else {
      setCauses(prev => [...prev, { ...cause, id: Date.now().toString(), current_amount: 0 }])
    }
    setShowCauseModal(false)
    setEditingCause(null)
  }

  const deleteCause = (id: string) => {
    setCauses(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-6" style={{ background: '#331B7E' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-bold text-2xl text-white">Mi Refugio</h1>
          <button onClick={() => navigate('/')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white">←</span>
          </button>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <img 
              src={shelterData.logo_url} 
              alt={shelterData.name}
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold text-lg text-carbon">{shelterData.name}</h2>
              <p className="text-sm text-carbon/60">{shelterData.email}</p>
            </div>
            <Badge variant="success">Activo</Badge>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PawPrint className="w-5 h-5 text-[#331B7E]" />
              <span className="text-xs text-carbon/60">Mascotas</span>
            </div>
            <p className="font-bold text-xl text-carbon">23</p>
            <p className="text-xs text-carbon/50">en adopción</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-xs text-carbon/60">Adopciones</span>
            </div>
            <p className="font-bold text-xl text-carbon">145</p>
            <p className="text-xs text-carbon/50">completadas</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview' as const, label: 'Resumen' },
            { id: 'profile' as const, label: 'Mi Perfil' },
            { id: 'causes' as const, label: 'Causas' },
            { id: 'settings' as const, label: 'Config' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeTab === tab.id ? 'text-white' : 'bg-white text-carbon/70 border border-carbon/10'
              }`}
              style={activeTab === tab.id ? { background: '#331B7E' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-carbon mb-3">Causas Activas</h3>
              <div className="space-y-3">
                {causes.slice(0, 3).map((cause) => (
                  <div key={cause.id} className="p-3 bg-carbon/5 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {cause.is_urgent && <Badge variant="error" size="sm">URGENTE</Badge>}
                        <span className="text-sm font-medium text-carbon">{cause.title}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: '#331B7E' }}>
                        {getProgress(cause.current_amount, cause.goal_amount)}%
                      </span>
                    </div>
                    <div className="h-2 bg-carbon/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%`, background: '#331B7E' }}
                      />
                    </div>
                    <p className="text-xs text-carbon/60 mt-1">
                      {formatPrice(cause.current_amount)} de {formatPrice(cause.goal_amount)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-carbon">Datos del Refugio</h3>
                <button 
                  onClick={() => setIsEditingShelter(!isEditingShelter)}
                  className="text-sm font-medium flex items-center gap-1"
                  style={{ color: '#331B7E' }}
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditingShelter ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              {isEditingShelter ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-carbon/70 mb-1 block">Nombre</label>
                    <input
                      type="text"
                      value={shelterData.name}
                      onChange={(e) => setShelterData({...shelterData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-carbon/70 mb-1 block">Descripción</label>
                    <textarea
                      value={shelterData.description}
                      onChange={(e) => setShelterData({...shelterData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
                    />
                  </div>
                  <Button onClick={() => setIsEditingShelter(false)} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-carbon/40" />
                    <span className="text-sm text-carbon">{shelterData.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-carbon/40" />
                    <span className="text-sm text-carbon">{shelterData.phone}</span>
                  </div>
                  <p className="text-sm text-carbon/70 mt-2">{shelterData.description}</p>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-carbon mb-3">Redes Sociales</h3>
              {isEditingShelter ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center text-pink-500">IG</div>
                    <input
                      type="text"
                      value={shelterData.instagram_url || ''}
                      onChange={(e) => setShelterData({...shelterData, instagram_url: e.target.value})}
                      className="flex-1 px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {shelterData.instagram_url && (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center text-pink-500">IG</div>
                      <span className="text-sm text-carbon">{shelterData.instagram_url}</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Causes Tab */}
        {activeTab === 'causes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-carbon">Causas de Donación</h3>
              <Button 
                size="sm"
                onClick={() => { setEditingCause(null as any); setShowCauseModal(true); }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Nueva
              </Button>
            </div>

            {causes.map((cause) => (
              <Card key={cause.id} className="p-4">
                <div className="flex gap-3 mb-3">
                  <img 
                    src={cause.image_url} 
                    alt={cause.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {cause.is_urgent && <Badge variant="error" size="sm">URGENTE</Badge>}
                          <h4 className="font-semibold text-carbon">{cause.title}</h4>
                        </div>
                        <p className="text-xs text-carbon/60 line-clamp-2">{cause.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-carbon/60">
                      {formatPrice(cause.current_amount)} donado
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#331B7E' }}>
                      {getProgress(cause.current_amount, cause.goal_amount)}%
                    </span>
                  </div>
                  <div className="h-3 bg-carbon/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ width: `${getProgress(cause.current_amount, cause.goal_amount)}%`, background: '#331B7E' }}
                    />
                  </div>
                  <p className="text-xs text-carbon/40 mt-1">
                    Meta: {formatPrice(cause.goal_amount)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingCause(cause); setShowCauseModal(true); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border border-carbon/10 rounded-lg hover:bg-carbon/5 transition text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button 
                    onClick={() => deleteCause(cause.id)}
                    className="flex items-center justify-center gap-1 py-2 px-4 border border-red-200 rounded-lg hover:bg-red-50 transition text-sm text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}

            {causes.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
                <p className="text-carbon/60">No tenés causas creadas</p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <Card className="divide-y divide-carbon/10">
              <button className="w-full flex items-center justify-between p-4 hover:bg-carbon/5 transition">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-carbon/60" />
                  <span className="text-carbon">Notificaciones</span>
                </div>
                <ChevronRight className="w-5 h-5 text-carbon/30" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-carbon/5 transition">
                <div className="flex items-center gap-3">
                  <Map className="w-5 h-5 text-carbon/60" />
                  <span className="text-carbon">Ubicación</span>
                </div>
                <ChevronRight className="w-5 h-5 text-carbon/30" />
              </button>
            </Card>

            <Card className="p-4">
              <button 
                onClick={onLogout || (() => navigate('/'))}
                className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-3 rounded-xl transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </Card>
          </div>
        )}
      </div>

      {/* Cause Modal */}
      {showCauseModal && (
        <CauseModal
          cause={editingCause}
          onSave={saveCause}
          onClose={() => { setShowCauseModal(false); setEditingCause(null); }}
        />
      )}
    </div>
  )
}

// Cause Modal Component
function CauseModal({ cause, onSave, onClose }: { cause: Cause | null, onSave: (c: Cause) => void, onClose: () => void }) {
  const [form, setForm] = useState(cause || {
    title: '',
    description: '',
    goal_amount: 50000,
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    is_urgent: false,
    expires_at: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form as Cause)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-carbon">
            {cause?.id ? 'Editar Causa' : 'Nueva Causa'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-carbon/10 rounded-full">
            <X className="w-5 h-5 text-carbon/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Título</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
              required
            />
          </div>
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
              required
            />
          </div>
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Meta ($ ARS)</label>
            <input
              type="number"
              value={form.goal_amount}
              onChange={(e) => setForm({...form, goal_amount: parseInt(e.target.value)})}
              min="1000"
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
              required
            />
          </div>
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">URL de imagen</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({...form, image_url: e.target.value})}
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
            />
          </div>
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Fecha de vencimiento</label>
            <input
              type="date"
              value={form.expires_at}
              onChange={(e) => setForm({...form, expires_at: e.target.value})}
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-[#331B7E]"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_urgent"
              checked={form.is_urgent}
              onChange={(e) => setForm({...form, is_urgent: e.target.checked})}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="is_urgent" className="text-sm text-carbon">Marcar como urgente</label>
          </div>
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Guardar Causa
          </Button>
        </form>
      </div>
    </div>
  )
}
