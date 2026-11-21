'use client';

import { useReducedMotion, motion } from 'framer-motion';

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="mb-8 sm:mb-10 pb-3 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}