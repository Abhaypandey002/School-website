import Link from 'next/link';
import { navigation, siteName, socialLinks } from '@/src/config/site';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-sm text-slate-600">
      <div className="container-edge grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-900">{siteName}</p>
          <p className="max-w-md">
            Chamunda Residency, Godadra, Surat · Phone: +91 98765 43210 · Email: admissions@aksharkids.edu.in
          </p>
          <p>Office hours: Mon–Sat, 9:00am – 5:00pm</p>
          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-600">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:justify-items-end lg:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">Explore</p>
            <ul className="mt-2 space-y-2">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Resources</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/downloads" className="hover:text-brand-600">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-brand-600">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-brand-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-semibold text-slate-900">Contact</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  className="hover:text-brand-600"
                  href="https://www.bing.com/maps/search?FORM=HDRSC6&q=chamunda+residency+godadra+surat&cp=21.170050%7E72.874313&lvl=16&style=r"
                  target="_blank"
                  rel="noreferrer"
                >
                  View map
                </a>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-brand-600">
                  Submit Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-400">© {currentYear} {siteName}. All rights reserved.</p>
    </footer>
  );
}
