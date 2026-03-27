import { useState } from 'react'
import { ShoppingCart, Search, Star, Truck } from 'lucide-react'

// Mock data - replace with Supabase queries
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
  },
]

const categories = ['Todos', 'Alimento', 'Juguetes', 'Accesorios', 'Camas', 'Snacks', 'Salud']

export function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState<string[]>([])

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'Todos' || p.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-nunito font-bold text-3xl text-carbon">Tienda</h1>
            <p className="text-carbon/60 mt-1">Todo para tus peludos • Envío a todo Argentina</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrito ({cart.length})
          </button>
        </div>

        {/* Free shipping banner */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Truck className="w-6 h-6 text-secondary flex-shrink-0" />
          <p className="text-sm text-carbon/70">
            <span className="font-semibold text-secondary">¡Envío gratis!</span> En compras superiores a $15,000
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-carbon/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon/40" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                    category === cat
                      ? 'bg-primary text-white'
                      : 'bg-carbon/5 text-carbon/70 hover:bg-carbon/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-carbon/5 hover:shadow-md transition">
              <div className="relative h-48 bg-carbon/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-carbon/40 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-carbon line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-carbon/70">{product.rating}</span>
                  <span className="text-xs text-carbon/40">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold text-lg text-carbon">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-carbon/40 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setCart(prev => [...prev, product.id])}
                  className="w-full mt-3 bg-primary/10 text-primary py-2 rounded-xl text-sm font-semibold hover:bg-primary/20 transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-carbon/20 mx-auto mb-4" />
            <p className="text-carbon/60">No encontramos productos</p>
          </div>
        )}
      </div>
    </div>
  )
}
