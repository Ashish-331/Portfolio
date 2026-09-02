import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { getProfile } from '@/lib/content';

export default function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800/80 bg-white/50 dark:bg-gray-950/50 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} {profile.name}. All rights reserved. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
