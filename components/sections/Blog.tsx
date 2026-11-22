'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import type { BlogPost } from '@/lib/types';

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const shouldReduceMotion = useReducedMotion();
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-16 sm:py-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-gray-50/50 dark:bg-[#0a0d16] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Writing &amp; Notes"
          subtitle="Technical deep-dives on systems engineering, algorithm performance, and architecture"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {posts.slice(0, 4).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.08, ease: 'easeOut' }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full group">
                <div className="bg-white dark:bg-[#0f1422] rounded-xl border border-gray-200/90 dark:border-slate-800/90 p-6 hover:border-emerald-500/50 transition-all shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif font-normal text-xl mb-2.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-gray-950 dark:text-gray-50 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FiCalendar className="w-3.5 h-3.5 text-gray-400" /> {post.date}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read Article <FiArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Browse All Technical Articles &amp; Benchmarks →
          </Link>
        </div>
      </div>
    </section>
  );
}