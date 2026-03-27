import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Minus, Plus, Trash2, CreditCard } from 'lucide-react'
import { Card, Button, Badge } from '../components/ui'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Alimento Premium Perro Adulto',
    brand: 'Royal Canin',
    price: 12500,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200',
  },
  {
    id: '2',
    name: 'Juguete Interactivo Gato',
    brand: 'Catit',
    price: 4500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200',
  },
]

export function CartPage() {
  const [items, setItems] = useState(mockCartItems)

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-carbon/5 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-carbon/30" />
        </div>
        <h2 className="font-display font-bold text-xl text-carbon mb-2">
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

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display font-bold text-xl text-carbon">
          Carrito ({items.length})
        </h1>
        <Badge variant="success">Envío gratis disponible</Badge>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <Card key={item.id} className="p-3">
            <div className="flex gap-3">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-carbon-light">{item.brand}</p>
                <h3 className="font-semibold text-carbon text-sm line-clamp-2">
                  {item.name}
                </h3>
                <p className="font-bold text-primary mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-carbon/30 hover:text-error transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 bg-carbon/5 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 flex items-center justify-center text-carbon-light hover:text-carbon"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-carbon-light hover:text-carbon"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-carbon-light">Subtotal</span>
            <span className="text-carbon font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-carbon-light">Envío</span>
            <span className={shipping === 0 ? 'text-success font-medium' : 'text-carbon font-medium'}>
              {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
            </span>
          </div>
          <div className="border-t border-carbon/10 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-carbon">Total</span>
              <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-carbon-light mt-3 flex items-center gap-1">
            Agregá {formatPrice(15000 - subtotal)} más para obtener envío gratis 🚚
          </p>
        )}
      </Card>

      {/* Checkout Button */}
      <Button fullWidth size="lg" className="flex items-center justify-center gap-2">
        <CreditCard className="w-5 h-5" />
        Pagar con Mercado Pago
      </Button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 mt-6 text-carbon-light text-xs">
        <span>🔒 Pago seguro</span>
        <span>📦 Envío a todo AR</span>
      </div>
    </div>
  )
}
