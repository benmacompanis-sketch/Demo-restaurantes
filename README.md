# La Brasa Grill — Plantilla Web para Restaurantes

Aplicación web completa y moderna para restaurantes, lista para producción. Diseñada para ser personalizable y vendible a distintos clientes.

**Demo:** https://benmacompanis-sketch.github.io/Demo-restaurantes/

## Stack

- **Next.js 16** + App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animaciones
- **Zustand** — carrito persistente
- **Lucide Icons**

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Home con hero, productos destacados, promociones |
| `/menu` | Menú digital con búsqueda y filtros |
| `/checkout` | Checkout con delivery/retiro y zonas |
| `/admin` | Panel administrativo (password: `admin123`) |

## Funcionalidades

- **Menú digital** con categorías, búsqueda y filtros por etiqueta
- **Carrito** con persistencia en localStorage
- **Sistema de delivery** con zonas de costo configurable
- **WhatsApp** — genera mensaje automático con el pedido completo
- **Panel admin** — CRUD de productos, categorías, promociones
- **Modo oscuro** persistente
- **Mobile First** — totalmente responsive

## Personalización

Todo el restaurante se configura en un solo archivo:

```ts
// src/data/config.ts
export const restaurantConfig = {
  name: 'Tu Restaurante',
  whatsappNumber: '549XXXXXXXXXX',
  address: 'Av. ...',
  // colores, horarios, redes, zonas de envío...
}
```

Los productos y categorías se modifican en:
- `src/data/products.ts`
- `src/data/categories.ts`

## Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

El proyecto se despliega automáticamente en GitHub Pages via GitHub Actions con cada push.
