'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Globe, Share2, Star, Award, Users } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

const stats = [
  { icon: Star, value: '4.9', label: 'Calificación', color: 'text-yellow-500' },
  { icon: Users, value: '+5k', label: 'Clientes felices', color: 'text-blue-500' },
  { icon: Award, value: '8+', label: 'Años de experiencia', color: 'text-purple-500' },
];

export function RestaurantInfo() {
  return (
    <section id="info" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Sobre Nosotros</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1 mb-4">
              Una experiencia gastronómica única
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              En {restaurantConfig.name} cada plato es una obra de arte. Usamos ingredientes frescos
              y de primera calidad para crear sabores que te sorprenderán. Nuestro equipo de chefs
              apasionados trabaja cada día para ofrecerte la mejor experiencia gastronómica.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm"
                  >
                    <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-1`} />
                    <p className="font-black text-2xl text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {restaurantConfig.socialMedia.instagram && (
                <a
                  href={restaurantConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-pink-400 hover:text-pink-500 transition-all"
                >
                  <Globe className="w-4 h-4" /> Instagram
                </a>
              )}
              {restaurantConfig.socialMedia.facebook && (
                <a
                  href={restaurantConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-500 transition-all"
                >
                  <Share2 className="w-4 h-4" /> Facebook
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6"
          >
            <h3 className="font-black text-xl text-gray-900 dark:text-white">Información del Local</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Dirección</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{restaurantConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Teléfono</p>
                  <a href={`tel:${restaurantConfig.phone}`} className="text-gray-700 dark:text-gray-300 font-medium hover:text-orange-500 transition-colors">
                    {restaurantConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Horarios</p>
                  <div className="space-y-1.5">
                    {Object.entries(restaurantConfig.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{day}</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{hours}</span>
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
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all"
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
