'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/menu/ProductCard';

export function FeaturedProducts() {
  return (
    <section className="section-pad" style={{ background: 'var(--surface-0)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] mb-3 px-3 py-1 rounded-full"
            style={{ color: '#FF6B35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
            Lo Mejor
          </span>
          <h2 className="font-black leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text-1)' }}>
            Productos Destacados
          </h2>
          <p className="text-base max-w-sm mx-auto" style={{ color: 'var(--text-2)' }}>
            Los favoritos de nuestros clientes, elaborados con ingredientes frescos
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 font-bold px-10 py-4 rounded-2xl text-white text-base transition-all active:scale-[0.97] hover:brightness-110"
            style={{ background: '#FF6B35', boxShadow: '0 8px 32px rgba(255,107,53,0.4)' }}
          >
            Ver todo el menú
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
