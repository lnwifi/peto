import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, Keyboard, CheckCircle, XCircle, Clock } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, Button, Badge } from '../components/ui'
import { checkCodeStatus, useValidationCode } from '../lib/validation'

interface QRValidatorProps {
  onValidationSuccess?: (code: string) => void
  onValidationError?: (error: string) => void
}

export function QRValidator({ onValidationSuccess, onValidationError }: QRValidatorProps) {
  const [mode, setMode] = useState<'menu' | 'scan' | 'manual'>('menu')
  const [code, setCode] = useState('')
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [])

  const startScanner = async () => {
    setMode('scan')
    setValidationResult(null)
    
    try {
      const scanner = new Html5Qrcode('qr-reader')
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanFailure
      )
    } catch (err) {
      console.error('Error starting scanner:', err)
      setMode('menu')
      onValidationError?.('No se pudo acceder a la cámara')
    }
  }

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {})
      scannerRef.current = null
    }
  }

  const onScanSuccess = async (decodedText: string) => {
    stopScanner()
    setMode('menu')
    
    // Extract code from QR (format: /validar/TOKEN or just TOKEN)
    const extractedCode = decodedText.includes('/validar/') 
      ? decodedText.split('/validar/').pop() || decodedText
      : decodedText
    
    await validateCode(extractedCode)
  }

  const onScanFailure = () => {
    // Silently ignore scan failures (continuous scanning)
  }

  const validateCode = async (codeToValidate: string) => {
    setIsValidating(true)
    setCode(codeToValidate)
    setValidationResult(null)

    try {
      // First check if code is valid
      const status = await checkCodeStatus(codeToValidate)
      
      if (!status.valid) {
        setValidationResult({ success: false, error: status.error || 'Error desconocido' })
        onValidationError?.(status.error || 'Error desconocido')
        setIsValidating(false)
        return
      }

      // Show countdown before validating
      setCountdown((status.remainingMinutes || 15) * 60)
      setValidationResult({
        success: true,
        preview: true,
        code: status.code,
        couponTitle: status.couponTitle,
        expiresAt: new Date(status.expiresAt)
      })

      // Start countdown
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownRef.current!)
            setValidationResult((v: any) => v ? { ...v, error: 'Código expirado', preview: false } : null)
            return null
          }
          return prev - 1
        })
      }, 1000)

    } catch (err) {
      setValidationResult({ success: false, error: 'Error al verificar el código' })
      onValidationError?.('Error al verificar')
    }
    
    setIsValidating(false)
  }

  const confirmValidation = async () => {
    if (!validationResult?.code) return

    setIsValidating(true)
    const success = await useValidationCode(validationResult.code)
    
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }

    if (success) {
      setValidationResult({
        success: true,
        confirmed: true,
        code: validationResult.code,
        couponTitle: validationResult.couponTitle
      })
      onValidationSuccess?.(validationResult.code)
    } else {
      setValidationResult({
        success: false,
        error: 'No se pudo validar el código. Puede que ya haya sido usado o expirado.'
      })
      onValidationError?.('Validación fallida')
    }
    
    setCountdown(null)
    setIsValidating(false)
  }

  const cancelValidation = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }
    setValidationResult(null)
    setCountdown(null)
    setCode('')
  }

  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      {mode === 'menu' && !validationResult && (
        <div className="space-y-4">
          <h3 className="font-semibold text-carbon text-center">Validar Cupón</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startScanner}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-carbon/10 hover:border-primary transition"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <span className="font-medium text-carbon">Escanear QR</span>
            </button>

            <button
              onClick={() => { setMode('manual'); setValidationResult(null) }}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-carbon/10 hover:border-primary transition"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <Keyboard className="w-8 h-8 text-secondary" />
              </div>
              <span className="font-medium text-carbon">Código Manual</span>
            </button>
          </div>
        </div>
      )}

      {/* Scanner View */}
      {mode === 'scan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-carbon">Escaneá el QR</h3>
            <button
              onClick={() => { stopScanner(); setMode('menu') }}
              className="p-2 hover:bg-carbon/10 rounded-full"
            >
              <XCircle className="w-6 h-6 text-carbon/60" />
            </button>
          </div>
          
          <div className="relative">
            <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white rounded-2xl" />
            </div>
          </div>

          <p className="text-sm text-carbon/60 text-center">
            Apuntá la cámara al código QR del cliente
          </p>
        </div>
      )}

      {/* Manual Entry */}
      {mode === 'manual' && !validationResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-carbon">Código Manual</h3>
            <button
              onClick={() => setMode('menu')}
              className="p-2 hover:bg-carbon/10 rounded-full"
            >
              <XCircle className="w-6 h-6 text-carbon/60" />
            </button>
          </div>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
            placeholder="Ej: ABC12345"
            maxLength={8}
            className="w-full px-4 py-4 text-center text-2xl tracking-widest font-mono border border-carbon/20 rounded-xl focus:outline-none focus:border-primary"
          />

          <Button
            onClick={() => validateCode(code)}
            disabled={code.length < 8 || isValidating}
            className="w-full"
          >
            {isValidating ? 'Verificando...' : 'Verificar Código'}
          </Button>
        </div>
      )}

      {/* Validation Result */}
      {validationResult && (
        <Card className="p-6">
          {validationResult.success && validationResult.preview && !validationResult.confirmed && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-carbon">{validationResult.couponTitle}</h3>
                <p className="text-sm text-carbon/60">Código: {validationResult.code}</p>
              </div>

              {countdown !== null && (
                <div className="py-3 px-4 bg-carbon/5 rounded-xl">
                  <p className="text-sm text-carbon/60 mb-1">Tiempo restante</p>
                  <p className="text-3xl font-mono font-bold text-carbon">
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              )}

              <p className="text-sm text-carbon/60">
                Confirmá que el cliente te muestra este código
              </p>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={cancelValidation}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmValidation}
                  disabled={isValidating}
                  className="flex-1"
                >
                  {isValidating ? 'Validando...' : 'Confirmar Uso'}
                </Button>
              </div>
            </div>
          )}

          {validationResult.success && validationResult.confirmed && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-green-600">¡Cupón Validado!</h3>
                <p className="text-sm text-carbon/60 mt-1">{validationResult.couponTitle}</p>
              </div>

              <Badge variant="success" className="text-sm px-4 py-2">
                Usado correctamente
              </Badge>

              <Button
                onClick={cancelValidation}
                className="w-full"
              >
                Validar Otro
              </Button>
            </div>
          )}

          {validationResult.error && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-red-600">Código Inválido</h3>
                <p className="text-sm text-carbon/60 mt-1">{validationResult.error}</p>
              </div>

              <Button
                variant="secondary"
                onClick={cancelValidation}
                className="w-full"
              >
                Intentar de Nuevo
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

// Component to display and print business QR
export function BusinessQRDisplay({ businessId, businessName }: { businessId: string; businessName: string }) {
  const [qrData, setQRData] = useState<string | null>(null)

  useEffect(() => {
    // Generate a data URL for the QR code
    // In production, this would come from the server
    const url = `${window.location.origin}/validar/${businessId}`
    setQRData(url)
  }, [businessId])

  const printQR = () => {
    window.print()
  }

  if (!qrData) return null

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-carbon text-center mb-1">{businessName}</h3>
      <p className="text-sm text-carbon/60 text-center mb-4">Código QR del Local</p>
      
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-white rounded-xl border border-carbon/10">
          <QRCodeSVG value={qrData} size={180} level="M" />
        </div>
      </div>

      <p className="text-sm text-carbon/60 text-center mb-4">
        Los clientes pueden escanear este código para validar sus cupones
      </p>

      <Button onClick={printQR} variant="secondary" className="w-full">
        Imprimir QR
      </Button>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; }
        }
      `}</style>
    </Card>
  )
}
