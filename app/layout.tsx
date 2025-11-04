import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akshar Kids School',
  description:
    'Akshar Kids School is a nurturing English-medium campus with engaging academics, after-school tuition, and a vibrant community.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Akshar Kids School',
    description: 'Admissions open for Nursery to Std. 8. Discover our holistic learning environment and after-school tuition.',
    url: 'https://example.com',
    siteName: 'Akshar Kids School',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
