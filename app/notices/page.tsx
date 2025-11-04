import type { Metadata } from 'next';
import { format } from 'date-fns';
import { notices } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'Notices | Akshar Kids School'
};

export default function NoticesPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge">
        <h1 className="section-title">Notices & Announcements</h1>
        <p className="section-subtitle">Filter notices by date, category, and keywords (coming soon).</p>
        <div className="mt-10 space-y-6">
          {notices.map((notice) => (
            <article key={notice.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-brand-700">{notice.title}</h2>
                  <p className="text-sm text-slate-500">
                    Published on {format(new Date(notice.date), 'dd MMM yyyy')} · Category: General
                  </p>
                </div>
                <a href="#" className="text-sm font-medium text-brand-600">
                  Download attachment
                </a>
              </div>
              <p className="mt-4 text-slate-600">{notice.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
