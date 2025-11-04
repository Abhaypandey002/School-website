import type { Metadata } from 'next';
import { InquiryForm } from '@/components/forms/inquiry-form';

export const metadata: Metadata = {
  title: 'Inquiry | Akshar Kids School'
};

export default function InquiryPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge grid gap-12 lg:grid-cols-[1fr_1fr]">
        <section className="space-y-4">
          <h1 className="section-title">Quick Inquiry</h1>
          <p className="section-subtitle">
            Share your details and we will reach out with admissions guidance, tuition program details, and upcoming events.
          </p>
          <InquiryForm />
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-brand-700">Why connect with us?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>Receive grade-specific admissions updates.</li>
            <li>Book a personalized campus tour slot.</li>
            <li>Get tuition program schedules and scholarship information.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
