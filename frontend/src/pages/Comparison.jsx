import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  Search,
  Filter,
  CheckSquare,
  Square,
  Trash2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';
import ComparisonTable from '../components/ComparisonTable';
import ProductCard from '../components/ProductCard';

export default function Comparison({ selectedCompareIds, onToggleCompare, onClearCompare }) {
  const [allProducts, setAllProducts] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [comparisonMetrics, setComparisonMetrics] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products and categories
  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prodRes, catRes]) => {
        setAllProducts(prodRes.data?.data || []);
        setCategories(['All', ...(catRes.data?.data || [])]);
      })
      .catch((err) => console.error('Error loading products for comparison:', err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch comparison detail whenever selected IDs change
  useEffect(() => {
    if (selectedCompareIds.length > 0) {
      api.getComparison(selectedCompareIds)
        .then((res) => {
          setComparisonData(res.data?.data?.products || []);
          setComparisonMetrics(res.data?.data?.metrics || null);
        })
        .catch((err) => console.error('Error fetching comparison details:', err));
    } else {
      setComparisonData([]);
      setComparisonMetrics(null);
    }
  }, [selectedCompareIds]);

  // Filtered products list
  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <GitCompare className="w-7 h-7 text-brand-cyan" />
            Product Comparison Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Select 2 or more sample items to evaluate multi-attribute differences and regional demo prices.
          </p>
        </div>

        {selectedCompareIds.length > 0 && (
          <button
            onClick={onClearCompare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Selection ({selectedCompareIds.length})</span>
          </button>
        )}
      </div>

      {/* Comparison Metrics Summary Banner */}
      {comparisonMetrics && comparisonData.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-navy-800/80 border border-blue-500/20">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Comparing</span>
            <span className="text-lg font-bold text-brand-cyan">{comparisonMetrics.count} Items</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Lowest Demo Value</span>
            <span className="text-lg font-bold text-emerald-400">
              ₹{Number(comparisonMetrics.min_demo_value).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Highest Demo Value</span>
            <span className="text-lg font-bold text-amber-400">
              ₹{Number(comparisonMetrics.max_demo_value).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Max Price Spread</span>
            <span className="text-lg font-bold text-purple-400">
              ₹{Number(comparisonMetrics.max_difference).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Comparative Matrix View</span>
          <span className="text-xs font-normal text-slate-400">
            {selectedCompareIds.length === 0 ? 'No items selected' : `${selectedCompareIds.length} items active`}
          </span>
        </h2>
        <ComparisonTable
          products={comparisonData}
          onRemoveProduct={onToggleCompare}
        />
      </section>

      {/* Product Selection Catalog */}
      <section className="space-y-5 pt-6 border-t border-navy-700/80">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Select Demonstration Products</h2>
            <p className="text-xs text-slate-400">Click Compare on any item below to add or remove it.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 focus:border-brand-cyan rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-700 border border-navy-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-navy-800 border border-navy-700 text-slate-400">
            <p className="text-sm">No sample products match your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isSelected={selectedCompareIds.includes(p.id)}
                onToggleSelect={onToggleCompare}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
