import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PawPrint, MapPin, Camera, ChevronRight, ChevronLeft } from 'lucide-react'

interface OnboardingData {
  name: string
  email: string
  location: { lat: number; lng: number; address: string }
  pets: {
    name: string
    species: 'perro' | 'gato' | 'otro'
    breed: string
    photo: string
  }[]
}

const STORAGE_KEY = 'petoclub_onboarding'

const steps = [
  { id: 1, title: '¡Bienvenido!', subtitle: 'Creemos tu cuenta' },
  { id: 2, title: 'Tu ubicación', subtitle: 'Para mostrarte mascotas cercanas' },
  { id: 3, title: 'Tus mascotas', subtitle: 'Agregá uno o más peludos' },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    name: '',
    email: '',
    location: { lat: -31.5311, lng: -68.5366, address: '' },
    pets: [],
  })
  const [newPet, setNewPet] = useState<{ name: string; species: 'perro' | 'gato' | 'otro'; breed: string; photo: string }>({ name: '', species: 'perro', breed: '', photo: '' })

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.completed) {
        navigate('/')
      }
    }
  }, [navigate])

  const saveProgress = (newData: Partial<OnboardingData>) => {
    const updated = { ...data, ...newData }
    setData(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, completed: true }))
      localStorage.setItem('petoclub_user', JSON.stringify({
        name: data.name,
        email: data.email,
        pets: data.pets,
        points: 100, // Welcome bonus
        badges: ['first_step'],
        memberSince: new Date().toISOString(),
      }))
      navigate('/')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          saveProgress({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
            }
          })
        },
        () => {
          // Fallback to San Juan
          saveProgress({
            location: { lat: -31.5311, lng: -68.5366, address: 'San Juan, Argentina' }
          })
        }
      )
    }
  }

  const addPet = () => {
    if (newPet.name && newPet.species) {
      saveProgress({
        pets: [...data.pets, { ...newPet }]
      })
      setNewPet({ name: '', species: 'perro', breed: '', photo: '' })
    }
  }

  const removePet = (index: number) => {
    saveProgress({
      pets: data.pets.filter((_, i) => i !== index)
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewPet(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center gap-2">
              <div 
                className="flex-1 h-1 rounded-full transition-all"
                style={{ 
                  background: index < currentStep ? '#331B7E' : 'rgba(0,0,0,0.1)',
                  opacity: index < currentStep ? 1 : 0.3
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span 
              key={step.id}
              className="text-xs"
              style={{ color: step.id === currentStep ? '#331B7E' : '#636E72' }}
            >
              {step.id}/3
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4">
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center pt-8">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: '#331B7E' }}
              >
                <PawPrint className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display font-bold text-2xl text-carbon mb-2">¡Bienvenido a PetoClub!</h1>
              <p className="text-carbon/60">Creemos tu cuenta en 3 simples pasos</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-carbon mb-2">Tu nombre</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => saveProgress({ name: e.target.value })}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-carbon mb-2">Tu email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => saveProgress({ email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center pt-8">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: '#331B7E' }}
              >
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display font-bold text-2xl text-carbon mb-2">Tu ubicación</h1>
              <p className="text-carbon/60">Para mostrarte mascotas perdidas y aliaddos cercanos</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-carbon/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-carbon">Ubicación actual</p>
                  <p className="text-sm text-carbon/60">
                    {data.location.address || 'No configurada'}
                  </p>
                </div>
                <button
                  onClick={getLocation}
                  className="px-4 py-2 rounded-xl text-white text-sm font-medium"
                  style={{ background: '#331B7E' }}
                >
                  {data.location.address ? 'Actualizar' : 'Obtener'}
                </button>
              </div>
              
              {/* Mini map placeholder */}
              <div className="h-40 bg-carbon/5 rounded-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-carbon/20" />
                <span className="ml-2 text-carbon/40 text-sm">Mapa de ubicación</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-carbon/70">
                🔒 Tu ubicación solo se usa para mostrarte contenido cercano. Nunca compartimos tu ubicación con terceros.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Pets */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center pt-4">
              <h1 className="font-display font-bold text-2xl text-carbon mb-2">Tus mascotas</h1>
              <p className="text-carbon/60">Agregá uno o más peludos (opcional, pero recomendado)</p>
            </div>

            {/* Added Pets */}
            {data.pets.length > 0 && (
              <div className="space-y-3">
                <p className="font-medium text-carbon">Mascotas agregadas:</p>
                {data.pets.map((pet, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-carbon/10">
                    {pet.photo ? (
                      <img src={pet.photo} alt={pet.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-carbon">{pet.name}</p>
                      <p className="text-xs text-carbon/60">{pet.breed || pet.species}</p>
                    </div>
                    <button
                      onClick={() => removePet(index)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Pet */}
            <div className="bg-white rounded-2xl p-4 border border-carbon/10">
              <p className="font-medium text-carbon mb-4">Agregar mascota:</p>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewPet(prev => ({ ...prev, species: 'perro' }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                      newPet.species === 'perro' ? 'bg-primary text-white' : 'bg-carbon/5'
                    }`}
                  >
                    🐕 Perro
                  </button>
                  <button
                    onClick={() => setNewPet(prev => ({ ...prev, species: 'gato' as 'perro' | 'gato' | 'otro' }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                      newPet.species === 'gato' ? 'bg-primary text-white' : 'bg-carbon/5'
                    }`}
                  >
                    🐱 Gato
                  </button>
                  <button
                    onClick={() => setNewPet(prev => ({ ...prev, species: 'otro' as 'perro' | 'gato' | 'otro' }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                      newPet.species === 'otro' ? 'bg-primary text-white' : 'bg-carbon/5'
                    }`}
                  >
                    🐾 Otro
                  </button>
                </div>

                <input
                  type="text"
                  value={newPet.name}
                  onChange={(e) => setNewPet(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre de tu mascota"
                  className="w-full px-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
                />

                <input
                  type="text"
                  value={newPet.breed}
                  onChange={(e) => setNewPet(prev => ({ ...prev, breed: e.target.value }))}
                  placeholder="Raza (opcional)"
                  className="w-full px-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
                />

                <label className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-carbon/20 rounded-xl cursor-pointer hover:border-primary transition">
                  <Camera className="w-5 h-5 text-carbon/40" />
                  <span className="text-sm text-carbon/60">
                    {newPet.photo ? 'Foto agregada' : 'Agregar foto (opcional)'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={addPet}
                  disabled={!newPet.name}
                  className="w-full py-3 rounded-xl text-white font-medium disabled:opacity-50"
                  style={{ background: '#331B7E' }}
                >
                  + Agregar esta mascota
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-carbon/10">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="w-14 h-12 rounded-xl border border-carbon/10 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-carbon" />
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && (!data.name || !data.email)}
            className="flex-1 h-12 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: '#331B7E' }}
          >
            {currentStep === 3 ? '🚀 Empezar!' : 'Continuar'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {currentStep === 3 && (
          <button
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, completed: true }))
              localStorage.setItem('petoclub_user', JSON.stringify({
                name: data.name,
                email: data.email,
                pets: data.pets,
                points: 100,
                badges: ['first_step'],
                memberSince: new Date().toISOString(),
              }))
              navigate('/')
            }}
            className="w-full mt-3 py-3 text-carbon/60 text-sm"
          >
            Skip por ahora →
          </button>
        )}
      </div>
    </div>
  )
}
