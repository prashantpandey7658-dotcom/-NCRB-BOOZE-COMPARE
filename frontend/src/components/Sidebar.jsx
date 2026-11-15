import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  GitCompare,
  MapPin,
  PieChart,
  ShieldAlert,
  Bot,
  Info,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Comparison', path: '/compare', icon: GitCompare },
  { name: 'Region Demo', path: '/regions', icon: MapPin },
  { name: 'Analytics', path: '/analytics', icon: PieChart },
  { name: 'Awareness', path: '/awareness', icon: ShieldAlert },
  { name: 'AI Assistant', path: '/chatbot', icon: Bot },
  { name: 'About & Viva', path: '/about', icon: Info },
  { name: 'Admin Portal', path: '/admin', icon: SlidersHorizontal },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[85px] left-0 z-30 h-screen lg:h-[calc(100vh-85px)] w-64 bg-navy-900 border-r border-navy-700 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="px-3 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </span>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600/20 text-brand-cyan border border-blue-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Academic Student Badge at bottom */}
        <div className="p-3.5 rounded-xl bg-navy-800/80 border border-navy-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-cyan">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Prashant Pandey</p>
              <p className="text-[11px] text-slate-400">College Demo Project</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-1 rounded">
            All prices are fictional demonstration figures.
          </p>
        </div>
      </aside>
    </>
  );
}
