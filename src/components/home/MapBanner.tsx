'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

export function MapBanner() {
  const whatsappUrl = `https://wa.me/${restaurantConfig.whatsappNumber}?text=Hola!%20Quiero%20reservar%20una%20mesa.`;
  const mapsEmbedUrl = 'https://maps.google.com/maps?q=Av.+Corrientes+1234,+Buenos+Aires,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section className="section-pad" style={{ background: 'var(--surface-0)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
          style={{ border: '1px solid var(--border)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 sm:p-14 flex flex-col justify-center gap-8"
            style={{ background: 'var(--surface-1)' }}
          >
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-3)' }}>
                Dirección
              </p>
              <p className="font-black leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text-1)' }}>
                {restaurantConfig.address.split(',')[0]}
              </p>
              <p className="mt-2" style={{ color: 'var(--text-2)' }}>
                {restaurantConfig.address.split(',').slice(1).join(',').trim()}
              </p>
            </div>

            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-3)' }}>
                Horarios &amp; Reservas
              </p>
              <div className="space-y-2">
                {Object.entries(restaurantConfig.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>{day}</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text-3)' }}>
                Consultá disponibilidad por WhatsApp · turnos limitados.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-bold px-7 py-4 rounded-2xl text-sm w-fit transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'var(--text-1)', color: 'var(--surface-0)' }}
            >
              Reservar turno
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right: map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[380px] lg:min-h-0"
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
