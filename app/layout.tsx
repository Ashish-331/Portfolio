import type { Metadata } from 'next';
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import GlobalNavigationShell from '@/components/layout/GlobalNavigationShell';
import Footer from '@/components/layout/Footer';

const serifFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
});

const sansFont = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ashish-singh.dev'),
  title: 'Ashish Kumar Singh — Systems Programmer & Backend Engineer',
  description:
    'Systems programmer and backend engineer. 3rd Year CSE @ NIT Agartala (CGPA 8.94). Creator of Trackit (1.3% CPU Linux /proc system monitor) and Panopteez (Distributed metrics pipeline in C++ and Node.js).',
  keywords: [
    'Ashish Kumar Singh',
    'NIT Agartala',
    'Systems Programmer',
    'C++',
    'Linux kernel',
    'proc filesystem',
    'Backend Engineer',
    'Trackit',
    'Panopteez',
    'Distributed Systems',
    'LeetCode',
  ],
  authors: [{ name: 'Ashish Kumar Singh', url: 'https://github.com/Ashish-331' }],
  openGraph: {
    title: 'Ashish Kumar Singh — Systems Programmer & Backend Engineer',
    description:
      'Systems programmer and backend engineer. 3rd Year CSE @ NIT Agartala (CGPA 8.94). Creator of Trackit and Panopteez.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Ashish Kumar Singh — Systems Programmer & Backend Engineer',
    description:
      'Systems programmer and backend engineer. 3rd Year CSE @ NIT Agartala (CGPA 8.94). Creator of Trackit and Panopteez.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased text-slate-900 dark:text-slate-100 bg-[#fafbfc] dark:bg-[#0a0d16] selection:bg-emerald-500/20 selection:text-emerald-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-200">
        <Providers>
          <GlobalNavigationShell />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
