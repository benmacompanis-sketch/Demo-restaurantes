'use client';

import { useState } from 'react';
import {
  PlusCircle, Edit2, Trash2, Save, X, Tag, Package, LayoutGrid,
  Lock, LogOut, Eye, EyeOff, ToggleLeft, ToggleRight, ShoppingBag,
  Phone, MapPin, Clock, ChevronDown, CheckCircle, AlertCircle,
  Loader, Bike, Store, Settings, DollarSign, Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as initialProducts } from '@/data/products';
import { categories as initialCategories } from '@/data/categories';
import { restaurantConfig as initialConfig } from '@/data/config';
import { formatPrice } from '@/lib/utils';
import { useOrderStore } from '@/context/OrderStore';
import { Product, Category, Order, OrderStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { LogoMark } from '@/components/ui/LogoMark';

const ADMIN_PASS = 'admin123';

type AdminTab = 'orders' | 'products' | 'categories' | 'config';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  pending:    { label: 'Pendiente',    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  icon: AlertCircle },
  confirmed:  { label: 'Confirmado',   color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', icon: CheckCircle },
  preparing:  { label: 'Preparando',   color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', icon: Loader },
  ready:      { label: 'Listo',        color: '#10B981', bg: 'rgba(16,185,129,0.12)', icon: CheckCircle },
  delivered:  { label: 'Entregado',    color: '#6B7280', bg: 'rgba(107,114,128,0.12)',icon: CheckCircle },
  cancelled:  { label: 'Cancelado',    color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  icon: X },
};

const STATUS_FLOW: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all';
const inputStyle = {
  background: 'var(--surface-2)',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-1)',
};
const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.target.style.borderColor = '#FF6B35');
const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.target.style.borderColor = 'var(--border-strong)');

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const attempt = () => {
    if (password === ADMIN_PASS) { onLogin(); }
    else { setError('Contraseña incorrecta'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--surface-0)' }}>
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm rounded-3xl p-8 shadow-2xl"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)' }}
      >
        <div className="flex justify-center mb-6">
          <LogoMark size={64} />
        </div>
        <h1 className="font-black text-2xl text-center mb-1" style={{ color: 'var(--text-1)' }}>Panel Admin</h1>
        <p className="text-sm text-center mb-8" style={{ color: 'var(--text-3)' }}>La Brasa Grill</p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && attempt()}
              onFocus={focusBorder}
              onBlur={blurBorder}
              className={`${inputCls} pr-12`}
              style={inputStyle}
            />
            <button
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'var(--text-3)' }}
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>}
          <button
            onClick={attempt}
            className="w-full font-bold py-3 rounded-xl text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: '#FF6B35' }}
          >
            Ingresar
          </button>
        </div>
        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-3)' }}>Demo: admin123</p>
      </motion.div>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  const { updateStatus, deleteOrder } = useOrderStore();
  const [expanded, setExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const cfg = STATUS_CONFIG[order.status];
  const StatusIcon = cfg.icon;

  const createdAt = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm" style={{ color: 'var(--text-1)' }}>{order.id}</span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ color: cfg.color, background: cfg.bg }}
            >
              <StatusIcon className="w-3 h-3" />
              {cfg.label}
            </span>
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--text-3)' }}>
              {order.deliveryType === 'delivery' ? <Bike className="w-3 h-3" /> : <Store className="w-3 h-3" />}
              {order.deliveryType === 'delivery' ? 'Delivery' : 'Retiro'}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>{order.customer.name}</span>
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>
              {createdAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} · {createdAt.toLocaleDateString('es-AR')}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-black" style={{ color: '#FF6B35' }}>{formatPrice(order.total)}</p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>{order.items.reduce((a, i) => a + i.quantity, 0)} items</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-3)' }}
        />
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
              {/* Customer info */}
              <div className="pt-4 grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>Teléfono</p>
                    <a href={`tel:${order.customer.phone}`} className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                      {order.customer.phone}
                    </a>
                  </div>
                </div>
                {order.customer.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>Dirección</p>
                      <p className="text-sm" style={{ color: 'var(--text-1)' }}>{order.customer.address}</p>
                    </div>
                  </div>
                )}
                {order.deliveryZone && (
                  <div className="flex items-start gap-2">
                    <Bike className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B35' }} />
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>Zona</p>
                      <p className="text-sm" style={{ color: 'var(--text-1)' }}>{order.deliveryZone.name} · {formatPrice(order.deliveryZone.cost)}</p>
                    </div>
                  </div>
                )}
                {order.customer.notes && (
                  <div className="sm:col-span-2 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>Nota</p>
                      <p className="text-sm" style={{ color: 'var(--text-1)' }}>{order.customer.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface-2)' }}>
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : undefined }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                      style={{ background: '#FF6B35' }}
                    >
                      {item.quantity}
                    </span>
                    <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-1)' }}>{item.product.name}</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-2)' }}>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border-strong)' }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Subtotal</span>
                  <span className="font-bold" style={{ color: 'var(--text-2)' }}>{formatPrice(order.subtotal)}</span>
                </div>
                {order.deliveryCost > 0 && (
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-xs" style={{ color: 'var(--text-3)' }}>Envío</span>
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>{formatPrice(order.deliveryCost)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="font-black text-sm" style={{ color: 'var(--text-1)' }}>Total</span>
                  <span className="font-black" style={{ color: '#FF6B35' }}>{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}33` }}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {cfg.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {showStatusMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute left-0 top-full mt-1 z-20 rounded-xl overflow-hidden shadow-xl min-w-[160px]"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)' }}
                      >
                        {STATUS_FLOW.map((s) => {
                          const sc = STATUS_CONFIG[s];
                          const SIcon = sc.icon;
                          return (
                            <button
                              key={s}
                              onClick={(e) => { e.stopPropagation(); updateStatus(order.id, s); setShowStatusMenu(false); }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-left transition-colors hover:brightness-125"
                              style={{ color: sc.color, background: order.status === s ? sc.bg : undefined }}
                            >
                              <SIcon className="w-3.5 h-3.5" />
                              {sc.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href={`https://wa.me/${order.customer.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ background: '#16a34a' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>

                <button
                  onClick={(e) => { e.stopPropagation(); if (confirm('¿Eliminar este pedido?')) deleteOrder(order.id); }}
                  className="ml-auto p-2 rounded-xl transition-all hover:bg-red-500/10"
                  style={{ color: 'var(--text-3)' }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<AdminTab>('orders');

  // Products state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [form, setForm] = useState<Partial<Product>>({
    name: '', description: '', price: 0, image: '', categoryId: 'hamburguesas',
    tags: [], available: true, featured: false,
  });

  // Config state
  const [config, setConfig] = useState(initialConfig);

  // Orders
  const { orders, clearAll } = useOrderStore();

  // Order filter
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  // ── helpers ──
  const openEdit = (p: Product) => { setEditingProduct(p); setForm({ ...p }); setShowProductForm(true); };
  const openNew = () => { setEditingProduct(null); setForm({ name: '', description: '', price: 0, image: '', categoryId: 'hamburguesas', tags: [], available: true, featured: false }); setShowProductForm(true); };
  const saveProduct = () => {
    if (!form.name || !form.price) return;
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...p, ...form } as Product : p));
    } else {
      setProducts((prev) => [...prev, { ...form as Product, id: `prod-${Date.now()}` }]);
    }
    setShowProductForm(false);
  };
  const deleteProduct = (id: string) => { if (confirm('¿Eliminar este producto?')) setProducts((prev) => prev.filter((p) => p.id !== id)); };
  const toggleAvail = (id: string) => setProducts((prev) => prev.map((p) => p.id === id ? { ...p, available: !p.available } : p));

  const filteredProducts = products.filter((p) =>
    !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter((o) => o.status === orderFilter);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const tabs: { id: AdminTab; label: string; icon: typeof Package; badge?: number }[] = [
    { id: 'orders',     label: 'Pedidos',    icon: ShoppingBag,  badge: pendingCount || undefined },
    { id: 'products',   label: 'Productos',  icon: Package },
    { id: 'categories', label: 'Categorías', icon: LayoutGrid },
    { id: 'config',     label: 'Config',     icon: Settings },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-0)', color: 'var(--text-1)' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16"
        style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <LogoMark size={34} />
          <div>
            <p className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>Panel Administrativo</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>La Brasa Grill</p>
          </div>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 text-sm transition-colors hover:text-white"
          style={{ color: 'var(--text-3)' }}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Pedidos hoy',    value: orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString()).length, color: '#FF6B35' },
            { label: 'Pendientes',     value: pendingCount, color: '#F59E0B' },
            { label: 'Productos',      value: products.filter((p) => p.available).length, color: '#10B981' },
            { label: 'Recaudado',      value: formatPrice(orders.filter((o) => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0)), color: '#3B82F6', isText: true },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <p className="font-black text-2xl" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 rounded-xl p-1 mb-6 w-fit overflow-x-auto"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap"
                style={tab === t.id
                  ? { background: '#FF6B35', color: '#fff' }
                  : { color: 'var(--text-3)' }
                }
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {t.badge && t.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white font-black text-xs flex items-center justify-center" style={{ color: '#FF6B35' }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── ORDERS TAB ─── */}
        {tab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="font-bold text-xl" style={{ color: 'var(--text-1)' }}>Pedidos de Envío</h2>
              {orders.length > 0 && (
                <button
                  onClick={() => { if (confirm('¿Limpiar todos los pedidos?')) clearAll(); }}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-3)' }}
                >
                  Limpiar historial
                </button>
              )}
            </div>

            {/* Status filter */}
            <div className="flex gap-2 flex-wrap mb-5">
              {(['all', ...STATUS_FLOW] as const).map((s) => {
                const sc = s === 'all' ? null : STATUS_CONFIG[s];
                const count = s === 'all' ? orders.length : orders.filter((o) => o.status === s).length;
                return (
                  <button
                    key={s}
                    onClick={() => setOrderFilter(s)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                    style={orderFilter === s
                      ? { background: sc?.color ?? '#FF6B35', color: '#fff' }
                      : { background: 'var(--surface-2)', color: 'var(--text-3)', border: '1px solid var(--border)' }
                    }
                  >
                    {s === 'all' ? 'Todos' : sc!.label}
                    <span className="opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-3)' }}>
                <ShoppingBag className="w-14 h-14 mx-auto mb-4 opacity-20" />
                <p className="font-bold text-lg">Sin pedidos</p>
                <p className="text-sm mt-1">Los pedidos de los clientes aparecerán acá</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── PRODUCTS TAB ─── */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <h2 className="font-bold text-xl" style={{ color: 'var(--text-1)' }}>Gestión de Productos</h2>
              <button
                onClick={openNew}
                className="flex items-center gap-2 font-bold px-4 py-2.5 rounded-xl text-white text-sm transition-all hover:brightness-110"
                style={{ background: '#FF6B35' }}
              >
                <PlusCircle className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-3)' }} />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                placeholder="Buscar producto..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-2xl p-3 sm:p-4 transition-all"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', opacity: product.available ? 1 : 0.5 }}
                >
                  <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{product.name}</p>
                      {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>{product.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-sm" style={{ color: '#FF6B35' }}>{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through" style={{ color: 'var(--text-3)' }}>{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => toggleAvail(product.id)}
                      className="transition-colors"
                      title={product.available ? 'Deshabilitar' : 'Habilitar'}
                      style={{ color: product.available ? '#10B981' : '#EF4444' }}
                    >
                      {product.available ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                    <button onClick={() => openEdit(product)} className="p-2 rounded-lg transition-all" style={{ color: 'var(--text-3)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B35')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg transition-all" style={{ color: 'var(--text-3)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── CATEGORIES TAB ─── */}
        {tab === 'categories' && (
          <div>
            <h2 className="font-bold text-xl mb-5" style={{ color: 'var(--text-1)' }}>Categorías</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialCategories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div key={cat.id} className="rounded-2xl p-5 flex items-center gap-4"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold" style={{ color: 'var(--text-1)' }}>{cat.name}</p>
                      <p className="text-sm" style={{ color: 'var(--text-3)' }}>{count} productos</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>
                      #{cat.order}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── CONFIG TAB ─── */}
        {tab === 'config' && (
          <div className="space-y-8">
            <h2 className="font-bold text-xl" style={{ color: 'var(--text-1)' }}>Configuración</h2>

            {/* Restaurant info */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                <Package className="w-4 h-4" /> Información del Local
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Nombre del local' },
                  { key: 'tagline', label: 'Tagline' },
                  { key: 'phone', label: 'Teléfono' },
                  { key: 'email', label: 'Email' },
                  { key: 'whatsappNumber', label: 'WhatsApp (sin +)' },
                  { key: 'address', label: 'Dirección' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>{label}</label>
                    <input
                      className={inputCls}
                      style={inputStyle}
                      value={(config as unknown as Record<string, string>)[key] ?? ''}
                      onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.value }))}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery zones */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                <Bike className="w-4 h-4" /> Zonas de Envío
              </h3>
              <div className="space-y-4">
                {config.deliveryZones.map((zone, i) => (
                  <div key={zone.id} className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Nombre</label>
                        <input
                          className={inputCls}
                          style={inputStyle}
                          value={zone.name}
                          onChange={(e) => setConfig((c) => ({ ...c, deliveryZones: c.deliveryZones.map((z, j) => j === i ? { ...z, name: e.target.value } : z) }))}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Costo ($)</label>
                        <input
                          type="number"
                          className={inputCls}
                          style={inputStyle}
                          value={zone.cost}
                          onChange={(e) => setConfig((c) => ({ ...c, deliveryZones: c.deliveryZones.map((z, j) => j === i ? { ...z, cost: Number(e.target.value) } : z) }))}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Barrios</label>
                        <input
                          className={inputCls}
                          style={inputStyle}
                          value={zone.neighborhoods.join(', ')}
                          onChange={(e) => setConfig((c) => ({ ...c, deliveryZones: c.deliveryZones.map((z, j) => j === i ? { ...z, neighborhoods: e.target.value.split(',').map((n) => n.trim()) } : z) }))}
                          onFocus={focusBorder}
                          onBlur={blurBorder}
                          placeholder="Palermo, Recoleta..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                <Clock className="w-4 h-4" /> Horarios
              </h3>
              <div className="space-y-3">
                {Object.entries(config.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-32 text-sm font-medium flex-shrink-0" style={{ color: 'var(--text-2)' }}>{day}</span>
                    <input
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      value={hours}
                      onChange={(e) => setConfig((c) => ({ ...c, hours: { ...c.hours, [day]: e.target.value } }))}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                      placeholder="12:00 - 23:00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Min order */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                <DollarSign className="w-4 h-4" /> Pedido Mínimo
              </h3>
              <div className="max-w-xs">
                <input
                  type="number"
                  className={inputCls}
                  style={inputStyle}
                  value={config.minOrderAmount}
                  onChange={(e) => setConfig((c) => ({ ...c, minOrderAmount: Number(e.target.value) }))}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            <div className="rounded-2xl p-4 text-sm" style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', color: '#FF6B35' }}>
              💡 Los cambios en configuración son visuales en esta sesión. Para hacerlos permanentes, actualizá el archivo <code className="font-mono">src/data/config.ts</code>.
            </div>
          </div>
        )}
      </div>

      {/* ─── PRODUCT FORM DRAWER ─── */}
      <AnimatePresence>
        {showProductForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setShowProductForm(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg z-50 flex flex-col shadow-2xl"
              style={{ background: 'var(--surface-1)', borderLeft: '1px solid var(--border-strong)' }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--border)' }}>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-1)' }}>
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button onClick={() => setShowProductForm(false)} className="p-2 rounded-xl" style={{ color: 'var(--text-3)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Nombre *</label>
                  <input className={inputCls} style={inputStyle} value={form.name || ''} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} placeholder="Nombre del producto" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Descripción</label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    style={inputStyle}
                    rows={3}
                    value={form.description || ''}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    onFocus={focusBorder as React.FocusEventHandler<HTMLTextAreaElement>}
                    onBlur={blurBorder as React.FocusEventHandler<HTMLTextAreaElement>}
                    placeholder="Descripción del producto"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Precio *</label>
                    <input type="number" className={inputCls} style={inputStyle} value={form.price || ''} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} onFocus={focusBorder} onBlur={blurBorder} placeholder="0" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Precio Original</label>
                    <input type="number" className={inputCls} style={inputStyle} value={form.originalPrice || ''} onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value ? Number(e.target.value) : undefined }))} onFocus={focusBorder} onBlur={blurBorder} placeholder="Opcional" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>URL de Imagen</label>
                  <input className={inputCls} style={inputStyle} value={form.image || ''} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} placeholder="https://..." />
                  {form.image && <img src={form.image} alt="preview" className="mt-2 w-full h-36 object-cover rounded-xl" />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Categoría</label>
                    <select
                      className={inputCls}
                      style={inputStyle}
                      value={form.categoryId || ''}
                      onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                      onFocus={focusBorder as React.FocusEventHandler<HTMLSelectElement>}
                      onBlur={blurBorder as React.FocusEventHandler<HTMLSelectElement>}
                    >
                      {initialCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-3)' }}>Tiempo de prep.</label>
                    <input className={inputCls} style={inputStyle} value={form.prepTime || ''} onChange={(e) => setForm((f) => ({ ...f, prepTime: e.target.value }))} onFocus={focusBorder} onBlur={blurBorder} placeholder="15-20 min" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-3)' }}>Etiquetas</label>
                  <div className="flex flex-wrap gap-2">
                    {(['nuevo', 'popular', 'oferta', 'vegano', 'picante', 'sin-tacc', 'premium'] as const).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setForm((f) => ({ ...f, tags: f.tags?.includes(tag) ? f.tags.filter((t) => t !== tag) : [...(f.tags || []), tag] }))}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={form.tags?.includes(tag)
                          ? { background: '#FF6B35', color: '#fff' }
                          : { background: 'var(--surface-2)', color: 'var(--text-3)', border: '1px solid var(--border)' }
                        }
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.available ?? true} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>Disponible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured ?? false} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>Destacado</span>
                  </label>
                </div>
              </div>

              <div className="p-5" style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={saveProduct}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-white transition-all hover:brightness-110"
                  style={{ background: '#FF6B35' }}
                >
                  <Save className="w-4 h-4" />
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
