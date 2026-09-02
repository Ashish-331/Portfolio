'use client';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import type { Profile } from '@/lib/types';

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 p-1">
          <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-400 dark:text-gray-600">{profile.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Hi, I&apos;m{' '}<span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">{profile.name.split(' ')[0]}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {profile.tagline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-4 justify-center mb-8">
          <a href="#projects" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">View Projects</a>
          <a href={profile.resumePath} download className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"><FiDownload /> Download CV</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex gap-4 justify-center">
          {profile.socials.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"><FiGithub className="w-6 h-6" /></a>}
          {profile.socials.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"><FiLinkedin className="w-6 h-6" /></a>}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <FiArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}
