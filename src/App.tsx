import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { LostPetsPage } from './pages/LostPetsPage'
import { TinderPage } from './pages/TinderPage'
import { ShopPage } from './pages/ShopPage'
import { DiscountsPage } from './pages/DiscountsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ChatPage } from './pages/ChatPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-cream font-inter">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/mascotas-perdidas" element={<LostPetsPage />} />
              <Route path="/tinder" element={<TinderPage />} />
              <Route path="/tienda" element={<ShopPage />} />
              <Route path="/descuentos" element={<DiscountsPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
