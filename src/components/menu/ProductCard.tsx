'use client';

import { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
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
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (layout === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 bg-[#1a1a1a] border border-white/5 rounded-2xl p-3 hover:border-white/10 transition-all"
      >
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">No disponible</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-1">
            {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
          </div>
          <h3 className="font-bold text-white text-sm truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="font-black text-orange-400 text-base">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-600 line-through ml-1.5">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.available}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                added ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
              } disabled:opacity-40 disabled:cursor-not-allowed active:scale-95`}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {added ? '¡Agregado!' : 'Agregar'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 flex flex-col group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-sm font-bold">No disponible</span>
          </div>
        )}
        {/* Tags */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
        </div>
        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-sm leading-tight line-clamp-1 flex-1">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-gray-400">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 flex-1 mb-3">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-black text-orange-400 text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-600 line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={!product.available}
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all flex-shrink-0 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {added
              ? <Check className="w-4 h-4" />
              : <Plus className="w-5 h-5" />
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
