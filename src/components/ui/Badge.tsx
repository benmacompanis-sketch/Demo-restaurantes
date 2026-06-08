'use client';

import { ProductTag } from '@/types';

const tagConfig: Record<ProductTag | string, { label: string; className: string }> = {
  nuevo: { label: '✨ Nuevo', className: 'bg-blue-500 text-white' },
  popular: { label: '🔥 Popular', className: 'bg-orange-500 text-white' },
  oferta: { label: '💥 Oferta', className: 'bg-red-500 text-white' },
  vegano: { label: '🌱 Vegano', className: 'bg-green-500 text-white' },
  picante: { label: '🌶 Picante', className: 'bg-red-600 text-white' },
  'sin-tacc': { label: 'Sin TACC', className: 'bg-yellow-500 text-white' },
  premium: { label: '👑 Premium', className: 'bg-purple-600 text-white' },
};

interface BadgeProps {
  tag: string;
  size?: 'sm' | 'md';
}

export function Badge({ tag, size = 'sm' }: BadgeProps) {
  const config = tagConfig[tag] || { label: tag, className: 'bg-gray-500 text-white' };
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  );
}
