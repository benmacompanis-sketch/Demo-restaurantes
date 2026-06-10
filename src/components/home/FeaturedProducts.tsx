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
        <div className="text-center mb-10">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Lo Mejor</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
            Productos Destacados
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Los favoritos de nuestros clientes</p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/menu"
            className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-orange-500/40 text-lg"
          >
            Ver todo el menú
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
