'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReducedMotion, motion } from 'framer-motion';
import {
  FiGithub,
  FiExternalLink,
  FiCpu,
  FiCopy,
  FiCheck,
  FiActivity,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
} from 'react-icons/fi';
import ImagePlaceholder from './ImagePlaceholder';
import { useToast } from './Toast';
import type { Project } from '@/lib/types';

export default function ProjectCard({
  project,
  flagship = false,
}: {
  project: Project;
  flagship?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'arch' | 'benchmarks'>('preview');
  const [secondaryTab, setSecondaryTab] = useState<'preview' | 'arch'>('arch');

  const copyCloneCmd = (repoUrl: string) => {
    const cmd = `git clone ${repoUrl}.git`;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    toast(`Copied: ${cmd}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPanopteez = project.title.toLowerCase().includes('panopteez');
  const isRedLine = project.title.toLowerCase().includes('redline');
  const isMovienator = project.title.toLowerCase().includes('movienator');
  const isPerigee = project.title.toLowerCase().includes('perigee');

  if (flagship) {
    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 hover:border-emerald-500/40 transition-all shadow-xs overflow-hidden mb-10"
      >
        <div className="grid lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200/80 dark:border-slate-800/80">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  FLAGSHIP SYSTEMS PROJECT
                </span>
                {project.badge && (
                  <span className="text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-slate-700/60">
                    {project.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-gray-950 dark:text-gray-50 mb-2.5 tracking-tight">
                {project.title}
              </h3>

              {project.metrics && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/5 dark:bg-emerald-950/20 font-mono text-xs text-emerald-700 dark:text-emerald-400 mb-4 border border-emerald-500/20">
                  <FiCpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold">{project.metrics}</span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Technical Specifications Callout */}
              <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0a0d16] border border-gray-200/70 dark:border-slate-800">
                  <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 block">Kernel Interface</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">/proc/stat &amp; mem</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0a0d16] border border-gray-200/70 dark:border-slate-800">
                  <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 block">Render Loop</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">OpenGL 3.3 @ 60 FPS</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#0a0d16] border border-gray-200/70 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-gray-400 dark:text-gray-500 block">Hot Loop Churn</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Zero-alloc POSIX</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-xs font-mono rounded bg-gray-100 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-5 border-t border-gray-100 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    <FiGithub className="w-4 h-4" /> View C++ Source on GitHub
                  </a>
                )}
                {project.github && (
                  <button
                    onClick={() => copyCloneCmd(project.github!)}
                    className="px-3.5 py-2 rounded-md bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-gray-200 dark:border-slate-700"
                    title="Copy git clone command"
                  >
                    {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy className="text-gray-500" />}
                    <span>{copied ? 'Copied to clipboard' : 'git clone'}</span>
                  </button>
                )}
                <Link
                  href="/blog/zero-copy-linux-proc-parsing"
                  className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <FiBookOpen className="w-3.5 h-3.5" /> Read Architecture Breakdown
                </Link>
              </div>
            </div>
          </div>

          {/* Right Interactive Telemetry & Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 bg-gray-50/70 dark:bg-[#0a0d16] p-5 sm:p-6 flex flex-col justify-between">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-slate-800">
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Telemetry View:
              </span>
              <div className="flex items-center gap-1 bg-gray-200/70 dark:bg-slate-800/80 p-0.5 rounded-md text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-[#0f1422] text-gray-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FiActivity className="w-3 h-3 text-emerald-500" /> UI
                </button>
                <button
                  onClick={() => setActiveTab('arch')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'arch'
                      ? 'bg-white dark:bg-[#0f1422] text-gray-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FiLayers className="w-3 h-3 text-emerald-500" /> Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('benchmarks')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'benchmarks'
                      ? 'bg-white dark:bg-[#0f1422] text-gray-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FiBarChart2 className="w-3 h-3 text-emerald-500" /> Specs
                </button>
              </div>
            </div>

            {/* Tab 1: Live UI Preview */}
            {activeTab === 'preview' && (
              <div className="my-auto">
                <ImagePlaceholder
                  src="/images/projects/Trackit.png"
                  alt="Trackit Dear ImGui & OpenGL 3.3 Dashboard Screenshot"
                  label="Trackit OpenGL 3.3 Interface"
                />
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  <span>Backend: Dear ImGui + OpenGL 3.3</span>
                  <span className="text-emerald-600 dark:text-emerald-400">1920x1080 Native Frame</span>
                </div>
              </div>
            )}

            {/* Tab 2: Zero-Copy Kernel Architecture Flow */}
            {activeTab === 'arch' && (
              <div className="my-auto space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>1. Linux Kernel Source</span>
                    <span className="text-emerald-500">Zero Fork</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    /proc/stat • /proc/meminfo • /proc/[pid]/stat
                  </p>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    Direct POSIX read() via pre-allocated 8KB stack buffer
                  </span>
                </div>

                <div className="flex justify-center text-emerald-500 font-bold text-sm">↓</div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>2. Telemetry Thread</span>
                    <span className="text-emerald-500">500ms Interval</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    C++17 Telemetry Worker Loop
                  </p>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    std::string_view parser + atomic lock-free ring buffer
                  </span>
                </div>

                <div className="flex justify-center text-emerald-500 font-bold text-sm">↓</div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>3. Hardware Render Thread</span>
                    <span className="text-emerald-500">60 FPS</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Dear ImGui + OpenGL 3.3 Shaders
                  </p>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    Decoupled rendering: Zero jitter under heavy CPU spikes
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Telemetry Benchmarks Grid */}
            {activeTab === 'benchmarks' && (
              <div className="my-auto space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">CPU Footprint</span>
                    <span className="font-semibold text-base text-emerald-600 dark:text-emerald-400">1.3%</span>
                  </div>
                  <span className="text-[11px] text-gray-500 text-right">
                    vs 4.8% htop baseline<br />
                    <span className="text-emerald-500">~73% lower overhead</span>
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Resident Set Size</span>
                    <span className="font-semibold text-base text-gray-900 dark:text-white">89.4 MB</span>
                  </div>
                  <span className="text-[11px] text-gray-500 text-right">
                    Fixed memory footprint<br />
                    0 memory leaks in Valgrind
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Subprocess Forks</span>
                    <span className="font-semibold text-base text-emerald-600 dark:text-emerald-400">0 forks</span>
                  </div>
                  <span className="text-[11px] text-gray-500 text-right">
                    Zero execve() calls<br />
                    100% in-process kernel reads
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Poll Cadence</span>
                    <span className="font-semibold text-base text-gray-900 dark:text-white">500 ms</span>
                  </div>
                  <span className="text-[11px] text-gray-500 text-right">
                    Sub-second telemetry<br />
                    Smooth sliding window
                  </span>
                </div>
              </div>
            )}

            <div className="pt-3 mt-4 border-t border-gray-200 dark:border-slate-800 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <span>Benchmark target: Ubuntu 24.04 LTS (x86_64)</span>
              <span className="font-mono text-emerald-500 font-semibold">C++17 Standards</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Secondary Project Cards (Panopteez, RedLine, Movienator, Perigee)
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 hover:border-emerald-500/40 transition-all shadow-xs overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Media Preview Header */}
        <div className="p-4 bg-gray-50/80 dark:bg-[#0a0d16] border-b border-gray-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-gray-400">Architecture View:</span>
            <div className="flex gap-1 text-[10px] font-mono">
              <button
                onClick={() => setSecondaryTab('arch')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  secondaryTab === 'arch'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Blueprint
              </button>
              <button
                onClick={() => setSecondaryTab('preview')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  secondaryTab === 'preview'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Overview
              </button>
            </div>
          </div>

          {secondaryTab === 'preview' && isPanopteez ? (
            <ImagePlaceholder
              src={project.image}
              alt={`${project.title} Screenshot`}
              label={`${project.title} Dashboard`}
            />
          ) : isPanopteez ? (
            /* Panopteez 5-Node Topology Blueprint */
            <div className="aspect-video rounded-md bg-[#090d14] border border-slate-800 p-3.5 font-mono text-[11px] flex flex-col justify-between">
              <div className="flex justify-between items-center text-emerald-400 border-b border-slate-800 pb-1.5">
                <span>5-Node Distributed Topology</span>
                <span className="text-[10px] text-gray-400">Docker Compose</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center py-2">
                {['Host-01', 'Host-02', 'Host-03', 'Host-04'].map((node) => (
                  <div key={node} className="p-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-300">
                    <span className="text-emerald-400 block text-[9px]">C++ Daemon</span>
                    {node}
                  </div>
                ))}
              </div>
              <div className="text-center text-emerald-400 text-xs">↓ Authenticated REST Payloads ↓</div>
              <div className="p-1.5 rounded bg-slate-900 border border-emerald-500/30 text-center text-[10px] text-gray-200">
                Node/Express Ingestion Collector ➡️ PostgreSQL (Prisma)
              </div>
            </div>
          ) : isRedLine ? (
            /* RedLine Enterprise Multi-Agent Blueprint */
            <div className="aspect-video rounded-md bg-[#090d14] border border-slate-800 p-3.5 font-mono text-[11px] flex flex-col justify-between select-none">
              <div className="flex justify-between items-center text-emerald-400 border-b border-slate-800 pb-1.5">
                <span>Enterprise Multi-Agent Pipeline</span>
                <span className="text-[10px] text-gray-400">Gemini 2.0 DACC</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-300 text-center">
                Unstructured Contracts (MSAs, SOWs) + Scanned Invoices
              </div>
              <div className="text-center text-emerald-400 text-xs">↓ Dynamic Adaptive Context Caching ↓</div>
              <div className="grid grid-cols-2 gap-1.5 text-center text-[10px]">
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-gray-300">
                  <span className="text-emerald-400 block text-[9px]">Legal Specialist</span>
                  Function Calling
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-gray-300">
                  <span className="text-emerald-400 block text-[9px]">BigQuery ERP</span>
                  Parameterized Tools
                </div>
              </div>
              <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-center text-[10px] text-emerald-300 font-semibold">
                Deterministic Decimal Math • Zero Hallucinations
              </div>
            </div>
          ) : isMovienator ? (
            /* Movienator Bayesian Engine Blueprint */
            <div className="aspect-video rounded-md bg-[#090d14] border border-slate-800 p-3.5 font-mono text-[11px] flex flex-col justify-between select-none">
              <div className="flex justify-between items-center text-emerald-400 border-b border-slate-800 pb-1.5">
                <span>Vectorized Bayesian Engine</span>
                <span className="text-[10px] text-gray-400">Active Learning</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-300 flex justify-between">
                <span>Indexed Catalog:</span>
                <span className="text-emerald-400 font-semibold">50,625 Films (19 Industries)</span>
              </div>
              <div className="text-center text-emerald-400 text-xs">↓ NumPy Compressed Attribute Matrix (.npz) ↓</div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-200 text-center">
                LogSumExp Posterior Update + Laplace Smoothing
              </div>
              <div className="p-1 rounded bg-amber-950/30 border border-amber-500/30 text-center text-[10px] text-amber-300 font-semibold">
                Mutual Information (Shannon Entropy) Question Picker
              </div>
            </div>
          ) : isPerigee ? (
            /* Perigee Search Engine Blueprint */
            <div className="aspect-video rounded-md bg-[#090d14] border border-slate-800 p-3.5 font-mono text-[11px] flex flex-col justify-between select-none">
              <div className="flex justify-between items-center text-emerald-400 border-b border-slate-800 pb-1.5">
                <span>Hybrid RRF Retrieval Engine</span>
                <span className="text-[10px] text-gray-400">Reciprocal Rank Fusion</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-center text-[10px]">
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-gray-300">
                  <span className="text-emerald-400 block text-[9px]">Dense Vectors</span>
                  384d SQLite BLOBs
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-gray-300">
                  <span className="text-emerald-400 block text-[9px]">Sparse Match</span>
                  BM25 Lexical Score
                </div>
              </div>
              <div className="text-center text-emerald-400 text-xs">↓ RRF Ranking (k=60) + SQL Hard Pre-Filters ↓</div>
              <div className="p-1.5 rounded bg-slate-900 border border-emerald-500/30 text-center text-[10px] text-gray-200">
                Zero-Downtime Atomic Index Pointer Swapping in Memory
              </div>
            </div>
          ) : (
            <ImagePlaceholder
              src={project.image}
              alt={`${project.title} Screenshot`}
              label={`${project.title} Screenshot`}
            />
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-serif font-normal text-gray-950 dark:text-gray-50 tracking-tight">
              {project.title}
            </h3>
            {project.badge && (
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-slate-700/60">
                {project.badge}
              </span>
            )}
          </div>

          {project.metrics && (
            <p className="font-mono text-xs text-emerald-700 dark:text-emerald-400 mb-3 font-medium">
              {project.metrics}
            </p>
          )}

          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs font-mono rounded bg-gray-100 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-slate-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between mt-4">
        {project.github ? (
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <FiGithub className="w-4 h-4" /> View Repository
            </a>
            <button
              onClick={() => copyCloneCmd(project.github!)}
              className="text-[11px] font-mono text-gray-500 hover:text-emerald-500 inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Copy git clone"
            >
              <FiCopy className="w-3 h-3" /> clone
            </button>
          </div>
        ) : null}

        {isPanopteez && (
          <Link
            href="/blog/panopteez-telemetry-architecture"
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            Article <FiExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
