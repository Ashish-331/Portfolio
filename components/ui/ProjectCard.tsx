'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/lib/types';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center">
        <span className="text-4xl font-bold text-gray-300 dark:text-gray-700 group-hover:text-cyan-500 transition-colors">
          {project.title[0]}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-500 transition-colors">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{t}</span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors">
              <FiGithub /> Code
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors">
              <FiExternalLink /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
