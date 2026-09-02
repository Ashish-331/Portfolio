'use client';
import { motion } from 'framer-motion';
import type { Experience } from '@/lib/types';

export default function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-10 border-l-2 border-gray-200 dark:border-gray-800 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 className="text-lg font-semibold">{experience.role}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{experience.period}</span>
        </div>
        <p className="text-cyan-600 dark:text-cyan-400 text-sm mb-3">{experience.organization} · {experience.location}</p>
        <ul className="space-y-1">
          {experience.highlights.map((h, i) => (
            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex">
              <span className="text-cyan-500 mr-2 mt-1">▸</span>{h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
