import React, { useState, useEffect } from 'react';
import {
  MapPin,
  TrendingUp,
  Percent,
  BarChart3,
  Layers,
  ShieldAlert,
  Info,
  ExternalLink
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RegionComparison() {
  const [regions, setRegions] = useState([]);
  const [matrixData, setMatrixData] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getRegions(), api.getRegionalDemoData()])
      .then(([regRes, matRes]) => {
        setRegions(regRes.data?.data || []);
        setMatrixData(matRes.data?.data || []);
      })
      .catch((err) => console.error('Error loading regional data:', err))
      .finally(() => setLoading(false));
  }, []);

  const activeRegion = regions.find((r) => r.id === selectedRegionId) || regions[0] || {};
  const activeZoneProducts = matrixData.filter((m) => m.region_id === selectedRegionId);

  // Calculate zone stats
  const zoneValues = activeZoneProducts.map((p) => p.regional_demo_value);
  const avgZonePrice = zoneValues.length ? Math.round(zoneValues.reduce((a, b) => a + b, 0) / zoneValues.length) : 0;
  const minZonePrice = zoneValues.length ? Math.min(...zoneValues) : 0;
  const maxZonePrice = zoneValues.length ? Math.max(...zoneValues) : 0;

  // Bar Chart: Base Value vs Regional Demo Value for this Zone
  const chartData = {
    labels: activeZoneProducts.map((p) => p.product_name),
    datasets: [
      {
        label: 'Base Demo Value (₹)',
        data: activeZoneProducts.map((p) => p.base_demo_value),
        backgroundColor: 'rgba(148, 163, 184, 0.4)',
        borderColor: '#94a3b8',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: `${activeRegion.region_name || 'Selected Zone'} Value (₹)`,
        data: activeZoneProducts.map((p) => p.regional_demo_value),
        backgroundColor: 'rgba(56, 189, 248, 0.75)',
        borderColor: '#38bdf8',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#cbd5e1', font: { size: 11 } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.raw?.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.25)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(51, 65, 85, 0.25)' },
        ticks: {
          color: '#94a3b8',
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <MapPin className="w-7 h-7 text-brand-cyan" />
            Regional Demo Comparison
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulated geographical price variation across fictional NCR demonstration sectors.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 self-start sm:self-auto">
          DEMO DATA - NOT REAL
        </span>
      </div>

      {/* Region Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {regions.map((r) => {
          const isSelected = r.id === selectedRegionId;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-blue-600/20 border-brand-cyan ring-1 ring-brand-cyan shadow-lg shadow-blue-500/10'
                  : 'bg-navy-800 border-navy-700 hover:border-slate-500 hover:bg-navy-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-brand-cyan' : 'text-white'}`}>
                  {r.region_name}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{r.description}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
            Zone Average Demo Value
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            ₹{avgZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-brand-cyan">Simulated mean across catalog</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
            Lowest In Zone
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            ₹{minZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-400/80">Simulated entry-tier product</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
            Highest In Zone
          </span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            ₹{maxZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-amber-400/80">Simulated reserve-tier product</span>
        </div>
      </div>

      {/* Comparative Variance Chart */}
      <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">
              Base Demo Price vs {activeRegion.region_name} Variance
            </h3>
            <p className="text-xs text-slate-400">Comparing base simulated catalog prices against regional multiplier adjustments.</p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Unit: INR (₹)</span>
        </div>
        <div className="h-72">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Regional Data Table */}
      <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">
            Detailed Price Matrix for {activeRegion.region_name}
          </h3>
          <span className="text-[11px] text-slate-400">{activeZoneProducts.length} items listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-navy-700 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Base MRP</th>
                <th className="py-3 px-4">Regional MRP</th>
                <th className="py-3 px-4">Variance (%)</th>
                <th className="py-3 px-4">Official Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/60 text-slate-300">
              {activeZoneProducts.map((item, idx) => {
                const diff = item.regional_demo_value - item.base_demo_value;
                const pct = ((diff / item.base_demo_value) * 100).toFixed(1);
                const isPositive = diff > 0;
                return (
                  <tr key={idx} className="hover:bg-navy-700/30">
                    <td className="py-3 px-4 font-semibold text-white">{item.product_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-brand-cyan border border-blue-500/20">
                        {item.product_category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{item.package_size}</td>
                    <td className="py-3 px-4">₹{Number(item.base_demo_value).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      ₹{Number(item.regional_demo_value).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        diff === 0
                          ? 'bg-slate-700/40 text-slate-300'
                          : isPositive
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {isPositive ? `+${pct}%` : `${pct}%`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.brand_url ? (
                        <a
                          href={item.brand_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand-cyan hover:underline"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
