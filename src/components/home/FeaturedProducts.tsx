'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/menu/ProductCard';

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Lo Mejor</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              Productos Destacados
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Los favoritos de nuestros clientes</p>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm"
          >
            Ver todo el menú
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
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
