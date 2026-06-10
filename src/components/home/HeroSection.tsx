'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=85&auto=format&fit=crop"
          alt="La Brasa Grill"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.38) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,9,11,0.9) 0%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(255,107,53,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.15]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-40 w-full">
        <div className="max-w-[620px]">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Abierto ahora
            <span className="w-px h-3 bg-white/20" />
            <MapPin className="w-3 h-3" style={{ color: '#FF6B35' }} />
            Av. Corrientes 1234, CABA
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.04] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 5.2rem)', color: '#FFFFFF' }}
          >
            El sabor que<br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FFB800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              te enamora
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-base sm:text-[17px] mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px' }}
          >
            {restaurantConfig.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.33 }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-2.5 font-bold px-8 py-[14px] rounded-2xl text-white text-[15px] transition-all active:scale-[0.97] hover:brightness-110"
              style={{ background: '#FF6B35', boxShadow: '0 8px 32px rgba(255,107,53,0.45)' }}
            >
              Pedir Ahora
              <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/${restaurantConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-[14px] rounded-2xl text-white/85 text-[15px] transition-all hover:bg-white/[0.1] active:scale-[0.97]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">4.9</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>+1,200 reseñas</span>
            </div>
            <span className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: '#FF6B35' }} />
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Entrega en ~25 min</span>
            </div>
            <span className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Pago seguro</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 mx-auto"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))' }}
        />
      </motion.div>
    </section>
  );
}
