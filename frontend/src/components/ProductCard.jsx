import React, { useState } from 'react';
import { Check, Plus, Wine, Tag, ExternalLink, MapPin, Eye, Sparkles } from 'lucide-react';
import ProductModal from './ProductModal';

export default function ProductCard({ product, isSelected, onToggleSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-lounge-850 to-lounge-900 border transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 overflow-hidden ${
        isSelected ? 'border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/15' : 'border-lounge-700/80'
      }`}>
        {/* Product Image Banner */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative h-48 w-full bg-lounge-950/90 overflow-hidden flex items-center justify-center p-2.5 cursor-pointer"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover rounded-xl opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-lounge-850 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wine className="w-8 h-8" />
            </div>
          )}

          {/* Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-lounge-900 via-transparent to-black/20 pointer-events-none" />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-lounge-950/85 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Tag className="w-3 h-3 text-amber-400" />
            {product.category}
          </span>

          {/* ABV Pill */}
          {product.abv && (
            <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-lounge-950/85 text-stone-300 border border-lounge-700 backdrop-blur-md">
              {product.abv} ABV
            </span>
          )}

          {/* View Details Quick Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-lounge-950/85 text-stone-300 hover:text-amber-300 hover:bg-lounge-800 border border-amber-500/20 backdrop-blur-md transition opacity-0 group-hover:opacity-100 shadow-md"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => setIsModalOpen(true)}
                className="font-bold text-white text-base leading-snug tracking-tight cursor-pointer hover:text-amber-300 transition"
              >
                {product.name}
              </h3>
            </div>
            <p className="text-xs text-amber-400/90 mt-0.5 font-medium">{product.package_size}</p>

            <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Regional Availability Tag */}
            {product.availability && (
              <div className="mt-3 flex items-start gap-1.5 text-[11px] text-amber-300/80 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{product.availability}</span>
              </div>
            )}
          </div>

          {/* Price & Compare Action */}
          <div className="mt-4 pt-3.5 border-t border-lounge-750 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase tracking-wider font-semibold">
                Indicative Retail MRP
              </span>
              <span className="text-xl font-black text-amber-400 drop-shadow-sm">
                ₹{product.demo_value ? Number(product.demo_value).toLocaleString('en-IN') : '0'}
              </span>
            </div>

            <button
              onClick={() => onToggleSelect(product.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                isSelected
                  ? 'bg-amber-500 text-lounge-950 shadow-md shadow-amber-500/30 hover:bg-amber-400'
                  : 'bg-lounge-750 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:text-white'
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
      </div>

      {/* Details Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
      />
    </>
  );
}
