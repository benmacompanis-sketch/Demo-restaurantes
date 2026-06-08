import { RestaurantConfig } from '@/types';

export const restaurantConfig: RestaurantConfig = {
  name: 'La Brasa Grill',
  tagline: 'Sabores que enamoran',
  description:
    'Restaurante premium con las mejores hamburguesas, pizzas artesanales y más. Ingredientes frescos, sabores únicos.',
  logo: '/images/logo.png',
  heroImage: '/images/hero.jpg',
  whatsappNumber: '5491112345678',
  address: 'Av. Corrientes 1234, CABA, Buenos Aires',
  phone: '+54 9 11 1234-5678',
  email: 'hola@labrasagrill.com',
  hours: {
    'Lunes - Jueves': '12:00 - 23:00',
    'Viernes - Sábado': '12:00 - 00:30',
    Domingo: '13:00 - 23:00',
  },
  socialMedia: {
    instagram: 'https://instagram.com/labrasagrill',
    facebook: 'https://facebook.com/labrasagrill',
    tiktok: 'https://tiktok.com/@labrasagrill',
  },
  theme: {
    primaryColor: '#FF4500',
    secondaryColor: '#1A1A2E',
    accentColor: '#FFC107',
  },
  currency: 'ARS',
  currencySymbol: '$',
  minOrderAmount: 2000,
  deliveryZones: [
    {
      id: 'zone-1',
      name: 'Zona 1',
      cost: 0,
      description: 'Delivery gratis',
      neighborhoods: ['Palermo', 'Recoleta', 'Belgrano', 'Núñez'],
    },
    {
      id: 'zone-2',
      name: 'Zona 2',
      cost: 1000,
      description: '$1.000',
      neighborhoods: ['Almagro', 'Caballito', 'Villa Crespo', 'Colegiales'],
    },
    {
      id: 'zone-3',
      name: 'Zona 3',
      cost: 2000,
      description: '$2.000',
      neighborhoods: ['San Telmo', 'La Boca', 'Barracas', 'Boedo'],
    },
  ],
};
