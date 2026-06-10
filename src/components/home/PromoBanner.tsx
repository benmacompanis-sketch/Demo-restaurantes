'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Tag, Zap } from 'lucide-react';

const promos = [
  {
    icon: Truck,
    title: 'Delivery Gratis',
    description: 'En Zona 1: Palermo, Recoleta, Belgrano y Núñez. Sin costo mínimo.',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
    link: '/menu',
    borderStyle: 'none',
  },
  {
    icon: Tag,
    title: '2x1 Pizzas',
    description: 'Todos los miércoles. Pizzas artesanales al mejor precio.',
    gradient: 'linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)',
    link: '/menu?cat=pizzas',
    borderStyle: 'none',
  },
  {
    icon: Zap,
    title: 'Combo Lunch',
    description: 'Hamburguesa + Papas + Bebida. Lunes a viernes de 12 a 16hs.',
    gradient: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
    link: '/menu?cat=hamburguesas',
    borderStyle: '1px solid rgba(255,107,53,0.3)',
  },
];

export function PromoBanner() {
  return (
    <section className="py-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span
            className="text-sm font-semibold uppercase tracking-widest block mb-3"
            style={{ color: '#FF6B35' }}
          >
            Ofertas Especiales
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Promociones del Momento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo, i) => {
            const Icon = promo.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-6 overflow-hidden"
                style={{
                  background: promo.gradient,
                  border: promo.borderStyle,
                }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                />
                <div
                  className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-1/2 -translate-x-1/2"
                  style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">{promo.title}</h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {promo.description}
                  </p>

                  <Link
                    href={promo.link}
                    className="inline-flex items-center gap-1.5 bg-white font-bold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
                    style={{ color: '#0A0A0A' }}
                  >
                    Ver ahora →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
