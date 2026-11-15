import React, { useState, useEffect } from 'react';
import {
  Package,
  Layers,
  MapPin,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getAnalytics(), api.getProducts()])
      .then(([analyticsRes, productsRes]) => {
        setAnalytics(analyticsRes.data?.data || null);
        setProducts(productsRes.data?.data || []);
      })
      .catch((err) => console.error('Dashboard data load error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-navy-800 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-navy-800 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-navy-800 rounded-2xl" />
          <div className="h-80 bg-navy-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const overview = analytics?.overview || {
    total_products: 8,
    total_categories: 4,
    total_regions: 4,
    avg_demo_value: 1668.75,
  };

  // Bar Chart Data: Regional Averages
  const regionalData = analytics?.regional_averages || [];
  const barChartData = {
    labels: regionalData.map((r) => r.region_name),
    datasets: [
      {
        label: 'Average Demo Value (₹)',
        data: regionalData.map((r) => r.avg_regional_value),
        backgroundColor: [
          'rgba(56, 189, 248, 0.75)',
          'rgba(37, 99, 235, 0.75)',
          'rgba(16, 185, 129, 0.75)',
          'rgba(245, 158, 11, 0.75)',
        ],
        borderColor: [
          '#38bdf8',
          '#2563eb',
          '#10b981',
          '#f59e0b',
        ],
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Avg Demo Price: ₹${context.raw?.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
        ticks: {
          color: '#94a3b8',
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  // Doughnut Chart Data: Category Distribution
  const categoryData = analytics?.category_distribution || [];
  const doughnutChartData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.count),
        backgroundColor: [
          '#38bdf8',
          '#2563eb',
          '#8b5cf6',
          '#ec4899',
        ],
        borderColor: '#0f172a',
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', font: { size: 11 } },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Academic Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time aggregate analytics generated dynamically from SQLite database tables.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            DEMO DATA - NOT REAL
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Sample Products
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_products}
            </span>
            <span className="text-[11px] text-brand-cyan">Active demo records</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-cyan">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Sample Categories
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_categories}
            </span>
            <span className="text-[11px] text-emerald-400">Classified groupings</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Demo Zones
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_regions}
            </span>
            <span className="text-[11px] text-purple-400">Simulated NCR Sectors</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Average Demo Value
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              ₹{overview.avg_demo_value ? Number(overview.avg_demo_value).toLocaleString('en-IN') : '0'}
            </span>
            <span className="text-[11px] text-amber-400">Simulated mean price</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Demo Data Bar Chart */}
        <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-cyan" />
              <h3 className="font-bold text-white text-base">Regional Average Demo Values</h3>
            </div>
            <span className="text-[11px] text-slate-400">Demo Zones 1–4</span>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Category Share Doughnut Chart */}
        <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white text-base">Category Distribution</h3>
            </div>
            <span className="text-[11px] text-slate-400">Sample Share</span>
          </div>
          <div className="h-64">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
      </div>

      {/* Quick Products Overview Table */}
      <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Sample Products Database Snapshot</h3>
            <p className="text-xs text-slate-400">Demonstration catalog records stored in SQLite.</p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>Go to Comparison Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-navy-700 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Package Size</th>
                <th className="py-3 px-4">Demo Value</th>
                <th className="py-3 px-4">Data Type</th>
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
                  <td className="py-3 px-4">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300">
                      FICTIONAL
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
