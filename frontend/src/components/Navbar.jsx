import React from 'react';
import { ShieldAlert, Sparkles, Menu, X, BarChart3, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-navy-700">
      {/* Prominent Academic Demonstration Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
        <span>COLLEGE DEMONSTRATION PROJECT — FICTIONAL DEMO DATA ONLY — NOT REAL MARKET PRICES</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition"
            aria-label="Toggle Navigation Menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                NCRB <span className="text-brand-cyan">BOOZE COMPARE</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-semibold bg-blue-500/10 text-brand-cyan border border-blue-500/20 rounded-full">
                Academic Demo
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs text-slate-400">Created by</span>
            <span className="text-xs font-semibold text-slate-200">Prashant Pandey</span>
          </div>

          <Link
            to="/chatbot"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600/20 text-brand-cyan border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-400 transition"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">NCRB AI Assistant</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
