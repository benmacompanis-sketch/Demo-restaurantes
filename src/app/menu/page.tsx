'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/menu/ProductCard';
import type { ProductTag } from '@/types';

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
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search + Layout */}
          <div className="flex items-center gap-3 py-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar platos, ingredientes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-orange-400 focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border transition-all ${
                activeTags.length > 0
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2.5 transition-all ${layout === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2.5 transition-all ${layout === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tag filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pb-4">
                  {tagFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleTag(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTags.includes(f.id)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition-all flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-950/30'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
          </p>
          {(search || activeTags.length > 0 || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearch(''); setActiveTags([]); setActiveCategory('all'); }}
              className="text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Limpiar filtros
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <span className="text-6xl mb-4">🔍</span>
              <p className="font-bold text-xl text-gray-700 dark:text-gray-300">No encontramos resultados</p>
              <p className="text-gray-400 mt-1 text-sm">Intenta con otras palabras o filtros</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${layout}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                  : 'space-y-3 max-w-3xl'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={layout} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
