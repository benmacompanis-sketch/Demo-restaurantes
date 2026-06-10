'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Tag, Truck } from 'lucide-react';

const promos = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En Zona 1: Palermo, Recoleta, Belgrano y Núñez',
    color: 'from-green-500 to-emerald-600',
    link: '/menu',
    cta: 'Pedir ahora',
  },
  {
    icon: Tag,
    title: '2x1 en Pizzas',
    description: 'Todos los miércoles. Pizzas artesanales al mejor precio.',
    color: 'from-orange-500 to-red-500',
    link: '/menu?cat=pizzas',
    cta: 'Ver pizzas',
  },
  {
    icon: Zap,
    title: 'Combo Lunch',
    description: 'Hamburguesa + Papas + Bebida. Lunes a viernes de 12 a 16hs.',
    color: 'from-purple-500 to-violet-600',
    link: '/menu?cat=hamburguesas',
    cta: 'Ver combos',
  },
];

export function PromoBanner() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Ofertas Especiales</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
            Promociones del Momento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo, i) => {
            const Icon = promo.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className={`relative bg-gradient-to-br ${promo.color} rounded-2xl p-6 overflow-hidden`}
              >
                {/* BG Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{promo.title}</h3>
                  <p className="text-white/80 text-sm mb-5 leading-relaxed">{promo.description}</p>
                  <Link
                    href={promo.link}
                    className="inline-flex items-center gap-1.5 bg-white text-gray-900 font-bold text-sm px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    {promo.cta}
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
