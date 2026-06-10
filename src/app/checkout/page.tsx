'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Package, CheckCircle, Truck, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/context/CartStore';
import { useOrderStore } from '@/context/OrderStore';
import { restaurantConfig } from '@/data/config';
import { formatPrice, generateWhatsAppMessage, openWhatsApp } from '@/lib/utils';
import { DeliveryZone } from '@/types';

type DeliveryType = 'delivery' | 'pickup';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const cartTotal = total();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(
    restaurantConfig.deliveryZones[0]
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryCost = deliveryType === 'delivery' && selectedZone ? selectedZone.cost : 0;
  const finalTotal = cartTotal + deliveryCost;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'El nombre es requerido';
    if (!phone.trim()) errs.phone = 'El teléfono es requerido';
    if (deliveryType === 'delivery' && !address.trim()) errs.address = 'La dirección es requerida';
    if (deliveryType === 'delivery' && !selectedZone) errs.zone = 'Selecciona una zona de envío';
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const msg = generateWhatsAppMessage(
      items,
      name,
      phone,
      address,
      deliveryType,
      deliveryCost,
      finalTotal,
      notes
    );

    addOrder({
      id: `ORD-${Date.now()}`,
      items: [...items],
      customer: { name, phone, address: address || undefined, notes: notes || undefined },
      deliveryType,
      deliveryZone: deliveryType === 'delivery' && selectedZone ? selectedZone : undefined,
      subtotal: cartTotal,
      deliveryCost,
      total: finalTotal,
      status: 'pending',
      createdAt: new Date(),
    });

    setSubmitted(true);
    clearCart();
    setTimeout(() => openWhatsApp(msg), 800);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4" style={{ background: 'var(--surface-0)' }}>
        <div className="text-center">
          <span className="text-6xl">🛒</span>
          <h2 className="font-black text-2xl mt-4" style={{ color: 'var(--text-1)' }}>Carrito vacío</h2>
          <p className="mt-2" style={{ color: 'var(--text-2)' }}>Agrega productos antes de continuar</p>
          <Link href="/menu" className="mt-6 inline-flex text-white font-bold px-6 py-3 rounded-xl transition-all hover:brightness-110" style={{ background: '#FF6B35' }}>
            Ver Menú
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4" style={{ background: 'var(--surface-0)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-3xl p-8 text-center max-w-md w-full"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(34,197,94,0.15)' }}
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
          <h2 className="font-black text-2xl mb-2" style={{ color: 'var(--text-1)' }}>¡Pedido enviado!</h2>
          <p className="mb-6" style={{ color: 'var(--text-2)' }}>
            Te estamos redirigiendo a WhatsApp para confirmar tu pedido con {restaurantConfig.name}.
          </p>
          <Link href="/" className="block text-white font-bold py-3 rounded-xl transition-all hover:brightness-110" style={{ background: '#FF6B35' }}>
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${
      errors[field]
        ? 'border border-red-500'
        : 'border border-[rgba(255,255,255,0.08)] focus:border-[#FF6B35]'
    }`;

  const inputStyle = { background: 'var(--surface-2)', color: 'var(--text-1)' };

  return (
    <div className="min-h-screen pt-16 sm:pt-[72px]" style={{ background: 'var(--surface-0)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-xl transition-all hover:bg-white/[0.06]" style={{ color: 'var(--text-2)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-black text-2xl sm:text-3xl" style={{ color: 'var(--text-1)' }}>Finalizar Pedido</h1>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5">
            {/* Delivery Type */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Package className="w-5 h-5 text-orange-500" />
                Tipo de Entrega
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'delivery' as const, icon: Truck, label: 'Delivery', desc: 'Entrega a domicilio' },
                  { id: 'pickup' as const, icon: Store, label: 'Retiro', desc: 'Retiro en el local' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setDeliveryType(opt.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        deliveryType === opt.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${deliveryType === opt.id ? 'text-orange-500' : 'text-gray-500'}`} />
                      <span className={`font-bold text-sm ${deliveryType === opt.id ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'}`}>
                        {opt.label}
                      </span>
                      <span className="text-xs text-gray-400">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
              <h2 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <span className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-black">2</span>
                Tus datos
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Nombre *</label>
                  <input
                    className={inputClass('name')}
                    placeholder="Tu nombre completo"
                    style={inputStyle}
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: '' })); }}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Teléfono *</label>
                  <input
                    className={inputClass('phone')}
                    placeholder="+54 9 11 1234-5678"
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: '' })); }}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Dirección *</label>
                  <input
                    className={inputClass('address')}
                    placeholder="Calle, número, piso, depto..."
                    style={inputStyle}
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setErrors((prev) => ({ ...prev, address: '' })); }}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Observaciones</label>
                <textarea
                  className={`${inputClass('notes')} resize-none`}
                  style={inputStyle}
                  rows={3}
                  placeholder="Sin cebolla, extra salsa, timbre piso 3..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Delivery Zones */}
            {deliveryType === 'delivery' && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
                <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Zona de Envío
                </h2>
                {errors.zone && <p className="text-xs text-red-500 mb-3">{errors.zone}</p>}
                <div className="space-y-2.5">
                  {restaurantConfig.deliveryZones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => { setSelectedZone(zone); setErrors((prev) => ({ ...prev, zone: '' })); }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        selectedZone?.id === zone.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div>
                        <p className={`font-bold text-sm ${selectedZone?.id === zone.id ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                          {zone.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {zone.neighborhoods.join(', ')}
                        </p>
                      </div>
                      <span className={`font-black text-sm ${zone.cost === 0 ? 'text-green-500' : selectedZone?.id === zone.id ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {zone.cost === 0 ? '¡GRATIS!' : formatPrice(zone.cost)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl sticky top-28" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <div className="p-5" style={{ borderBottom: '1px solid var(--border)' }}>
                <h2 className="font-bold" style={{ color: 'var(--text-1)' }}>Resumen del Pedido</h2>
              </div>

              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm text-orange-500 flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex justify-between text-sm" style={{ color: 'var(--text-2)' }}>
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between text-sm" style={{ color: 'var(--text-2)' }}>
                    <span>Envío {selectedZone ? `(${selectedZone.name})` : ''}</span>
                    <span className={`font-semibold ${deliveryCost === 0 ? 'text-green-500' : ''}`}>
                      {deliveryCost === 0 ? '¡GRATIS!' : formatPrice(deliveryCost)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-black text-lg pt-3" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-1)' }}>
                  <span>Total</span>
                  <span className="text-orange-500">{formatPrice(finalTotal)}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/25 mt-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Confirmar por WhatsApp
                </button>
                <p className="text-xs text-center text-gray-400">
                  Serás redirigido a WhatsApp para confirmar tu pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
