'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Plus } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { useCartStore } from '@/context/CartStore';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Background image */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Permanent bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
      />

      {/* Popular badge */}
      {product.tags.includes('popular') && (
        <div className="absolute top-3 left-3 z-20">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: '#FFB800', color: '#000' }}
          >
            Popular
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', opacity: hovered ? 1 : 0 }}
      >
        <motion.button
          onClick={handleAdd}
          animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full text-white"
          style={{ backgroundColor: '#FF6B35' }}
        >
          <Plus className="w-4 h-4" />
          {added ? '¡Agregado!' : 'Agregar al pedido'}
        </motion.button>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        {product.rating && (
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
            <span className="text-xs font-semibold text-white">{product.rating}</span>
          </div>
        )}
        <h3 className="font-display font-bold text-lg text-white leading-tight mb-0.5">{product.name}</h3>
        <p className="text-sm line-clamp-1 mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {product.description}
        </p>
        <span className="font-bold text-base" style={{ color: '#FF6B35' }}>
          {formatPrice(product.price)}
        </span>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#FF6B35' }}
            >
              Selección de la Casa
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white mt-1"
            >
              Nuestros Favoritos
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#FF6B35' }}
          >
            Ver todo el menú
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full transition-all"
            style={{ backgroundColor: '#FF6B35' }}
          >
            Ver Menú Completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
