'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  FiSearch,
  FiTerminal,
  FiGithub,
  FiDownload,
  FiMail,
  FiMoon,
  FiSun,
  FiCopy,
  FiLayers,
  FiBookOpen,
  FiUser,
  FiBriefcase,
  FiAward,
} from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { useToast } from './Toast';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'External' | 'Terminal';
  title: string;
  description?: string;
  icon: React.ReactNode;
  perform: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast(`Copied ${label} to clipboard!`);
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Projects & Systems Architecture',
      description: 'Trackit, Panopteez, RedLine, Movienator, Perigee',
      icon: <FiLayers className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#projects');
        onClose();
      },
      shortcut: 'G P',
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About & Background',
      description: 'Systems philosophy, NIT Agartala, education',
      icon: <FiUser className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#about');
        onClose();
      },
      shortcut: 'G A',
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Competencies & Toolchains',
      description: 'C++, Linux /proc, POSIX, Docker, PostgreSQL',
      icon: <FiAward className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#skills');
        onClose();
      },
      shortcut: 'G S',
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Experience & Leadership',
      description: 'President of Data Science & AI Club, technical mentoring',
      icon: <FiBriefcase className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#experience');
        onClose();
      },
      shortcut: 'G E',
    },
    {
      id: 'nav-blog',
      category: 'Navigation',
      title: 'Engineering Notes & Articles',
      description: 'Linux /proc internals and telemetry papers',
      icon: <FiBookOpen className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#blog');
        onClose();
      },
      shortcut: 'G B',
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact & Internship Inquiries',
      description: 'Direct email and contact form',
      icon: <FiMail className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        router.push('/#contact');
        onClose();
      },
      shortcut: 'G C',
    },

    // Terminal
    {
      id: 'term-open',
      category: 'Terminal',
      title: 'Launch Systems CLI / QA Terminal',
      description: 'Interactive shell querying Linux /proc work & profile',
      icon: <FiTerminal className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onClose();
        if (onOpenTerminal) onOpenTerminal();
      },
      shortcut: 'T',
    },

    // Actions
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      description: 'ashishsingh.cpr.edu@gmail.com',
      icon: <FiCopy className="w-4 h-4 text-sky-400" />,
      perform: () => copyToClipboard('ashishsingh.cpr.edu@gmail.com', 'email'),
    },
    {
      id: 'act-clone-trackit',
      category: 'Actions',
      title: 'Copy Trackit git clone command',
      description: 'git clone https://github.com/Ashish-331/Trackit.git',
      icon: <FiCopy className="w-4 h-4 text-sky-400" />,
      perform: () => copyToClipboard('git clone https://github.com/Ashish-331/Trackit.git', 'Trackit clone'),
    },
    {
      id: 'act-clone-redline',
      category: 'Actions',
      title: 'Copy RedLine git clone command',
      description: 'git clone https://github.com/Ashish-331/RedLine.git',
      icon: <FiCopy className="w-4 h-4 text-emerald-400" />,
      perform: () => copyToClipboard('git clone https://github.com/Ashish-331/RedLine.git', 'RedLine clone'),
    },
    {
      id: 'act-clone-movienator',
      category: 'Actions',
      title: 'Copy Movienator git clone command',
      description: 'git clone https://github.com/Ashish-331/movienator.git',
      icon: <FiCopy className="w-4 h-4 text-purple-400" />,
      perform: () => copyToClipboard('git clone https://github.com/Ashish-331/movienator.git', 'Movienator clone'),
    },
    {
      id: 'act-clone-perigee',
      category: 'Actions',
      title: 'Copy Perigee git clone command',
      description: 'git clone https://github.com/Ashish-331/Perigee.git',
      icon: <FiCopy className="w-4 h-4 text-amber-400" />,
      perform: () => copyToClipboard('git clone https://github.com/Ashish-331/Perigee.git', 'Perigee clone'),
    },
    {
      id: 'act-resume',
      category: 'Actions',
      title: 'Download Resume (PDF)',
      description: 'Systems programmer & backend profile',
      icon: <FiDownload className="w-4 h-4 text-amber-400" />,
      perform: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'act-theme',
      category: 'Actions',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-indigo-400" />,
      perform: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        toast(`Switched to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        onClose();
      },
      shortcut: '\\',
    },

    // External Profiles
    {
      id: 'ext-github',
      category: 'External',
      title: 'GitHub Profile',
      description: 'github.com/Ashish-331',
      icon: <FiGithub className="w-4 h-4" />,
      perform: () => {
        window.open('https://github.com/Ashish-331', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-leetcode',
      category: 'External',
      title: 'LeetCode Profile',
      description: '350+ algorithmic problems solved',
      icon: <SiLeetcode className="w-4 h-4 text-amber-500" />,
      perform: () => {
        window.open('https://leetcode.com/u/ashish-331/', '_blank');
        onClose();
      },
    },
    {
      id: 'ext-codechef',
      category: 'External',
      title: 'CodeChef Profile',
      description: '3-Star Coder • Global Rank 418 in Starters 251',
      icon: <SiCodechef className="w-4 h-4 text-amber-600" />,
      perform: () => {
        window.open('https://www.codechef.com/users/ashish_331', '_blank');
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.description && cmd.description.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 sm:pt-28 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-[#0c1018] rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 dark:border-gray-800">
          <FiSearch className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, section, or search..."
            className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500 font-mono">
              No matching commands or sections found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    <div className="truncate">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.shortcut && (
                    <kbd className="shrink-0 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700">
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Command palette footer */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-[#0e1320] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; to navigate</span>
            <span>&crarr; to select</span>
          </div>
          <span>Ashish Kumar Singh &bull; NIT Agartala</span>
        </div>
      </div>
    </div>
  );
}