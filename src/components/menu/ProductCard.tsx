'use client';

import { useState } from 'react';
import { Plus, Star, Clock } from 'lucide-react';
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
        className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
      >
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">No disponible</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="font-black text-orange-500 text-base sm:text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1.5">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.available}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
              } disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
            >
              <Plus className="w-3.5 h-3.5" />
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
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-bold bg-black/60 px-3 py-1 rounded-full">No disponible</span>
          </div>
        )}
        {/* Tags overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} tag={tag} />
          ))}
        </div>
        {product.originalPrice && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-1">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>

        {product.prepTime && (
          <div className="flex items-center gap-1 mb-3">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">{product.prepTime}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-black text-orange-500 text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={!product.available}
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Plus className={`w-5 h-5 transition-transform ${added ? 'rotate-45' : ''}`} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
