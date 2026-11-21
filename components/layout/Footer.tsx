import { FiGithub, FiLinkedin, FiMail, FiTerminal, FiCommand } from 'react-icons/fi';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { getProfile } from '@/lib/content';

export default function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800/80 bg-gray-50 dark:bg-[#070a10] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-semibold text-gray-900 dark:text-white mr-2">
              {profile.name}
            </span>
            <span>
              &copy; {new Date().getFullYear()} &bull; 3rd Year CSE @ NIT Agartala (CGPA 8.94)
            </span>
          </div>

          {/* Profile Links */}
          <div className="flex items-center gap-3">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
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
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
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
                className="hover:text-amber-500 transition-colors"
                aria-label="LeetCode"
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
                className="hover:text-amber-600 transition-colors"
                aria-label="CodeChef"
                title="CodeChef (Rank 418)"
              >
                <SiCodechef className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              aria-label="Email"
              title={profile.email}
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Developer hints / keyboard shortcuts */}
        <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FiCommand className="w-3 h-3 text-emerald-500" />
              <span>Press <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px] text-gray-700 dark:text-gray-300">⌘K</kbd> to open command palette</span>
            </span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:flex items-center gap-1.5">
              <FiTerminal className="w-3 h-3 text-emerald-500" />
              <span>Press <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px] text-gray-700 dark:text-gray-300">T</kbd> for interactive systems shell</span>
            </span>
          </div>
          <div>
            Built with C++ spirit &bull; Next.js Turbopack &bull; Zero AI fluff
          </div>
        </div>
      </div>
    </footer>
  );
}