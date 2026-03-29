import { Link } from 'react-router-dom'
import { User, Menu, X, Heart, ShoppingBag, MapPin, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export function Navbar() {
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PetoClub" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/mascotas-perdidas" className="text-carbon/70 hover:text-primary flex items-center gap-1 transition">
              <MapPin className="w-4 h-4" />
              Perdidas
            </Link>
            <Link to="/tinder" className="text-carbon/70 hover:text-primary flex items-center gap-1 transition">
              <Heart className="w-4 h-4" />
              Tinder
            </Link>
            <Link to="/tienda" className="text-carbon/70 hover:text-primary flex items-center gap-1 transition">
              <ShoppingBag className="w-4 h-4" />
              Tienda
            </Link>
            <Link to="/descuentos" className="text-carbon/70 hover:text-primary flex items-center gap-1 transition">
              <span className="text-lg">🏷️</span>
              Descuentos
            </Link>
            {user && (
              <Link to="/chat" className="text-carbon/70 hover:text-primary flex items-center gap-1 transition">
                <MessageCircle className="w-4 h-4" />
                Chat
              </Link>
            )}
          </div>

          {/* User Area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/perfil" className="flex items-center gap-2 text-carbon/70 hover:text-primary transition">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.user_metadata?.full_name || user.email}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-carbon/50 hover:text-primary transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-carbon/70 hover:text-primary transition">
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobile} className="md:hidden p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/mascotas-perdidas" className="block text-carbon/70 hover:text-primary">🐾 Mascotas Perdidas</Link>
            <Link to="/tinder" className="block text-carbon/70 hover:text-primary">❤️ Tinder de Mascotas</Link>
            <Link to="/tienda" className="block text-carbon/70 hover:text-primary">🛒 Tienda</Link>
            <Link to="/descuentos" className="block text-carbon/70 hover:text-primary">🏷️ Descuentos</Link>
            {user && <Link to="/chat" className="block text-carbon/70 hover:text-primary">💬 Chat</Link>}
            {user ? (
              <>
                <Link to="/perfil" className="block text-carbon/70 hover:text-primary">👤 Mi Perfil</Link>
                <button onClick={() => signOut()} className="block text-carbon/50 hover:text-primary w-full text-left">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-carbon/70 hover:text-primary">Iniciar sesión</Link>
                <Link to="/register" className="block text-primary font-semibold">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
