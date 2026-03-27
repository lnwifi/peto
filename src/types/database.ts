export type UserRole = 'user' | 'member' | 'business' | 'shelter' | 'admin'

export interface User {
  id: string
  email: string
  phone?: string
  full_name: string
  avatar_url?: string
  role: UserRole
  member_since?: string
  points_balance: number
  created_at: string
}

export type PetSpecies = 'perro' | 'gato' | 'otro'

export interface Pet {
  id: string
  owner_id: string
  name: string
  species: PetSpecies
  breed: string
  birth_date?: string
  weight?: number
  temperament?: string
  photos: string[]
  description?: string
  created_at: string
}

export type ReportType = 'lost' | 'found'
export type ReportStatus = 'active' | 'reunited' | 'closed'

export interface LostFoundReport {
  id: string
  user_id: string
  pet_id?: string
  type: ReportType
  status: ReportStatus
  description: string
  last_seen_location: string
  last_seen_date: string
  photo?: string
  views_count: number
  created_at: string
  // Joined fields
  user?: User
  pet?: Pet
}

export type SwipeDirection = 'right' | 'left'

export interface Swipe {
  id: string
  user_id: string
  target_pet_id: string
  direction: SwipeDirection
  created_at: string
}

export interface Match {
  id: string
  user_id: string
  pet1_id: string
  pet2_id: string
  created_at: string
  // Joined
  pet1?: Pet
  pet2?: Pet
}

export interface Message {
  id: string
  match_id: string
  sender_id: string
  content: string
  read_at?: string
  created_at: string
  // Joined
  sender?: User
}

export type BusinessCategory = 'veterinaria' | 'petshop' | 'cafe' | 'paseador' | 'otro'

export interface Business {
  id: string
  owner_id: string
  name: string
  category: BusinessCategory
  address: string
  location?: string // geography
  logo_url?: string
  description?: string
  is_active: boolean
  created_at: string
  // Joined
  owner?: User
  discounts?: Discount[]
}

export interface Discount {
  id: string
  business_id: string
  title: string
  description?: string
  discount_percent: number
  code?: string
  valid_from: string
  valid_until: string
  is_active: boolean
  created_at: string
  // Joined
  business?: Business
}

export interface Review {
  id: string
  user_id: string
  business_id: string
  rating: number
  comment?: string
  created_at: string
  // Joined
  user?: User
}

export type AdoptionStatus = 'open' | 'closed' | 'adopted'

export interface AdoptionPost {
  id: string
  shelter_id: string
  pet_id: string
  title: string
  story?: string
  needs?: string
  status: AdoptionStatus
  created_at: string
  // Joined
  shelter?: User
  pet?: Pet
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface AdoptionApplication {
  id: string
  adoption_post_id: string
  applicant_id: string
  message?: string
  status: ApplicationStatus
  created_at: string
  // Joined
  applicant?: User
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export interface ShopProduct {
  id: string
  name: string
  description?: string
  price: number // en centavos
  category: string
  images: string[]
  stock: number
  is_active: boolean
}

export interface ShopOrder {
  id: string
  user_id: string
  status: OrderStatus
  total_amount: number
  shipping_address: string
  mercado_pago_payment_id?: string
  created_at: string
  // Joined
  items?: OrderItem[]
  user?: User
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  // Joined
  product?: ShopProduct
}

export interface VaccinationRecord {
  id: string
  pet_id: string
  vaccine_name: string
  date: string
  next_date?: string
  veterinarian?: string
  created_at: string
}

export interface PointsTransaction {
  id: string
  user_id: string
  amount: number
  reason: string
  created_at: string
}

export interface Donation {
  id: string
  from_user_id: string
  to_shelter_id: string
  amount: number
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  category: string
  cover_image?: string
  author_id: string
  published_at?: string
  created_at: string
  // Joined
  author?: User
}
