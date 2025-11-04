import type { Metadata } from 'next';
import { policySections } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'Policies | Akshar Kids School'
};

export default function PoliciesPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-10">
        <h1 className="section-title">Policies & Compliance</h1>
        <p className="section-subtitle">
          We are committed to safeguarding personal data, protecting children, and providing transparent usage terms.
        </p>
        {policySections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-brand-700">{section.title}</h2>
            <p className="mt-3 text-slate-600">{section.body}</p>
          </section>
        ))}
        <section className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-xl font-semibold text-brand-700">CSV & Data Retention</h2>
          <p className="mt-3 text-brand-800">
            Contact and inquiry submissions are stored in monthly CSV files within /storage/csv and mirrored in analytics-ready
            JSON. Files are retained for 18 months before archival, and access is limited to authorized administrators.
          </p>
        </section>
      </div>
    </div>
  );
}
