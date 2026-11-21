'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import type { Experience } from '@/lib/types';

export default function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.08, ease: 'easeOut' }}
      className="p-6 rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 shadow-xs mb-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3 pb-3 border-b border-gray-100 dark:border-gray-800/80">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            {experience.organization}
          </span>
          <h3 className="text-lg font-serif font-normal text-gray-950 dark:text-gray-50">
            {experience.role}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5" /> {experience.period}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FiMapPin className="w-3.5 h-3.5" /> {experience.location}
          </span>
        </div>
      </div>

      <ul className="space-y-2">
        {experience.highlights.map((h, i) => (
          <li
            key={i}
            className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start leading-relaxed"
          >
            <span className="text-emerald-600 dark:text-emerald-400 mr-2 text-xs mt-0.5 select-none font-semibold">&mdash;</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}