import type { Metadata } from 'next';
import { downloads } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'Downloads | Akshar Kids School'
};

export default function DownloadsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-8">
        <h1 className="section-title">Downloads</h1>
        <p className="section-subtitle">
          Access essential documents such as the prospectus, academic calendar, and forms. Replace placeholder PDFs with final
          assets before launch.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {downloads.map((item) => (
            <article key={item.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs uppercase tracking-wide text-brand-500">{item.category}</p>
              <h2 className="mt-2 text-xl font-semibold text-brand-700">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <a
                href={item.href}
                className="mt-4 inline-flex rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-500"
              >
                Download
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
