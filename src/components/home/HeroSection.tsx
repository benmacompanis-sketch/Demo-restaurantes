'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=85"
          alt="Hero background"
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        {/* Right side gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.95) 70%)',
          }}
        />
        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #0A0A0A 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
        <div className="max-w-3xl">
          {/* Open badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-white/70 tracking-widest uppercase font-medium">Abierto Ahora</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display leading-none mb-6">
            {/* Gastronomía */}
            <div className="overflow-hidden">
              <motion.span
                className="block text-7xl sm:text-8xl lg:text-9xl font-bold text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Gastronomía
              </motion.span>
            </div>
            {/* de */}
            <div className="overflow-hidden">
              <motion.span
                className="block text-7xl sm:text-8xl lg:text-9xl font-bold text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
              >
                de
              </motion.span>
            </div>
            {/* Élite */}
            <div className="overflow-hidden">
              <motion.span
                className="block text-7xl sm:text-8xl lg:text-9xl font-bold italic"
                style={{ color: '#FF6B35' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              >
                Élite
              </motion.span>
            </div>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl sm:text-2xl mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Cada plato, una obra maestra.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <MagneticButton
              href="/menu"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FF6B35] hover:bg-[#e55a27] text-white font-semibold text-base px-8 py-4 rounded-full transition-colors shadow-2xl shadow-[#FF6B35]/30"
            >
              Pedir Ahora
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2.5 font-semibold text-base px-8 py-4 rounded-full transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#F5F5F0' }}
            >
              Ver Menú
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex items-center gap-8"
          >
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-sm font-semibold text-white">4.9</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>rating</span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div>
              <span className="text-sm font-semibold text-white">1,200+</span>
              <span className="text-xs ml-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>reseñas</span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div>
              <span className="text-sm font-semibold text-white">8+</span>
              <span className="text-xs ml-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>años</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <div className="relative w-px h-12 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor: '#FF6B35' }}
            animate={{ height: ['0%', '100%'], top: ['0%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
