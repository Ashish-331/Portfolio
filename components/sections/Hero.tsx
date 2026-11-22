'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion, motion } from 'framer-motion';
import {
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiClock,
  FiCommand,
  FiTerminal,
} from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { useToast } from '@/components/ui/Toast';
import type { Profile } from '@/lib/types';

const ROLES = [
  'Software Developer',
  'DSA Enthusiast',
  'Systems Enthusiast',
  'AI Developer',
  'Fullstack Engineer',
];

export default function Hero({
  profile,
  onOpenCommandPalette,
}: {
  profile: Profile;
  onOpenCommandPalette?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Typewriter Keystroke Animation State
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const displayedRole = shouldReduceMotion ? ROLES[0] : currentText;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentFullText = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < currentFullText.length) {
        // Natural typing cadence (85ms per character)
        timer = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, 85);
      } else {
        // Pause at the end of the typed word so the reader absorbs it
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (currentText.length > 0) {
        // Deleting characters quickly (45ms per character)
        timer = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length - 1));
        }, 45);
      } else {
        // Done deleting; pause briefly then switch to next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, shouldReduceMotion]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const istTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setCurrentTime(istTime);
      } catch {
        setCurrentTime('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast(`Copied ${profile.email} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenTerminal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-systems-terminal'));
    }
  };

  return (
    <section
      id="home"
      className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0a0d16] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct, Grounded Introduction */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Identity & Status Line with Live Clock */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              {profile.photo && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50 shrink-0 bg-gray-100 dark:bg-slate-800 shadow-xs ring-2 ring-emerald-500/20">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={48}
                    height={48}
                    priority
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-800 dark:text-gray-200 tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span className="font-semibold">NIT Agartala &bull; CSE &apos;28 &bull; CGPA 8.94</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  <span>Software Developer &bull; Full-Stack, AI &amp; Systems &bull; Agartala, India</span>
                  {currentTime && (
                    <>
                      <span>&bull;</span>
                      <span suppressHydrationWarning className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <FiClock className="w-3 h-3" /> {currentTime} IST
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Keystroke Animated Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-gray-950 dark:text-gray-50 mb-5 leading-[1.2]">
              I am a{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium underline decoration-emerald-500/30 underline-offset-4">
                {displayedRole}
              </span>
              <span
                aria-hidden="true"
                className="inline-block w-[2px] h-[0.85em] bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-1 align-baseline"
              />
              <span className="block text-xl sm:text-2xl lg:text-3xl font-sans text-gray-600 dark:text-gray-400 font-normal mt-2.5">
                building full-stack web platforms, high-performance systems &amp; intelligent tools.
              </span>
            </h1>

            {/* Direct, Honest Bio */}
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-xl">
              I am a 3rd-year Computer Science student at NIT Agartala passionate about software development across the stack. I build responsive full-stack applications, explore AI active learning and hybrid search algorithms, solve DSA problems (CodeChef 3★, LeetCode 350+), and engineer low-overhead C++ systems tools like{' '}
              <strong className="font-semibold text-gray-900 dark:text-white">Trackit</strong> and{' '}
              <strong className="font-semibold text-gray-900 dark:text-white">Panopteez</strong>.
            </p>

            {/* Action Buttons: Clean & Functional */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/#projects"
                className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium text-sm transition-all cursor-pointer shadow-xs hover:shadow-sm"
              >
                View Projects &amp; Architecture
              </Link>
              <a
                href={profile.resumePath}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700 transition-colors"
              >
                <FiDownload className="w-4 h-4" /> Resume (PDF)
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied email' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Quick Command Palette Prompt + Shell Trigger */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => {
                  if (onOpenCommandPalette) {
                    onOpenCommandPalette();
                  } else if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-command-palette'));
                  }
                }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gray-100/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-800 text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors cursor-pointer"
              >
                <FiCommand className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-200">
                  ⌘K
                </kbd>
                <span>or</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-gray-200">
                  /
                </kbd>
              </button>

              <button
                onClick={handleOpenTerminal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                title="Launch Terminal (Press T)"
              >
                <FiTerminal className="w-3.5 h-3.5" />
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  T
                </kbd>
                <span>for sys_sh</span>
              </button>
            </div>

            {/* Profiles & Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-800/80 w-full">
              <span className="text-xs text-gray-500 font-medium">Profiles:</span>
              <div className="flex flex-wrap items-center gap-2">
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-slate-700 transition-colors"
                    aria-label="GitHub Profile"
                    title="GitHub: Ashish-331"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-slate-700 transition-colors"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.socials.leetcode && (
                  <a
                    href={profile.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-amber-500 border border-gray-200 dark:border-slate-700 text-xs font-mono font-medium transition-colors"
                    aria-label="LeetCode Profile"
                    title="LeetCode: 350+ Solved"
                  >
                    <SiLeetcode className="w-3.5 h-3.5 text-amber-500" />
                    <span>350+ Solved</span>
                  </a>
                )}
                {profile.socials.codechef && (
                  <a
                    href={profile.socials.codechef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-amber-600 border border-gray-200 dark:border-slate-700 text-xs font-mono font-medium transition-colors"
                    aria-label="CodeChef Profile"
                    title="CodeChef: 3-Star (Rank 418)"
                  >
                    <SiCodechef className="w-3.5 h-3.5 text-amber-600" />
                    <span>3★ (Rank 418)</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Honest Technical Snapshot Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl bg-gray-50/90 dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-xs">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <span>Technical Overview</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Internships
                </span>
              </h2>

              <div className="space-y-3.5 text-xs leading-relaxed">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
                    Full-Stack &amp; Web Development
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    React / Next.js / Node.js / Express / TypeScript / Tailwind
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
                    AI &amp; Data Engineering
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Python 3.12 / FastAPI / Vertex AI / NumPy / BigQuery
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
                    Systems &amp; Performance
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    C++17 / Linux Kernel /proc / Dear ImGui / OpenGL 3.3
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
                    Competitive Programming &amp; DSA
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    LeetCode 350+ • CodeChef 3★ (Global Rank 418)
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-0.5">
                    Academic Standing &amp; Leadership
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    NIT Agartala CSE (8.94 CGPA) • President, Data Science &amp; AI Club
                  </span>
                </div>
              </div>

              {/* Bottom Quick Metric Pills */}
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-white dark:bg-slate-900/80 border border-gray-200/80 dark:border-slate-800 text-center">
                  <span className="text-gray-400 block text-[10px]">CodeChef Rating</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">3★ • Rank 418</span>
                </div>
                <div className="p-2 rounded bg-white dark:bg-slate-900/80 border border-gray-200/80 dark:border-slate-800 text-center">
                  <span className="text-gray-400 block text-[10px]">JEE Main 2024</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Top 1.34% Nat&apos;l</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-2">
                <span className="text-gray-500">Source code:</span>
                <a
                  href="https://github.com/Ashish-331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  github.com/Ashish-331 <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
