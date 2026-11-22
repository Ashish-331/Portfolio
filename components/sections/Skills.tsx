'use client';

import { useState } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiServer, FiLayers, FiCpu, FiExternalLink, FiInfo } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Skills as SkillsType } from '@/lib/types';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <FiCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  'Systems & Backend': <FiCpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  'Data & ML Systems': <FiServer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  'Frontend & Graphics': <FiLayers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  Frontend: <FiLayers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  'DevOps & Tools': <FiServer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
};

const SKILL_CONTEXT: Record<string, { usedIn: string; role: string; link?: string }> = {
  'C++': {
    usedIn: 'Trackit & Panopteez',
    role: 'Core systems language used for direct /proc parsing, POSIX threads, and lightweight daemon agents.',
    link: '#projects',
  },
  'Linux /proc': {
    usedIn: 'Trackit',
    role: 'Low-overhead kernel telemetry interface used to read CPU jiffies, memory stats, and process tables without fork() cost.',
    link: '#projects',
  },
  Multithreading: {
    usedIn: 'Trackit & Panopteez',
    role: 'Concurrent telemetry polling decoupled from UI render loops using POSIX / std::thread.',
  },
  FastAPI: {
    usedIn: 'RedLine, Movienator & Perigee',
    role: 'High-throughput async Python REST API microservices with Pydantic contracts and streaming endpoints.',
    link: '#projects',
  },
  NumPy: {
    usedIn: 'Movienator',
    role: 'Vectorized mathematical operations, sparse attribute matrices (.npz), and Shannon entropy calculations.',
    link: '#projects',
  },
  SQLite: {
    usedIn: 'Movienator & Perigee',
    role: 'Embedded persistent storage with binary BLOB vector caches and indexed movie catalogs.',
    link: '#projects',
  },
  BigQuery: {
    usedIn: 'RedLine ERP Reconciler',
    role: 'Cloud data warehouse integration with parameterized zero-raw-SQL tools and DLP sanitization.',
    link: '#projects',
  },
  'Bayesian Active Learning': {
    usedIn: 'Movienator',
    role: 'Probabilistic 20-questions engine with LogSumExp numerical stability and information gain optimization.',
    link: '#projects',
  },
  'Hybrid Search (RRF)': {
    usedIn: 'Perigee',
    role: 'Reciprocal Rank Fusion (k=60) combining 384-dimensional dense vectors with sparse BM25 lexical scores.',
    link: '#projects',
  },
  'Node.js': {
    usedIn: 'Panopteez',
    role: 'Ingestion gateway and API services handling multi-agent telemetry pipelines and authentication.',
    link: '#projects',
  },
  'Express.js': {
    usedIn: 'Panopteez Gateway',
    role: 'High-throughput REST API endpoints with token-bucket rate limiting and payload validation.',
  },
  PostgreSQL: {
    usedIn: 'Panopteez Telemetry Store',
    role: 'Primary relational time-series database with composite indexes for sliding-window telemetry metrics.',
    link: '#projects',
  },
  Prisma: {
    usedIn: 'Panopteez',
    role: 'Type-safe database ORM managing multi-row batched telemetry transactions.',
  },
  Docker: {
    usedIn: 'Panopteez & RedLine',
    role: 'Containerized execution environment isolating multi-agent telemetry and multi-service systems.',
  },
  'Docker Compose': {
    usedIn: 'Panopteez 5-Node Topology',
    role: 'Automated orchestration of 4 host agents, 1 ingestion collector, and PostgreSQL database.',
    link: '#projects',
  },
  OpenGL: {
    usedIn: 'Trackit',
    role: 'Hardware-accelerated graphics backend rendering real-time scrolling load curves at 60 FPS.',
    link: '#projects',
  },
  'Dear ImGui': {
    usedIn: 'Trackit UI',
    role: 'Immediate-mode graphical user interface for live Linux process and resource monitoring.',
    link: '#projects',
  },
  TypeScript: {
    usedIn: 'Panopteez & Web Platforms',
    role: 'Strict typing for distributed API contracts, backend handlers, and frontend components.',
  },
  Python: {
    usedIn: 'RedLine, Movienator & Perigee',
    role: 'Core backend language for active learning engines, hybrid search pipelines, and multi-agent systems.',
    link: '#projects',
  },
  'React.js': {
    usedIn: 'RedLine, Movienator & Panopteez',
    role: 'Component architecture, state management, and real-time dashboard visualization.',
  },
  'Next.js': {
    usedIn: 'Portfolio & Panopteez UI',
    role: 'Server Components, Turbopack, static site generation, and dynamic streaming API routes.',
  },
  Bash: {
    usedIn: 'Linux Automation & Build Scripts',
    role: 'System provisioning, benchmark shell scripts, and telemetry test harnesses.',
  },
};

export default function Skills({ skills }: { skills: SkillsType }) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedSkill, setSelectedSkill] = useState<string | null>('C++');

  const activeDetails = selectedSkill ? SKILL_CONTEXT[selectedSkill] : null;

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-gray-50/50 dark:bg-[#0a0d16] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Technical Competencies"
          subtitle="Full-stack frameworks, intelligent data systems, and verified implementation context"
        />

        {/* Selected Skill Context Callout */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {activeDetails ? (
              <motion.div
                key={selectedSkill}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="p-4 rounded-lg bg-white dark:bg-[#0f1422] border border-emerald-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      {selectedSkill}
                    </span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Implemented in: <strong className="text-gray-900 dark:text-white">{activeDetails.usedIn}</strong>
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    {activeDetails.role}
                  </p>
                </div>
                {activeDetails.link && (
                  <a
                    href={activeDetails.link}
                    className="shrink-0 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono font-medium hover:underline"
                  >
                    View in Projects <FiExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ) : (
              <div className="p-3 rounded-lg bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-mono flex items-center gap-2">
                <FiInfo className="text-emerald-500 w-3.5 h-3.5" />
                <span>Click on any skill badge below to inspect real project implementation context.</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skills.categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: ci * 0.08, ease: 'easeOut' }}
              className="bg-white dark:bg-[#0f1422] rounded-xl border border-gray-200/90 dark:border-slate-800/90 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-gray-100 dark:bg-gray-800">
                      {CATEGORY_ICONS[cat.name] || <FiCode className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <h3 className="font-serif font-normal text-lg text-gray-950 dark:text-gray-50">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {cat.skills.length} tools
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    const hasContext = !!SKILL_CONTEXT[skill];

                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill === selectedSkill ? null : skill)}
                        className={`px-2.5 py-1 text-xs font-mono rounded border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500 shadow-xs'
                            : hasContext
                            ? 'bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-gray-700/80 hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/50'
                        }`}
                        title={hasContext ? `Click to inspect ${skill} in projects` : skill}
                      >
                        {skill}
                        {hasContext && !isSelected && (
                          <span className="ml-1 text-emerald-500 text-[10px]">&bull;</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}