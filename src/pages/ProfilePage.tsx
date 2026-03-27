import { User, PawPrint, MapPin, Star, Heart, ShoppingBag, LogOut, Settings, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export function ProfilePage() {
  const { user, signOut } = useAuth()

  // Mock data - replace with Supabase queries
  const mockStats = {
    points: 2450,
    lostPets: 3,
    adoptions: 1,
    purchases: 12,
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-carbon/20 mx-auto mb-4" />
          <p className="text-carbon/60 mb-4">Iniciá sesión para ver tu perfil</p>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-carbon/5">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-primary" />
              )}
            </div>
            <div>
              <h1 className="font-nunito font-bold text-2xl text-carbon">
                {user.user_metadata?.full_name || 'Usuario'}
              </h1>
              <p className="text-carbon/60 text-sm">{user.email}</p>
              <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full mt-2">
                <Star className="w-3 h-3" />
                {mockStats.points} puntos
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center border border-carbon/5">
            <div className="text-2xl font-bold text-primary">{mockStats.lostPets}</div>
            <div className="text-xs text-carbon/60">Reportes</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-carbon/5">
            <div className="text-2xl font-bold text-secondary">{mockStats.adoptions}</div>
            <div className="text-xs text-carbon/60">Adopciones</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-carbon/5">
            <div className="text-2xl font-bold text-accent">{mockStats.purchases}</div>
            <div className="text-xs text-carbon/60">Compras</div>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl border border-carbon/5 overflow-hidden">
          <Link to="/perfil/mascotas" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Mascotas</p>
              <p className="text-xs text-carbon/60">Agregar y gestionar tus mascotas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/mascotas-perdidas/mis-reportes" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Reportes</p>
              <p className="text-xs text-carbon/60">Mascotas perdidas/encontradas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/chat" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Matches</p>
              <p className="text-xs text-carbon/60">Chat con otros dueños</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/tienda/mis-pedidos" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Mis Pedidos</p>
              <p className="text-xs text-carbon/60">Historial de compras</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>

          <Link to="/configuracion" className="flex items-center gap-4 p-4 hover:bg-carbon/5 transition border-t border-carbon/5">
            <div className="w-10 h-10 bg-carbon/5 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-carbon/60" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-carbon">Configuración</p>
              <p className="text-xs text-carbon/60">Cuenta, notificaciones, privacidad</p>
            </div>
            <ChevronRight className="w-5 h-5 text-carbon/30" />
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
