import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="py-20 text-center">
      <div className="max-w-sm mx-auto space-y-4">
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">404</span>
        <h1 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Page Not Found
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-900 dark:text-neutral-100 underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-400 font-medium"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
