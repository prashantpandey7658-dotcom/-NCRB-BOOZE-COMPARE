import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  GitCompare,
  MapPin,
  PieChart,
  ShieldCheck,
  Bot,
  Info,
  SlidersHorizontal,
  Wine
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Brand Comparison', path: '/compare', icon: GitCompare },
  { name: 'NCR Regional Zones', path: '/regions', icon: MapPin },
  { name: 'Price Analytics', path: '/analytics', icon: PieChart },
  { name: 'Excise & Safety', path: '/awareness', icon: ShieldCheck },
  { name: 'NCRB Assistant', path: '/chatbot', icon: Bot },
  { name: 'Overview & Insights', path: '/about', icon: Info },
  { name: 'Catalog Portal', path: '/admin', icon: SlidersHorizontal },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[85px] left-0 z-30 h-screen lg:h-[calc(100vh-85px)] w-64 bg-lounge-900 border-r border-lounge-750 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Explorer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
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
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/5'
                        : 'text-stone-300 hover:text-white hover:bg-lounge-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 text-amber-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Portal Information Badge at bottom */}
        <div className="p-3.5 rounded-xl bg-lounge-800/80 border border-lounge-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wine className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">NCR Regional Portal</p>
              <p className="text-[10px] text-amber-300/80">Delhi • Gurgaon • Noida</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-stone-400 bg-lounge-950/60 px-2 py-1 rounded border border-lounge-700/50">
            Statutory legal age laws apply (21 / 25 yrs).
          </p>
        </div>
      </aside>
    </>
  );
}
