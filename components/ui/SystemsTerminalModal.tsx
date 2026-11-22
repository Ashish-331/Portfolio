'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { FiX, FiSend, FiTerminal, FiTrash2, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import type { ChatMessage } from '@/lib/types';

const STARTER_COMMANDS = [
  { cmd: './inspect --trackit-overhead', query: 'How does Trackit achieve a 1.3% CPU footprint using Linux /proc and POSIX buffers?' },
  { cmd: './inspect --panopteez-cluster', query: 'Explain the Panopteez 5-agent distributed ingestion architecture and PostgreSQL batching.' },
  { cmd: './inspect --redline-engine', query: 'Explain the RedLine enterprise contract reconciliation engine with Gemini 2.0 DACC and BigQuery ERP.' },
  { cmd: './inspect --movienator-bayesian', query: 'How does Movienator utilize vectorized Bayesian inference and LogSumExp across 50,625 films?' },
  { cmd: './inspect --perigee-retrieval', query: 'How does Perigee implement hybrid RRF search and zero-downtime atomic pointer swapping?' },
];

function FormattedMarkdown({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs font-mono leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        if (/^[-*•]\s+/.test(trimmed)) {
          const content = trimmed.replace(/^[-*•]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-emerald-400 font-mono text-xs mt-0.5">&gt;</span>
              <span>{renderInline(content)}</span>
            </div>
          );
        }

        const matchNum = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (matchNum) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-emerald-400 font-mono text-xs mt-0.5">{matchNum[1]}.</span>
              <span>{renderInline(matchNum[2])}</span>
            </div>
          );
        }

        if (/^###\s+/.test(trimmed)) {
          return (
            <h4 key={idx} className="font-bold text-white pt-1 text-xs uppercase tracking-wider text-emerald-300">
              {renderInline(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }

        return <p key={idx}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1 py-0.5 text-[11px] font-mono rounded bg-gray-800 text-emerald-400 border border-gray-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "ashish-cli v2.0.0 (x86_64-pc-linux-gnu)\nType a query or pick a command below to inspect full-stack web platforms, AI deduction engines, Trackit C++ benchmarks, DSA achievements, or academic credentials.",
};

export default function SystemsTerminalModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

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
        throw new Error('Failed to query endpoint');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamBuffer = '';
      let accumulatedReply = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamBuffer += decoder.decode(value, { stream: true });

        const lines = streamBuffer.split('\n');
        streamBuffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              accumulatedReply = `${accumulatedReply}${delta}`;
              const current = accumulatedReply;
              setMessages((prev) => {
                const next = [...prev];
                const lastIdx = next.length - 1;
                if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
                  next[lastIdx] = { role: 'assistant', content: current };
                }
                return next;
              });
            }
          } catch {
            // Partial JSON buffer
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const fallbackMsg: ChatMessage = {
          role: 'assistant',
          content: 'Endpoint connection timed out. Contact Ashish directly at ashishsingh.cpr.edu@gmail.com.',
        };
        const lastIdx = next.length - 1;
        if (lastIdx >= 0 && next[lastIdx].role === 'assistant' && !next[lastIdx].content) {
          next[lastIdx] = fallbackMsg;
        } else {
          next.push(fallbackMsg);
        }
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className={`bg-[#0a0d16] rounded-xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-gray-200 transition-all ${
          isMaximized
            ? 'w-full h-full max-w-none max-h-none rounded-none'
            : 'w-full max-w-2xl h-[560px] max-h-[85vh]'
        }`}
      >
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-[#0f1422] border-b border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <FiTerminal className="text-emerald-400 w-3.5 h-3.5" />
              <span className="font-semibold">ashish-cli</span>
              <span className="text-gray-500 text-[10px]">--system-qa-session</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
              title="Reset terminal"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors hidden sm:block"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <FiMinimize2 className="w-3.5 h-3.5" /> : <FiMaximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
              title="Close terminal (Esc)"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
          {messages.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span className="text-emerald-400">
                  {m.role === 'user' ? 'guest@kernel-box:~$' : 'sys-daemon:~$'}
                </span>
                <span className="text-gray-600 text-[10px]">{m.role === 'user' ? 'command' : 'stdout'}</span>
              </div>
              <div
                className={`p-3 rounded-md border leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                    : 'bg-[#0e1320] border-gray-800/80 text-gray-300'
                }`}
              >
                {m.role === 'assistant' ? (
                  <FormattedMarkdown text={m.content} />
                ) : (
                  <p className="font-semibold text-emerald-300">{m.content}</p>
                )}
              </div>
            </div>
          ))}

          {loading && messages[messages.length - 1]?.role === 'user' && (
            <div className="space-y-1">
              <div className="text-[11px] text-gray-500">
                <span className="text-emerald-400">sys-daemon:~$</span>
              </div>
              <div className="p-3 rounded-md bg-[#0e1320] border border-gray-800/80 text-emerald-400 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Reading knowledge base &bull; Streaming response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Starters */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-gray-800/80 bg-[#0c101a]">
            <div className="text-[10px] text-gray-500 mb-1.5 uppercase tracking-wider font-mono">
              Suggested commands:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_COMMANDS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(item.query)}
                  className="text-[11px] font-mono bg-[#0f1422] border border-gray-800 text-gray-300 hover:border-emerald-500 hover:text-emerald-300 px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="text-emerald-500">&gt;</span> {item.cmd}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Input */}
        <div className="p-3 border-t border-gray-800 bg-[#0a0e17]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-[#0e1422] border border-gray-800 focus-within:border-emerald-500/80 rounded-md px-3 py-2 transition-colors"
          >
            <span className="text-emerald-400 font-mono text-xs select-none">guest@box:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about /proc, C++, Trackit, Panopteez, 8.94 CGPA..."
              disabled={loading}
              className="flex-1 bg-transparent text-xs font-mono text-gray-100 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
              title="Execute command"
            >
              <FiSend className="w-3 h-3" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}