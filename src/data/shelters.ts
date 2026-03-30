// Shared mock data for shelters

export interface Shelter {
  id: string
  name: string
  description: string
  address: string
  phone: string
  whatsapp: string
  instagram_url: string
  facebook_url: string
  logo_url: string
  cover_url: string
  pets_count: number
  adoptions_count: number
  active_causes: number
}

export interface Pet {
  id: string
  name: string
  breed: string
  age: string
  gender?: string
  size?: string
  photos: string[]
  status: 'available' | 'adopted'
  adoption_date?: string
}

export interface Cause {
  id: string
  shelter_id: string
  title: string
  description: string
  goal_amount: number
  current_amount: number
  image_url: string
  is_active: boolean
  is_urgent: boolean
  expires_at: string
  donors_count: number
}

export const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Refugio Patitas',
    description: 'Refugio sin fines de lucro. Ayudamos a mascotas abandonadas desde 2015. Contamos con más de 50 animales esperando una familia.',
    address: 'Av. Corrientes 1234, Buenos Aires',
    phone: '+5491112345678',
    whatsapp: '+5491112345678',
    instagram_url: 'https://instagram.com/refugiopatitas',
    facebook_url: 'https://facebook.com/refugiopatitas',
    logo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200',
    cover_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    pets_count: 45,
    adoptions_count: 320,
    active_causes: 2,
  },
  {
    id: '2',
    name: 'Ayuda Animal',
    description: 'Nos dedicamos al rescate y rehabilitación de animales en situación de calle. Todos nuestros animales están castrados y vacúnados.',
    address: 'Juramento 890, Núñez',
    phone: '+54911567890',
    whatsapp: '+54911567890',
    instagram_url: 'https://instagram.com/ayudaanimal',
    facebook_url: '',
    logo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200',
    cover_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
    pets_count: 28,
    adoptions_count: 156,
    active_causes: 1,
  },
  {
    id: '3',
    name: 'Paw Rescue',
    description: 'Rescate, rehabilitación y adopción responsable. Cada mascota encuentra un hogar definitivo.',
    address: 'Defensa 567, San Telmo',
    phone: '+54911987654',
    whatsapp: '+54911987654',
    instagram_url: 'https://instagram.com/pawrescue',
    facebook_url: '',
    logo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200',
    cover_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800',
    pets_count: 35,
    adoptions_count: 210,
    active_causes: 0,
  },
]

export const mockPets: Record<string, Pet[]> = {
  '1': [
    { id: '1', name: 'Luna', breed: 'Mestiza', age: '2 años', gender: 'hembra', size: 'mediano', photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'], status: 'available' },
    { id: '2', name: 'Rocky', breed: 'Ovejero', age: '1 año', gender: 'macho', size: 'grande', photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'], status: 'available' },
    { id: '3', name: 'Mishi', breed: 'Doméstico', age: '6 meses', gender: 'hembra', size: 'chico', photos: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400'], status: 'available' },
    { id: '4', name: 'Max', breed: 'Labrador', age: '3 años', gender: 'macho', size: 'grande', photos: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400'], status: 'available' },
    { id: '5', name: 'Nube', breed: 'Mestiza', age: '4 años', photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'], status: 'adopted', adoption_date: '2025-12-15' },
    { id: '6', name: 'Simba', breed: 'Siames', age: '2 años', photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'], status: 'adopted', adoption_date: '2026-01-20' },
  ],
  '2': [
    { id: '7', name: 'Chiqui', breed: 'Mestizo', age: '1 año', gender: 'macho', size: 'chico', photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'], status: 'available' },
    { id: '8', name: 'Lola', breed: 'Beagle', age: '2 años', gender: 'hembra', size: 'mediano', photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'], status: 'available' },
    { id: '9', name: 'Bella', breed: 'Golden', age: '1 año', photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'], status: 'adopted', adoption_date: '2026-02-10' },
  ],
  '3': [
    { id: '10', name: 'Tomi', breed: 'Pitbull', age: '2 años', gender: 'macho', size: 'grande', photos: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400'], status: 'available' },
  ],
}

export const mockCauses: Record<string, Cause[]> = {
  '1': [
    { id: '1', shelter_id: '1', title: 'Comida para 30 días', description: 'Necesitamos alimentos para 45 mascotas', goal_amount: 150000, current_amount: 87500, image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', is_active: true, is_urgent: true, expires_at: '2026-04-30', donors_count: 34 },
    { id: '2', shelter_id: '1', title: 'Vacunas de emergencia', description: 'Vacunas para cachorros', goal_amount: 80000, current_amount: 20000, image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', is_active: true, is_urgent: false, expires_at: '2026-05-15', donors_count: 12 },
  ],
  '2': [
    { id: '3', shelter_id: '2', title: 'Cirugía urgente - Luna', description: 'Luna necesita una cirugía de cadera', goal_amount: 250000, current_amount: 180000, image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400', is_active: true, is_urgent: true, expires_at: '2026-04-05', donors_count: 89 },
  ],
  '3': [],
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

export const getProgress = (current: number, goal: number) => {
  return Math.min(Math.round((current / goal) * 100), 100)
}
