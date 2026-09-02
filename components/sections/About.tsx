'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Profile } from '@/lib/types';

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="About Me" subtitle="A bit about who I am and what I do" />
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{profile.bio}</p>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">📍 Location:</span> <span className="text-gray-600 dark:text-gray-400">{profile.location}</span></p>
              <p className="text-sm"><span className="font-medium">📧 Email:</span> <a href={`mailto:${profile.email}`} className="text-cyan-500 hover:underline">{profile.email}</a></p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-2 gap-4">
            {profile.stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-center hover:border-cyan-500/50 transition-colors">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
