import { useState } from 'react'
import { Users, PawPrint } from 'lucide-react'
import { Card } from '../components/ui'
import { BusinessDashboard } from './dashboards/BusinessDashboard'
import { ShelterDashboard } from './dashboards/ShelterDashboard'

type Role = 'business' | 'shelter' | 'admin'

export function DashboardPage() {
  const [role, setRole] = useState<Role>('business')

  // Mock admin stats
  const adminStats = {
    totalUsers: 12500,
    totalPets: 2340,
    totalBusinesses: 85,
    activeReports: 12,
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Role Selector - Only show in admin */}
      <div className="px-4 pt-6 pb-4" style={{ background: '#331B7E' }}>
        <h1 className="font-display font-bold text-2xl text-white mb-4">Dashboard</h1>
        
        {/* Role Selection Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'business' as Role, label: '🐾 Local' },
            { id: 'shelter' as Role, label: '🏠 Refugio' },
            { id: 'admin' as Role, label: '⭐ Admin' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                role === r.id
                  ? 'text-white'
                  : 'bg-white/20 text-white/80'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      {role === 'business' && <BusinessDashboard />}
      {role === 'shelter' && <ShelterDashboard />}
      
      {role === 'admin' && (
        <div className="px-4 py-6 space-y-4">
          <Card className="p-4">
            <h2 className="font-semibold text-carbon mb-4">Estadísticas Generales</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-cream rounded-xl">
                <Users className="w-8 h-8 text-[#331B7E] mx-auto mb-2" />
                <p className="text-2xl font-bold text-carbon">{adminStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-carbon/60">Usuarios</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <PawPrint className="w-8 h-8 text-[#331B7E] mx-auto mb-2" />
                <p className="text-2xl font-bold text-carbon">{adminStats.totalPets.toLocaleString()}</p>
                <p className="text-sm text-carbon/60">Mascotas</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <div className="w-8 h-8 bg-[#F27131] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🏪</span>
                </div>
                <p className="text-2xl font-bold text-carbon">{adminStats.totalBusinesses}</p>
                <p className="text-sm text-carbon/60">Negocios</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">!</span>
                </div>
                <p className="text-2xl font-bold text-carbon">{adminStats.activeReports}</p>
                <p className="text-sm text-carbon/60">Reportes</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-carbon mb-3">Acciones Rápidas</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-cream rounded-xl hover:bg-carbon/5 transition">
                <span className="text-carbon">Ver todos los usuarios</span>
              </button>
              <button className="w-full text-left p-3 bg-cream rounded-xl hover:bg-carbon/5 transition">
                <span className="text-carbon">Gestionar reportes</span>
              </button>
              <button className="w-full text-left p-3 bg-cream rounded-xl hover:bg-carbon/5 transition">
                <span className="text-carbon">Aprobar negocios pendientes</span>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
