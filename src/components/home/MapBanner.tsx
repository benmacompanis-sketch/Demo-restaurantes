'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

export function MapBanner() {
  const whatsappUrl = `https://wa.me/${restaurantConfig.whatsappNumber}?text=Hola!%20Quiero%20reservar%20una%20mesa.`;
  const mapsEmbedUrl =
    'https://maps.google.com/maps?q=Av.+Corrientes+1234,+Buenos+Aires,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section className="bg-stone-100 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-50 dark:bg-gray-800 p-10 sm:p-14 flex flex-col justify-center gap-8"
          >
            {/* Address */}
            <div className="border-b border-stone-200 dark:border-gray-700 pb-8">
              <p className="text-xs font-bold tracking-[0.2em] text-stone-400 dark:text-gray-500 uppercase mb-3">
                Dirección
              </p>
              <p className="text-3xl sm:text-4xl font-black text-stone-800 dark:text-white leading-tight">
                {restaurantConfig.address.split(',')[0]}
              </p>
              <p className="text-stone-500 dark:text-gray-400 mt-2 text-base">
                {restaurantConfig.address.split(',').slice(1).join(',').trim()}
              </p>
            </div>

            {/* Hours */}
            <div className="border-b border-stone-200 dark:border-gray-700 pb-8">
              <p className="text-xs font-bold tracking-[0.2em] text-stone-400 dark:text-gray-500 uppercase mb-3">
                Horarios &amp; Reservas
              </p>
              <div className="space-y-1">
                {Object.entries(restaurantConfig.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-baseline justify-between gap-4">
                    <span className="text-stone-600 dark:text-gray-300 text-sm">{day}</span>
                    <span className="text-stone-800 dark:text-white font-semibold text-sm">{hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-stone-400 dark:text-gray-500 text-xs mt-3">
                Consultá disponibilidad por WhatsApp · turnos limitados.
              </p>
            </div>

            {/* CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-stone-100 text-white dark:text-gray-900 font-bold px-7 py-4 rounded-2xl transition-all w-fit text-sm"
            >
              Reservar turno
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[400px] lg:min-h-0"
          >
            <iframe
              src={mapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación La Brasa Grill"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
