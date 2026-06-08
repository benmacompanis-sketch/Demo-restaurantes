export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  tags: ProductTag[];
  available: boolean;
  featured?: boolean;
  rating?: number;
  prepTime?: string;
}

export type ProductTag = 'nuevo' | 'popular' | 'oferta' | 'vegano' | 'picante' | 'sin-tacc' | 'premium';

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  cost: number;
  description: string;
  neighborhoods: string[];
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  deliveryType: 'delivery' | 'pickup';
  deliveryZone?: DeliveryZone;
  subtotal: number;
  deliveryCost: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  heroImage: string;
  whatsappNumber: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  currency: string;
  currencySymbol: string;
  minOrderAmount: number;
  deliveryZones: DeliveryZone[];
}

export interface AdminUser {
  username: string;
  password: string;
}
