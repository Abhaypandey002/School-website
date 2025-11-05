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
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          {navigation.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 hover:text-brand-600"
              >
                <span>{item.label}</span>
                {item.children ? <span className="text-xs">▾</span> : null}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-20 mt-3 w-52 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="space-y-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-brand-600"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <nav
        className={clsx(
          'border-t border-slate-200 bg-white px-4 py-3 sm:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <ul className="space-y-3 text-sm font-medium text-slate-700">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block rounded-md px-2 py-1 font-semibold hover:bg-slate-100">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-2 space-y-1 border-l border-slate-200 pl-3 text-xs font-medium text-slate-600">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="block rounded-md px-2 py-1 hover:bg-slate-100">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
