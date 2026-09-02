'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Skills as SkillsType } from '@/lib/types';

export default function Skills({ skills }: { skills: SkillsType }) {
  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Skills" subtitle="Technologies I work with" />
        <div className="grid md:grid-cols-2 gap-8">
          {skills.categories.map((cat, ci) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: ci * 0.1 }} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-lg mb-4 text-cyan-600 dark:text-cyan-400">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
