import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Database,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const vivaQuestions = [
    {
      q: 'What is the primary motivation and goal of this project?',
      a: 'The project demonstrates full-stack web engineering, dynamic product comparison algorithms, geographic price variance simulation, and AI chatbot integration using React.js, Tailwind CSS, Python Flask, and SQLite. It provides an academic portfolio demonstration of how relational data can be compared and visualized interactively.',
    },
    {
      q: 'Why are all product prices and brands fictional?',
      a: 'As an educational and college demonstration project, using real commercial liquor brands, market prices, or store directions is intentionally avoided to ensure compliance with legal and academic ethics. All records are flagged as is_fictional = 1 and labeled as demonstration dummy data.',
    },
    {
      q: 'Explain the database design and tables used in SQLite.',
      a: 'The database contains 5 core tables: products (storing sample product specifications and base demo values), regions (storing fictional Demo Zones 1–4), regional_demo_data (linking products and regions via foreign keys to simulate geographical variance), chatbot_history (logging user and assistant exchanges), and data_sources (academic references and citations).',
    },
    {
      q: 'How does the comparison algorithm work?',
      a: 'When two or more product IDs are passed to the frontend or /api/comparison endpoint, the system retrieves their attribute records and regional price points. It computes key statistical indicators including lowest demo value, highest demo value, and maximum price spread, highlighting differences visually in the UI.',
    },
    {
      q: 'How does the AI Chatbot ensure safety and adherence to instructions?',
      a: 'The Flask chatbot route passes incoming queries through an upfront regex filter (check_purchase_or_location_query). If a user asks for real-world liquor purchases, nearby store locations, or retail directions, the system immediately intercepts the request and issues a polite academic compliance notice explaining the fictional nature of the project.',
    },
    {
      q: 'How can the application run offline during a presentation?',
      a: 'The AI Assistant contains a dual-engine architecture: it can use the live OpenAI or Gemini API when keys are supplied, but it also includes an extensive local offline knowledge engine with pattern matching to answer project queries, chart explanations, and viva questions seamlessly without an internet connection.',
    },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Student Profile Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-brand-cyan border border-blue-500/20 mb-1">
              Academic Project Portfolio
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Prashant Pandey</h1>
            <p className="text-sm text-slate-300">NCRB BOOZE COMPARE • Full-Stack Web Application</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="px-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Project Type</span>
            <span className="text-xs font-bold text-white">College Demonstration</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Dataset Status</span>
            <span className="text-xs font-bold text-amber-400">100% Fictional Data</span>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-cyan" />
          <h2 className="text-xl font-bold text-white">Technology Stack Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-cyan flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Frontend Layer</h3>
            <p className="text-xs text-slate-400 mt-1">
              React.js 18, Vite build tool, Tailwind CSS for dark modern theme, and Lucide React icons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Backend API Layer</h3>
            <p className="text-xs text-slate-400 mt-1">
              Python 3.14 with Flask REST API, Flask-CORS, and modular Blueprints for clean routing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Database Layer</h3>
            <p className="text-xs text-slate-400 mt-1">
              SQLite3 relational database (<code className="text-brand-cyan">ncrb_demo.db</code>) with parameterized SQL.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-800 border border-navy-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">AI Assistant</h3>
            <p className="text-xs text-slate-400 mt-1">
              NCRB AI Assistant with OpenAI API support and built-in offline academic knowledge engine.
            </p>
          </div>
        </div>
      </section>

      {/* College Presentation & Viva Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white">College Viva Questions & Model Answers</h2>
        </div>
        <p className="text-xs text-slate-400">
          Prepare for external examiner questions regarding design choices, architecture, and safety filters.
        </p>

        <div className="space-y-3">
          {vivaQuestions.map((q, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-navy-800 border border-navy-700 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:bg-navy-700/50 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-brand-cyan flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    {q.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-navy-700/60 pt-3">
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
