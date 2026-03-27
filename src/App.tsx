import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BottomNav } from './components/layout/BottomNav'
import { Header } from './components/layout/Header'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { LostPetsPage } from './pages/LostPetsPage'
import { TinderPage } from './pages/TinderPage'
import { ShopPage } from './pages/ShopPage'
import { CartPage } from './pages/CartPage'
import { DiscountsPage } from './pages/DiscountsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ChatPage } from './pages/ChatPage'
import { MembershipPage } from './pages/MembershipPage'

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? '' : 'pt-4'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mascotas-perdidas" element={<LostPetsPage />} />
          <Route path="/tinder" element={<TinderPage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/descuentos" element={<DiscountsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/membresia" element={<MembershipPage />} />
        </Routes>
      </main>
      {!isAuthPage && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}
