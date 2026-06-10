'use client';

import { useState } from 'react';
import { Plus, Star, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/context/CartStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  if (layout === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 rounded-2xl p-3.5 transition-all card-hover"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
      >
        <div className="relative flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover" />
          {!product.available && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">No disponible</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-wrap gap-1 mb-1">
            {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
          </div>
          <h3 className="font-bold text-sm sm:text-[15px] truncate" style={{ color: 'var(--text-1)' }}>{product.name}</h3>
          <p className="text-xs sm:text-sm mt-0.5 line-clamp-2 flex-1" style={{ color: 'var(--text-2)' }}>{product.description}</p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-base sm:text-lg" style={{ color: '#FF6B35' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through" style={{ color: 'var(--text-3)' }}>{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              disabled={!product.available}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white"
              style={{ background: added ? '#16a34a' : '#FF6B35', boxShadow: added ? '0 4px 14px rgba(22,163,74,0.35)' : '0 4px 14px rgba(255,107,53,0.35)' }}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {added ? 'Agregado' : 'Agregar'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl overflow-hidden flex flex-col card-hover"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <span className="text-white text-sm font-bold px-3 py-1 rounded-full bg-black/50">No disponible</span>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
        </div>
        {discount && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-white text-xs font-black bg-red-500">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-sm leading-tight line-clamp-1 flex-1" style={{ color: 'var(--text-1)' }}>{product.name}</h3>
          {product.rating && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-xs line-clamp-2 flex-1 mb-3" style={{ color: 'var(--text-2)' }}>{product.description}</p>

        {product.prepTime && (
          <div className="flex items-center gap-1.5 mb-3">
            <Clock className="w-3 h-3" style={{ color: 'var(--text-3)' }} />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{product.prepTime}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-black text-[17px] leading-none" style={{ color: '#FF6B35' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs ml-1.5 line-through" style={{ color: 'var(--text-3)' }}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            disabled={!product.available}
            className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed text-white"
            style={{
              background: added ? '#16a34a' : '#FF6B35',
              boxShadow: added ? '0 4px 16px rgba(22,163,74,0.4)' : '0 4px 16px rgba(255,107,53,0.4)',
              transition: 'background 300ms, box-shadow 300ms',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  <Check className="w-[18px] h-[18px]" />
                </motion.div>
              ) : (
                <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Plus className="w-[18px] h-[18px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
