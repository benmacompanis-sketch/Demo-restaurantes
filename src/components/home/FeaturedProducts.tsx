'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Plus, Check } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { useCartStore } from '@/context/CartStore';
import { formatPrice } from '@/lib/utils';

function FeaturedCard({ product, index }: { product: (typeof featuredProducts)[0]; index: number }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col items-center group"
    >
      {/* Circular image */}
      <div className="relative mb-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-orange-500/40 transition-all duration-300 shadow-xl shadow-black/40">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd}
          className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
            added ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {added ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
        </motion.button>
      </div>

      <h3 className="font-bold text-white text-sm text-center line-clamp-1 mb-1 px-2">
        {product.name}
      </h3>
      {product.rating && (
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>
      )}
      <p className="text-orange-400 font-black text-sm">{formatPrice(product.price)}</p>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Lo mejor de la casa</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Featured Menu</h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium group"
          >
            Ver todo el menú
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {featuredProducts.slice(0, 6).map((product, i) => (
            <FeaturedCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-all"
          >
            Ver Menú Completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
