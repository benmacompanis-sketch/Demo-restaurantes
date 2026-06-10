'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Moon, Sun, Search, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/context/CartStore';
import { restaurantConfig } from '@/data/config';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, toggleCart } = useCartStore();
  const cartCount = count();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/menu', label: 'Menú' },
    { href: '/#info', label: 'Nosotros' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #E55520)', boxShadow: '0 4px 16px rgba(255,107,53,0.4)' }}>
                <Flame className="w-[18px] h-[18px] text-white" fill="white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-black text-white text-[15px] leading-none tracking-tight">{restaurantConfig.name}</p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: '#FF6B35' }}>{restaurantConfig.tagline}</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.07] transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.07] transition-all"
              >
                {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              <Link href="/menu" className="hidden md:flex p-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.07] transition-all">
                <Search className="w-[18px] h-[18px]" />
              </Link>

              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95 hover:brightness-110"
                style={{ background: '#FF6B35', boxShadow: '0 4px 20px rgba(255,107,53,0.4)' }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Carrito</span>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-white font-black rounded-full flex items-center justify-center text-xs"
                      style={{ color: '#FF6B35' }}
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.07] transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden"
              style={{ background: '#111115', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FF6B35' }}>
                    <Flame className="w-4 h-4 text-white" fill="white" />
                  </div>
                  <span className="font-black text-white text-sm">{restaurantConfig.name}</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.07] transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3.5 text-white/75 hover:text-white hover:bg-white/[0.06] rounded-xl font-semibold transition-all mb-1 text-sm"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href={`https://wa.me/${restaurantConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: '#16a34a' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
