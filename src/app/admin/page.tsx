'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Save, X, Tag, Package, LayoutGrid, Lock, LogOut, Eye, EyeOff, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as initialProducts } from '@/data/products';
import { categories as initialCategories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { Product, Category } from '@/types';
import { Badge } from '@/components/ui/Badge';

const ADMIN_PASS = 'admin123';

type AdminTab = 'products' | 'categories' | 'promotions';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const [form, setForm] = useState<Partial<Product>>({
    name: '', description: '', price: 0, image: '', categoryId: 'hamburguesas',
    tags: [], available: true, featured: false,
  });

  const handleLogin = () => {
    if (password === ADMIN_PASS) {
      setAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ ...p });
    setShowProductForm(true);
  };

  const openNew = () => {
    setEditingProduct(null);
    setForm({ name: '', description: '', price: 0, image: '', categoryId: 'hamburguesas', tags: [], available: true, featured: false });
    setShowProductForm(true);
  };

  const saveProduct = () => {
    if (!form.name || !form.price) return;
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...form } as Product : p)));
    } else {
      const newProduct: Product = {
        ...form as Product,
        id: `prod-${Date.now()}`,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowProductForm(false);
  };

  const deleteProduct = (id: string) => {
    if (confirm('¿Eliminar este producto?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleAvailable = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, available: !p.available } : p));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-800"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-black text-2xl text-white text-center mb-1">Panel Admin</h1>
          <p className="text-gray-400 text-sm text-center mb-8">La Brasa Grill</p>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white placeholder-gray-500 outline-none transition-all pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all"
            >
              Ingresar
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">Demo: admin123</p>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: AdminTab; icon: typeof Package; label: string }[] = [
    { id: 'products', icon: Package, label: 'Productos' },
    { id: 'categories', icon: LayoutGrid, label: 'Categorías' },
    { id: 'promotions', icon: Tag, label: 'Promociones' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-0">
      {/* Admin Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Panel Administrativo</p>
            <p className="text-gray-400 text-xs">La Brasa Grill</p>
          </div>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Productos', value: products.length, color: 'text-orange-400' },
            { label: 'Disponibles', value: products.filter((p) => p.available).length, color: 'text-green-400' },
            { label: 'No Disponibles', value: products.filter((p) => !p.available).length, color: 'text-red-400' },
            { label: 'Categorías', value: categories.length, color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <p className={`font-black text-2xl ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 rounded-xl p-1 mb-6 border border-gray-800 w-fit">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t.id ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-xl">Gestión de Productos</h2>
              <button
                onClick={openNew}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4"
                >
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-white">{product.name}</p>
                      {product.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
                    </div>
                    <p className="text-gray-400 text-sm truncate mt-0.5">{product.description}</p>
                    <p className="text-orange-400 font-bold mt-1">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleAvailable(product.id)}
                      className={`transition-colors ${product.available ? 'text-green-400 hover:text-red-400' : 'text-red-400 hover:text-green-400'}`}
                      title={product.available ? 'Deshabilitar' : 'Habilitar'}
                    >
                      {product.available ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                    <button onClick={() => openEdit(product)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-orange-400 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {tab === 'categories' && (
          <div>
            <h2 className="font-bold text-xl mb-5">Gestión de Categorías</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-white">{cat.name}</p>
                      <p className="text-gray-400 text-sm">{count} productos</p>
                    </div>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-lg">#{cat.order}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Promotions Tab */}
        {tab === 'promotions' && (
          <div>
            <h2 className="font-bold text-xl mb-5">Gestión de Promociones</h2>
            <div className="space-y-4">
              {products.filter((p) => p.tags.includes('oferta')).map((p) => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-white">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-black text-orange-400">{formatPrice(p.price)}</span>
                      {p.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{formatPrice(p.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                  <Badge tag="oferta" size="md" />
                </div>
              ))}
              {products.filter((p) => p.tags.includes('oferta')).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No hay productos en oferta</p>
                  <p className="text-sm mt-1">Agrega la etiqueta "oferta" a un producto</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setShowProductForm(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-gray-900 z-50 flex flex-col shadow-2xl border-l border-gray-800"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-800">
                <h3 className="font-bold text-lg text-white">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button onClick={() => setShowProductForm(false)} className="p-2 rounded-xl hover:bg-gray-800 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Nombre *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all"
                    value={form.name || ''}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Nombre del producto"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Descripción</label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all resize-none"
                    rows={3}
                    value={form.description || ''}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Descripción del producto"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Precio *</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all"
                      value={form.price || ''}
                      onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Precio Original</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all"
                      value={form.originalPrice || ''}
                      onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value ? Number(e.target.value) : undefined }))}
                      placeholder="0 (opcional)"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">URL de Imagen</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all"
                    value={form.image || ''}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                  />
                  {form.image && (
                    <img src={form.image} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl" />
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Categoría</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-orange-500 rounded-xl text-white outline-none transition-all"
                    value={form.categoryId || ''}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  >
                    {initialCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Etiquetas</label>
                  <div className="flex flex-wrap gap-2">
                    {(['nuevo', 'popular', 'oferta', 'vegano', 'picante'] as const).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setForm((f) => ({
                          ...f,
                          tags: f.tags?.includes(tag)
                            ? f.tags.filter((t) => t !== tag)
                            : [...(f.tags || []), tag],
                        }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          form.tags?.includes(tag)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.available ?? true}
                      onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-300">Disponible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured ?? false}
                      onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm text-gray-300">Destacado</span>
                  </label>
                </div>
              </div>

              <div className="p-5 border-t border-gray-800">
                <button
                  onClick={saveProduct}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all"
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
