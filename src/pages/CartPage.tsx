import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, ChevronLeft, Check, MapPin, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react'
import { Card, Button } from '../components/ui'

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Alimento Premium Perro Adulto',
    brand: 'Royal Canin',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200',
  },
  {
    id: '2',
    name: 'Juguete Interactivo Gato',
    brand: 'Catit',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200',
  },
]

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation'

export function CartPage() {
  const [step, setStep] = useState<CheckoutStep>('cart')
  const [items, setItems] = useState(mockProducts.map(p => ({ ...p, quantity: 1 })))

  // Shipping form state
  const [shippingData, setShippingData] = useState({
    name: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'San Juan',
    province: 'San Juan',
    zipCode: '5400',
    observations: '',
  })

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'transfer' | 'cod'>('mercadopago')

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 15000 ? 0 : 1500
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handlePlaceOrder = () => {
    setStep('confirmation')
  }

  // Empty cart
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-carbon/5 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-carbon/30" />
        </div>
        <h2 className="font-display font-bold text-2xl text-carbon mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-carbon-light text-center mb-6">
          Agregá productos para continuar con tu compra
        </p>
        <Link to="/tienda">
          <Button>Ir a la Tienda</Button>
        </Link>
      </div>
    )
  }

  // Order Confirmation
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#27AE60' }}>
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="font-display font-bold text-2xl text-carbon mb-2 text-center">
          ¡Pedido confirmado! 🎉
        </h2>
        <p className="text-carbon/70 text-center mb-6 max-w-xs">
          Tu pedido #{Math.floor(Math.random() * 100000)} fue recibido. 
          Te notificaremos cuando esté en camino.
        </p>
        
        <Card className="w-full max-w-sm p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5" style={{ color: '#331B7E' }} />
            <div>
              <p className="text-sm font-medium text-carbon">Envío a:</p>
              <p className="text-sm text-carbon/60">
                {shippingData.address || 'Tu dirección'}, {shippingData.city}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5" style={{ color: '#331B7E' }} />
            <div>
              <p className="text-sm font-medium text-carbon">Método de pago:</p>
              <p className="text-sm text-carbon/60">
                {paymentMethod === 'mercadopago' ? 'Mercado Pago' : 
                 paymentMethod === 'transfer' ? 'Transferencia' : 'Pago contra entrega'}
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="font-bold text-xl mb-2" style={{ color: '#331B7E' }}>
            Total: {formatPrice(total)}
          </p>
        </div>

        <Link to="/" className="mt-6">
          <Button size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-cream px-4 py-4 border-b border-carbon/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== 'cart' ? (
              <button 
                onClick={() => {
                  if (step === 'shipping') setStep('cart')
                  else if (step === 'payment') setStep('shipping')
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-carbon" />
              </button>
            ) : (
              <Link to="/tienda" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ChevronLeft className="w-5 h-5 text-carbon" />
              </Link>
            )}
            <h1 className="font-display font-bold text-xl text-carbon">
              {step === 'cart' ? 'Mi Carrito' : 
               step === 'shipping' ? 'Envío' : 
               step === 'payment' ? 'Pago' : 'Confirmado'}
            </h1>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-1">
            {['cart', 'shipping', 'payment'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: step === s ? '#331B7E' : 
                                 ['cart', 'shipping', 'payment'].indexOf(step) > i ? '#27AE60' : '#E0E0E0',
                    color: step === s || ['cart', 'shipping', 'payment'].indexOf(step) > i ? '#FFFFFF' : '#636E72'
                  }}
                >
                  {['cart', 'shipping', 'payment'].indexOf(step) > i ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < 2 && <div className="w-4 h-0.5" style={{ background: ['cart', 'shipping', 'payment'].indexOf(step) > i ? '#27AE60' : '#E0E0E0' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: Cart */}
      {step === 'cart' && (
        <>
          <div className="px-4 py-4">
            {/* Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-carbon/50">{item.brand}</p>
                      <h3 className="font-semibold text-carbon text-sm line-clamp-2">{item.name}</h3>
                      <p className="font-bold mt-1" style={{ color: '#331B7E' }}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-carbon/30 hover:text-red-500 text-xs"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-2 bg-carbon/5 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-carbon hover:text-primary transition"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-carbon hover:text-primary transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="p-4 mb-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-carbon/70">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-carbon/70 flex items-center gap-1">
                    <Truck className="w-4 h-4" /> Envío
                  </span>
                  <span className={shipping === 0 ? 'text-green font-semibold' : ''}>
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="border-t border-carbon/10 pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span style={{ color: '#331B7E' }}>{formatPrice(total)}</span>
                </div>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-carbon/50 mt-2 flex items-center gap-1">
                  📦 Agregá {formatPrice(15000 - subtotal)} más para obtener envío gratis
                </p>
              )}
            </Card>
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-carbon/10">
            <Button fullWidth size="lg" onClick={() => setStep('shipping')}>
              Continuar al envío
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </>
      )}

      {/* Step 2: Shipping */}
      {step === 'shipping' && (
        <>
          <div className="px-4 py-4">
            <Card className="p-4 mb-4">
              <h2 className="font-semibold text-carbon mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#331B7E' }} />
                Datos de envío
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-carbon/60 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={shippingData.name}
                      onChange={(e) => setShippingData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-carbon/60 mb-1">Apellido</label>
                    <input
                      type="text"
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Tu apellido"
                      className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-carbon/60 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+54 9 11 1234 5678"
                    className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-carbon/60 mb-1">Dirección</label>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Ej: Av. Libertador 1234"
                    className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-carbon/60 mb-1">Ciudad</label>
                    <input
                      type="text"
                      value={shippingData.city}
                      onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm bg-carbon/5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-carbon/60 mb-1">CP</label>
                    <input
                      type="text"
                      value={shippingData.zipCode}
                      onChange={(e) => setShippingData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-carbon/60 mb-1">Observaciones (opcional)</label>
                  <textarea
                    value={shippingData.observations}
                    onChange={(e) => setShippingData(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Ej: timbre roto, frente verde..."
                    rows={2}
                    className="w-full px-3 py-2 border border-carbon/10 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Info */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(51,27,126,0.1)' }}>
                  <Truck className="w-5 h-5" style={{ color: '#331B7E' }} />
                </div>
                <div>
                  <p className="font-medium text-carbon text-sm">Envío a San Juan</p>
                  <p className="text-xs text-carbon/60">Entrega en 2-4 días hábiles</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-carbon/10">
            <Button 
              fullWidth 
              size="lg" 
              onClick={() => setStep('payment')}
              disabled={!shippingData.name || !shippingData.address || !shippingData.phone}
            >
              Continuar al pago
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </>
      )}

      {/* Step 3: Payment */}
      {step === 'payment' && (
        <>
          <div className="px-4 py-4">
            {/* Order Summary */}
            <Card className="p-4 mb-4">
              <h2 className="font-semibold text-carbon mb-3">Resumen del pedido</h2>
              
              <div className="flex gap-3 mb-4">
                {items.slice(0, 2).map((item) => (
                  <img 
                    key={item.id}
                    src={item.image} 
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ))}
                {items.length > 2 && (
                  <div className="w-14 h-14 rounded-lg bg-carbon/10 flex items-center justify-center text-sm text-carbon/60">
                    +{items.length - 2}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs text-carbon/60">{items.length} productos</p>
                  <p className="font-bold" style={{ color: '#331B7E' }}>{formatPrice(total)}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm border-t border-carbon/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-carbon/60">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-carbon/60">Envío</span>
                  <span className={shipping === 0 ? 'text-green font-semibold' : ''}>
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-carbon/10">
                  <span>Total</span>
                  <span style={{ color: '#331B7E' }}>{formatPrice(total)}</span>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-4 mb-4">
              <h2 className="font-semibold text-carbon mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" style={{ color: '#331B7E' }} />
                Método de pago
              </h2>

              <div className="space-y-3">
                <label 
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'mercadopago' ? 'border-primary bg-primary/5' : 'border-carbon/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="mercadopago"
                    checked={paymentMethod === 'mercadopago'}
                    onChange={() => setPaymentMethod('mercadopago')}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00B1EA' }}>
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-carbon">Mercado Pago</p>
                    <p className="text-xs text-carbon/60">Tarjeta, transferencia o dinero en cuenta</p>
                  </div>
                  {paymentMethod === 'mercadopago' && (
                    <Check className="w-5 h-5" style={{ color: '#331B7E' }} />
                  )}
                </label>

                <label 
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-carbon/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-500">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-carbon">Transferencia bancaria</p>
                    <p className="text-xs text-carbon/60">Datos para transferir al confirmar</p>
                  </div>
                  {paymentMethod === 'transfer' && (
                    <Check className="w-5 h-5" style={{ color: '#331B7E' }} />
                  )}
                </label>

                <label 
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-carbon/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F27131' }}>
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-carbon">Pago contra entrega</p>
                    <p className="text-xs text-carbon/60">Pagás cuando recibas tu pedido</p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <Check className="w-5 h-5" style={{ color: '#331B7E' }} />
                  )}
                </label>
              </div>
            </Card>

            {/* Shipping Summary */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" style={{ color: '#331B7E' }} />
                <div>
                  <p className="text-sm font-medium text-carbon">
                    {shippingData.name} {shippingData.lastName}
                  </p>
                  <p className="text-xs text-carbon/60">
                    {shippingData.address}, {shippingData.city}
                  </p>
                </div>
                <button 
                  onClick={() => setStep('shipping')}
                  className="ml-auto text-sm font-medium"
                  style={{ color: '#331B7E' }}
                >
                  Editar
                </button>
              </div>
            </Card>
          </div>

          {/* Place Order Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-carbon/10">
            <Button fullWidth size="lg" onClick={handlePlaceOrder}>
              <ShieldCheck className="w-5 h-5 mr-2" />
              Confirmar pedido • {formatPrice(total)}
            </Button>
            <p className="text-center text-xs text-carbon/40 mt-2">
              🔒 Tus datos están protegidos
            </p>
          </div>
        </>
      )}
    </div>
  )
}
