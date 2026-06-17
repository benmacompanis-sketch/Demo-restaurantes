'use client';

import { supabase } from '@/lib/supabase';
import { Order, OrderStatus } from '@/types';

export async function insertOrder(order: Order): Promise<void> {
  const { error: orderErr } = await supabase.from('orders').insert({
    id: order.id,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    customer_address: order.customer.address ?? null,
    customer_notes: order.customer.notes ?? null,
    delivery_type: order.deliveryType,
    delivery_zone_id: order.deliveryZone?.id ?? null,
    delivery_zone_name: order.deliveryZone?.name ?? null,
    delivery_cost: order.deliveryCost,
    subtotal: order.subtotal,
    total: order.total,
    status: order.status,
  });
  if (orderErr) throw orderErr;

  if (order.items.length > 0) {
    const { error: itemsErr } = await supabase.from('order_items').insert(
      order.items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        notes: item.notes ?? null,
      }))
    );
    if (itemsErr) throw itemsErr;
  }
}

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function setOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function removeOrder(id: string): Promise<void> {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}

export async function clearOrders(): Promise<void> {
  const { error } = await supabase.from('orders').delete().neq('id', '');
  if (error) throw error;
}

// ── Map Supabase row → Order type ────────────────────────────
function mapRow(row: Record<string, unknown>): Order {
  const items = (row.order_items as Record<string, unknown>[] ?? []).map((item) => ({
    product: {
      id: (item.product_id as string) ?? '',
      name: item.product_name as string,
      price: item.product_price as number,
      description: '',
      image: '',
      categoryId: '',
      tags: [] as [],
      available: true,
    },
    quantity: item.quantity as number,
    notes: (item.notes as string) ?? undefined,
  }));

  return {
    id: row.id as string,
    items,
    customer: {
      name: row.customer_name as string,
      phone: row.customer_phone as string,
      address: (row.customer_address as string) ?? undefined,
      notes: (row.customer_notes as string) ?? undefined,
    },
    deliveryType: row.delivery_type as 'delivery' | 'pickup',
    deliveryZone: row.delivery_zone_id
      ? {
          id: row.delivery_zone_id as string,
          name: (row.delivery_zone_name as string) ?? '',
          cost: row.delivery_cost as number,
          description: '',
          neighborhoods: [],
        }
      : undefined,
    subtotal: row.subtotal as number,
    deliveryCost: row.delivery_cost as number,
    total: row.total as number,
    status: row.status as OrderStatus,
    createdAt: new Date(row.created_at as string),
  };
}
