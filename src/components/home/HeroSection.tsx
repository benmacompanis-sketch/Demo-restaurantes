'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Timer, ChefHat } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="Restaurant background"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Abierto ahora · Delivery disponible
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            >
              Gastronomía<br />
              <span className="text-orange-500">de Élite</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
            >
              {restaurantConfig.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <Link
                href="/menu"
                className="group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-orange-500/30 text-base"
              >
                Pedir Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base"
              >
                Ver Menú
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-black text-white">4.9</span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Rating</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white mb-1">5k+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Pedidos</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white mb-1">8+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Años</p>
              </div>
            </motion.div>
          </div>

          {/* Right: decorative floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80">
              {/* Concentric circles */}
              <div className="absolute inset-0 rounded-full bg-orange-500/5 border border-orange-500/10 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-orange-500/8 border border-orange-500/15 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                    <ChefHat className="w-14 h-14 text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Floating card: burger */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 right-0 bg-[#1e1e1e] border border-white/8 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-lg">🍔</div>
                  <div>
                    <p className="text-white text-xs font-bold whitespace-nowrap">Classic Burger</p>
                    <p className="text-orange-400 text-xs font-black">$8.500</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card: rating */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-4 bg-[#1e1e1e] border border-white/8 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">+1.200 reseñas</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card: delivery time */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -right-10 -translate-y-1/2 bg-[#1e1e1e] border border-white/8 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Timer className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">25 min</p>
                    <p className="text-gray-500 text-[10px]">Delivery promedio</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
    </section>
  );
}
