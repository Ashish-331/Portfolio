'use client';

import Image from 'next/image';
import { useReducedMotion, motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiMapPin, FiMail } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Profile } from '@/lib/types';

export default function About({ profile }: { profile: Profile }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-gray-50/50 dark:bg-[#0a0d16] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="About &amp; Background"
          subtitle="Full-stack development, intelligent systems, algorithms, and academic background"
        />

        {/* 2-Column Split: Editorial Bio + Education & Key Milestones */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-12">
          {/* Left Column (7 cols): Developer Philosophy & Narrative */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-6 rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 shadow-xs text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {profile.photo && (
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 shrink-0 bg-gray-100 dark:bg-slate-800 shadow-xs">
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      width={112}
                      height={128}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div className="space-y-3 flex-1">
                  <p>
                    I am a 3rd-year Computer Science undergraduate at NIT Agartala with a CGPA of 8.94. As a developer, I thrive across multiple domains — from modern full-stack web platforms and AI-driven applications to competitive programming and low-overhead systems engineering.
                  </p>
                  <p>
                    Whether building high-concurrency search engines like <strong className="font-semibold text-gray-900 dark:text-white">Perigee</strong>, active learning Bayesian deduction engines in Python, solving DSA problems (<strong className="font-semibold text-gray-900 dark:text-white">3★ on CodeChef</strong>, 350+ LeetCode), or writing C++ tools that read directly from Linux kernel <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">/proc</code> to achieve a 1.3% CPU footprint in <strong className="font-semibold text-gray-900 dark:text-white">Trackit</strong> — I focus on crafting clean, resilient, and well-architected software.
                  </p>
                </div>
              </div>
              <p>
                On campus, I serve as President of the Data Science &amp; AI Club (leading 50+ members), mentoring peers and hosting workshops on full-stack web engineering, machine learning pipelines, and competitive programming. Prior to college, I was honored with the <strong className="font-semibold text-gray-900 dark:text-white">Student of the Year</strong> award at Grace Mission School for academic distinction and all-round leadership.
              </p>
            </div>

            {/* Structured Education & Location Metadata */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex items-start gap-3">
                <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <FiBookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-0.5">
                    Education
                  </span>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {profile.education?.institution || 'NIT Agartala'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    B.Tech CSE (CGPA {profile.education?.cgpa || '8.94'})
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex items-start gap-3">
                <div className="p-2 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 mt-0.5">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-0.5">
                    Location
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {profile.location}
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <FiMail className="w-3 h-3" /> {profile.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Quantified Technical Numbers */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#0f1422] rounded-xl border border-gray-200/90 dark:border-slate-800/90 p-4 sm:p-5 flex flex-col justify-center shadow-xs"
              >
                <div className="text-3xl sm:text-4xl font-serif font-normal text-gray-950 dark:text-gray-50 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Recognized Milestones & Accolades */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="w-4 h-4 text-emerald-500" />
              <h3 className="text-lg sm:text-xl font-serif font-normal text-gray-950 dark:text-gray-50">
                Academic &amp; Competitive Milestones
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {profile.achievements.map((ach, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-[#0f1422] border border-gray-200/90 dark:border-slate-800/90 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-slate-700/60">
                        {ach.year}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1.5">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {ach.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}