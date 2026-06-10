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
  const [hovered, setHovered] = useState(false);
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
        className="flex gap-4 rounded-2xl p-3 sm:p-4 transition-all"
        style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
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
          <h3 className="font-display font-semibold text-white text-sm sm:text-base truncate">{product.name}</h3>
          <p className="text-xs sm:text-sm mt-0.5 line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-base sm:text-lg" style={{ color: '#FF6B35' }}>
              {formatPrice(product.price)}
            </span>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              disabled={!product.available}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: added ? '#22c55e' : '#FF6B35' }}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {added ? '¡Listo!' : 'Agregar'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#141414',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s',
        ...(hovered ? { borderColor: 'rgba(255,255,255,0.12)' } : {}),
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
        />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
        </div>

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <span
              className="text-white text-xs font-black px-2 py-1 rounded-lg"
              style={{ backgroundColor: '#ef4444' }}
            >
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered && product.available ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <motion.button
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm"
            style={{ backgroundColor: added ? '#22c55e' : '#FF6B35' }}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {added ? '¡Agregado!' : 'Agregar al pedido'}
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-white text-sm leading-snug line-clamp-1 flex-1">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {product.rating}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs line-clamp-2 flex-1 mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-bold text-lg" style={{ color: '#FF6B35' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through ml-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            disabled={!product.available}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
            style={{ backgroundColor: added ? '#22c55e' : '#FF6B35' }}
          >
            {added
              ? <Check className="w-4 h-4 text-white" />
              : <Plus className="w-5 h-5 text-white" />
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
