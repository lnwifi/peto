import { Link, useLocation } from 'react-router-dom'
import { Home, Map, Heart, ShoppingBag, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/mascotas-perdidas', icon: Map, label: 'Mascotas' },
  { path: '/tinder', icon: Heart, label: 'Match' },
  { path: '/tienda', icon: ShoppingBag, label: 'Tienda' },
  { path: '/perfil', icon: User, label: 'Perfil' },
]

export function BottomNav() {
  const location = useLocation()
  useAuth() // Will be used for auth checks later

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-carbon/10 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path !== '/' && location.pathname.startsWith(path))
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-carbon-light'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-primary/10' : ''
              }`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-primary' : ''}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
