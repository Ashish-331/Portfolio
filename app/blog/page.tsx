import Link from 'next/link';
import { getBlogPosts } from '@/lib/content';
import { FiArrowLeft, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Engineering Notes & Systems Architecture — Ashish Kumar Singh',
  description:
    'Technical deep-dives into systems programming in C++, Linux /proc kernel internals, distributed backend pipelines, and low-latency architectures.',
};

export default function BlogListingPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline mb-8"
      >
        <FiArrowLeft /> &lt;- return to portfolio
      </Link>

      <div className="mb-10 border-b border-gray-200 dark:border-gray-800/80 pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight mb-3 text-gray-950 dark:text-gray-50">
          Engineering Notes &amp; Systems Architecture
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Technical documentation on Linux kernel internals, low-overhead /proc sampling, distributed pipeline design, and competitive algorithm optimization.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const wordCount = post.content.split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200));

          return (
            <article
              key={post.slug}
              className="p-5 sm:p-6 rounded-lg bg-white dark:bg-[#0f141f] border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 transition-colors shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg sm:text-xl font-serif font-normal mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-gray-950 dark:text-gray-50">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3 font-medium">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3 h-3 text-gray-400" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3 text-gray-400" /> {readTime} min read
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-emerald-600 dark:text-emerald-400 font-sans font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Read Note <FiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}