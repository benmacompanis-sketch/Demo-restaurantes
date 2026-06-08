import { CartItem } from '@/types';
import { restaurantConfig } from '@/data/config';

export function formatPrice(price: number): string {
  return `${restaurantConfig.currencySymbol}${price.toLocaleString('es-AR')}`;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
}

export function calculateCartCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

export function generateWhatsAppMessage(
  items: CartItem[],
  customerName: string,
  customerPhone: string,
  address: string,
  deliveryType: 'delivery' | 'pickup',
  deliveryCost: number,
  total: number,
  notes?: string
): string {
  const itemsList = items
    .map((item) => `• ${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}`)
    .join('\n');

  const subtotal = calculateCartTotal(items);

  let message = `🍽️ *NUEVO PEDIDO - ${restaurantConfig.name}*\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `📱 *Teléfono:* ${customerPhone}\n`;

  if (deliveryType === 'delivery') {
    message += `📍 *Dirección:* ${address}\n`;
    message += `🚗 *Tipo:* Delivery\n`;
  } else {
    message += `🏪 *Tipo:* Retiro en local\n`;
  }

  message += `\n📋 *PRODUCTOS:*\n${itemsList}\n`;
  message += `\n💰 *Subtotal:* ${formatPrice(subtotal)}`;

  if (deliveryType === 'delivery' && deliveryCost > 0) {
    message += `\n🚗 *Envío:* ${formatPrice(deliveryCost)}`;
  } else if (deliveryType === 'delivery' && deliveryCost === 0) {
    message += `\n🚗 *Envío:* ¡GRATIS!`;
  }

  message += `\n💵 *TOTAL: ${formatPrice(total)}*`;

  if (notes) {
    message += `\n\n📝 *Observaciones:* ${notes}`;
  }

  message += `\n\n⏰ ${new Date().toLocaleString('es-AR')}`;

  return encodeURIComponent(message);
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${message}`;
  window.open(url, '_blank');
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
