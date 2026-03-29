import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  QrCode, Clock, CheckCircle, AlertCircle, 
  Copy, ArrowLeft
} from 'lucide-react'
import { Card, Button } from '../components/ui'
import { QRCodeSVG } from 'qrcode.react'
import { generateValidationCode, formatRemainingTime } from '../lib/validation'

interface DiscountInfo {
  id: string
  title: string
  code: string
  discount_percent: number
  business_id: string
}

export function ValidatePage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'menu' | 'code'>('menu')
  const [validationCode, setValidationCode] = useState<{
    code: string
    expiresAt: Date
  } | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_discount, _setDiscount] = useState<DiscountInfo | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remainingTime, setRemainingTime] = useState<string>('')

  // In production, we'd fetch business info by token
  // For now, use mock data if no business found
  useEffect(() => {
    // This would normally fetch business info from /validar/:token
    // For demo, we'll use a mock business ID
    if (token) {
      console.log('Business token:', token)
    }
  }, [token])

  useEffect(() => {
    if (validationCode) {
      const interval = setInterval(() => {
        setRemainingTime(formatRemainingTime(validationCode.expiresAt))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [validationCode])

  const getValidationCode = async () => {
    if (!couponCode.trim()) {
      setError('Ingresá el código del cupón')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In production, this would:
      // 1. Look up the business by token
      // 2. Find the discount by couponCode
      // 3. Create validation code for this user

      // Mock response for demo
      const mockBusinessId = 'mock-business-id'
      const mockUserId = 'mock-user-id'
      const mockDiscountId = 'mock-discount-id'

      const result = await generateValidationCode(
        mockBusinessId,
        mockUserId,
        mockDiscountId,
        couponCode
      )

      if (result) {
        setValidationCode(result)
        setMode('code')
      } else {
        setError('No se pudo generar el código. Verificá el código del cupón.')
      }
    } catch (err) {
      setError('Error al generar el código')
    }

    setIsLoading(false)
  }

  const copyCode = () => {
    if (validationCode) {
      navigator.clipboard.writeText(validationCode.code)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div 
        className="px-4 pt-6 pb-8"
        style={{ background: '#331B7E' }}
      >
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-display font-bold text-2xl text-white">Validar Cupón</h1>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Mode Selection */}
        {mode === 'menu' && (
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-carbon text-center mb-4">
                ¿Cómo querés validar tu cupón?
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    // In production, this would open camera to scan business QR
                    alert('Escaneá el QR del local para validar automáticamente')
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-carbon">Escanear QR del local</p>
                    <p className="text-sm text-carbon/60">Acercá tu cámara al código QR</p>
                  </div>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-carbon/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-cream text-sm text-carbon/60">o</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-carbon text-center">
                    Ingresá el código del cupón
                  </h4>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Ej: PATITAS20"
                    className="w-full px-4 py-3 text-center text-lg tracking-widest font-mono border border-carbon/20 rounded-xl focus:outline-none focus:border-primary"
                  />
                  
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <Button
                    onClick={getValidationCode}
                    disabled={isLoading || !couponCode.trim()}
                    className="w-full"
                  >
                    {isLoading ? 'Generando...' : 'Obtener Código de Validación'}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-carbon">Importante</p>
                  <p className="text-carbon/60">
                    El código de validación tiene una validez de 15 minutos. 
                    Mostralo al local para canjear tu descuento.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Generated Code */}
        {mode === 'code' && validationCode && (
          <div className="space-y-4">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h3 className="font-bold text-lg text-carbon mb-1">¡Código Generado!</h3>
              <p className="text-sm text-carbon/60 mb-6">
                Mostrá este código al local para validar tu cupón
              </p>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-2xl border-4 border-primary/20">
                  <QRCodeSVG 
                    value={validationCode.code} 
                    size={180} 
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#331B7E"
                  />
                </div>
              </div>

              {/* Alphanumeric Code */}
              <div className="bg-carbon/5 rounded-xl p-4 mb-4">
                <p className="text-sm text-carbon/60 mb-2">O ingresá este código:</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-3xl tracking-widest font-mono font-bold text-carbon">
                    {validationCode.code}
                  </p>
                  <button
                    onClick={copyCode}
                    className="p-2 hover:bg-carbon/10 rounded-lg transition"
                    title="Copiar código"
                  >
                    <Copy className="w-5 h-5 text-carbon/60" />
                  </button>
                </div>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-carbon/60">Expira en:</span>
                <span className="font-mono font-bold text-amber-600">
                  {remainingTime}
                </span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-700">
                  ✓ El local puede verificar este código escaneando el QR 
                  o ingresando el código manualmente en su panel.
                </p>
              </div>

              <Button
                variant="secondary"
                onClick={() => {
                  setValidationCode(null)
                  setCouponCode('')
                  setMode('menu')
                }}
                className="w-full"
              >
                Generar Otro Código
              </Button>
            </Card>

            <p className="text-center text-xs text-carbon/40">
              ¿Problemas? Acercate al local y mostrale el código del cupón directamente.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
