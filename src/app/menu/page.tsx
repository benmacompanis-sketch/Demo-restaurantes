'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as staticProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/menu/ProductCard';
import { supabase } from '@/lib/supabase';
import type { Product, ProductTag } from '@/types';

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

  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeTags, setActiveTags] = useState<ProductTag[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    supabase.from('products').select('*').order('category_id').then(({ data }) => {
      if (data?.length) {
        setProducts(data.map((r) => ({
          id: r.id, name: r.name, description: r.description ?? '',
          price: r.price, originalPrice: r.original_price ?? undefined,
          image: r.image ?? '', categoryId: r.category_id,
          tags: r.tags ?? [], available: r.available, featured: r.featured ?? false,
          rating: r.rating ?? undefined, prepTime: r.prep_time ?? undefined,
        })));
      }
    });
  }, []);

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
    <div className="min-h-screen pt-16 sm:pt-[72px]" style={{ background: 'var(--surface-0)' }}>

      {/* Sticky toolbar */}
      <div className="sticky top-16 sm:top-[72px] z-30" style={{ background: 'rgba(9,9,11,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Search + controls */}
          <div className="flex items-center gap-3 py-3.5">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-3)' }} />
              <input
                type="text"
                placeholder="Buscar platos, ingredientes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-1)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#FF6B35')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4" style={{ color: 'var(--text-3)' }} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 rounded-xl transition-all"
              style={{
                background: activeTags.length > 0 ? '#FF6B35' : 'var(--surface-2)',
                border: `1px solid ${activeTags.length > 0 ? '#FF6B35' : 'var(--border)'}`,
                color: activeTags.length > 0 ? '#fff' : 'var(--text-2)',
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {(['grid', 'list'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l)}
                  className="p-2.5 transition-all"
                  style={{
                    background: layout === l ? '#FF6B35' : 'var(--surface-2)',
                    color: layout === l ? '#fff' : 'var(--text-2)',
                  }}
                >
                  {l === 'grid' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
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
                <div className="flex flex-wrap gap-2 pb-3">
                  {tagFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleTag(f.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: activeTags.includes(f.id) ? '#FF6B35' : 'var(--surface-3)',
                        color: activeTags.includes(f.id) ? '#fff' : 'var(--text-2)',
                        border: `1px solid ${activeTags.includes(f.id) ? '#FF6B35' : 'var(--border)'}`,
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-3.5 hide-scrollbar">
            {allCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-sm font-semibold transition-all flex-shrink-0"
                  style={{
                    background: active ? '#FF6B35' : 'var(--surface-2)',
                    color: active ? '#fff' : 'var(--text-2)',
                    border: `1px solid ${active ? '#FF6B35' : 'var(--border)'}`,
                    boxShadow: active ? '0 4px 16px rgba(255,107,53,0.3)' : 'none',
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            <span className="font-bold" style={{ color: 'var(--text-1)' }}>{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
          {(search || activeTags.length > 0 || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearch(''); setActiveTags([]); setActiveCategory('all'); }}
              className="text-xs font-semibold flex items-center gap-1 transition-all"
              style={{ color: '#FF6B35' }}
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
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <span className="text-6xl mb-5">🔍</span>
              <p className="font-black text-xl mb-2" style={{ color: 'var(--text-1)' }}>Sin resultados</p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Intentá con otras palabras o filtros</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${layout}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
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
