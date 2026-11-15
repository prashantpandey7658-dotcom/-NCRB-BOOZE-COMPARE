import React from 'react';
import { ShieldCheck, Heart, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 border-t border-navy-700/80 py-10 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white tracking-tight">
              NCRB <span className="text-brand-cyan">BOOZE COMPARE</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-brand-cyan border border-blue-500/20">
              College Academic Project
            </span>
          </div>
          <p className="mt-1 text-slate-400 max-w-lg leading-relaxed">
            Designed and developed by <strong className="text-slate-200">Prashant Pandey</strong> for educational evaluation.
            Demonstrates multi-attribute comparison matrices, regional variance visualization, and AI chatbot integration.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 text-left md:text-right">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Academic Demonstration Notice</span>
          </div>
          <p className="text-[11px] text-amber-400/90 max-w-sm">
            All product brands, specifications, and regional pricing are purely fictional demonstration records.
            Not intended for commercial release or purchasing reference.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© 2026 NCRB BOOZE COMPARE • Prashant Pandey • Academic Demonstration</p>
        <div className="flex items-center gap-3">
          <span>React.js</span>
          <span>•</span>
          <span>Python Flask</span>
          <span>•</span>
          <span>SQLite3</span>
          <span>•</span>
          <span>Chart.js</span>
        </div>
      </div>
    </footer>
  );
}
