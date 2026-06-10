'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    role: 'Cliente frecuente',
    initial: 'M',
    color: '#FF6B35',
    stars: 5,
    quote: 'La mejor hamburguesa de Buenos Aires. La carne es increíblemente jugosa y los ingredientes son de primera calidad. Cada visita es una experiencia memorable.',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Foodie & crítico',
    initial: 'C',
    color: '#FFB800',
    stars: 5,
    quote: 'La pizza artesanal es perfecta. La masa madre de 48hs hace toda la diferencia. Se nota la pasión que ponen en cada plato. Recomiendo el Pepperoni Inferno.',
  },
  {
    name: 'Ana López',
    role: 'Organizadora de eventos',
    initial: 'A',
    color: '#6B5BFF',
    stars: 5,
    quote: 'Organicé mi cumpleaños aquí y fue perfecto. El servicio fue impecable, la comida exquisita y la atención al detalle fue extraordinaria. Todos mis invitados quedaron encantados.',
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="py-24" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest block mb-3"
            style={{ color: '#FF6B35' }}
          >
            Testimonios
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Single testimonial card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="rounded-3xl p-8 sm:p-10"
              style={{ backgroundColor: '#141414' }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-display text-lg sm:text-xl italic text-white leading-relaxed mb-8"
                style={{ fontStyle: 'italic' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.initial}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: current === i ? '2rem' : '0.5rem',
                  backgroundColor: current === i ? '#FF6B35' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
