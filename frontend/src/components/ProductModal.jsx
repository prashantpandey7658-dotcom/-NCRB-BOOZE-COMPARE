import React, { useEffect } from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Tag,
  Percent,
  Check,
  Plus,
  Wine,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, isSelected, onToggleSelect }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const basePrice = Number(product.demo_value || 0);
  const delhiPrice = basePrice;
  const gurugramPrice = Math.round(basePrice * 0.90);
  const noidaPrice = Math.round(basePrice * 1.08);
  const faridabadPrice = Math.round(basePrice * 0.92);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-lounge-900 border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden z-10 my-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="p-4 sm:p-6 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
              {product.category}
            </span>
            {product.abv && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-lounge-800 text-stone-300 border border-lounge-700">
                {product.abv} ABV
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-lounge-800 text-stone-400 hover:text-white hover:bg-lounge-750 border border-lounge-700 transition"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* High-Res Bottle Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-lounge-950 border border-amber-500/20 overflow-hidden flex items-center justify-center p-3 group">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-lounge-800 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Wine className="w-10 h-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-lounge-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[11px] text-amber-300/80 font-medium">
                  {product.package_size} • Verified Genuine Bottle
                </span>
              </div>
            </div>

            {/* Product Overview & Tasting Notes */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-amber-400 font-semibold mt-1">
                  Volume: {product.package_size} {product.abv ? `• Strength: ${product.abv}` : ''}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-lounge-800/80 border border-lounge-700/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Tasting Profile & Notes</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {product.description || 'Authentic premium beverage distilled, aged, and bottled to perfection under regional standards.'}
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-lounge-800 to-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Indicative Retail MRP
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onToggleSelect(product.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
                    isSelected
                      ? 'bg-amber-500 text-lounge-950 shadow-amber-500/30 hover:bg-amber-400'
                      : 'bg-lounge-700 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Compare</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Compare Brand</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Regional Price Breakdown Across NCR */}
          <div className="space-y-3 pt-4 border-t border-lounge-750">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Cross-Border Regional MRP Index (NCR)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-lounge-800/80 border border-lounge-700">
                <span className="text-[10px] text-stone-400 font-semibold block">Delhi (NCT)</span>
                <span className="text-base font-bold text-white">₹{delhiPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Statutory Baseline</span>
              </div>

              <div className="p-3 rounded-xl bg-lounge-800/80 border border-emerald-500/30 bg-emerald-500/5">
                <span className="text-[10px] text-emerald-400 font-semibold block">Gurugram (HR)</span>
                <span className="text-base font-bold text-emerald-400">₹{gurugramPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-emerald-300/80 block mt-0.5">~10% Advantage</span>
              </div>

              <div className="p-3 rounded-xl bg-lounge-800/80 border border-amber-500/30 bg-amber-500/5">
                <span className="text-[10px] text-amber-300 font-semibold block">Noida (UP)</span>
                <span className="text-base font-bold text-amber-300">₹{noidaPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-amber-300/80 block mt-0.5">UP State Duty</span>
              </div>

              <div className="p-3 rounded-xl bg-lounge-800/80 border border-lounge-700">
                <span className="text-[10px] text-stone-400 font-semibold block">Faridabad (HR)</span>
                <span className="text-base font-bold text-white">₹{faridabadPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">~8% Advantage</span>
              </div>
            </div>
          </div>

          {/* Verified Availability & Store Addresses */}
          <div className="p-4 rounded-2xl bg-lounge-950/70 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Retail Availability & Authorized Outlets</span>
              </span>
              <span className="text-[10px] text-stone-400">Licensed L-2 / L-10 Outlets</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {product.availability || 'Available at authorized premium state excise vends and licensed cellars across Delhi, Gurugram, Noida, and Faridabad.'}
            </p>
          </div>

          {/* Official Brand Link */}
          {product.brand_url && (
            <div className="pt-2 flex justify-end">
              <a
                href={product.brand_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition"
              >
                <span>Visit Official Brand Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
