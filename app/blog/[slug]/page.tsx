import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ashish Kumar Singh`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline mb-8"
      >
        <FiArrowLeft /> &lt;- return to notes index
      </Link>

      <header className="mb-10 border-b border-gray-200 dark:border-gray-800/80 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3 font-medium">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5 text-gray-400" /> {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FiClock className="w-3.5 h-3.5 text-gray-400" /> {readTime} min read
          </span>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-mono border border-gray-200/60 dark:border-gray-700/60"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight mb-4 text-gray-950 dark:text-gray-50 leading-[1.2]">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Rendered MDX Content */}
      <article className="prose dark:prose-invert prose-emerald max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base prose-headings:font-serif prose-headings:font-normal">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-14 pt-6 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between text-xs font-mono">
        <Link
          href="/blog"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          &lt;- index
        </Link>
        <Link
          href="/#contact"
          className="text-gray-500 hover:text-emerald-500 transition-colors"
        >
          Discuss systems architecture -&gt;
        </Link>
      </div>
    </main>
  );
}