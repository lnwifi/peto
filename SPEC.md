# Club Patitas — SPEC.md

> Red social pet-friendly para Argentina. Ayudar a la comunidad + generar ingresos sustentables.

---

## 1. Concepto & Visión

**Club Patitas** es una comunidad digital para dueños de mascotas en Argentina. Combina utilidad real (mascotas perdidas, adopción, tienda) con conexión social (tinder de mascotas, chat, puntos). La experiencia debe sentirse cálida, confiable y humana — no un marketplace frío.

**Tagline:** *"Donde cada patita importa"*

**Tono:** Cercano, empático, positivo. Como un amigo que también ama las mascotas.

---

## 2. Design Language

### Paleta de colores (propuesta)
| Rol | Color | Hex |
|-----|-------|-----|
| Primary | Coral cálido | `#FF6B6B` |
| Secondary | Verde menta | `#4ECDC4` |
| Acento | Amarillo dorado | `#FFE66D` |
| Fondo | Crema suave | `#FFF9F0` |
| Texto | Carbón | `#2D3436` |
| Error | Rojo | `#E74C3C` |
| Éxito | Verde | `#27AE60` |

### Tipografía
- **Títulos:** Nunito (bold, rounded, friendly)
- **Cuerpo:** Inter (legible, moderna)
- **Fallback:** system-ui, sans-serif

### Formas & Espaciado
- Bordes redondeados: 12px–16px
- Sombras suaves: `0 4px 12px rgba(0,0,0,0.08)`
- Espaciado base: 8px (múltiplos de 8)

### Iconografía
- Lucide Icons (outline, stroke 2px)
- Emojis para elementos emocionales (🐾, ❤️, 🎉)

### Ilustraciones
- Estilo flat/isométrico para mascotas
- Fotos reales de mascotas en cards (user-generated)

---

## 3. Tech Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + Vite |
| Backend | Supabase (Postgres, Auth, Storage, Realtime) |
| Estilos | Tailwind CSS |
| Router | React Router v6 |
| Payments | Mercado Pago (Checkout Pro + Webhooks) |
| Maps | Mapbox GL JS o Leaflet (mascotas perdidas) |
| Push Notifications | Supabase Realtime + Firebase Cloud Messaging |
| Hosting | Vercel / Netlify (frontend) + Supabase Cloud |

---

## 4. User Roles

| Rol | Descripción |
|-----|-------------|
| **Usuario libre** | Puede publicar mascotas perdidas/encontradas, ver mapa, chatear, acceder al blog |
| **Usuario miembro** | Todo lo anterior + acceso a descuentos exclusivos + tienda sin comisión + puntos |
| **Negocio/Partner** | Carga y gestiona sus propios descuentos, ve métricas básicas |
| **Refugio** | Carga mascotas para adopción, recibe donaciones, chat con postulantes |
| **Admin** | Gestiona todo: usuarios, reportes, moderation, payouts a refugios |

---

## 5. Funcionalidades Core

### 5.1 Autenticación
- Login con email/password
- Login con Google
- Login con teléfono (SMS via Supabase)
- Verificación de email obligatoria
- Recuperación de contraseña

### 5.2 Reporte de Mascotas Perdidas/Encontradas
- Formulario: foto, descripción, ubicación exacta (mapa interactivo), fecha, contacto
- Estado: perdida → encontrada → reunida (automático o manual)
- Visibilidad: radio de 5km–50km (configurable por usuario)
- Notificaciones push a usuarios en la zona
- Contador de "vistas" y "¿la viste?" (botón para reportar avistaje)
- Historial de reportes del usuario

### 5.3 Descuentos (Partners)
- Lista de negocios por categoría: veterinarias, pet shops, paseadores, petfriendly cafes, etc.
- Filtro por ubicación (mapa + lista)
- Cada descuento: título, % off, descripción, código, fecha validez, foto del lugar
- Solo visible para usuarios con membresía activa
- Valoración y reseñas de usuarios (1–5 estrellas)

### 5.4 Tinder de Mascotas (Play Dates)
- Perfil de cada mascota del usuario (fotos, nombre, edad, raza, temperamento)
- Sistema de swipes: derecha = me gusta, izquierda = paso
- Match cuando ambos se gustaron → chat habilitado
- Filtros: especie, tamaño, edad, zona, temperamento
- Chat integrado para coordinar encuentro

### 5.5 Adopciones (Refugios)
- Refugios cargan mascotas con: fotos, descripción, edad, historia, necesidades especiales
- Postulantes aplican via formulario + chat
- El refugio selecciona y da de baja las otras postulaciones
- Sistema de seguimiento post-adopción (check-ins opcionales)
- Donaciones directas al refugio (% de membresías + tienda)

### 5.6 Tienda (Stock Propio)
- Catálogo: alimento, accesorios, toys, salud
- Carrito de compras
- Checkout con Mercado Pago (tarjeta, PIX, Mercado Pago wallet)
- Envío a domicilio (cálculo de costo por zona o gratis arriba de $X)
- Estados: pendiente → pagado → enviado → entregado
- Sección ofertas/descuentos (solo para miembros)

### 5.7 Sistema de Puntos
- Acciones que dan puntos:
  - Reportar mascota perdida: +5 pts
  - Mascota reunida: +20 pts
  - Completar perfil de mascota: +3 pts
  - Reseña en negocio: +2 pts
  - Compra en tienda: 1 punto por cada $100
  - Donación a refugio: +10 pts
- Canjes: descuentos en tienda, meses de membresía gratis, productos exclusive

### 5.8 Chat
- Chat en tiempo real entre usuarios (swipe matches, avistajes)
- Chat entre refugio y postulantes
- Notificaciones de mensajes nuevos
- Indicador de "visto"

### 5.9 Pasaporte de Mascota
- Datos: nombre, especie, raza, fecha nacimiento, peso
- Vacunas: nombre, fecha, próxima fecha, veterinario
- Desparasitación: fecha, producto
- Alergias, medicamentos actuales
- Compartir historial con veterinarias (link mágico con expiry)

### 5.10 Blog / Consejos
- Artículos de cuidado, salud, entrenamiento, adopción responsable
- Categorías: Perros, Gatos, Exóticas, General
- SEO optimizado
- Comentarios y reacciones

### 5.11 Alertas por Zona
- Si una mascota se reporta perdida en radio <5km de mi ubicación
- Notificación push al instante
- Ver en mapa todas las mascotas perdidas activas en mi zona

---

## 6. Data Model (Supabase / PostgreSQL)

```
users
  - id (uuid)
  - email
  - phone
  - full_name
  - avatar_url
  - role (user | member | business | shelter | admin)
  - member_since
  - points_balance
  - created_at

pets
  - id (uuid)
  - owner_id (fk users)
  - name
  - species (perro | gato | otro)
  - breed
  - birth_date
  - weight
  - temperament
  - photos (array)
  - description
  - created_at

lost_found_reports
  - id (uuid)
  - user_id (fk users)
  - pet_id (fk pets, nullable — si es sin registrar)
  - type (lost | found)
  - status (active | reunited | closed)
  - description
  - last_seen_location (geography)
  - last_seen_date
  - photo
  - views_count
  - created_at

swipes
  - id (uuid)
  - user_id (fk users)
  - target_pet_id (fk pets)
  - direction (right | left)
  - created_at

matches
  - id (uuid)
  - user_id (fk users)
  - pet1_id (fk pets)
  - pet2_id (fk pets)
  - created_at

messages
  - id (uuid)
  - match_id (fk matches)
  - sender_id (fk users)
  - content
  - read_at
  - created_at

businesses
  - id (uuid)
  - owner_id (fk users)
  - name
  - category (veterinaria | petshop | cafe | otro)
  - address
  - location (geography)
  - logo_url
  - description
  - is_active
  - created_at

discounts
  - id (uuid)
  - business_id (fk businesses)
  - title
  - description
  - discount_percent
  - code
  - valid_from
  - valid_until
  - is_active
  - created_at

reviews
  - id (uuid)
  - user_id (fk users)
  - business_id (fk businesses)
  - rating (1-5)
  - comment
  - created_at

adoption_posts
  - id (uuid)
  - shelter_id (fk users)
  - pet_id (fk pets)
  - title
  - story
  - needs (string)
  - status (open | closed | adopted)
  - created_at

adoption_applications
  - id (uuid)
  - adoption_post_id (fk adoption_posts)
  - applicant_id (fk users)
  - message
  - status (pending | approved | rejected)
  - created_at

shop_products
  - id (uuid)
  - name
  - description
  - price (en centavos)
  - category
  - images (array)
  - stock
  - is_active

shop_orders
  - id (uuid)
  - user_id (fk users)
  - status (pending | paid | shipped | delivered | cancelled)
  - total_amount
  - shipping_address
  - mercado_pago_payment_id
  - created_at

order_items
  - id (uuid)
  - order_id (fk shop_orders)
  - product_id (fk shop_products)
  - quantity
  - unit_price

vaccination_records
  - id (uuid)
  - pet_id (fk pets)
  - vaccine_name
  - date
  - next_date
  - veterinarian
  - created_at

points_transactions
  - id (uuid)
  - user_id (fk users)
  - amount (positive | negative)
  - reason
  - created_at

donations
  - id (uuid)
  - from_user_id (fk users)
  - to_shelter_id (fk users)
  - amount
  - created_at

blog_posts
  - id (uuid)
  - title
  - slug
  - content
  - category
  - cover_image
  - author_id (fk users)
  - published_at
  - created_at
```

---

## 7. Mercado Pago Integration

### Checkout Flow
1. Usuario agrega productos al carrito
2. Click en "Finalizar compra" → se crea orden en `shop_orders` (status: pending)
3. Se genera preferencia de pago via Mercado Pago API
4. Redirigir a Mercado Pago Checkout Pro
5. Webhook (MP → backend) actualiza orden a `paid` y descuenta stock
6. Email de confirmación al usuario

### Membresías
- Suscripción mensual/anual via Mercado Pago Recurring
- Webhook actualiza `users.role` a `member` + setea `member_until`

### Comisión a Refugios
- Por cada membresía activa: 10% va a fondo de refugio (distribuido proporcionalmente)
- Por cada compra en tienda: 5% va al fondo
- Admin define distribución manual o automática

---

## 8. Roadmap de Desarrollo

### Fase 1 — Foundation (Semanas 1–3)
- [ ] Proyecto React + Vite + Tailwind + Supabase (setup)
- [ ] Auth (email, Google)
- [ ] Base de datos (todas las tablas)
- [ ] Perfil de usuario + CRUD mascotas
- [ ] RLS policies en Supabase

### Fase 2 — Core Social (Semanas 4–6)
- [ ] Reportes lost/found + mapa
- [ ] Tinder swipes + matches
- [ ] Chat en tiempo real (matches)

### Fase 3 — Monetización (Semanas 7–9)
- [ ] Membresías con Mercado Pago
- [ ] Descuentos (CRUD negocios + lista)
- [ ] Reviews de negocios

### Fase 4 — Shop (Semanas 10–12)
- [ ] Catálogo + carrito
- [ ] Checkout Mercado Pago
- [ ] Órdenes + tracking

### Fase 5 — Adopciones (Semanas 13–14)
- [ ] CRUD adopción por refugios
- [ ] Aplicaciones + chat refugio/postulante
- [ ] Sistema de donación (% de revenue)

### Fase 6 — Extras (Semanas 15–16)
- [ ] Sistema de puntos
- [ ] Pasaporte de mascota
- [ ] Blog
- [ ] Notificaciones push
- [ ] Mapa de alertas por zona

---

## 9. Archivos del Proyecto

```
club-patitas/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── contexts/
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── mercadoPago.ts
│   ├── types/
│   └── utils/
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── public/
├── SPEC.md
└── package.json
```

---

## 10. Convenciones

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Naming:** camelCase para variables/funciones, PascalCase para componentes/hooks, kebab-case para archivos
- **Colores:** usar variables CSS de Tailwind (custom theme en tailwind.config.js)
- **Responsive:** mobile-first, breakpoints: sm(640), md(768), lg(1024), xl(1280)

---

_Última actualización: 2026-03-27_
