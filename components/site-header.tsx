'use client';

import Link from 'next/link';
import { useState } from 'react';
import { navigation, siteName } from '@/src/config/site';
import clsx from 'clsx';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-edge flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-brand-700">
          {siteName}
        </Link>
        <button
          className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:hidden"
          onClick={() => setIsMenuOpen((state) => !state)}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle navigation</span>
          ☰
        </button>
        <nav className="hidden gap-6 text-sm font-medium text-slate-700 sm:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav
        className={clsx(
          'border-t border-slate-200 bg-white px-4 py-3 sm:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <ul className="space-y-2 text-sm font-medium text-slate-700">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block rounded-md px-2 py-1 hover:bg-slate-100">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
