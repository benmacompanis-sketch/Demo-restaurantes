'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/menu/ProductCard';
import type { ProductTag } from '@/types';

type FilterTag = ProductTag | 'all';

const tagFilters: { id: ProductTag; label: string }[] = [
  { id: 'popular', label: '🔥 Popular' },
  { id: 'nuevo', label: '✨ Nuevo' },
  { id: 'oferta', label: '💥 Oferta' },
  { id: 'vegano', label: '🌱 Vegano' },
  { id: 'picante', label: '🌶 Picante' },
];

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeTags, setActiveTags] = useState<ProductTag[]>([]);
  const [activeTagFilter, setActiveTagFilter] = useState<FilterTag>('all');

  const toggleTag = (tag: ProductTag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.categoryId === activeCategory;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchTags = activeTags.length === 0 || activeTags.some((t) => p.tags.includes(t));
      return matchCat && matchSearch && matchTags;
    });
  }, [activeCategory, search, activeTags]);

  const allCategories = [{ id: 'all', name: 'Todos', icon: '🍽️', order: -1 }, ...categories];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex gap-8 py-8">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Menú
              </p>
              <nav className="space-y-1">
                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                    style={{
                      borderLeft: activeCategory === cat.id ? '2px solid #FF6B35' : '2px solid transparent',
                      backgroundColor: activeCategory === cat.id ? 'rgba(255,107,53,0.05)' : 'transparent',
                      color: activeCategory === cat.id ? '#FF6B35' : 'rgba(255,255,255,0.4)',
                      paddingLeft: '12px',
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            {/* Sticky search bar */}
            <div
              className="sticky top-20 z-30 py-4 mb-6"
              style={{ backgroundColor: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)' }}
            >
              {/* Search input */}
              <div className="relative mb-3">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                />
                <input
                  type="text"
                  placeholder="Buscar platos, ingredientes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#F5F5F0',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#FF6B35'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  </button>
                )}
              </div>

              {/* Filter chips */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTags([])}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: activeTags.length === 0 ? '#FF6B35' : 'rgba(255,255,255,0.06)',
                    color: activeTags.length === 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  Todos
                </button>
                {tagFilters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleTag(f.id)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: activeTags.includes(f.id) ? '#FF6B35' : 'rgba(255,255,255,0.06)',
                      color: activeTags.includes(f.id) ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
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
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-semibold transition-all flex-shrink-0"
                    style={{
                      backgroundColor: activeCategory === cat.id ? '#FF6B35' : 'rgba(255,255,255,0.06)',
                      color: activeCategory === cat.id ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <span className="font-bold text-white">{filteredProducts.length}</span>{' '}
                {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </p>
              {(search || activeTags.length > 0 || activeCategory !== 'all') && (
                <button
                  onClick={() => { setSearch(''); setActiveTags([]); setActiveCategory('all'); }}
                  className="text-xs font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: '#FF6B35' }}
                >
                  <X className="w-3 h-3" /> Limpiar filtros
                </button>
              )}
            </div>

            {/* Products grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <span className="text-6xl mb-4">🔍</span>
                  <p className="font-bold text-xl text-white">No encontramos resultados</p>
                  <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Intenta con otras palabras o filtros
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeCategory}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} layout="grid" />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
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
