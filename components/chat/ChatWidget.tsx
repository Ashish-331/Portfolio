'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiCpu, FiCornerDownLeft } from 'react-icons/fi';
import type { ChatMessage } from '@/lib/types';

const STARTER_QUESTIONS = [
  "What are Ashish's top technical skills?",
  "Tell me about Trackit and Panopteez.",
  "Why hire Ashish for systems or backend roles?",
  "What is his leadership experience?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Ashish's AI Assistant. Ask me anything about his projects, skills, education at NIT Agartala, or why he'd be a great fit for your team!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const text = queryText || input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Failed to reach assistant');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              assistantReply += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: 'assistant', content: assistantReply };
                return next;
              });
            }
          } catch {
            // Partial chunk or non-json line
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an issue connecting to the AI model. Please feel free to email Ashish directly at ashishsingh.cpr.edu@gmail.com!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center transition-all duration-300"
          aria-label="Ask Ashish's AI Assistant"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageSquare className="w-6 h-6" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[550px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-sm">
                  <FiCpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    Ashish AI Assistant
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-medium px-2 py-0.5 rounded-full">
                      AI Powered
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Interviewer Q&A Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close Chat"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 text-white flex items-center justify-center flex-shrink-0 text-xs">
                      <FiCpu />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 flex items-center justify-center flex-shrink-0 text-xs">
                      <FiUser />
                    </div>
                  )}
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 text-white flex items-center justify-center text-xs">
                    <FiCpu />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 rounded-2xl text-sm rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starters (shown if only 1 assistant msg) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {STARTER_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300 px-2.5 py-1 rounded-full transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Ashish..."
                  disabled={loading}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-transparent focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-950 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
