'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, SlidersHorizontal, MapPin, Star } from 'lucide-react';

const steps = [
  {
    icon: UtensilsCrossed,
    number: '01',
    title: 'Elegí tu plato',
    description: 'Explorá nuestro menú digital con filtros y búsqueda instantánea.',
  },
  {
    icon: SlidersHorizontal,
    number: '02',
    title: 'Personalizá tu pedido',
    description: 'Ajustá cantidades y agregá instrucciones especiales a tu gusto.',
  },
  {
    icon: MapPin,
    number: '03',
    title: 'Seguí en tiempo real',
    description: 'Recibí actualizaciones del estado de tu pedido al instante.',
  },
  {
    icon: Star,
    number: '04',
    title: 'Disfrutá y valorá',
    description: 'Calificá tu experiencia y ayudanos a seguir mejorando.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Proceso simple</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How it Works</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
            Pedí tu comida favorita en 4 pasos simples, sin complicaciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 group hover:border-orange-500/20 transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute top-4 right-5 text-5xl font-black text-white/4 select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>

                <h3 className="font-black text-white text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector line (except last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 border-t border-dashed border-white/10 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
