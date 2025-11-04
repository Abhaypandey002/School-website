import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions | Akshar Kids School'
};

const steps = [
  {
    title: 'Step 1: Submit Inquiry',
    detail: 'Complete the short inquiry form or call our admissions office to receive the prospectus and key dates.'
  },
  {
    title: 'Step 2: Campus Tour & Interaction',
    detail: 'Visit the campus, meet the leadership team, and complete an interaction for the child and family.'
  },
  {
    title: 'Step 3: Application & Documents',
    detail: 'Submit the application form, previous school records (if applicable), birth certificate, and ID proofs.'
  },
  {
    title: 'Step 4: Enrollment',
    detail: 'Confirm admission by paying the fee and collecting the orientation kit.'
  }
];

const eligibility = [
  { grade: 'Nursery', age: '3 years by 31 May 2024' },
  { grade: 'Jr. KG', age: '4 years by 31 May 2024' },
  { grade: 'Std. 1', age: '6 years by 31 May 2024' }
];

const checklist = [
  'Completed application form',
  'Birth certificate copy',
  'Address proof & parent ID proof',
  'Previous school report card (for Std. 2 and above)',
  'Passport size photographs (student & parents)'
];

export default function AdmissionsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-12">
        <section className="space-y-4">
          <h1 className="section-title">Admissions Overview</h1>
          <p className="section-subtitle">
            We welcome applications from Nursery to Std. 8. Our admissions counselors guide every family through a smooth,
            transparent process.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500" href="/inquiry">
              Start Inquiry
            </a>
            <a
              className="rounded-full border border-brand-600 px-6 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              href="/downloads/prospectus.pdf"
            >
              Download Prospectus
            </a>
          </div>
        </section>

        <section>
          <h2 className="section-title">Admissions Timeline</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-brand-700">{step.title}</h3>
                <p className="mt-3 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-brand-700">Eligibility</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              {eligibility.map((item) => (
                <li key={item.grade} className="rounded-md bg-white px-4 py-3 shadow-sm">
                  <p className="font-semibold text-brand-700">{item.grade}</p>
                  <p className="text-sm">Age: {item.age}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-xl font-semibold text-brand-700">Documents Checklist</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-brand-800">
              {checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
