# PetoClub — MVP Spec

## Concepto
**PetoClub** es una comunidad digital para dueños de mascotas en Argentina. 
Combina utilidad real (mascotas perdidas, adopción, tienda) con conexión social (tinder, chat, puntos).
La experiencia debe sentirse cálida, confiable y humana — no un marketplace frío.

**Tagline:** *"La comunidad pet-friendly de Argentina"*

---

## Tech Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Estilos | Tailwind CSS v4 |
| Backend | Supabase (Postgres, Auth, Storage, Realtime) |
| Pagos | Mercado Pago (Checkout Pro + Subscriptions) |
| Maps | Leaflet (OpenStreetMap) |
| Router | React Router v6 |
| Icons | Lucide React |

---

## Paleta de Colores (Placeholder - pending brand input)

| Rol | Color |
|-----|-------|
| Primary | `#FF6B6B` (coral) |
| Secondary | `#4ECDC4` (verde menta) |
| Accent | `#FFE66D` (amarillo) |
| Background | `#FFF9F0` (crema) |
| Text | `#2D3436` (carbón) |

---

## Funcionalidades MVP

### 1. Autenticación
- [x] Login con email/password
- [x] Login con Google
- [x] Recuperación de contraseña
- [x] Verificación de email

### 2. Perfil de Usuario
- [x] Datos personales (nombre, email, avatar)
- [x] Mis mascotas (CRUD)
- [x] Puntos acumulados
- [x] Estado de membresía

### 3. Mascotas Perdidas/Encontradas
- [x] Publicar reporte (foto, descripción, ubicación mapa, fecha)
- [x] Lista de reportes activos (filtro lost/found)
- [x] Mapa interactivo con reportes
- [x] Detalle de reporte
- [x] Estados: active → reunited → closed
- [x] "¿La viste?" - reportar avistaje

### 4. Tinder de Mascotas (PetoMatch)
- [x] Perfil de mascota (fotos, nombre, edad, raza, temperamento)
- [x] Swipe UI (derecha = like, izquierda = pass)
- [x] Sistema de matches
- [x] Chat entre dueños de mascotas matched

### 5. Tienda
- [x] Catálogo de productos
- [x] Carrito de compras
- [x] Checkout con Mercado Pago
- [x] Estados de orden: pending → paid → shipped → delivered
- [x] Envío a domicilio

### 6. Descuentos (PetoClub Aliados)
- [x] Lista de negocios (veterinarias, petshops, cafes, etc.)
- [x] Filtro por categoría
- [x] Detalle de descuento con código
- [x] Solo visible para miembros
- [x] Reseñas y ratings

### 7. Membresía Premium
- [x] Suscripción mensual via Mercado Pago
- [x] Acceso a descuentos exclusivos
- [x] 5% cashback en compras de tienda (futuro: puntos)
- [x] Prioridad en adopciones
- [x] Puntos acumulables por acciones

---

## User Roles

| Rol | Descripción |
|-----|-------------|
| `user` | Puede publicar mascotas, usar chat, ver blog |
| `member` | Todo lo anterior + acceso a descuentos + beneficios premium |
| `business` | Dueño de negocio - gestiona sus descuentos |
| `shelter` | Refugio - gestiona adopciones y recibe donaciones |
| `admin` | Gestiona todo |

---

## Rutas

```
/                          → Home
/login                     → Login
/register                  → Registro
/mascotas-perdidas         → Lista de reportes
/reportar                  → Publicar reporte
/mascota/:id               → Detalle de reporte
/tinder                    → PetoMatch
/chat                      → Mensajes
/tienda                    → Catálogo
/carrito                   → Carrito
/checkout                  → Checkout MP
/descuentos                → Lista de aliados (miembros)
/perfil                    → Mi perfil
/mascotas                  → Mis mascotas
/membresia                 → Suscripción
```

---

## Data Model (Supabase)

Ver archivo `supabase/migrations/001_initial_schema.sql`

---

## Convenciones

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`)
- **Naming:** camelCase (variables), PascalCase (componentes), kebab-case (archivos)
- **Responsive:** Mobile-first, breakpoints: sm(640), md(768), lg(1024)

---

_Last updated: 2026-03-27_
