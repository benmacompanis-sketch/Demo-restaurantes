'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Flame } from 'lucide-react';
import { restaurantConfig } from '@/data/config';

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.15 8.15 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z"/>
    </svg>
  );
}

export function Footer() {
  const socials = [
    { href: restaurantConfig.socialMedia.instagram, icon: InstagramIcon, label: 'Instagram' },
    { href: restaurantConfig.socialMedia.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: restaurantConfig.socialMedia.tiktok, icon: TikTokIcon, label: 'TikTok' },
  ].filter((s) => s.href);

  return (
    <footer style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #E55520)', boxShadow: '0 4px 16px rgba(255,107,53,0.35)' }}>
                <Flame className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <p className="font-black text-base leading-none" style={{ color: 'var(--text-1)' }}>{restaurantConfig.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#FF6B35' }}>{restaurantConfig.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>{restaurantConfig.description}</p>

            {socials.length > 0 && (
              <div className="flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/[0.1]"
                    style={{ background: 'var(--surface-2)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.15em] mb-5" style={{ color: 'var(--text-3)' }}>
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/menu', label: 'Menú Digital' },
                { href: '/menu?cat=hamburguesas', label: 'Hamburguesas' },
                { href: '/menu?cat=pizzas', label: 'Pizzas' },
                { href: '/menu?cat=pastas', label: 'Pastas' },
                { href: '/admin', label: 'Administración' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B35')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.15em] mb-5" style={{ color: 'var(--text-3)' }}>
              Horarios
            </h3>
            <ul className="space-y-3">
              {Object.entries(restaurantConfig.hours).map(([day, hours]) => (
                <li key={day} className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{day}</p>
                    <p className="text-xs" style={{ color: 'var(--text-2)' }}>{hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.15em] mb-5" style={{ color: 'var(--text-3)' }}>
              Contacto
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{restaurantConfig.address}</p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6B35' }} />
                <a href={`tel:${restaurantConfig.phone}`} className="text-sm transition-colors"
                  style={{ color: 'var(--text-2)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B35')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}>
                  {restaurantConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6B35' }} />
                <a href={`mailto:${restaurantConfig.email}`} className="text-sm transition-colors"
                  style={{ color: 'var(--text-2)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B35')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}>
                  {restaurantConfig.email}
                </a>
              </li>
            </ul>

            <a
              href={`https://wa.me/${restaurantConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: '#16a34a', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} {restaurantConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Diseñado para experiencias gastronómicas premium
          </p>
        </div>
      </div>
    </footer>
  );
}
