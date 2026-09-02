import Link from 'next/link';
import { getBlogPosts } from '@/lib/content';
import { FiArrowLeft } from 'react-icons/fi';

export const metadata = {
  title: 'Blog — Ashish Kumar Singh',
  description: 'Articles, systems engineering insights, and tech journey by Ashish Kumar Singh.',
};

export default function BlogListingPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:underline mb-8"
      >
        <FiArrowLeft /> Back to Portfolio
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Articles & Engineering Notes</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Insights on systems programming in C++, Linux internals, backend architectures, and developer experiences.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
            <span className="text-xs text-gray-500">{post.date}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
