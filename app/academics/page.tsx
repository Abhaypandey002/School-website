import type { Metadata } from 'next';
import { gradeHighlights } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'Academics | Akshar Kids School'
};

export default function AcademicsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-12">
        <section className="space-y-6">
          <h1 className="section-title">Academic Journey</h1>
          <p className="section-subtitle">
            Our English-medium curriculum grows with each learner—from playful exploration to rigorous subject mastery and
            co-curricular discovery.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {gradeHighlights.map((grade) => (
            <article key={grade.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-brand-700">{grade.name}</h2>
              <p className="mt-3 text-slate-600">{grade.focus}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-brand-700">Assessments & Co-Curriculars</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>Continuous and comprehensive evaluation with trimester report cards.</li>
            <li>STEM labs, language clubs, and art studios integrated into weekly timetables.</li>
            <li>Sports coaching in skating, football, athletics, and yoga.</li>
            <li>Value education, life skills, and leadership councils for grades 5-8.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
