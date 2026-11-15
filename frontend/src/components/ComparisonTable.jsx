import React from 'react';
import { X, ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ComparisonTable({ products, onRemoveProduct }) {
  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-navy-800 border border-navy-700 text-slate-400">
        <p className="text-sm">No sample products selected for comparison.</p>
        <p className="text-xs text-slate-500 mt-1">Select at least two products to inspect side-by-side differences.</p>
      </div>
    );
  }

  // Find min and max base demo values to highlight differences
  const demoValues = products.map((p) => p.demo_value);
  const minVal = Math.min(...demoValues);
  const maxVal = Math.max(...demoValues);

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-700 bg-navy-800 shadow-xl">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-navy-700 bg-navy-900/60">
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-44">
              Attribute
            </th>
            {products.map((p) => (
              <th key={p.id} className="p-4 text-white min-w-[200px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-base text-brand-cyan">{p.name}</span>
                  {onRemoveProduct && (
                    <button
                      onClick={() => onRemoveProduct(p.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700 transition"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-700/60 text-slate-300">
          {/* Category */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Category
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 font-medium text-slate-200">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-brand-cyan border border-blue-500/20">
                  {p.category}
                </span>
              </td>
            ))}
          </tr>

          {/* Package Size */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Package Size
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-slate-300">
                {p.package_size}
              </td>
            ))}
          </tr>

          {/* Base Demo Value */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Base Demo Value
            </td>
            {products.map((p) => {
              const isMin = products.length > 1 && p.demo_value === minVal;
              const isMax = products.length > 1 && p.demo_value === maxVal;
              return (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white">
                      ₹{Number(p.demo_value).toLocaleString('en-IN')}
                    </span>
                    {isMin && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <ArrowDownRight className="w-3 h-3" /> Lowest
                      </span>
                    )}
                    {isMax && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <ArrowUpRight className="w-3 h-3" /> Highest
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Demo Zone 1 */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Demo Zone 1 (Baseline)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name === 'Demo Zone 1');
              const val = reg ? reg.demo_value : p.demo_value;
              return (
                <td key={p.id} className="p-4 font-medium text-slate-300">
                  ₹{Number(val).toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Demo Zone 2 */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Demo Zone 2 (+12.5%)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name === 'Demo Zone 2');
              const val = reg ? reg.demo_value : Math.round(p.demo_value * 1.125);
              return (
                <td key={p.id} className="p-4 font-medium text-slate-300">
                  ₹{Number(val).toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Demo Zone 3 */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Demo Zone 3 (-8.3%)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name === 'Demo Zone 3');
              const val = reg ? reg.demo_value : Math.round(p.demo_value * 0.917);
              return (
                <td key={p.id} className="p-4 font-medium text-slate-300">
                  ₹{Number(val).toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Demo Zone 4 */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Demo Zone 4 (+20.8%)
            </td>
            {products.map((p) => {
              const reg = p.regional_values?.find((r) => r.region_name === 'Demo Zone 4');
              const val = reg ? reg.demo_value : Math.round(p.demo_value * 1.208);
              return (
                <td key={p.id} className="p-4 font-medium text-slate-300">
                  ₹{Number(val).toLocaleString('en-IN')}
                </td>
              );
            })}
          </tr>

          {/* Description */}
          <tr className="hover:bg-navy-700/20">
            <td className="p-4 text-xs font-semibold uppercase text-slate-400 bg-navy-900/30">
              Description
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-xs text-slate-400 leading-relaxed">
                {p.description}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
