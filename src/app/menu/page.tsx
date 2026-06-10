'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Plus, Minus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/menu/ProductCard';
import { useCartStore } from '@/context/CartStore';
import { formatPrice } from '@/lib/utils';
import type { ProductTag } from '@/types';

const tagFilters: { id: ProductTag | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'popular', label: '🔥 Populares' },
  { id: 'nuevo', label: '✨ Nuevos' },
  { id: 'oferta', label: '💥 Ofertas' },
  { id: 'vegano', label: '🌱 Vegano' },
];

function CartPanel() {
  const { items, total, count, removeItem, updateQuantity, closeCart } = useCartStore();
  const cartTotal = total();
  const cartCount = count();

  return (
    <aside className="hidden lg:flex w-80 flex-col bg-[#161616] border-l border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500/15 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-4.5 h-4.5 text-orange-400" />
          </div>
          <div>
            <h2 className="font-black text-white text-base">Tu pedido</h2>
            <p className="text-xs text-gray-500">{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-center"
            >
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-3">
                <ShoppingCart className="w-7 h-7 text-gray-600" />
              </div>
              <p className="text-gray-400 font-semibold text-sm">Carrito vacío</p>
              <p className="text-gray-600 text-xs mt-1">Agregá productos del menú</p>
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16, height: 0 }}
                className="flex gap-3 bg-[#1e1e1e] border border-white/5 rounded-xl p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-xs truncate">{item.product.name}</p>
                  <p className="text-orange-400 font-bold text-xs mt-0.5">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/40 transition-all"
                      >
                        <Minus className="w-3 h-3 text-gray-400" />
                      </button>
                      <span className="w-5 text-center font-bold text-white text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-all"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 rounded-md hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="font-black text-white text-xl">{formatPrice(cartTotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-orange-500/20"
          >
            Finalizar Pago
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </aside>
  );
}

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeTag, setActiveTag] = useState<ProductTag | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.categoryId === activeCategory;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchTag = activeTag === 'all' || p.tags.includes(activeTag as ProductTag);
      return matchCat && matchSearch && matchTag;
    });
  }, [activeCategory, search, activeTag]);

  const allCategories = [{ id: 'all', name: 'Todos', icon: '🍽️', order: -1 }, ...categories];

  return (
    <div className="flex h-screen pt-16 sm:pt-20 overflow-hidden bg-[#111111]">
      {/* Left sidebar */}
      <aside className="hidden lg:flex w-52 flex-col bg-[#161616] border-r border-white/5 flex-shrink-0">
        {/* Brand */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-black">B</span>
            </div>
            <div>
              <p className="font-black text-white text-sm leading-none">La Brasa Grill</p>
              <p className="text-orange-400 text-[10px] mt-0.5">Premium</p>
            </div>
          </div>
        </div>

        {/* Category nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeCategory === cat.id
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-base flex-shrink-0">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>

        {/* Bottom: Admin link */}
        <div className="p-3 border-t border-white/5">
          <Link
            href="/admin"
            className="block w-full text-center px-3 py-2 rounded-xl bg-white/4 text-gray-500 hover:text-gray-300 text-xs font-medium transition-all hover:bg-white/8"
          >
            Panel Admin
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Search + filters bar */}
        <div className="bg-[#161616] border-b border-white/5 px-4 py-3 flex-shrink-0">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Buscar platos, ingredientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#222] border border-white/5 focus:border-orange-500/40 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Tag filter chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {tagFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTag(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTag === f.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#222] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Mobile categories */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-3 lg:hidden">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#222] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        <div className="px-4 py-2.5 border-b border-white/5 flex-shrink-0 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            <span className="font-bold text-gray-300">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
          {(search || activeTag !== 'all' || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearch(''); setActiveTag('all'); setActiveCategory('all'); }}
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Limpiar
            </button>
          )}
        </div>

        {/* Products grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <span className="text-6xl mb-4">🔍</span>
                <p className="font-bold text-lg text-gray-300">No encontramos resultados</p>
                <p className="text-gray-600 mt-1 text-sm">Intenta con otras palabras o filtros</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${activeTag}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right cart panel (desktop) */}
      <CartPanel />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
