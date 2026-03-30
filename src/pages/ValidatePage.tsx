import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { 
  Clock, CheckCircle, AlertCircle, 
  Copy, ArrowLeft, Camera, Keyboard
} from 'lucide-react'
import { Card, Button } from '../components/ui'
import { QRCodeSVG } from 'qrcode.react'
import { formatRemainingTime } from '../lib/validation'

export function ValidatePage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'menu' | 'scan' | 'manual' | 'code'>('menu')
  const [validationCode, setValidationCode] = useState<{
    code: string
    expiresAt: Date
  } | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remainingTime, setRemainingTime] = useState<string>('')
  const [scanResult, setScanResult] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  useEffect(() => {
    if (validationCode) {
      const interval = setInterval(() => {
        setRemainingTime(formatRemainingTime(validationCode.expiresAt))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [validationCode])

  const startScanner = async () => {
    setMode('scan')
    setError(null)
    
    try {
      const scanner = new Html5Qrcode('qr-reader')
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          // Stop scanner
          scanner.stop().catch(() => {})
          setScanResult(decodedText)
          // If it looks like a coupon code, use it directly
          if (decodedText.length <= 20) {
            setCouponCode(decodedText)
          }
          setMode('manual')
        },
        () => {} // Ignore failures
      )
    } catch (err) {
      console.error('Error starting scanner:', err)
      setError('No se pudo acceder a la cámara')
      setMode('menu')
    }
  }

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {})
      scannerRef.current = null
    }
    setMode('menu')
  }

  const getValidationCode = async () => {
    if (!couponCode.trim()) {
      setError('Ingresá el código del cupón')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Mock - in production this calls Supabase
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate a mock validation code
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let code = ''
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 min
      
      setValidationCode({ code, expiresAt })
      setMode('code')
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
      <div className="px-4 pt-6 pb-4" style={{ background: '#331B7E' }}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { stopScanner(); navigate(-1) }}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-white">Validar Cupón</h1>
            {token && <p className="text-white/60 text-sm">{token}</p>}
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Menu Selection */}
        {mode === 'menu' && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-carbon text-center mb-4">
                Escaneá el código QR del local o ingresá el código manualmente
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={startScanner}
                  className="flex flex-col items-center gap-2 p-4 bg-primary rounded-xl text-white"
                >
                  <Camera className="w-8 h-8" />
                  <span className="text-sm font-medium">Escanear QR</span>
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className="flex flex-col items-center gap-2 p-4 bg-carbon/10 rounded-xl text-carbon"
                >
                  <Keyboard className="w-8 h-8" />
                  <span className="text-sm font-medium">Código manual</span>
                </button>
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

        {/* Scanner View */}
        {mode === 'scan' && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-carbon">Escaneá el QR</h3>
                <button 
                  onClick={stopScanner}
                  className="px-3 py-1 text-sm text-carbon/60 hover:text-carbon"
                >
                  Cerrar
                </button>
              </div>
              
              <div className="relative">
                <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-4 border-white rounded-2xl" />
                </div>
              </div>

              <p className="text-sm text-carbon/60 text-center mt-3">
                Apuntá la cámara al código QR del local
              </p>
            </Card>
          </div>
        )}

        {/* Manual Entry */}
        {mode === 'manual' && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-carbon">Ingresá el código</h3>
                <button 
                  onClick={() => setMode('menu')}
                  className="px-3 py-1 text-sm text-carbon/60 hover:text-carbon"
                >
                  Volver
                </button>
              </div>

              {scanResult && (
                <div className="mb-4 p-3 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-700">
                    ✓ QR escaneado correctamente
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Ej: PATITAS20"
                  maxLength={20}
                  className="w-full px-4 py-4 text-center text-2xl tracking-widest font-mono border-2 border-carbon/20 rounded-xl focus:outline-none focus:border-[#331B7E]"
                />
                
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  onClick={getValidationCode}
                  disabled={isLoading || !couponCode.trim()}
                  className="w-full py-4 text-base"
                >
                  {isLoading ? 'Generando...' : 'Generar Código de Validación'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Generated Code */}
        {mode === 'code' && validationCode && (
          <div className="space-y-4">
            <Card className="p-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h3 className="font-bold text-lg text-carbon mb-1">¡Código Generado!</h3>
              <p className="text-sm text-carbon/60 mb-4">
                Mostrá este código al local para validar tu cupón
              </p>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-2xl border-4" style={{ borderColor: 'rgba(51,27,126,0.2)' }}>
                  <QRCodeSVG 
                    value={validationCode.code} 
                    size={160} 
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#331B7E"
                  />
                </div>
              </div>

              {/* Alphanumeric Code */}
              <div className="bg-cream rounded-xl p-4 mb-4">
                <p className="text-xs text-carbon/60 mb-2">Código de validación:</p>
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-carbon/60">Expira en:</span>
                <span className="font-mono font-bold text-amber-600">
                  {remainingTime}
                </span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-green-700">
                  ✓ Mostrá este código o el QR al local para validar
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
          </div>
        )}
      </div>
    </div>
  )
}
