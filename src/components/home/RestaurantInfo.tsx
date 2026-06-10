'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Award, Users, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

const stats = [
  { icon: Star, value: '4.9', label: 'Calificación', color: '#FFB800', bg: 'rgba(255,184,0,0.1)' },
  { icon: Users, value: '+5k', label: 'Clientes felices', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { icon: Award, value: '8+', label: 'Años de exp.', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
];

export function RestaurantInfo() {
  return (
    <section id="info" className="section-pad" style={{ background: 'var(--surface-0)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] mb-4 px-3 py-1 rounded-full"
              style={{ color: '#FF6B35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
              Sobre Nosotros
            </span>
            <h2 className="font-black leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text-1)' }}>
              Una experiencia gastronómica única
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
              En {restaurantConfig.name} cada plato es una obra de arte. Usamos ingredientes frescos
              y de primera calidad para crear sabores que te sorprenderán. Nuestro equipo de chefs
              apasionados trabaja cada día para ofrecerte la mejor experiencia gastronómica de CABA.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: stat.bg }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                    </div>
                    <p className="font-black text-2xl leading-none mb-1" style={{ color: 'var(--text-1)' }}>{stat.value}</p>
                    <p className="text-xs" style={{ color: 'var(--text-2)' }}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {restaurantConfig.socialMedia.instagram && (
                <a href={restaurantConfig.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  Instagram
                </a>
              )}
              {restaurantConfig.socialMedia.facebook && (
                <a href={restaurantConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  Facebook
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Info card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 space-y-6"
            style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-black text-xl" style={{ color: 'var(--text-1)' }}>Información del Local</h3>

            <div className="space-y-5">
              {[
                { icon: MapPin, color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', label: 'Dirección', content: restaurantConfig.address, href: undefined },
                { icon: Phone, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', label: 'Teléfono', content: restaurantConfig.phone, href: `tel:${restaurantConfig.phone}` },
              ].map(({ icon: Icon, color, bg, label, content, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: 'var(--text-3)' }}>{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium transition-colors" style={{ color: 'var(--text-1)' }}>{content}</a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{content}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.1)' }}>
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--text-3)' }}>Horarios</p>
                  <div className="space-y-1.5">
                    {Object.entries(restaurantConfig.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between gap-4">
                        <span className="text-sm" style={{ color: 'var(--text-2)' }}>{day}</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${restaurantConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full font-bold py-4 rounded-2xl text-white text-sm transition-all hover:brightness-110"
              style={{ background: '#16a34a', boxShadow: '0 4px 20px rgba(22,163,74,0.35)' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
