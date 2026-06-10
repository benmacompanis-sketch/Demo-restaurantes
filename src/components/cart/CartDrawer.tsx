'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Flame } from 'lucide-react';
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] z-50 flex flex-col"
            style={{ background: 'var(--surface-1)', borderLeft: '1px solid var(--border)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,53,0.15)' }}>
                  <ShoppingCart className="w-4.5 h-4.5" style={{ color: '#FF6B35' }} />
                </div>
                <div>
                  <h2 className="font-black text-[15px] leading-tight" style={{ color: 'var(--text-1)' }}>Tu Pedido</h2>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                    {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl transition-all hover:bg-white/[0.06]"
                style={{ color: 'var(--text-2)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                  >
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5" style={{ background: 'var(--surface-2)' }}>
                      <ShoppingCart className="w-9 h-9" style={{ color: 'var(--text-3)' }} />
                    </div>
                    <p className="font-black text-lg mb-1.5" style={{ color: 'var(--text-1)' }}>Carrito vacío</p>
                    <p className="text-sm mb-7" style={{ color: 'var(--text-2)' }}>Agregá productos del menú para comenzar</p>
                    <Link
                      href="/menu"
                      onClick={closeCart}
                      className="font-bold text-sm px-6 py-3 rounded-xl text-white transition-all active:scale-95"
                      style={{ background: '#FF6B35', boxShadow: '0 4px 20px rgba(255,107,53,0.4)' }}
                    >
                      Explorar Menú
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
                      className="flex gap-3.5 rounded-2xl p-3"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-1)' }}>
                          {item.product.name}
                        </p>
                        <p className="font-bold text-sm mt-0.5" style={{ color: '#FF6B35' }}>
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.08]"
                              style={{ border: '1px solid var(--border-strong)' }}
                            >
                              <Minus className="w-3 h-3" style={{ color: 'var(--text-2)' }} />
                            </button>
                            <span className="w-5 text-center font-black text-sm" style={{ color: 'var(--text-1)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all hover:brightness-110"
                              style={{ background: '#FF6B35' }}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
                            style={{ color: 'var(--text-3)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
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
              <div className="p-5 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm" style={{ color: 'var(--text-2)' }}>Subtotal</span>
                  <span className="font-black text-xl" style={{ color: 'var(--text-1)' }}>{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>El costo de envío se calcula al finalizar.</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full font-bold py-4 rounded-2xl text-white text-sm transition-all active:scale-[0.98] hover:brightness-110"
                  style={{ background: '#FF6B35', boxShadow: '0 8px 28px rgba(255,107,53,0.45)' }}
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
