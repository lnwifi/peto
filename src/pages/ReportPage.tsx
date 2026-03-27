import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapPin, Camera, Calendar, X } from 'lucide-react'
import { Card, Button, Badge } from '../components/ui'

export function ReportPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') as 'lost' | 'found' || 'lost'

  const [form, setForm] = useState({
    name: '',
    species: 'perro',
    breed: '',
    description: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    phone: '',
    photo: null as string | null,
  })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would save to Supabase
    alert('Reporte enviado! (Demo - Supabase no conectado aún)')
    navigate('/mascotas-perdidas')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <Badge variant={type === 'lost' ? 'error' : 'success'} size="md">
            {type === 'lost' ? '🔴 Perdida' : '🟢 Encontrada'}
          </Badge>
        </div>
        <h1 className="font-display font-bold text-2xl">
          {type === 'lost' ? 'Reportar mascota perdida' : 'Reportar mascota encontrada'}
        </h1>
        <p className="text-white/80 mt-1">
          {type === 'lost' 
            ? 'Ayudanos a encontrar a tu peludo'
            : '¿Encontraste una mascota perdida?'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 -mt-4">
        <Card className="p-5 space-y-5">
          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Foto de la mascota
            </label>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-carbon/20 rounded-2xl cursor-pointer bg-carbon/5 hover:bg-carbon/10 transition">
              {form.photo ? (
                <div className="relative w-full h-full">
                  <img 
                    src={form.photo} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl opacity-0 hover:opacity-100 transition">
                    <span className="text-white font-medium">Cambiar foto</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-carbon-light">
                  <Camera className="w-12 h-12 mb-2" />
                  <span className="text-sm">Tocá para agregar foto</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Nombre de la mascota (si lo conocés)
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Luna, Michi..."
              className="w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Especie
            </label>
            <div className="flex gap-3">
              {['perro', 'gato', 'otro'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, species: s }))}
                  className={`flex-1 py-3 rounded-xl font-medium capitalize transition ${
                    form.species === s
                      ? 'bg-primary text-white'
                      : 'bg-carbon/5 text-carbon'
                  }`}
                >
                  {s === 'perro' ? '🐕' : s === 'gato' ? '🐱' : '🐾'} {s}
                </button>
              ))}
            </div>
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Raza
            </label>
            <input
              type="text"
              value={form.breed}
              onChange={(e) => setForm(prev => ({ ...prev, breed: e.target.value }))}
              placeholder="Ej: Golden Retriever, Siames..."
              className="w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Descripción
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Color, tamaño, collar, características especiales..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {type === 'lost' ? '¿Cuándo se perdió?' : '¿Cuándo la encontraste?'}
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              {type === 'lost' ? '¿Dónde se perdió?' : '¿Dónde la encontraste?'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Barrio, calle, referencia..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
            </div>
            {/* Map placeholder */}
            <div className="mt-2 h-32 bg-secondary/10 rounded-xl flex items-center justify-center">
              <span className="text-secondary text-sm">📍 Mapa interactivo (próximamente)</span>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-carbon mb-2">
              Tu teléfono de contacto
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+54 9 11 1234 5678"
              className="w-full px-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          {/* Submit */}
          <Button type="submit" fullWidth size="lg" className="mt-4">
            Publicar Reporte
          </Button>
        </Card>
      </form>

      {/* Tips */}
      <Card className="mx-4 mt-4 p-4 bg-amber-50 border-amber-200">
        <h3 className="font-semibold text-carbon mb-2">💡 Tips para {type === 'lost' ? 'encontrar' : 'encontrar al dueño'}</h3>
        <ul className="text-sm text-carbon/70 space-y-1">
          <li>• Agregá fotos claras y recientes</li>
          <li>• Incluí detalles únicos (cicatrices, manchas)</li>
          <li>• {type === 'lost' ? 'Revisá los refugios cercanos' : 'Preguntá en el vecindario'}</li>
          <li>• {type === 'lost' ? 'Compartí en redes sociales' : 'Revisá si tiene collar con contacto'}</li>
        </ul>
      </Card>

      <div className="h-20" />
    </div>
  )
}
