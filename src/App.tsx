import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BottomNav } from './components/layout/BottomNav'
import { Header } from './components/layout/Header'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { LostPetsPage } from './pages/LostPetsPage'
import { ReportPage } from './pages/ReportPage'
import { TinderPage } from './pages/TinderPage'
import { ShopPage } from './pages/ShopPage'
import { CartPage } from './pages/CartPage'
import { DiscountsPage } from './pages/DiscountsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ChatPage } from './pages/ChatPage'
import { MembershipPage } from './pages/MembershipPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { AchievementsPage } from './pages/AchievementsPage'
import { HealthCarnetPage } from './pages/HealthCarnetPage'
import { ValidatePage } from './pages/ValidatePage'
import { DonationsPage } from './pages/DonationsPage'
import { SheltersPage } from './pages/SheltersPage'
import { ShelterDetailPage } from './pages/ShelterDetailPage'
import { ErrorBoundary } from './components/ErrorBoundary'

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/login', '/register', '/onboarding'].includes(location.pathname)
  const isReportPage = location.pathname === '/reportar'

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-cream">
      {!isAuthPage && !isReportPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recuperar" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/mascotas-perdidas" element={<LostPetsPage />} />
          <Route path="/reportar" element={<ReportPage />} />
          <Route path="/tinder" element={<TinderPage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/descuentos" element={<DiscountsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/membresia" element={<MembershipPage />} />
          <Route path="/logros" element={<AchievementsPage />} />
          <Route path="/carnet-salud" element={<HealthCarnetPage />} />
          <Route path="/validar/:token" element={<ValidatePage />} />
          <Route path="/donaciones" element={<DonationsPage />} />
          <Route path="/refugios" element={<SheltersPage />} />
          <Route path="/refugios/:id" element={<ShelterDetailPage />} />
        </Routes>
      </main>
      {!isAuthPage && !isReportPage && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
