'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiGithub, FiTerminal, FiSearch } from 'react-icons/fi';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { name: 'Background', href: '/#about' },
  { name: 'Systems & Code', href: '/#projects' },
  { name: 'Competencies', href: '/#skills' },
  { name: 'Leadership', href: '/#experience' },
  { name: 'Articles', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar({
  onOpenCommandPalette,
  onOpenTerminal,
}: {
  onOpenCommandPalette?: () => void;
  onOpenTerminal?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0a0d16]/90 backdrop-blur-md border-b border-gray-200/90 dark:border-slate-800/90 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/#home"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 group-hover:border-emerald-500 transition-colors shrink-0 bg-gray-100 dark:bg-gray-800 shadow-2xs">
            <Image
              src="/images/profile.jpg"
              alt="Ashish Kumar Singh"
              width={28}
              height={28}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Ashish Kumar Singh
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-800">
            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer"
                title="Open Command Palette (⌘K or /)"
                aria-label="Search and Commands"
              >
                <FiSearch className="w-3.5 h-3.5" />
                <kbd className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1 py-0.2 rounded border border-gray-200 dark:border-gray-700">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Systems Terminal Trigger */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer border border-emerald-500/20"
                title="Launch ashish-cli terminal"
                aria-label="Systems CLI Terminal"
              >
                <FiTerminal className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">sys_sh</span>
              </button>
            )}

            <a
              href="https://github.com/Ashish-331"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>

            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="p-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer"
              aria-label="Open Command Palette"
            >
              <FiSearch className="w-4 h-4" />
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-pointer"
              aria-label="Launch Systems Terminal"
            >
              <FiTerminal className="w-4 h-4" />
            </button>
          )}

          <ThemeToggle />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0d16] border-b border-gray-200/90 dark:border-slate-800 px-6 py-4 shadow-md">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}