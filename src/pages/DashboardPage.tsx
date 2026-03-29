import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Store, Heart, Shield, Users, Package, MapPin, Star, 
  TrendingUp, Eye, Edit2, Plus, Trash2, CheckCircle,
  DollarSign, ShoppingBag, Bell, Settings, LogOut,
  ChevronRight, PawPrint, Calendar, Map, Instagram,
  Facebook, Globe, MessageCircle, Save, X, Ticket,
  DollarSignIcon
} from 'lucide-react'
import { Card, Badge, Button } from '../components/ui'

type Role = 'business' | 'shelter' | 'admin'
type BusinessTab = 'overview' | 'profile' | 'discounts' | 'settings'
type AdminTab = 'overview' | 'reports' | 'users' | 'settings'
type ShelterTab = 'overview' | 'pets' | 'applications' | 'settings'

// Mock business data
const mockBusinessData = {
  id: '1',
  name: 'Veterinaria Huellitas',
  email: 'huellitas@petclub.com',
  phone: '+5491112345678',
  category: 'veterinaria',
  address: 'Av. Santa Fe 1234, Palermo',
  description: 'Veterinaria con más de 15 años de experiencia. Atención 24hs.',
  logo_url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=200',
  instagram_url: 'https://instagram.com/huellitas',
  facebook_url: 'https://facebook.com/huellitas',
  whatsapp_phone: '+5491112345678',
  website: 'https://huellitas.com.ar',
  rating: 4.8,
  totalSales: 245000,
  orders: 89,
  views: 1250,
  joinedDate: '2024-06-15',
}

// Mock discounts
const mockDiscounts = [
  { id: '1', title: '20% OFF en consultas', code: 'PATITAS20', discount_percent: 20, valid_until: '2026-04-30', is_active: true },
  { id: '2', title: '2x1 en vacunas', code: 'VACUNA2X1', discount_percent: 50, valid_until: '2026-05-15', is_active: true },
]

export function DashboardPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('business')
  const [businessTab, setBusinessTab] = useState<BusinessTab>('overview')
  const [adminTab, setAdminTab] = useState<AdminTab>('overview')
  const [shelterTab, setShelterTab] = useState<ShelterTab>('overview')
  
  // Business form state
  const [businessData, setBusinessData] = useState(mockBusinessData)
  const [discounts, setDiscounts] = useState(mockDiscounts)
  const [editingDiscount, setEditingDiscount] = useState<any>(null)
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Mock data
  const userData = {
    business: { ...businessData },
    shelter: {
      name: 'Refugio Patitas',
      email: 'patitas@refugio.org',
      pets: 23,
      adoptions: 145,
      pendingApplications: 8,
      joinedDate: '2024-03-20',
    },
    admin: {
      name: 'Administrador',
      email: 'admin@petclub.com',
      totalUsers: 12500,
      totalPets: 2340,
      totalBusinesses: 85,
      activeReports: 12,
    }
  }

  const currentUser = userData[role]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })
  }

  const saveBusinessProfile = () => {
    // TODO: Save to Supabase
    console.log('Saving business profile:', businessData)
    setIsEditingProfile(false)
  }

  const saveDiscount = (discount: any) => {
    if (discount.id) {
      setDiscounts(prev => prev.map(d => d.id === discount.id ? discount : d))
    } else {
      setDiscounts(prev => [...prev, { ...discount, id: Date.now().toString() }])
    }
    setShowDiscountModal(false)
    setEditingDiscount(null)
  }

  const deleteDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id))
  }

  // ========== BUSINESS DASHBOARD ==========
  if (role === 'business') {
    return (
      <div className="min-h-screen bg-cream pb-20">
        {/* Header */}
        <div 
          className="px-4 pt-6 pb-8"
          style={{ background: '#331B7E' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display font-bold text-2xl text-white">Mi Local</h1>
            <button 
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <span className="text-white">←</span>
            </button>
          </div>

          {/* User Info Card */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <img 
                src={businessData.logo_url} 
                alt={businessData.name}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg text-carbon">{businessData.name}</h2>
                <p className="text-sm text-carbon/60">{businessData.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium">{businessData.rating}</span>
                  <Badge variant="success" size="sm" className="ml-2">Activo</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="px-4 -mt-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSignIcon className="w-5 h-5 text-green-500" />
                <span className="text-xs text-carbon/60">Ventas</span>
              </div>
              <p className="font-bold text-xl text-carbon">{formatPrice(businessData.totalSales)}</p>
              <p className="text-xs text-carbon/50">{businessData.orders} pedidos</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-carbon/60">Vistas</span>
              </div>
              <p className="font-bold text-xl text-carbon">{businessData.views}</p>
              <p className="text-xs text-carbon/50">este mes</p>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview' as BusinessTab, label: 'Resumen' },
              { id: 'profile' as BusinessTab, label: 'Mi Perfil' },
              { id: 'discounts' as BusinessTab, label: 'Cupones' },
              { id: 'settings' as BusinessTab, label: 'Config' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBusinessTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  businessTab === tab.id
                    ? 'text-white'
                    : 'bg-white text-carbon/70 border border-carbon/10'
                }`}
                style={businessTab === tab.id ? { background: '#331B7E' } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4">
          {/* Overview Tab */}
          {businessTab === 'overview' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-carbon mb-3">Actividad Reciente</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-carbon">Nuevo pedido recibido</p>
                      <p className="text-xs text-carbon/50">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-carbon">Tu perfil fue visto 12 veces</p>
                      <p className="text-xs text-carbon/50">Hace 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-carbon">Nueva reseña de 5 estrellas</p>
                      <p className="text-xs text-carbon/50">Hace 3 horas</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-carbon mb-3">Cupones Activos</h3>
                <div className="space-y-2">
                  {discounts.filter(d => d.is_active).map((discount) => (
                    <div key={discount.id} className="flex items-center justify-between p-3 bg-carbon/5 rounded-xl">
                      <div>
                        <p className="font-medium text-carbon text-sm">{discount.title}</p>
                        <p className="text-xs text-carbon/60">Code: {discount.code}</p>
                      </div>
                      <Badge variant="primary">-{discount.discount_percent}%</Badge>
                    </div>
                  ))}
                  {discounts.filter(d => d.is_active).length === 0 && (
                    <p className="text-sm text-carbon/60 text-center py-4">
                      No tenés cupones activos. Creá uno para aparecer en la app.
                    </p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {businessTab === 'profile' && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-carbon">Datos del Local</h3>
                  <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: '#331B7E' }}
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditingProfile ? 'Cancelar' : 'Editar'}
                  </button>
                </div>

                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-carbon/70 mb-1 block">Nombre</label>
                      <input
                        type="text"
                        value={businessData.name}
                        onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-carbon/70 mb-1 block">Descripción</label>
                      <textarea
                        value={businessData.description}
                        onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-carbon/70 mb-1 block">Dirección</label>
                      <input
                        type="text"
                        value={businessData.address}
                        onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                        className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-carbon/70 mb-1 block">Teléfono</label>
                      <input
                        type="text"
                        value={businessData.phone}
                        onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-carbon/70 mb-1 block">Logo URL</label>
                      <input
                        type="text"
                        value={businessData.logo_url}
                        onChange={(e) => setBusinessData({...businessData, logo_url: e.target.value})}
                        className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <Button onClick={saveBusinessProfile} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-carbon/40" />
                      <span className="text-sm text-carbon">{businessData.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-carbon/40" />
                      <span className="text-sm text-carbon">{businessData.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-carbon/40" />
                      <span className="text-sm text-carbon">{businessData.phone}</span>
                    </div>
                    <p className="text-sm text-carbon/70 mt-2">{businessData.description}</p>
                  </div>
                )}
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-carbon mb-3">Redes Sociales</h3>
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <input
                        type="text"
                        placeholder="Instagram URL"
                        value={businessData.instagram_url || ''}
                        onChange={(e) => setBusinessData({...businessData, instagram_url: e.target.value})}
                        className="flex-1 px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <input
                        type="text"
                        placeholder="Facebook URL"
                        value={businessData.facebook_url || ''}
                        onChange={(e) => setBusinessData({...businessData, facebook_url: e.target.value})}
                        className="flex-1 px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <input
                        type="text"
                        placeholder="WhatsApp"
                        value={businessData.whatsapp_phone || ''}
                        onChange={(e) => setBusinessData({...businessData, whatsapp_phone: e.target.value})}
                        className="flex-1 px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-carbon/60" />
                      <input
                        type="text"
                        placeholder="Website"
                        value={businessData.website || ''}
                        onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                        className="flex-1 px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {businessData.instagram_url && (
                      <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-pink-500" />
                        <span className="text-sm text-carbon">{businessData.instagram_url}</span>
                      </div>
                    )}
                    {businessData.facebook_url && (
                      <div className="flex items-center gap-3">
                        <Facebook className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-carbon">{businessData.facebook_url}</span>
                      </div>
                    )}
                    {businessData.whatsapp_phone && (
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-carbon">{businessData.whatsapp_phone}</span>
                      </div>
                    )}
                    {businessData.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-carbon/60" />
                        <span className="text-sm text-carbon">{businessData.website}</span>
                      </div>
                    )}
                    {!businessData.instagram_url && !businessData.facebook_url && 
                     !businessData.whatsapp_phone && !businessData.website && (
                      <p className="text-sm text-carbon/60">No hay redes configuradas</p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Discounts Tab */}
          {businessTab === 'discounts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-carbon">Mis Cupones</h3>
                <Button 
                  size="sm"
                  onClick={() => { setEditingDiscount({}); setShowDiscountModal(true); }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nuevo
                </Button>
              </div>

              <p className="text-sm text-carbon/60">
                Tu local aparece en la app solo si tenés al menos 1 cupón activo.
              </p>

              {discounts.map((discount) => (
                <Card key={discount.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-carbon">{discount.title}</h4>
                        <Badge variant={discount.is_active ? 'success' : 'default'} size="sm">
                          {discount.is_active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-carbon/60">Code: {discount.code}</p>
                      <p className="text-sm text-carbon/60">Hasta: {formatDate(discount.valid_until)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: '#331B7E' }}>
                        -{discount.discount_percent}%
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => { setEditingDiscount(discount); setShowDiscountModal(true); }}
                          className="p-2 hover:bg-carbon/10 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4 text-carbon/60" />
                        </button>
                        <button 
                          onClick={() => deleteDiscount(discount.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {discounts.length === 0 && (
                <div className="text-center py-12">
                  <Ticket className="w-12 h-12 text-carbon/20 mx-auto mb-3" />
                  <p className="text-carbon/60">No tenés cupones creados</p>
                  <p className="text-sm text-carbon/40">Creá uno para que tu local aparezca en la app</p>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {businessTab === 'settings' && (
            <div className="space-y-4">
              <Card className="divide-y divide-carbon/10">
                <button className="w-full flex items-center justify-between p-4 hover:bg-carbon/5 transition">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-carbon/60" />
                    <span className="text-carbon">Configuración</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-carbon/30" />
                </button>
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
                <button className="w-full flex items-center justify-between p-4 hover:bg-carbon/5 transition">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-carbon/60" />
                    <span className="text-carbon">Horarios</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-carbon/30" />
                </button>
              </Card>

              <Card className="p-4">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-3 rounded-xl transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </Card>

              <p className="text-center text-xs text-carbon/40">
                Miembro desde {formatDate(businessData.joinedDate)}
              </p>
            </div>
          )}
        </div>

        {/* Discount Modal */}
        {showDiscountModal && (
          <DiscountModal
            discount={editingDiscount}
            onSave={saveDiscount}
            onClose={() => { setShowDiscountModal(false); setEditingDiscount(null); }}
          />
        )}

        <div className="h-8" />
      </div>
    )
  }

  // ========== SHELTER DASHBOARD ==========
  if (role === 'shelter') {
    return (
      <div className="min-h-screen bg-cream pb-20">
        <div className="px-4 pt-6 pb-8" style={{ background: '#331B7E' }}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display font-bold text-2xl text-white">Refugio</h1>
            <button onClick={() => navigate('/')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white">←</span>
            </button>
          </div>
        </div>

        <div className="px-4 -mt-4 mb-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(51,27,126,0.1)' }}>
                🐾
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg text-carbon">{currentUser.name}</h2>
                <p className="text-sm text-carbon/60">{currentUser.email}</p>
              </div>
              <Badge variant="success">Activo</Badge>
            </div>
          </Card>
        </div>

        <div className="px-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <PawPrint className="w-5 h-5 text-primary" />
                <span className="text-xs text-carbon/60">Mascotas</span>
              </div>
              <p className="font-bold text-xl text-carbon">{currentUser.pets}</p>
              <p className="text-xs text-carbon/50">en adopción</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-xs text-carbon/60">Adopciones</span>
              </div>
              <p className="font-bold text-xl text-carbon">{currentUser.adoptions}</p>
              <p className="text-xs text-carbon/50">completadas</p>
            </Card>
          </div>
        </div>

        <div className="px-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-carbon mb-3">Solicitudes Pendientes</h3>
            <p className="text-sm text-carbon/60">{currentUser.pendingApplications} solicitudes esperando revisión</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== ADMIN DASHBOARD ==========
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="px-4 pt-6 pb-8" style={{ background: '#331B7E' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-bold text-2xl text-white">Admin</h1>
          <button onClick={() => navigate('/')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white">←</span>
          </button>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs text-carbon/60">Usuarios</span>
            </div>
            <p className="font-bold text-xl text-carbon">{currentUser.totalUsers.toLocaleString()}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PawPrint className="w-5 h-5 text-secondary" />
              <span className="text-xs text-carbon/60">Mascotas</span>
            </div>
            <p className="font-bold text-xl text-carbon">{currentUser.totalPets}</p>
          </Card>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold text-carbon">Reportes Activos</h3>
          <p className="text-sm text-carbon/60 mt-1">{currentUser.activeReports} reportes pendientes</p>
        </Card>
      </div>
    </div>
  )
}

// Discount Modal Component
function DiscountModal({ discount, onSave, onClose }: { discount: any, onSave: (d: any) => void, onClose: () => void }) {
  const [form, setForm] = useState(discount || {
    title: '',
    code: '',
    discount_percent: 10,
    valid_until: '',
    is_active: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-carbon">
            {discount?.id ? 'Editar Cupón' : 'Nuevo Cupón'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-carbon/10 rounded-full">
            <X className="w-5 h-5 text-carbon/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Título del descuento</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              placeholder="20% OFF en consultas"
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Código</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({...form, code: e.target.value.toUpperCase()})}
              placeholder="PATITAS20"
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Porcentaje (%)</label>
            <input
              type="number"
              value={form.discount_percent}
              onChange={(e) => setForm({...form, discount_percent: parseInt(e.target.value)})}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-carbon/70 mb-1 block">Válido hasta</label>
            <input
              type="date"
              value={form.valid_until}
              onChange={(e) => setForm({...form, valid_until: e.target.value})}
              className="w-full px-3 py-2 border border-carbon/20 rounded-xl text-sm focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={(e) => setForm({...form, is_active: e.target.checked})}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="is_active" className="text-sm text-carbon">Cupón activo</label>
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cupón
          </Button>
        </form>
      </div>
    </div>
  )
}
