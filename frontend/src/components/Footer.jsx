import React from 'react';
import { ShieldCheck, Heart, Wine } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-lounge-950 border-t border-lounge-750 py-10 px-4 sm:px-6 lg:px-8 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white tracking-tight">
              NCRB <span className="text-amber-400">BOOZE COMPARE</span>
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
              NCR Price Index
            </span>
          </div>
          <p className="mt-1.5 text-stone-400 max-w-lg leading-relaxed">
            Curated by <strong className="text-stone-200">Prashant Pandey</strong>.
            Providing cross-region retail price benchmarks, brand tasting notes, and state excise duty comparisons across the National Capital Region.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 text-left md:text-right">
          <div className="flex items-center gap-2 text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Statutory Compliance & Legal Guidelines</span>
          </div>
          <p className="text-[11px] text-amber-300/80 max-w-sm leading-relaxed">
            All prices reflect indicative Maximum Retail Prices (MRP) compiled from State Excise schedules.
            Alcohol sale is strictly restricted to individuals above the Minimum Legal Drinking Age (21/25 years). Drink responsibly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-lounge-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <p>© 2026 NCRB BOOZE COMPARE • Curated by Prashant Pandey</p>
        <div className="flex items-center gap-3 text-stone-400">
          <span>Delhi NCT</span>
          <span>•</span>
          <span>Gurugram</span>
          <span>•</span>
          <span>Noida</span>
          <span>•</span>
          <span>Faridabad</span>
        </div>
      </div>
    </footer>
  );
}
