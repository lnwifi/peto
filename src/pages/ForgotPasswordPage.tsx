import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle, Lock } from 'lucide-react'
import { Card, Button } from '../components/ui'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Simulate sending email - in production would call Supabase
    setTimeout(() => {
      if (email) {
        setSent(true)
      } else {
        setError('Por favor ingresá tu email')
      }
      setLoading(false)
    }, 1500)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-cream">
        <div className="w-full max-w-sm text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(39,174,96,0.1)' }}>
            <CheckCircle className="w-10 h-10" style={{ color: '#27AE60' }} />
          </div>
          
          <h1 className="font-display font-bold text-2xl text-carbon mb-2">¡Email enviado!</h1>
          <p className="text-carbon/60 mb-6">
            Te enviamos un enlace para restablecer tu contraseña a <strong>{email}</strong>
          </p>
          
          <Card className="p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-carbon/70">
                <p className="mb-2">Revisá tu casilla de correo, incluso la carpeta de spam.</p>
                <p>El enlace expira en <strong>24 horas</strong>.</p>
              </div>
            </div>
          </Card>

          <p className="text-sm text-carbon/50 mb-4">
            ¿No recibiste el email?
          </p>
          <button 
            onClick={() => setSent(false)}
            className="text-sm font-medium mb-6"
            style={{ color: '#331B7E' }}
          >
            Intentar con otro email
          </button>

          <div>
            <Link to="/login" className="text-sm text-carbon/50 hover:underline">
              ← Volver al login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-cream">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <Link 
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-carbon/60 hover:text-carbon mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al login
        </Link>

        {/* Logo */}
        <div className="text-center mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#331B7E' }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-carbon">¿Olvidaste tu contraseña?</h1>
          <p className="text-carbon-light text-sm mt-2">
            Ingresá tu email y te enviaremos un enlace para restablecerla
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-carbon mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </Button>
          </form>

          {/* Help */}
          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(51,27,126,0.05)' }}>
            <p className="text-xs text-carbon/60 text-center">
              ¿No recordás el email asociado a tu cuenta?{' '}
              <button className="text-primary font-medium underline">
                Contactanos
              </button>
            </p>
          </div>
        </Card>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-carbon/50">
          Recordaste tu contraseña?{' '}
          <Link to="/login" className="font-medium" style={{ color: '#331B7E' }}>
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
