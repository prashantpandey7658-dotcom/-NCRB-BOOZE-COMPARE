import React, { useState } from 'react';
import {
  Wine,
  Code2,
  Database,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Cpu,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const vivaQuestions = [
    {
      q: 'Why do liquor prices differ significantly between Delhi, Gurugram, and Noida?',
      a: 'Under the Seventh Schedule of the Indian Constitution, alcoholic beverages are state subjects. Delhi operates under the Delhi Excise Act with government-controlled retail vends (DTTDC/DSIIDC). Haryana (Gurugram/Faridabad) employs a liberalized private retail auction model with lower base excise duties on imported beer and premium spirits. Uttar Pradesh (Noida) imposes consolidated state duties and special development cess, leading to distinct regional retail price spreads.',
    },
    {
      q: 'How does the comparison algorithm calculate price spread and variance?',
      a: 'The backend queries genuine product specifications across selected product IDs. It calculates arithmetic minimum, maximum, and delta price spreads, alongside computing percentage divergence from Delhi baseline MRPs for Gurugram (-10%), Noida (+8%), and Faridabad (-8%).',
    },
    {
      q: 'What is the technical architecture of NCRB BOOZE COMPARE?',
      a: 'The application is built on a decoupled full-stack architecture: React 18 Single Page Application (Vite) styled with Tailwind CSS, Chart.js visualizations, and a Python 3.14 Flask RESTful API communicating with a normalized SQLite3 relational database using parameterized queries and foreign-key integrity.',
    },
    {
      q: 'How does the NCRB AI Assistant assist users while complying with legal regulations?',
      a: 'The assistant features an intelligent multi-provider architecture supporting Google Gemini API (gemini-1.5-flash) and an expert local sommelier engine. It includes an automated compliance filter that intercepts queries asking for unlawful alcohol deliveries or direct purchasing, explaining that retail inventory is exclusively available through licensed state excise vends.',
    },
    {
      q: 'What are the legal drinking ages across the NCR?',
      a: 'In Delhi and Haryana, the Minimum Legal Drinking Age (MLDA) is 25 years (mild beer/wine at 21 in Haryana). In Uttar Pradesh (Noida/Ghaziabad), the legal drinking age is 21 years. The platform features verified statutory health warnings and helpline directories.',
    },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Platform Overview Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-lounge-850 via-lounge-900 to-amber-950/30 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-lounge-950 font-black shadow-lg shadow-amber-500/25">
            <Wine className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-1">
              Platform Creator & Lead Developer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Prashant Pandey</h1>
            <p className="text-sm text-stone-300">NCRB BOOZE COMPARE • Full-Stack Web Platform</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="px-4 py-2.5 rounded-xl bg-lounge-800 border border-lounge-700 text-center">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Coverage</span>
            <span className="text-xs font-bold text-amber-300">Delhi • Gurgaon • Noida • Faridabad</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-lounge-800 border border-lounge-700 text-center">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Data Sources</span>
            <span className="text-xs font-bold text-emerald-400">Official State Excise MRPs</span>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Technical Architecture & Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Frontend Layer</h3>
            <p className="text-xs text-stone-400 mt-1">
              React 18 SPA with Vite, Tailwind CSS with bar-lounge dark amber styling, and Lucide React icons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Backend API Layer</h3>
            <p className="text-xs text-stone-400 mt-1">
              Python 3.14 with Flask RESTful API, Flask-CORS, and modular Blueprints for clean route encapsulation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Database Layer</h3>
            <p className="text-xs text-stone-400 mt-1">
              SQLite3 relational database (<code className="text-amber-300">ncrb.db</code>) with parameterized SQL and foreign keys.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Gemini AI Assistant</h3>
            <p className="text-xs text-stone-400 mt-1">
              Google Gemini API (gemini-1.5-flash) and intelligent local sommelier engine with compliance filtering.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Inquiries */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions & Excise Dynamics</h2>
        </div>
        <p className="text-xs text-stone-400">
          Key insights into regional pricing models, duty structures, and architectural implementations.
        </p>

        <div className="space-y-3">
          {vivaQuestions.map((q, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-lounge-850 border border-lounge-750 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:bg-lounge-800 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    {q.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-stone-300 leading-relaxed border-t border-lounge-750 pt-3">
                    {q.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
