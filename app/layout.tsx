import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

export const metadata: Metadata = {
  title: 'Ashish Kumar Singh — Systems & Backend Engineer',
  description:
    'Portfolio of Ashish Kumar Singh: 3rd Year CSE @ NIT Agartala (CGPA 8.94), President of DSAI Club. Systems Programmer (C++, Linux /proc), Backend Developer (Node.js, PostgreSQL, Docker).',
  keywords: [
    'Ashish Kumar Singh',
    'NIT Agartala',
    'Systems Programmer',
    'C++',
    'Linux',
    'Backend Engineer',
    'Trackit',
    'Panopteez',
    'Portfolio',
  ],
  authors: [{ name: 'Ashish Kumar Singh' }],
  openGraph: {
    title: 'Ashish Kumar Singh — Systems & Backend Engineer',
    description:
      'Computer Science undergraduate at NIT Agartala. Creator of Trackit and Panopteez. DSAI Club President.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
