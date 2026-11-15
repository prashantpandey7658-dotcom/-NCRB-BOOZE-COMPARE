import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  X,
  Database
} from 'lucide-react';
import api from '../services/api';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Category A',
    package_size: '750 ml Sample Bottle',
    description: '',
    demo_value: '',
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data?.data || []);
        setCategories(catRes.data?.data || ['Category A', 'Category B', 'Category C', 'Category D']);
      })
      .catch((err) => showNotification('Error loading admin data: ' + err.message, 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0] || 'Category A',
      package_size: '750 ml Sample Bottle',
      description: '',
      demo_value: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      package_size: p.package_size,
      description: p.description || '',
      demo_value: p.demo_value,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sample product record?')) return;
    try {
      await api.deleteProduct(id);
      showNotification('Sample product deleted successfully.');
      loadData();
    } catch (err) {
      showNotification('Failed to delete product: ' + err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.demo_value) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
        showNotification('Sample product updated successfully.');
      } else {
        await api.createProduct(formData);
        showNotification('New fictional sample product created successfully.');
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showNotification('Error saving record: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset the SQLite database back to the default demonstration seed dataset? This will restore original sample records.')) return;
    try {
      await api.resetDatabase();
      showNotification('Database reseeded successfully with baseline academic records.');
      loadData();
    } catch (err) {
      showNotification('Failed to reset database: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <SlidersHorizontal className="w-7 h-7 text-brand-cyan" />
            Admin Data Management Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage fictional demonstration catalog records in the SQLite database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDatabase}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition"
            title="Reset Database to Default Baseline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Database</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sample Product</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold transition ${
          message.type === 'error'
            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
        }`}>
          {message.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Products Management Table */}
      <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Fictional Catalog Records ({products.length})</h2>
          <span className="text-xs text-amber-400/90 font-medium">All records flagged as DEMO DATA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-navy-700 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Demo Price</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/60 text-slate-300">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-navy-700/30">
                  <td className="py-3 px-4 font-mono text-slate-400">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-brand-cyan border border-blue-500/20">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{p.package_size}</td>
                  <td className="py-3 px-4 font-bold text-white">
                    ₹{Number(p.demo_value).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-700 transition"
                        title="Edit Product"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create or Edit Sample Product */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-navy-700 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Sample Product' : 'Add Fictional Sample Product'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Product Name (Fictional) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sample Brand I"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-cyan"
                  >
                    <option value="Category A">Category A</option>
                    <option value="Category B">Category B</option>
                    <option value="Category C">Category C</option>
                    <option value="Category D">Category D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Demo Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g., 1400"
                    value={formData.demo_value}
                    onChange={(e) => setFormData({ ...formData, demo_value: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package Size *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 750 ml Sample Bottle"
                  value={formData.package_size}
                  onChange={(e) => setFormData({ ...formData, package_size: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Fictional product narrative for comparison..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>

              <div className="pt-3 border-t border-navy-700 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-500 font-semibold shadow-md transition"
                >
                  {editingProduct ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
