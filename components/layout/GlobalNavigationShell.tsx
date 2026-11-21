'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CommandPalette from '@/components/ui/CommandPalette';
import SystemsTerminalModal from '@/components/ui/SystemsTerminalModal';
import { FiTerminal } from 'react-icons/fi';

export default function GlobalNavigationShell() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable;

      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Forward slash / to open search
      if (e.key === '/' && !isInput && !commandPaletteOpen && !terminalOpen) {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      // T key to open systems terminal
      if ((e.key === 't' || e.key === 'T') && !isInput && !commandPaletteOpen && !terminalOpen) {
        e.preventDefault();
        setTerminalOpen(true);
        return;
      }
    };

    const handleOpenPalette = () => setCommandPaletteOpen(true);
    const handleOpenTerminal = () => setTerminalOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenPalette);
    window.addEventListener('open-systems-terminal', handleOpenTerminal);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenPalette);
      window.removeEventListener('open-systems-terminal', handleOpenTerminal);
    };
  }, [commandPaletteOpen, terminalOpen]);

  return (
    <>
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Docked unobtrusive bottom-right Systems Terminal pill */}
      <div className="fixed bottom-4 right-4 z-30 hidden sm:block">
        <button
          onClick={() => setTerminalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-950/90 dark:bg-[#0f1422]/95 backdrop-blur-md text-white border border-gray-800 dark:border-slate-800 hover:border-emerald-500/70 shadow-lg text-[11px] font-mono transition-all hover:scale-105 cursor-pointer group"
          title="Open Systems CLI Shell (Press T)"
          aria-label="Systems Shell"
        >
          <FiTerminal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-6 transition-transform" />
          <span className="font-semibold text-gray-200">sys_sh</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <SystemsTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}