'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/context/CartStore';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCartStore();
  const cartTotal = total();
  const cartCount = count();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ backgroundColor: '#141414', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,107,53,0.12)' }}
                >
                  <ShoppingCart className="w-4 h-4" style={{ color: '#FF6B35' }} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-base">Tu Pedido</h2>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <ShoppingCart className="w-9 h-9" style={{ color: 'rgba(255,255,255,0.15)' }} />
                    </div>
                    <p className="font-semibold text-white mb-1">Carrito vacío</p>
                    <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Explorá el menú y agregá tus platos favoritos
                    </p>
                    <Link
                      href="/menu"
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                      style={{ backgroundColor: '#FF6B35' }}
                    >
                      Ver Menú
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      className="flex gap-3 p-3 rounded-2xl"
                      style={{ backgroundColor: '#1A1A1A' }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">{item.product.name}</p>
                        <p className="text-sm font-bold mt-0.5" style={{ color: '#FF6B35' }}>
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-bold text-white text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                              style={{ backgroundColor: '#FF6B35' }}
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Total</span>
                  <span className="font-display font-bold text-white text-2xl">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  El costo de envío se calcula al confirmar el pedido.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-white text-sm transition-all"
                  style={{ backgroundColor: '#FF6B35' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e85a28'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF6B35'; }}
                >
                  Finalizar Pedido
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
