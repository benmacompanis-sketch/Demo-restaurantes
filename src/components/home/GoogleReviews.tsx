'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    initials: 'MR',
    color: 'bg-blue-500',
    name: 'Marcos R.',
    source: 'Food blogger · Instagram',
    date: 'hace 2 semanas',
    text: 'La Brasa Grill es un nivel aparte. La smash burger con queso cheddar fundido es simplemente perfecta. El ambiente es top y el servicio muy atento. Volvería cada semana.',
    highlight: null,
  },
  {
    initials: 'VL',
    color: 'bg-purple-500',
    name: 'Valentina L.',
    source: 'Reseñas locales · Google Maps',
    date: 'hace 1 mes',
    text: 'Fui por las pizzas y me voló la cabeza. La masa artesanal con ingredientes frescos hace toda la diferencia. El precio/calidad es inmejorable en CABA.',
    highlight: 'Lugar imprescindible.',
  },
  {
    initials: 'DM',
    color: 'bg-green-600',
    name: 'Diego M.',
    source: 'Local Guide · Google Maps',
    date: 'hace 3 semanas',
    text: 'El combo del mediodía es una relación precio-calidad imposible de superar. Hamburguesa + papas + bebida por ese precio en plena Corrientes. Las pastas también son una bestialidad.',
    highlight: null,
  },
  {
    initials: 'CF',
    color: 'bg-orange-500',
    name: 'Carla F.',
    source: 'Periodismo gastronómico · 2025',
    date: 'hace 2 meses',
    text: 'Cocina honesta y sabrosa. La atención al cliente es excepcional y las pizzas artesanales son los hits, pero las pastas no se quedan atrás.',
    highlight: 'atención al cliente',
  },
];

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export function GoogleReviews() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 p-5 rounded-2xl border border-gray-800 bg-gray-900/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span className="text-white font-semibold text-sm">Reseñas de Google</span>
            </div>
            <div className="w-px h-6 bg-gray-700" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-yellow-400">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <span className="text-gray-400 text-sm hidden sm:block">basado en reseñas recientes</span>
          </div>
          <a
            href="https://www.google.com/search?q=La+Brasa+Grill+Buenos+Aires+reseñas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors whitespace-nowrap"
          >
            Ver todas en Google ↗
          </a>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4"
            >
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm font-black">{review.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{review.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{review.source}</p>
                  </div>
                </div>
                <GoogleIcon />
              </div>

              {/* Stars + date */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                {review.highlight
                  ? review.text.split(review.highlight).map((part, idx, arr) =>
                      idx < arr.length - 1 ? (
                        <span key={idx}>
                          {part}
                          <span className="text-orange-400 font-semibold">{review.highlight}</span>
                        </span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )
                  : review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
