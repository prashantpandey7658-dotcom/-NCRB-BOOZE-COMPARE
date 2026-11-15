import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Trash2, X, MessageSquare, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../services/api';

const QUICK_PROMPTS = [
  'What is this project about?',
  'How does product comparison work?',
  'Explain Demo Zones 1 to 4',
  'What is the legal drinking age in NCR?',
  'Where can I buy liquor near me?', // Will trigger safety refusal demo
];

export default function Chatbot({ isModal = false, onClose = null }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am **NCRB AI ASSISTANT**, your academic project guide. Ask me anything about the comparison matrix, demo zones, Chart.js analytics, database schema, or health awareness policies!',
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
      const assistantText = res.data?.data?.response || 'I am ready to help with your academic demonstration.';
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
          text: '⚠️ System Notice: Unable to connect to backend API server. Please verify that the Flask server is running on port 5000.',
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
        text: 'Chat history cleared. I am ready to guide your project evaluation!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className={`flex flex-col rounded-2xl bg-navy-900 border border-navy-700 shadow-2xl overflow-hidden ${
      isModal ? 'h-[580px] w-full max-w-lg' : 'h-[650px] w-full'
    }`}>
      {/* Header */}
      <div className="p-4 bg-navy-800 border-b border-navy-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-brand-cyan">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              NCRB AI ASSISTANT
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-400">Academic Project Companion</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClear}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700 transition"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="px-4 py-2 bg-navy-900/60 border-b border-navy-700/60 overflow-x-auto flex gap-2 text-xs scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-navy-800 border border-navy-700 hover:border-brand-cyan/60 text-slate-300 hover:text-white transition whitespace-nowrap flex-shrink-0 text-[11px]"
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
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-navy-800 border border-navy-700 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              {/* Formatted multi-line text */}
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-navy-800 border border-navy-700 w-fit text-slate-400 text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-cyan" />
            <span>NCRB AI Assistant is typing...</span>
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
        className="p-3 bg-navy-800 border-t border-navy-700 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the project, charts, or awareness..."
          className="flex-1 bg-navy-900 border border-navy-700 focus:border-brand-cyan rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white transition flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
