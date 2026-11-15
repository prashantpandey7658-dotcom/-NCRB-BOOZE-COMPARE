import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  Search,
  Filter,
  Trash2,
  ArrowRight,
  Wine,
  Sparkles,
  DollarSign
} from 'lucide-react';
import api from '../services/api';
import ComparisonTable from '../components/ComparisonTable';
import ProductCard from '../components/ProductCard';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹2,000', min: 500, max: 2000 },
  { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { label: 'Luxury ₹5,000+', min: 5000, max: Infinity },
];

export default function Comparison({ selectedCompareIds, onToggleCompare, onClearCompare }) {
  const [allProducts, setAllProducts] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [comparisonMetrics, setComparisonMetrics] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
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
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const val = Number(p.demo_value || 0);
    const matchesPrice = val >= selectedPriceRange.min && val <= selectedPriceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <GitCompare className="w-7 h-7 text-amber-400" />
            <span>Brand Comparison Matrix</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Compare genuine alcohol brands side-by-side with bottle photos, indicative retail MRPs, and cross-zone prices.
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-lounge-850 border border-amber-500/30 shadow-lg shadow-amber-500/5">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Comparing</span>
            <span className="text-xl font-black text-amber-300">{comparisonMetrics.count} Brands</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Lowest Base MRP</span>
            <span className="text-xl font-black text-emerald-400">
              ₹{Number(comparisonMetrics.min_demo_value).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Highest Base MRP</span>
            <span className="text-xl font-black text-amber-400">
              ₹{Number(comparisonMetrics.max_demo_value).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Max Price Spread</span>
            <span className="text-xl font-black text-amber-200">
              ₹{Number(comparisonMetrics.max_difference).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Comparative Matrix</span>
            <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {selectedCompareIds.length === 0 ? 'No brands selected' : `${selectedCompareIds.length} brands in comparison`}
            </span>
          </h2>
        </div>
        <ComparisonTable
          products={comparisonData}
          onRemoveProduct={onToggleCompare}
        />
      </section>

      {/* Product Selection Catalog */}
      <section className="space-y-5 pt-6 border-t border-lounge-750">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Select Brands to Compare</h2>
            <p className="text-xs text-stone-400">
              Click Compare on any item below to add or remove it from the table. Showing {filteredProducts.length} bottles.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search by brand name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-lounge-900 border border-lounge-700 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filters: Categories & Price Ranges */}
        <div className="space-y-3">
          {/* Price Range Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-stone-400 mr-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Price:
            </span>
            {PRICE_RANGES.map((rng) => (
              <button
                key={rng.label}
                onClick={() => setSelectedPriceRange(rng)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedPriceRange.label === rng.label
                    ? 'bg-amber-500 text-lounge-950 shadow-md shadow-amber-500/20'
                    : 'bg-lounge-850 text-stone-400 hover:text-white hover:bg-lounge-800 border border-lounge-700/80'
                }`}
              >
                {rng.label}
              </button>
            ))}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-lounge-950 shadow-md shadow-amber-500/20'
                    : 'bg-lounge-850 text-stone-400 hover:text-white hover:bg-lounge-800 border border-lounge-700/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-lounge-850 border border-lounge-700 text-stone-400">
            <p className="text-sm">No brands match your filter criteria.</p>
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
