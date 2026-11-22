'use client';

import { useState } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiPhone,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Profile } from '@/lib/types';

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const shouldReduceMotion = useReducedMotion();

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    if (!formspreeId || formspreeId === 'placeholder') {
      const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      return;
    }

    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const mailtoFallbackUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Inquiry from ${formData.name || 'Portfolio Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-[#0a0d16] border-b border-gray-200/90 dark:border-slate-800/90 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Contact"
          subtitle="Open for Software Engineering, Full-Stack, AI, and Systems Internships"
        />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column: Direct channels */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              I am actively seeking software engineering and developer internships across full-stack web platforms, intelligent AI systems, algorithmic software, or low-overhead infrastructure. Reach out directly via the form or email.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50/90 dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex items-center gap-3">
                <FiMail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-gray-900 dark:text-white text-sm hover:text-emerald-500 transition-colors font-medium"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50/90 dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex items-center gap-3">
                <FiMapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">
                    Location
                  </span>
                  <span className="text-gray-900 dark:text-white text-sm font-medium">
                    {profile.location}
                  </span>
                </div>
              </div>

              {profile.phone && (
                <div className="p-3.5 rounded-xl bg-gray-50/90 dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">
                      Phone
                    </span>
                    <span className="text-gray-900 dark:text-white text-sm font-medium">
                      {profile.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2.5">
              <span className="text-xs text-gray-500 font-medium">Profiles:</span>
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <FiGithub className="w-4 h-4" />
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socials.leetcode && (
                <a
                  href={profile.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 transition-colors"
                  aria-label="LeetCode Profile"
                  title="LeetCode (350+ Solved)"
                >
                  <SiLeetcode className="w-4 h-4" />
                </a>
              )}
              {profile.socials.codechef && (
                <a
                  href={profile.socials.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-700 transition-colors"
                  aria-label="CodeChef Profile"
                  title="CodeChef (Rank 418)"
                >
                  <SiCodechef className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.08, ease: 'easeOut' }}
          >
            {status === 'sent' ? (
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-[#0f141f] border border-emerald-500/30 text-left space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <FiCheck className="w-4 h-4" /> Message Sent
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Thank you for your message. Ashish will review your note and reply via email.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline pt-2 cursor-pointer block"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                    <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span>Could not send message. </span>
                      <a href={mailtoFallbackUrl} className="underline font-semibold">
                        Click here to email directly
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="c-name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-[#0f141f] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="c-email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-[#0f141f] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="c-msg" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Discuss an internship role, C++ project, or schedule an interview..."
                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-[#0f141f] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium text-sm transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <FiSend className="w-3.5 h-3.5" />
                  {status === 'sending' ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}