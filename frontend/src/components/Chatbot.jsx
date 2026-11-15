import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Trash2, X, Sparkles, RefreshCw, Wine } from 'lucide-react';
import api from '../services/api';

const QUICK_PROMPTS = [
  'Single malts under ₹6,000',
  'Delhi vs Gurugram price difference',
  'Best craft beers & lagers',
  'Food pairings & cocktail recipes',
  'What is the legal drinking age in NCR?',
];

export default function Chatbot({ isModal = false, onClose = null }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Welcome to **The Grand Cellar • NCRB AI Sommelier**! 🥂\n\nI can assist you with retail price benchmarks for 141+ genuine bottles, tasting notes, chef food pairings, mixology cocktail recipes, and regional excise duty modeling across Delhi, Gurugram, Noida, and Faridabad. What spirits or styles are you exploring today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageToSend = null) => {
    const text = (messageToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.sendChatMessage(text);
      const assistantText = res.data?.data?.response || 'I am ready to help with your cellar and price inquiries.';
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: assistantText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: '⚠️ System Notice: Unable to connect to backend server. Please verify the API server is operational on port 5050.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await api.clearChatHistory();
    } catch (e) {
      // ignore
    }
    setMessages([
      {
        sender: 'assistant',
        text: 'Chat history cleared. How can I assist your cellar exploration today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className={`flex flex-col rounded-2xl bg-lounge-900 border border-amber-500/30 shadow-2xl overflow-hidden ${
      isModal ? 'h-[580px] w-full max-w-lg' : 'h-[650px] w-full'
    }`}>
      {/* Header */}
      <div className="p-4 bg-lounge-850 border-b border-lounge-750 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Wine className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span>NCRB AI SOMMELIER</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-amber-300/80">Digital Sommelier & Regional Price Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClear}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-lounge-750 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-lounge-750 transition"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="px-4 py-2.5 bg-lounge-950/70 border-b border-lounge-750 overflow-x-auto flex gap-2 text-xs scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-lounge-800 border border-lounge-700 hover:border-amber-400 text-stone-300 hover:text-white transition whitespace-nowrap flex-shrink-0 text-[11px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-600 text-lounge-950 font-medium rounded-br-none shadow-md shadow-amber-600/20'
                  : 'bg-lounge-850 border border-lounge-750 text-stone-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
            <span className="text-[10px] text-stone-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-lounge-850 border border-lounge-750 w-fit text-stone-400 text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>AI Sommelier is formulating cellar notes...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-lounge-850 border-t border-lounge-750 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Sommelier about malts, beers, pairings, or NCR prices..."
          className="flex-1 bg-lounge-900 border border-lounge-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-lounge-950 font-bold transition flex items-center justify-center shadow-md shadow-amber-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
