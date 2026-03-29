import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Shield, Calendar, Bell, Plus, Star,
  Pill, Syringe, Stethoscope, Scale, CalendarDays
} from 'lucide-react'

interface Vaccine {
  id: string
  name: string
  date: string
  nextDue: string
  veterinarian: string
}

interface Deworming {
  id: string
  date: string
  nextDue: string
  product: string
}

interface VetVisit {
  id: string
  date: string
  reason: string
  veterinarian: string
  notes: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string
}

interface WeightEntry {
  id: string
  date: string
  weight: number
}

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  birthDate: string
  photo: string
  vaccines: Vaccine[]
  dewormings: Deworming[]
  vetVisits: VetVisit[]
  medications: Medication[]
  weightHistory: WeightEntry[]
}

type Tab = 'vaccines' | 'deworming' | 'visits' | 'medications' | 'weight' | 'reminders'

const reminders = [
  { id: '1', pet: 'Luna', type: 'Vacuna', name: 'Rabia', date: '2026-04-15', icon: '💉' },
  { id: '2', pet: 'Luna', type: 'Desparasitación', name: 'Nexgard', date: '2026-04-20', icon: '🛡️' },
  { id: '3', pet: 'Michi', type: 'Vacuna', name: 'Triple Felina', date: '2026-04-10', icon: '💉' },
]

export function HealthCarnetPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('vaccines')

  const [pets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Luna',
      species: 'perro',
      breed: 'Golden Retriever',
      birthDate: '2024-03-15',
      photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200',
      vaccines: [
        { id: 'v1', name: 'Rabia', date: '2026-01-15', nextDue: '2026-04-15', veterinarian: 'Dr. García' },
        { id: 'v2', name: 'Séxtuple', date: '2026-01-15', nextDue: '2026-07-15', veterinarian: 'Dr. García' },
      ],
      dewormings: [
        { id: 'd1', date: '2026-03-01', nextDue: '2026-04-01', product: 'Nexgard' },
      ],
      vetVisits: [
        { id: 'vs1', date: '2026-02-20', reason: 'Control anual', veterinarian: 'Dr. García', notes: 'Todo OK' },
      ],
      medications: [
        { id: 'm1', name: 'Antiparasitario', dosage: '1 pastilla', frequency: 'Mensual', startDate: '2026-03-01', endDate: '2026-12-31' },
      ],
      weightHistory: [
        { id: 'w1', date: '2026-03-01', weight: 25.5 },
        { id: 'w2', date: '2026-02-01', weight: 24.8 },
        { id: 'w3', date: '2026-01-01', weight: 23.5 },
      ],
    },
    {
      id: '2',
      name: 'Michi',
      species: 'gato',
      breed: 'Siamés',
      birthDate: '2025-06-20',
      photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
      vaccines: [
        { id: 'v3', name: 'Triple Felina', date: '2026-02-10', nextDue: '2026-04-10', veterinarian: 'Dra. López' },
      ],
      dewormings: [],
      vetVisits: [],
      medications: [],
      weightHistory: [
        { id: 'w4', date: '2026-03-01', weight: 4.2 },
      ],
    },
  ])

  const [selectedPet, setSelectedPet] = useState(pets[0])

  const tabs = [
    { id: 'vaccines' as Tab, label: 'Vacunas', icon: Syringe },
    { id: 'deworming' as Tab, label: 'Desparasitación', icon: Shield },
    { id: 'visits' as Tab, label: 'Visitas', icon: Stethoscope },
    { id: 'medications' as Tab, label: 'Medicamentos', icon: Pill },
    { id: 'weight' as Tab, label: 'Peso', icon: Scale },
    { id: 'reminders' as Tab, label: 'Recordatorios', icon: Bell },
  ]

  const isUpcoming = (date: string) => {
    const dueDate = new Date(date)
    const today = new Date()
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 30
  }

  const isOverdue = (date: string) => {
    const dueDate = new Date(date)
    const today = new Date()
    return dueDate < today
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getDaysUntil = (date: string) => {
    const dueDate = new Date(date)
    const today = new Date()
    return Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div 
        className="px-4 pt-6 pb-6"
        style={{ backgroundColor: '#331B7E' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/perfil')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
            >
              ←
            </button>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-white">Carnet de Salud</h1>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: '#FFCF5C', color: '#331B7E' }}
          >
            ⭐ PRO
          </span>
        </div>

        {/* Pet Selector - Horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition ${
                selectedPet.id === pet.id 
                  ? 'bg-white' 
                  : 'bg-white/20 text-white'
              }`}
            >
              <span className="text-lg">{pet.species === 'perro' ? '🐕' : '🐱'}</span>
              <span className="font-medium text-sm">{pet.name}</span>
            </button>
          ))}
          <button 
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pet Info Card */}
      <div className="px-4 -mt-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img 
              src={selectedPet.photo} 
              alt={selectedPet.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg sm:text-xl text-carbon truncate">{selectedPet.name}</h2>
              <p className="text-sm text-carbon/60 truncate">{selectedPet.breed}</p>
              <p className="text-xs text-carbon/50 mt-1">
                Nacido: {formatDate(selectedPet.birthDate)}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div 
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: '#27AE60' }}
              >
                Al día ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Horizontal scroll */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'bg-white text-carbon/70 border border-carbon/10'
              }`}
              style={activeTab === tab.id ? { backgroundColor: '#331B7E' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Vaccines Tab */}
        {activeTab === 'vaccines' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Vacunas registradas</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
            
            {selectedPet.vaccines.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Syringe className="w-12 h-12 mx-auto mb-2 text-carbon/20" />
                <p className="text-carbon/60">No hay vacunas registradas</p>
              </div>
            ) : (
              selectedPet.vaccines.map((vaccine) => (
                <div 
                  key={vaccine.id}
                  className={`bg-white rounded-xl p-4 border-l-4 ${
                    isOverdue(vaccine.nextDue) 
                      ? 'border-l-red-500' 
                      : isUpcoming(vaccine.nextDue)
                        ? 'border-l-amber-400'
                        : 'border-l-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-carbon truncate">{vaccine.name}</h4>
                      <p className="text-sm text-carbon/60">Dr. {vaccine.veterinarian}</p>
                      <p className="text-xs text-carbon/40 mt-1">Aplicada: {formatDate(vaccine.date)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {isOverdue(vaccine.nextDue) ? (
                        <span className="text-xs font-semibold text-red-500">
                          VENCIDA
                        </span>
                      ) : isUpcoming(vaccine.nextDue) ? (
                        <span className="text-xs font-semibold text-amber-500">
                          En {getDaysUntil(vaccine.nextDue)} días
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-green-500">✓ Al día</span>
                      )}
                      <p className="text-xs text-carbon/50 mt-1">
                        {formatDate(vaccine.nextDue)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Deworming Tab */}
        {activeTab === 'deworming' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Desparasitaciones</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
            
            {selectedPet.dewormings.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Shield className="w-12 h-12 mx-auto mb-2 text-carbon/20" />
                <p className="text-carbon/60">No hay registros</p>
              </div>
            ) : (
              selectedPet.dewormings.map((deworm) => (
                <div 
                  key={deworm.id}
                  className={`bg-white rounded-xl p-4 border-l-4 ${
                    isOverdue(deworm.nextDue) 
                      ? 'border-l-red-500' 
                      : isUpcoming(deworm.nextDue)
                        ? 'border-l-amber-400'
                        : 'border-l-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-carbon">{deworm.product}</h4>
                      <p className="text-xs text-carbon/50 mt-1">
                        Aplicada: {formatDate(deworm.date)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {isOverdue(deworm.nextDue) ? (
                        <span className="text-xs font-semibold text-red-500">VENCIDA</span>
                      ) : isUpcoming(deworm.nextDue) ? (
                        <span className="text-xs font-semibold text-amber-500">
                          En {getDaysUntil(deworm.nextDue)} días
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-green-500">✓ Al día</span>
                      )}
                      <p className="text-xs text-carbon/50 mt-1">
                        {formatDate(deworm.nextDue)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Vet Visits Tab */}
        {activeTab === 'visits' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Visitas al veterinario</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
            
            {selectedPet.vetVisits.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Stethoscope className="w-12 h-12 mx-auto mb-2 text-carbon/20" />
                <p className="text-carbon/60">No hay visitas registradas</p>
              </div>
            ) : (
              selectedPet.vetVisits.map((visit) => (
                <div key={visit.id} className="bg-white rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-carbon">{visit.reason}</h4>
                      <p className="text-sm text-carbon/60">Dr. {visit.veterinarian}</p>
                      {visit.notes && (
                        <p className="text-xs text-carbon/50 mt-1 italic">"{visit.notes}"</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Calendar className="w-4 h-4 text-carbon/30 mb-1 ml-auto" />
                      <p className="text-xs text-carbon/50">{formatDate(visit.date)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Medicamentos activos</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
            
            {selectedPet.medications.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Pill className="w-12 h-12 mx-auto mb-2 text-carbon/20" />
                <p className="text-carbon/60">No hay medicamentos activos</p>
              </div>
            ) : (
              selectedPet.medications.map((med) => (
                <div key={med.id} className="bg-white rounded-xl p-4 border-l-4 border-l-blue-500">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-carbon">{med.name}</h4>
                      <p className="text-sm text-carbon/60">{med.dosage} - {med.frequency}</p>
                      <p className="text-xs text-carbon/50 mt-1">
                        {formatDate(med.startDate)} hasta {formatDate(med.endDate)}
                      </p>
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0"
                    >
                      Activo
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Weight Tab */}
        {activeTab === 'weight' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Historial de peso</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
              </button>
            </div>
            
            {selectedPet.weightHistory.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Scale className="w-12 h-12 mx-auto mb-2 text-carbon/20" />
                <p className="text-carbon/60">No hay registros de peso</p>
              </div>
            ) : (
              <>
                {/* Weight Chart */}
                <div className="bg-white rounded-xl p-4 mb-4">
                  <div className="flex items-end justify-center gap-3 h-32">
                    {selectedPet.weightHistory.slice().reverse().map((entry, i) => {
                      const weights = selectedPet.weightHistory.map(w => w.weight)
                      const maxWeight = Math.max(...weights)
                      const minWeight = Math.min(...weights)
                      const range = maxWeight - minWeight || 1
                      const height = ((entry.weight - minWeight) / range) * 80 + 20
                      return (
                        <div key={entry.id} className="flex flex-col items-center gap-1">
                          <span className="text-xs font-medium text-carbon">{entry.weight}kg</span>
                          <div 
                            className="w-10 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              backgroundColor: '#331B7E',
                              opacity: 0.4 + (i * 0.2)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-center text-sm text-carbon/60 mt-3">
                    Peso actual: <strong>{selectedPet.weightHistory[selectedPet.weightHistory.length - 1].weight} kg</strong>
                  </p>
                </div>

                {/* Weight History */}
                {selectedPet.weightHistory.slice().reverse().map((entry) => (
                  <div key={entry.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(51,27,126,0.1)' }}
                      >
                        <Scale className="w-5 h-5" style={{ color: '#331B7E' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-carbon">{entry.weight} kg</p>
                        <p className="text-xs text-carbon/50">{formatDate(entry.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-carbon">Próximos recordatorios</h3>
              <button 
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#331B7E' }}
              >
                <Bell className="w-4 h-4" /> <span className="hidden sm:inline">Ver todos</span>
              </button>
            </div>
            
            {reminders.map((reminder) => (
              <div 
                key={reminder.id}
                className={`bg-white rounded-xl p-4 ${isUpcoming(reminder.date) ? 'border border-amber-200' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: 'rgba(51,27,126,0.1)' }}
                  >
                    {reminder.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-carbon truncate">{reminder.name}</h4>
                    <p className="text-sm text-carbon/60">{reminder.type} • {reminder.pet}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium" style={{ color: '#331B7E' }}>
                      {formatDate(reminder.date)}
                    </p>
                    <p className="text-xs text-carbon/50">
                      En {getDaysUntil(reminder.date)} días
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#27AE60' }}>
                    ✓ Listo
                  </button>
                  <button className="flex-1 py-2 rounded-lg text-sm font-medium bg-carbon/5 text-carbon">
                    🔔 Recordar
                  </button>
                </div>
              </div>
            ))}

            {/* Notification Settings */}
            <div className="mt-6">
              <h3 className="font-semibold text-carbon mb-3">Configuración</h3>
              <div className="bg-white rounded-xl divide-y divide-carbon/5">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <span className="text-carbon">Notificaciones push</span>
                  </div>
                  <div 
                    className="w-12 h-6 rounded-full relative cursor-pointer"
                    style={{ backgroundColor: '#331B7E' }}
                  >
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-carbon">7 días antes</span>
                  </div>
                  <div 
                    className="w-12 h-6 rounded-full relative cursor-pointer"
                    style={{ backgroundColor: '#331B7E' }}
                  >
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <span className="text-carbon">1 día antes</span>
                  </div>
                  <div 
                    className="w-12 h-6 rounded-full relative cursor-pointer"
                    style={{ backgroundColor: '#331B7E' }}
                  >
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium CTA */}
      <div className="px-4 mt-6">
        <div 
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, #331B7E 0%, #4A2BAD 100%)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,207,92,0.2)' }}
            >
              <Star className="w-7 h-7" style={{ color: '#FFCF5C' }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-white text-lg">¿No tienes PetoClub+?</h3>
              <p className="text-sm text-white/80">Activa el carnet digital con recordatorios automáticos</p>
            </div>
            <button 
              className="px-6 py-3 rounded-xl font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: '#FFCF5C', color: '#331B7E' }}
              onClick={() => navigate('/membresia')}
            >
              Activar
            </button>
          </div>
        </div>
      </div>

      <div className="h-8" />
    </div>
  )
}
