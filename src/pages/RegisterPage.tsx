import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { Card, Button } from '../components/ui'

export function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!acceptTerms) {
      setError('Debés aceptar los términos y condiciones')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setLoading(true)
    
    setTimeout(() => {
      localStorage.setItem('petoclub_user', JSON.stringify({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        points: 100,
        memberSince: null,
      }))
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-cream">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="PetoClub" className="h-14 mx-auto mb-3" />
          <h1 className="font-display font-bold text-2xl text-carbon">Crear Cuenta</h1>
          <p className="text-carbon-light text-sm mt-1">Unite a la comunidad pet-friendly</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Teléfono (opcional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 9 11 1234 5678"
                  className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/40"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repetí la contraseña"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-carbon/20"
              />
              <label htmlFor="terms" className="text-xs text-carbon/60">
                Acepto los{' '}
                <Link to="/tyc" className="text-primary underline">Términos y Condiciones</Link>
                {' '}y la{' '}
                <Link to="/privacidad" className="text-primary underline">Política de Privacidad</Link>
              </label>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-carbon/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-carbon/40">o</span>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full border border-carbon/10 py-3 rounded-xl font-medium text-carbon hover:bg-carbon/5 transition flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <p className="text-center text-carbon/60 text-sm mt-6">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="font-semibold" style={{ color: '#331B7E' }}>
              Iniciá sesión
            </Link>
          </p>
        </Card>

        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-carbon/50 hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}
