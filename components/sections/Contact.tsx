'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Profile } from '@/lib/types';

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch { setStatus('error'); }
  };
  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Contact" subtitle="Let's get in touch" />
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Feel free to reach out for collaborations, internship opportunities, or just to say hello!</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><FiMail className="w-5 h-5 text-cyan-500" /><a href={`mailto:${profile.email}`} className="hover:text-cyan-500 transition-colors">{profile.email}</a></div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><FiMapPin className="w-5 h-5 text-cyan-500" /><span>{profile.location}</span></div>
            </div>
            <div className="flex gap-4 mt-6">
              {profile.socials.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all"><FiGithub className="w-5 h-5" /></a>}
              {profile.socials.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all"><FiLinkedin className="w-5 h-5" /></a>}
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'placeholder'}`} method="POST" onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" />
            <textarea name="message" placeholder="Your Message" rows={5} required className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors resize-none" />
            <button type="submit" disabled={status === 'sending'} className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              <FiSend /> {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent! ✓' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
