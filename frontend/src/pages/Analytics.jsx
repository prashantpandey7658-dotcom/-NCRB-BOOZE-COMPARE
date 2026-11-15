import React, { useState, useEffect } from 'react';
import {
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck,
  Download
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getAnalytics(), api.getProducts()])
      .then(([anRes, prodRes]) => {
        setAnalytics(anRes.data?.data || null);
        setProducts(prodRes.data?.data || []);
      })
      .catch((err) => console.error('Error fetching analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-lounge-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-lounge-800 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-lounge-800 rounded-2xl" />
          <div className="h-80 bg-lounge-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const overview = analytics?.overview || {};
  const regionalData = analytics?.regional_averages || [];
  const categoryData = analytics?.category_distribution || [];

  // 1. Regional Bar Chart with warm bar palette
  const barChartData = {
    labels: regionalData.map((r) => r.region_name),
    datasets: [
      {
        label: 'Average Retail Price (₹)',
        data: regionalData.map((r) => r.avg_regional_value),
        backgroundColor: [
          'rgba(245, 158, 11, 0.85)',
          'rgba(217, 119, 6, 0.85)',
          'rgba(251, 191, 36, 0.85)',
          'rgba(180, 83, 9, 0.85)',
        ],
        borderColor: ['#fbbf24', '#f59e0b', '#fef08a', '#d97706'],
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  // 2. Category Pie Chart
  const pieChartData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.count),
        backgroundColor: [
          '#fbbf24',
          '#f59e0b',
          '#d97706',
          '#b45309',
          '#92400e',
          '#78350f',
          '#d4af37',
        ],
        borderColor: '#100b07',
        borderWidth: 2,
      },
    ],
  };

  // 3. Line Chart: Benchmark Prices Sorted by Product ID
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);
  const lineChartData = {
    labels: sortedProducts.map((p) => p.name),
    datasets: [
      {
        label: 'Base Benchmark MRP (₹)',
        data: sortedProducts.map((p) => p.demo_value),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#fbbf24',
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#e7e5e4', font: { size: 11, weight: 'bold' } } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label || ''}: ₹${ctx.raw?.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: { grid: { color: 'rgba(72, 53, 37, 0.3)' }, ticks: { color: '#d6d3d1' } },
      y: {
        grid: { color: 'rgba(72, 53, 37, 0.3)' },
        ticks: { color: '#d6d3d1', callback: (v) => `₹${v}` },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-amber-400" />
            NCR Retail Price Analytics
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Dynamic statistical distributions, price elasticity curves, and cross-zone variance across genuine brands.
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          State Excise Benchmark Analysis
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Lowest Benchmark MRP
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            ₹{overview.min_demo_value ? Number(overview.min_demo_value).toLocaleString('en-IN') : '0'}
          </span>
          <span className="text-[11px] text-emerald-400/80">Entry-tier domestic beverage benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Catalog Average MRP
          </span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            ₹{overview.avg_demo_value ? Number(overview.avg_demo_value).toLocaleString('en-IN') : '0'}
          </span>
          <span className="text-[11px] text-amber-300/80">Arithmetic catalog mean across {products.length} bottles</span>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Highest Benchmark MRP
          </span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">
            ₹{overview.max_demo_value ? Number(overview.max_demo_value).toLocaleString('en-IN') : '0'}
          </span>
          <span className="text-[11px] text-amber-300/80">Ultra-premium aged single malt tier</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Bar Chart */}
        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Regional Average Retail MRP Comparison
            </h3>
            <span className="text-[11px] text-stone-400">Bar Chart</span>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* 2. Pie Chart */}
        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-amber-300" />
              Beverage Category Distribution
            </h3>
            <span className="text-[11px] text-stone-400">Pie Chart</span>
          </div>
          <div className="h-64">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#e7e5e4', font: { size: 11, weight: 'bold' } } },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Line Chart */}
      <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Catalog Price Progression Curve
            </h3>
            <p className="text-xs text-stone-400">MRP progression curve across budget beers, standard spirits, and single malts.</p>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Line Chart</span>
        </div>
        <div className="h-72">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
