import type { Metadata } from 'next';
import { leadership } from '@/src/data/content';

export const metadata: Metadata = {
  title: 'About | Akshar Kids School'
};

export default function AboutPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-12">
        <section className="space-y-6">
          <h1 className="section-title">About Akshar Kids School</h1>
          <p className="section-subtitle">
            Founded in 2005, Akshar Kids School blends academic rigor with a caring environment that empowers children to lead
            with empathy, creativity, and confidence.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-brand-700">Our Vision</h2>
              <p className="mt-3 text-slate-600">
                To nurture inspired learners who are future-ready, community-minded, and rooted in Indian values.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-brand-700">Our Mission</h2>
              <p className="mt-3 text-slate-600">
                We deliver purposeful learning experiences through inquiry, collaboration, and real-world projects that build
                lifelong skills.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="section-title">Leadership</h2>
          <p className="section-subtitle">Meet the team guiding our academic excellence and student well-being.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {leadership.map((leader) => (
              <article key={leader.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-700">{leader.name}</h3>
                <p className="text-sm uppercase tracking-wide text-slate-500">{leader.role}</p>
                <p className="mt-3 text-slate-600">{leader.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Affiliations & Accreditations</h2>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-600">
            <li>Affiliated with Gujarat State Board curriculum.</li>
            <li>STEM Accredited Learning Center since 2018.</li>
            <li>Member of the National Independent Schools Alliance.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
