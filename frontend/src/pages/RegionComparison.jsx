import React, { useState, useEffect } from 'react';
import {
  MapPin,
  TrendingUp,
  Percent,
  BarChart3,
  Layers,
  ShieldCheck,
  Info,
  ExternalLink,
  Search
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
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filtered by search for table
  const displayedZoneProducts = activeZoneProducts.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.product_name.toLowerCase().includes(term) ||
      p.product_category.toLowerCase().includes(term) ||
      (p.availability && p.availability.toLowerCase().includes(term))
    );
  });

  // Calculate zone stats
  const zoneValues = activeZoneProducts.map((p) => p.regional_demo_value);
  const avgZonePrice = zoneValues.length ? Math.round(zoneValues.reduce((a, b) => a + b, 0) / zoneValues.length) : 0;
  const minZonePrice = zoneValues.length ? Math.min(...zoneValues) : 0;
  const maxZonePrice = zoneValues.length ? Math.max(...zoneValues) : 0;

  // Bar Chart: Top 12 sample items for clarity
  const chartSubset = activeZoneProducts.slice(0, 12);
  const chartData = {
    labels: chartSubset.map((p) => p.product_name),
    datasets: [
      {
        label: 'Base Benchmark MRP (₹)',
        data: chartSubset.map((p) => p.base_demo_value),
        backgroundColor: 'rgba(120, 113, 108, 0.45)',
        borderColor: '#a8a29e',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: `${activeRegion.region_name || 'Selected Zone'} Price (₹)`,
        data: chartSubset.map((p) => p.regional_demo_value),
        backgroundColor: 'rgba(245, 158, 11, 0.85)',
        borderColor: '#fbbf24',
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
        labels: { color: '#e7e5e4', font: { size: 11, weight: 'bold' } },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.raw?.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(72, 53, 37, 0.3)' },
        ticks: { color: '#d6d3d1', font: { size: 10 } },
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

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MapPin className="w-7 h-7 text-amber-400" />
            <span>NCR Regional Price Variance</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-world geographical retail price variation driven by Delhi, Haryana, and Uttar Pradesh State Excise policies.
          </p>
        </div>
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
          State Excise Benchmark
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
                  ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'bg-lounge-850 border-lounge-750 hover:border-amber-500/40 hover:bg-lounge-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                  {r.region_name}
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <p className="text-[11px] text-stone-400 line-clamp-1">{r.description}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Zone Average MRP
          </span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            ₹{avgZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-amber-300/80">Mean retail price across {activeZoneProducts.length} bottles</span>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Lowest In Zone
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            ₹{minZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-400/80">Entry-tier beverage benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
            Highest In Zone
          </span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">
            ₹{maxZonePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-amber-300/80">Single malt & luxury reserve tier</span>
        </div>
      </div>

      {/* Comparative Variance Chart */}
      <div className="p-6 rounded-2xl bg-lounge-850 border border-lounge-750 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">
              Base Benchmark vs {activeRegion.region_name} Variance (Sample Malts & Beers)
            </h3>
            <p className="text-xs text-stone-400">Evaluating local pricing adjustments against standard base rates.</p>
          </div>
          <span className="text-xs text-amber-400/90 hidden sm:inline font-mono">Currency: INR (₹)</span>
        </div>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Regional Data Table */}
      <div className="p-6 rounded-2xl bg-lounge-850 border border-lounge-750 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-white text-base">
              Detailed Price & Availability Matrix for {activeRegion.region_name}
            </h3>
            <span className="text-[11px] text-amber-300/90 font-medium">
              Showing {displayedZoneProducts.length} of {activeZoneProducts.length} brands cataloged
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by brand or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-lounge-900 border border-lounge-700 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-lounge-750 text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Base MRP</th>
                <th className="py-3 px-4">Regional MRP</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Official Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lounge-750 text-stone-300">
              {displayedZoneProducts.map((item, idx) => {
                const diff = item.regional_demo_value - item.base_demo_value;
                const pct = ((diff / item.base_demo_value) * 100).toFixed(1);
                const isPositive = diff > 0;
                return (
                  <tr key={idx} className="hover:bg-lounge-800/60">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="w-8 h-8 rounded-lg object-cover border border-amber-500/20"
                        />
                      )}
                      <span>{item.product_name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.product_category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-400 font-medium">{item.package_size}</td>
                    <td className="py-3 px-4">₹{Number(item.base_demo_value).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-black text-amber-400">
                      ₹{Number(item.regional_demo_value).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        diff === 0
                          ? 'bg-stone-800 text-stone-400'
                          : isPositive
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {isPositive ? `+${pct}%` : `${pct}%`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-stone-300 max-w-[220px] truncate" title={item.availability}>
                      {item.availability || 'Authorized excise retail vends'}
                    </td>
                    <td className="py-3 px-4">
                      {item.brand_url ? (
                        <a
                          href={item.brand_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-400 hover:text-white transition font-semibold"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-stone-500">N/A</span>
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
