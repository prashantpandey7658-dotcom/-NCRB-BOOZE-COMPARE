import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GitCompare,
  BarChart2,
  MapPin,
  Bot,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Database
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
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-blue-950/40 border border-navy-700/80 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          {/* Prominent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldAlert className="w-4 h-4" />
            <span>College Demonstration Project — Fictional Data Only</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            NCRB <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">BOOZE COMPARE</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            An academic full-stack demonstration platform designed by <strong className="text-white">Prashant Pandey</strong>.
            Explore interactive product attribute comparisons, simulated regional variance models, dynamic Chart.js analytics, and an integrated AI assistant.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition group"
            >
              <span>Launch Comparison Matrix</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-600 font-semibold text-sm transition"
            >
              <BarChart2 className="w-4 h-4 text-brand-cyan" />
              <span>Explore Dashboard</span>
            </Link>

            <Link
              to="/chatbot"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-brand-cyan border border-blue-500/30 font-semibold text-sm transition"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Assistant</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-navy-700/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-cyan" />
              <span>Academic Demonstration (B.Tech / MCA Project)</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>SQLite Relational Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span>RESTful API with Python Flask</span>
            </div>
          </div>
        </div>

        {/* Ambient decorative glowing backdrop */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Feature Pillar Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-navy-600 transition">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-cyan mb-4">
            <GitCompare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Attribute Comparison</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Select multiple sample products to inspect side-by-side matrices, package dimensions, simulated pricing tiers, and lowest/highest difference indicators.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-navy-600 transition">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Regional Demo Modeling</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Demonstrates mathematical price variance simulation across 4 fictional demonstration zones (Demo Zone 1 to 4) reflecting regional tax curves.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-navy-600 transition">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">NCRB AI Assistant</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Built-in intelligent chatbot capable of explaining database schemas, charts, and viva questions while strictly adhering to compliance refusal filters.
          </p>
        </div>
      </section>

      {/* Featured Sample Products Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Sample Demonstration Catalog</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select items below to populate the interactive comparison table.
            </p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>View All ({featuredProducts.length} Demo Items)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-navy-800 animate-pulse border border-navy-700" />
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
