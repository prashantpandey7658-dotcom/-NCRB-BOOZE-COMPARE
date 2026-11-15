import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GitCompare,
  BarChart2,
  MapPin,
  Bot,
  Wine,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home({ selectedCompareIds, onToggleCompare }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data?.data || []);
        setCategories(['All', ...(catRes.data?.data || [])]);
      })
      .catch((err) => console.error('Error fetching catalog:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Grand Cellar Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lounge-900 via-lounge-850 to-amber-950/40 border border-amber-500/25 p-8 sm:p-12 shadow-2xl">
        {/* Ambient Backlight and Shelf Glow */}
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Top Portal Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>The Grand Cellar • NCR Beverage & Excise Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            NCRB <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">BOOZE COMPARE</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            The premier retail price benchmark and specification comparison platform for the National Capital Region.
            Discover over 140 genuine single malts, craft beers, fine wines, and luxury spirits with authentic indicative retail MRPs and regional excise duty modeling across Delhi, Gurugram, Noida, and Faridabad.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-lounge-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition group"
            >
              <span>Compare Brands Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/regions"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lounge-800 hover:bg-lounge-750 text-amber-300 border border-amber-500/30 font-bold text-sm transition"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Explore NCR Zones</span>
            </Link>

            <Link
              to="/chatbot"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm transition"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask AI Sommelier</span>
            </Link>
          </div>

          {/* Quick Stats Pillar */}
          <div className="pt-6 border-t border-lounge-750/90 grid grid-cols-2 sm:grid-cols-4 gap-4 text-stone-300">
            <div>
              <span className="text-2xl font-black text-amber-400">141+</span>
              <span className="text-[11px] text-stone-400 block font-semibold">Genuine Bottles</span>
            </div>
            <div>
              <span className="text-2xl font-black text-amber-300">4 Zones</span>
              <span className="text-[11px] text-stone-400 block font-semibold">Delhi • GGN • Noida • FBD</span>
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-400">~10% Save</span>
              <span className="text-[11px] text-stone-400 block font-semibold">Gurugram Retail Margin</span>
            </div>
            <div>
              <span className="text-2xl font-black text-amber-400">14 Styles</span>
              <span className="text-[11px] text-stone-400 block font-semibold">Malts, Beers, Wines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery & Search Bar */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Wine className="w-6 h-6 text-amber-400" />
              <span>Curated Cellar Catalog</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Showing {filteredProducts.length} authentic bottles across NCR retail markets.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by bottle, brand, or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-lounge-900 border border-lounge-700 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-amber-500 text-lounge-950 shadow-md shadow-amber-500/25'
                  : 'bg-lounge-850 text-stone-400 hover:text-white hover:bg-lounge-800 border border-lounge-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-lounge-850 animate-pulse border border-lounge-750" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-lounge-850 border border-lounge-700 text-stone-400 space-y-2">
            <Wine className="w-10 h-10 text-stone-500 mx-auto" />
            <p className="text-sm font-semibold text-white">No bottles found matching your search</p>
            <p className="text-xs text-stone-400">Try searching for Glenfiddich, Kingfisher, Bira, Macallan, or Sula.</p>
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

      {/* Feature Pillars: Why NCRB Booze Compare */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-lounge-850/80 border border-lounge-750 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <GitCompare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Cross-Zone Comparison</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Directly compare 2 to 4 bottles side-by-side. Review alcohol volume, bottle sizes, tasting notes, and price differences across NCR retail corridors.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-lounge-850/80 border border-lounge-750 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">State Excise Insights</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Understand why Haryana (Gurugram) prices are typically ~10% lower while Uttar Pradesh (Noida) reflects distinct state tariffs and infrastructure levies.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-lounge-850/80 border border-lounge-750 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Gemini AI Sommelier</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Your personal digital sommelier and regional price advisor powered by Google Gemini API. Ask questions about pairings, mixology, and tasting profiles.
          </p>
        </div>
      </section>
    </div>
  );
}
