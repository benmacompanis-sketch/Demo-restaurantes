'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Tag, Truck, ArrowRight } from 'lucide-react';

const promos = [
  {
    icon: Truck,
    label: 'Envío Gratis',
    title: 'Delivery sin costo',
    description: 'Zona 1: Palermo, Recoleta, Belgrano y Núñez sin cargo de envío.',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    glow: 'rgba(22,163,74,0.35)',
    link: '/menu',
    cta: 'Pedir ahora',
  },
  {
    icon: Tag,
    label: '2×1',
    title: 'Pizzas al 2×1',
    description: 'Todos los miércoles. Pizzas artesanales al mejor precio de CABA.',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #E55520 100%)',
    glow: 'rgba(255,107,53,0.4)',
    link: '/menu?cat=pizzas',
    cta: 'Ver pizzas',
  },
  {
    icon: Zap,
    label: 'Combo',
    title: 'Lunch Express',
    description: 'Hamburguesa + Papas + Bebida. Lunes a viernes de 12 a 16hs.',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    glow: 'rgba(124,58,237,0.4)',
    link: '/menu?cat=hamburguesas',
    cta: 'Ver combos',
  },
];

export function PromoBanner() {
  return (
    <section className="section-pad" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] mb-3 px-3 py-1 rounded-full"
            style={{ color: '#FFB800', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}>
            Ofertas Especiales
          </span>
          <h2 className="font-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text-1)' }}>
            Promociones del Momento
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo, i) => {
            const Icon = promo.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative rounded-3xl p-7 overflow-hidden flex flex-col"
                style={{ background: promo.gradient, boxShadow: `0 12px 40px ${promo.glow}` }}
              >
                {/* BG shapes */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ background: 'rgba(0,0,0,0.12)' }} />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">{promo.label}</span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 leading-tight">{promo.title}</h3>
                  <p className="text-sm text-white/70 mb-6 leading-relaxed flex-1">{promo.description}</p>

                  <Link
                    href={promo.link}
                    className="group inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    {promo.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
