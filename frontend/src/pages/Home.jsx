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
  ExternalLink
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home({ selectedCompareIds, onToggleCompare }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts()
      .then((res) => {
        setFeaturedProducts(res.data?.data?.slice(0, 4) || []);
      })
      .catch((err) => console.error('Error fetching sample products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section with Bar & Lounge Aesthetic */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lounge-800 via-lounge-850 to-amber-950/30 border border-amber-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>NCR Regional Beverage & Excise Price Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            NCRB <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">BOOZE COMPARE</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed">
            The premier retail price benchmark and specification comparison platform for the National Capital Region.
            Compare authentic market prices, bottle sizes, and cross-border excise duty differences across Delhi, Gurugram, Noida, and Faridabad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-lounge-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition group"
            >
              <span>Compare Brands Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lounge-750 hover:bg-lounge-700 text-amber-300 border border-amber-500/30 font-bold text-sm transition"
            >
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span>Explore Analytics</span>
            </Link>

            <Link
              to="/chatbot"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm transition"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask NCRB Assistant</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-lounge-700/80 flex flex-wrap items-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Wine className="w-4 h-4 text-amber-400" />
              <span>Authentic Brand Catalog</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Delhi, Gurugram, Noida & Faridabad Benchmarks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>State Excise Reference Data</span>
            </div>
          </div>
        </div>

        {/* Ambient warm bar backlight */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Feature Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <GitCompare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Side-by-Side Brand Matrix</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Directly compare genuine beers, whiskies, rums, and premium spirits. Review alcohol volume, package sizing, and price variances across NCR retail markets.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Regional Pricing Models</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Accurate state excise modeling highlighting why prices diverge across Delhi NCT, Haryana (Gurugram/Faridabad), and Uttar Pradesh (Noida).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">NCRB AI Assistant</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Your personal digital sommelier and regional price advisor. Ask questions about tasting profiles, regional duty structures, and legal frameworks.
          </p>
        </div>
      </section>

      {/* Featured Brands Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Popular NCR Brands</h2>
            <p className="text-xs text-stone-400 mt-1">
              Select items below to inspect side-by-side pricing differences.
            </p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-lounge-800 animate-pulse border border-lounge-700" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
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
