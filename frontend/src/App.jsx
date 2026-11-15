import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Bot, MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Comparison from './pages/Comparison';
import RegionComparison from './pages/RegionComparison';
import Analytics from './pages/Analytics';
import Awareness from './pages/Awareness';
import About from './pages/About';
import Admin from './pages/Admin';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Global Selected IDs for comparison (Default with products 1 and 2 selected)
  const [selectedCompareIds, setSelectedCompareIds] = useState([1, 2]);

  const toggleCompareProduct = (id) => {
    setSelectedCompareIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const clearCompareSelection = () => {
    setSelectedCompareIds([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
        {/* Top Navbar */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Body */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-6 pt-6">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Page View Outlet */}
          <main className="flex-1 w-full min-w-0 pb-16">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    selectedCompareIds={selectedCompareIds}
                    onToggleCompare={toggleCompareProduct}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/compare"
                element={
                  <Comparison
                    selectedCompareIds={selectedCompareIds}
                    onToggleCompare={toggleCompareProduct}
                    onClearCompare={clearCompareSelection}
                  />
                }
              />
              <Route path="/regions" element={<RegionComparison />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/chatbot"
                element={
                  <div className="max-w-3xl mx-auto space-y-4">
                    <div className="text-center space-y-1">
                      <h1 className="text-2xl font-bold text-white">NCRB AI Assistant</h1>
                      <p className="text-xs text-slate-400">
                        Academic Guide for NCRB BOOZE COMPARE • Created by Prashant Pandey
                      </p>
                    </div>
                    <Chatbot />
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Floating AI Assistant Trigger Button & Modal */}
        <div className="fixed bottom-6 right-6 z-50">
          {isChatbotOpen ? (
            <div className="relative">
              <Chatbot isModal={true} onClose={() => setIsChatbotOpen(false)} />
            </div>
          ) : (
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-brand-cyan hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all"
              aria-label="Open NCRB AI Assistant"
            >
              <Bot className="w-5 h-5 animate-bounce" />
              <span className="hidden sm:inline">Ask NCRB AI</span>
            </button>
          )}
        </div>

        {/* Global Academic Footer */}
        <Footer />
      </div>
    </Router>
  );
}
