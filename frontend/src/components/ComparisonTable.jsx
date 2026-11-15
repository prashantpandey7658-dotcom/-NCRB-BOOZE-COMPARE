import React from 'react';
import { X, ArrowDownRight, ArrowUpRight, ExternalLink, MapPin, Percent, Tag } from 'lucide-react';

export default function ComparisonTable({ products, onRemoveProduct }) {
  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-lounge-850 border border-lounge-750 text-stone-400">
        <p className="text-sm font-medium">No products selected for comparison.</p>
        <p className="text-xs text-stone-500 mt-1">Select at least two brands below to inspect side-by-side differences.</p>
      </div>
    );
  }

  // Find min and max base demo values to highlight differences
  const demoValues = products.map((p) => Number(p.demo_value || 0));
  const minVal = Math.min(...demoValues);
  const maxVal = Math.max(...demoValues);

  return (
    <div className="overflow-x-auto rounded-2xl border border-lounge-750 bg-lounge-850/90 shadow-2xl">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-lounge-750 bg-lounge-900/90">
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-400/90 w-48">
              Brand & Details
            </th>
            {products.map((p) => (
              <th key={p.id} className="p-4 text-white min-w-[240px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-base text-amber-300">{p.name}</span>
                    {onRemoveProduct && (
                      <button
                        onClick={() => onRemoveProduct(p.id)}
                        className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-lounge-750 transition"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-28 w-full object-cover rounded-xl border border-amber-500/20"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-lounge-750 text-stone-300">
          {/* Category */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Category
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 font-medium text-stone-200">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {p.category}
                </span>
              </td>
            ))}
          </tr>

          {/* Alcohol Strength (ABV) */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Alcohol Volume (ABV)
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-stone-200 font-semibold">
                <span className="px-2 py-0.5 rounded text-xs bg-lounge-800 border border-lounge-700 text-stone-300">
                  {p.abv || '40%'}
                </span>
              </td>
            ))}
          </tr>

          {/* Package Size */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Bottle Size
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-stone-300 font-medium">
                {p.package_size}
              </td>
            ))}
          </tr>

          {/* Benchmark Base MRP */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Indicative Base MRP
            </td>
            {products.map((p) => {
              const val = Number(p.demo_value || 0);
              const isMin = products.length > 1 && val === minVal;
              const isMax = products.length > 1 && val === maxVal;
              return (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-amber-400">
                      ₹{val.toLocaleString('en-IN')}
                    </span>
                    {isMin && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <ArrowDownRight className="w-3 h-3" /> Best Value
                      </span>
                    )}
                    {isMax && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <ArrowUpRight className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Delhi Zone */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Delhi Zone (NCT Baseline)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name.includes('Delhi'));
              const val = reg ? Number(reg.demo_value) : Number(p.demo_value || 0);
              return (
                <td key={p.id} className="p-4 font-semibold text-stone-200">
                  ₹{val.toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Gurugram Zone */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Gurugram Zone (~10% Lower)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name.includes('Gurugram'));
              const val = reg ? Number(reg.demo_value) : Math.round(Number(p.demo_value || 0) * 0.9);
              return (
                <td key={p.id} className="p-4 font-bold text-emerald-400">
                  ₹{val.toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Noida Zone */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Noida Zone (UP Duty)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name.includes('Noida'));
              const val = reg ? Number(reg.demo_value) : Math.round(Number(p.demo_value || 0) * 1.08);
              return (
                <td key={p.id} className="p-4 font-semibold text-amber-300">
                  ₹{val.toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Faridabad Zone */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Faridabad Zone (Haryana)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name.includes('Faridabad'));
              const val = reg ? Number(reg.demo_value) : Math.round(Number(p.demo_value || 0) * 0.92);
              return (
                <td key={p.id} className="p-4 font-semibold text-stone-200">
                  ₹{val.toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Availability */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Retail Availability
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-xs text-amber-200/90">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{p.availability || 'Available at authorized regional excise vends'}</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Official Brand Link */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Brand Portal
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4">
                {p.brand_url ? (
                  <a
                    href={p.brand_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition"
                  >
                    <span>Visit Brand Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-stone-500">Official Portal</span>
                )}
              </td>
            ))}
          </tr>

          {/* Description */}
          <tr className="hover:bg-lounge-800/40">
            <td className="p-4 text-xs font-semibold uppercase text-stone-400 bg-lounge-900/40">
              Tasting Profile
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-xs text-stone-400 leading-relaxed">
                {p.description}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
