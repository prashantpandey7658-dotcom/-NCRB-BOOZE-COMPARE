import React from 'react';
import { Check, Plus, Wine, Tag } from 'lucide-react';

export default function ProductCard({ product, isSelected, onToggleSelect }) {
  return (
    <div className={`relative flex flex-col justify-between p-5 rounded-2xl bg-navy-800 border transition-all duration-200 hover:border-slate-500 hover:shadow-lg ${
      isSelected ? 'border-brand-cyan ring-1 ring-brand-cyan/50 bg-navy-800/90' : 'border-navy-700'
    }`}>
      {/* Category and Fictional Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-brand-cyan border border-blue-500/20">
            <Tag className="w-3 h-3" />
            {product.category}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            DEMO DATA
          </span>
        </div>

        {/* Product Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-navy-700/80 border border-navy-600 flex items-center justify-center text-slate-300 flex-shrink-0">
            <Wine className="w-5 h-5 text-brand-cyan" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-snug">{product.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{product.package_size}</p>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
          {product.description || 'Fictional sample beverage record for academic comparison algorithms.'}
        </p>
      </div>

      {/* Pricing & Compare Toggle */}
      <div className="mt-5 pt-4 border-t border-navy-700 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Demo Price</span>
          <span className="text-lg font-extrabold text-white">
            ₹{product.demo_value ? Number(product.demo_value).toLocaleString('en-IN') : '0'}
          </span>
        </div>

        <button
          onClick={() => onToggleSelect(product.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            isSelected
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
              : 'bg-blue-600/20 text-brand-cyan border border-blue-500/30 hover:bg-blue-600/30'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
