import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Star, Truck, Plus, Minus, X, Check, Heart, Share2 } from 'lucide-react'
import { Card, Button } from '../components/ui'

// Mock products
const mockProducts = [
  {
    id: '1',
    name: 'Alimento Premium Perro Adulto',
    brand: 'Royal Canin',
    price: 12500,
    originalPrice: 15000,
    category: 'alimento',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400',
    rating: 4.8,
    reviews: 234,
    stock: 15,
  },
  {
    id: '2',
    name: 'Juguete Interactivo Gato',
    brand: 'Catit',
    price: 4500,
    originalPrice: null,
    category: 'juguetes',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400',
    rating: 4.5,
    reviews: 89,
    stock: 8,
  },
  {
    id: '3',
    name: 'Collar Reflectante Ajustable',
    brand: 'Hurtta',
    price: 3200,
    originalPrice: 4000,
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    rating: 4.9,
    reviews: 156,
    stock: 23,
  },
  {
    id: '4',
    name: 'Alimento Gato Sterilized',
    brand: 'Pro Plan',
    price: 9800,
    originalPrice: 11000,
    category: 'alimento',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    rating: 4.7,
    reviews: 312,
    stock: 0,
  },
  {
    id: '5',
    name: 'Cama Ortopédica Grande',
    brand: 'Igloo',
    price: 18500,
    originalPrice: 22000,
    category: 'camas',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
    rating: 4.6,
    reviews: 78,
    stock: 5,
  },
  {
    id: '6',
    name: 'Snacks Dentales Pack x 10',
    brand: 'Pedigree',
    price: 2800,
    originalPrice: null,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    rating: 4.3,
    reviews: 445,
    stock: 42,
  },
  {
    id: '7',
    name: 'Transportadora Aérea',
    brand: 'Petmate',
    price: 8500,
    originalPrice: 9500,
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400',
    rating: 4.4,
    reviews: 67,
    stock: 12,
  },
  {
    id: '8',
    name: 'Shampoo Natural Perro',
    brand: 'Burt\'s Bees',
    price: 3900,
    originalPrice: null,
    category: 'salud',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    rating: 4.8,
    reviews: 123,
    stock: 18,
  },
]

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'alimento', label: 'Alimento' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'camas', label: 'Camas' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'salud', label: 'Salud' },
]

export function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null)
  const [productQty, setProductQty] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      const newQty = (prev[productId] || 0) + delta
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: newQty }
    })
  }

  const cartTotal = Object.entries(cart).reduce((sum, [productId, qty]) => {
    const product = mockProducts.find(p => p.id === productId)
    return sum + (product?.price || 0) * qty
  }, 0)

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-cream px-4 py-3 shadow-sm">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition flex-shrink-0 ${
                category === cat.value
                  ? 'text-white'
                  : 'bg-white text-carbon/70 border border-carbon/10 hover:border-primary'
              }`}
              style={category === cat.value ? { background: '#331B7E' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Free shipping banner */}
      <div className="px-4 pb-3">
        <Card className="p-3 flex items-center gap-3">
          <Truck className="w-6 h-6 text-primary flex-shrink-0" style={{ color: '#331B7E' }} />
          <p className="text-sm text-carbon/70 flex-1">
            <span className="font-semibold" style={{ color: '#331B7E' }}>¡Envío gratis!</span> En compras superiores a $15,000
          </p>
          <Button size="sm" onClick={() => setShowCart(true)} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => {
                setSelectedProduct(product)
                setProductQty(1)
              }}
              className="cursor-pointer"
            >
            <Card className="overflow-hidden h-full">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                {product.originalPrice && (
                  <span 
                    className="absolute top-2 left-2 text-xs text-white font-bold px-2 py-1 rounded-lg"
                    style={{ background: '#F27131' }}
                  >
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Sin stock</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-carbon/50">{product.brand}</p>
                <h3 className="font-semibold text-carbon text-sm line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-carbon/40">({product.reviews})</span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-base" style={{ color: '#331B7E' }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-carbon/40 line-through ml-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.stock > 0 ? (
                  <div className="mt-2 flex items-center justify-between gap-2">
                    {cart[product.id] ? (
                      <div className="flex items-center gap-2 bg-carbon/5 rounded-lg">
                        <button 
                          onClick={() => updateCartQuantity(product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-carbon hover:text-primary transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-sm w-6 text-center">
                          {cart[product.id]}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-carbon hover:text-primary transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        fullWidth
                        onClick={() => addToCart(product.id)}
                        className="text-xs py-2"
                      >
                        Agregar
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button size="sm" fullWidth disabled className="mt-2 text-xs py-2 opacity-50">
                    Sin stock
                  </Button>
                )}
              </div>
            </Card>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-carbon/20 mx-auto mb-4" />
            <p className="text-carbon/60">No encontramos productos</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowCart(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b border-carbon/10 flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-carbon">
                Carrito ({cartCount})
              </h2>
              <button 
                onClick={() => setShowCart(false)}
                className="w-8 h-8 bg-carbon/5 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-carbon/20 mx-auto mb-4" />
                <p className="text-carbon/60">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-3">
                  {Object.entries(cart).map(([productId, qty]) => {
                    const product = mockProducts.find(p => p.id === productId)
                    if (!product) return null
                    return (
                      <Card key={productId} className="p-3 flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-carbon/50">{product.brand}</p>
                          <h3 className="font-semibold text-carbon text-sm line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-sm" style={{ color: '#331B7E' }}>
                              {formatPrice(product.price)}
                            </span>
                            <div className="flex items-center gap-2 bg-carbon/5 rounded-lg">
                              <button 
                                onClick={() => updateCartQuantity(product.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-carbon hover:text-primary"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-semibold text-sm w-4 text-center">{qty}</span>
                              <button 
                                onClick={() => updateCartQuantity(product.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-carbon hover:text-primary"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-carbon/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-carbon">Total</span>
                    <span className="font-bold text-xl" style={{ color: '#331B7E' }}>
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <Link 
                    to="/carrito"
                    onClick={() => setShowCart(false)}
                  >
                    <Button fullWidth size="lg">
                      Ir al carrito
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div 
            className="absolute inset-0 bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="sticky top-0 z-10 flex items-center justify-between p-4"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 bg-carbon/5 rounded-full flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-carbon/5 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-carbon/5 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-72 object-cover"
              />
              {selectedProduct.originalPrice && (
                <span 
                  className="absolute top-4 left-4 text-sm text-white font-bold px-3 py-1 rounded-lg"
                  style={{ background: '#F27131' }}
                >
                  -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                </span>
              )}
              {selectedProduct.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Sin stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Brand & Title */}
              <p className="text-sm text-carbon/50 mb-1">{selectedProduct.brand}</p>
              <h1 className="font-display font-bold text-2xl text-carbon mb-2">
                {selectedProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(selectedProduct.rating) ? 'text-amber-400 fill-amber-400' : 'text-carbon/20'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-carbon">{selectedProduct.rating}</span>
                <span className="text-carbon/50">({selectedProduct.reviews} reseñas)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-bold text-3xl" style={{ color: '#331B7E' }}>
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-lg text-carbon/40 line-through ml-2">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {selectedProduct.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Disponible en stock ({selectedProduct.stock} unidades)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <X className="w-5 h-5" />
                    <span className="font-medium">Sin stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-semibold text-carbon mb-2">Descripción</h2>
                <p className="text-carbon/70 leading-relaxed">
                  {selectedProduct.name} de {selectedProduct.brand}. Producto de alta calidad para tu mascota. 
                  ¡No te lo pierdas! Envío gratis en compras superiores a $15.000.
                </p>
              </div>

              {/* Quantity Selector */}
              {selectedProduct.stock > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold text-carbon mb-2">Cantidad</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-carbon/5 rounded-xl px-4 py-2">
                      <button 
                        onClick={() => setProductQty(Math.max(1, productQty - 1))}
                        className="w-8 h-8 flex items-center justify-center text-carbon hover:text-primary transition"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">{productQty}</span>
                      <button 
                        onClick={() => setProductQty(Math.min(selectedProduct.stock, productQty + 1))}
                        className="w-8 h-8 flex items-center justify-center text-carbon hover:text-primary transition"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-carbon/50 text-sm">
                      Stock disponible: {selectedProduct.stock}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {selectedProduct.stock > 0 ? (
                  <>
                    <Button 
                      fullWidth 
                      size="lg"
                      onClick={() => {
                        addToCart(selectedProduct.id)
                        setSelectedProduct(null)
                      }}
                    >
                      Agregar al carrito
                    </Button>
                    <Button 
                      variant="outline" 
                      fullWidth 
                      size="lg"
                      onClick={() => {
                        for (let i = 0; i < productQty; i++) {
                          addToCart(selectedProduct.id)
                        }
                        setSelectedProduct(null)
                      }}
                    >
                      Comprar ahora
                    </Button>
                  </>
                ) : (
                  <Button fullWidth size="lg" disabled>
                    Sin stock
                  </Button>
                )}
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-carbon/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6" style={{ color: '#331B7E' }} />
                  <div>
                    <p className="font-medium text-carbon text-sm">Envío gratis</p>
                    <p className="text-carbon/50 text-xs">En compras superiores a $15.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
