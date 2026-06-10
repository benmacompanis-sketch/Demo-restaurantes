'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const stats = [
    { value: '4.9★', label: 'Rating' },
    { value: '5k+', label: 'Clientes' },
    { value: '8 años', label: 'Experiencia' },
    { value: '98%', label: 'Pedidos a tiempo' },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '70vh', backgroundColor: '#0A0A0A' }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-20%]"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1920&q=85"
          alt="Chef cooking"
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
      </motion.div>

      {/* Left gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-xl">
            {/* Overline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest block mb-4"
              style={{ color: '#FF6B35' }}
            >
              Nuestra Filosofía
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            >
              Cada plato es una obra de arte
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Usamos solo los mejores ingredientes, técnicas de cocina de vanguardia y una pasión
              infinita por crear experiencias gastronómicas únicas que deleiten todos tus sentidos.
            </motion.p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="bg-glass px-4 py-3 rounded-xl"
                >
                  <p className="font-bold text-white text-sm">{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
