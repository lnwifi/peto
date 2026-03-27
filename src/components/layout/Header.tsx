import { Link, useLocation } from 'react-router-dom'
import { Bell, Search, Plus } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const pageTitles: Record<string, string> = {
  '/': 'PetoClub',
  '/mascotas-perdidas': 'Mascotas',
  '/tinder': 'PetoMatch',
  '/tienda': 'Tienda',
  '/descuentos': 'Aliados',
  '/perfil': 'Mi Perfil',
  '/chat': 'Mensajes',
  '/carrito': 'Carrito',
  '/membresia': 'Membresía',
}

export function Header() {
  const location = useLocation()
  const { user } = useAuth()
  
  const pageTitle = pageTitles[location.pathname] || 'PetoClub'
  const showPlusButton = ['/mascotas-perdidas'].includes(location.pathname)

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-carbon/5">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {pageTitle !== 'PetoClub' && (
            <Link to="/" className="text-carbon-light hover:text-carbon transition mr-2">
              ←
            </Link>
          )}
          <h1 className="font-display font-bold text-xl text-carbon">
            {pageTitle}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showPlusButton && (
            <Link 
              to="/reportar"
              className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary-dark transition"
            >
              <Plus className="w-5 h-5" />
            </Link>
          )}
          <Link 
            to="/buscar"
            className="w-9 h-9 bg-carbon/5 rounded-full flex items-center justify-center hover:bg-carbon/10 transition"
          >
            <Search className="w-5 h-5 text-carbon-light" />
          </Link>
          {user && (
            <Link 
              to="/notificaciones"
              className="w-9 h-9 bg-carbon/5 rounded-full flex items-center justify-center hover:bg-carbon/10 transition relative"
            >
              <Bell className="w-5 h-5 text-carbon-light" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
