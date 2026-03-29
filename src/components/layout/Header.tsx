import { Link, useLocation } from 'react-router-dom'
import { Bell, Search, Plus } from 'lucide-react'

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
  
  const pageTitle = pageTitles[location.pathname] || 'PetoClub'
  const showPlusButton = ['/mascotas-perdidas'].includes(location.pathname)

  return (
    <header 
      className="sticky top-0 z-40 bg-white backdrop-blur-lg shadow-sm"
    >
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {pageTitle !== 'PetoClub' && location.pathname !== '/' && (
            <button 
              onClick={() => window.history.back()} 
              className="text-carbon-light hover:text-carbon transition"
            >
              ←
            </button>
          )}
          <img src="/logo.png" alt="PetoClub" className="h-8" />
          {pageTitle !== 'PetoClub' && (
            <h1 className="font-display font-bold text-xl text-carbon">
              {pageTitle}
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {showPlusButton && (
            <Link 
              to="/reportar"
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition hover:scale-105"
              style={{ background: '#F27131' }}
            >
              <Plus className="w-5 h-5 text-white" />
            </Link>
          )}
          <button className="w-9 h-9 rounded-full flex items-center justify-center bg-carbon/5 hover:bg-carbon/10 transition">
            <Search className="w-5 h-5 text-carbon-light" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center bg-carbon/5 hover:bg-carbon/10 transition relative">
            <Bell className="w-5 h-5 text-carbon-light" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#F27131' }} />
          </button>
        </div>
      </div>
    </header>
  )
}
