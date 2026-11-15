import React, { useState, useEffect } from 'react';
import {
  Package,
  Layers,
  MapPin,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Wine
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
        <div className="h-10 w-64 bg-lounge-800 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-lounge-800 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-lounge-800 rounded-2xl" />
          <div className="h-80 bg-lounge-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const overview = analytics?.overview || {
    total_products: 13,
    total_categories: 7,
    total_regions: 4,
    avg_demo_value: 1593.85,
  };

  // Bar Chart Data: Regional Averages with warm bar amber palette
  const regionalData = analytics?.regional_averages || [];
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
        borderColor: [
          '#fbbf24',
          '#f59e0b',
          '#fef08a',
          '#d97706',
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
          label: (context) => `Avg Price: ₹${context.raw?.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(72, 53, 37, 0.3)' },
        ticks: { color: '#d6d3d1', font: { weight: 'bold' } },
      },
      y: {
        grid: { color: 'rgba(72, 53, 37, 0.3)' },
        ticks: {
          color: '#d6d3d1',
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

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#e7e5e4', font: { size: 11, weight: 'bold' } },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            NCR Executive Price Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-time aggregate retail metrics and cross-border excise price comparisons across the National Capital Region.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Excise Rate Schedule Active
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-lounge-800 border border-lounge-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Tracked Brands
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_products}
            </span>
            <span className="text-[11px] text-amber-400 font-medium">Beers, spirits & malts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-800 border border-lounge-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Categories
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_categories}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">Distinct beverage types</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-800 border border-lounge-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Excise Zones
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {overview.total_regions}
            </span>
            <span className="text-[11px] text-amber-300 font-medium">Delhi • Gurugram • Noida • Faridabad</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-800 border border-lounge-700 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Average Base MRP
            </span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              ₹{overview.avg_demo_value ? Number(overview.avg_demo_value).toLocaleString('en-IN') : '0'}
            </span>
            <span className="text-[11px] text-amber-300 font-medium">Catalog arithmetic mean</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Price Variance Bar Chart */}
        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Regional Average Retail MRP</h3>
            </div>
            <span className="text-[11px] text-stone-400">Cross-Zone Comparison</span>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Category Share Doughnut Chart */}
        <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-amber-300" />
              <h3 className="font-bold text-white text-base">Category Breakdown</h3>
            </div>
            <span className="text-[11px] text-stone-400">Catalog Volume Share</span>
          </div>
          <div className="h-64">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
      </div>

      {/* Quick Products Overview Table */}
      <div className="p-6 rounded-2xl bg-lounge-800 border border-lounge-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Tracked Brands & Retail Index</h3>
            <p className="text-xs text-stone-400">Direct price index across active beverage records.</p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Open Comparison Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-lounge-700 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Indicative MRP</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Official Site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lounge-750 text-stone-300">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-lounge-750/50">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-8 h-8 rounded-lg object-cover border border-amber-500/20"
                      />
                    )}
                    <span>{p.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400">{p.package_size}</td>
                  <td className="py-3 px-4 font-black text-amber-400">
                    ₹{Number(p.demo_value).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-stone-300 text-[11px] max-w-[220px] truncate" title={p.availability}>
                    {p.availability || 'Authorized NCR retail outlets'}
                  </td>
                  <td className="py-3 px-4">
                    {p.brand_url ? (
                      <a
                        href={p.brand_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-white transition font-semibold"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-stone-500">N/A</span>
                    )}
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
