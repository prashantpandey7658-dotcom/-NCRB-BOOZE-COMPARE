import React from 'react';
import { Wine, Menu, X, BarChart3, Bot, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-40 bg-lounge-950/95 backdrop-blur-md border-b border-lounge-700/80">
      {/* Sleek Top Portal Bar */}
      <div className="bg-gradient-to-r from-lounge-950 via-amber-950/40 to-lounge-950 border-b border-amber-500/20 px-4 py-1.5 text-center text-[11px] text-amber-300 font-semibold tracking-wider flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span>NCR REGIONAL EXCISE PRICE & BRAND BENCHMARK PORTAL • STATUTORY REGULATIONS APPLY</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-lounge-800 text-stone-300 hover:text-white hover:bg-lounge-750 transition"
            aria-label="Toggle Navigation Menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-lounge-950 font-bold shadow-lg shadow-amber-500/25 group-hover:scale-105 transition">
              <Wine className="w-5 h-5 text-lounge-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                NCRB <span className="text-amber-400">BOOZE COMPARE</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                NCR Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[11px] text-stone-400 font-medium">Curated by</span>
            <span className="text-xs font-bold text-amber-300">Prashant Pandey</span>
          </div>

          <Link
            to="/chatbot"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">NCRB Assistant</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
