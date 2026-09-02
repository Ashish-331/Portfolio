import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:underline mb-8"
      >
        <FiArrowLeft /> Back to all articles
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FiCalendar /> {post.date}
          </span>
          <div className="flex items-center gap-2">
            <FiTag />
            {post.tags.map((t) => (
              <span key={t} className="text-cyan-500">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
      </header>

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>
    </main>
  );
}
