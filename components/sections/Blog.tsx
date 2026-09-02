'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import type { BlogPost } from '@/lib/types';

export default function Blog({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Blog" subtitle="Thoughts and learnings" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">{tag}</span>)}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
