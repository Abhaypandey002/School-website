import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact | Akshar Kids School'
};

export default function ContactPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <section className="space-y-6">
          <h1 className="section-title">Contact Admissions</h1>
          <p className="section-subtitle">
            Reach out to our admissions team for tours, questions, and the latest enrollment updates.
          </p>
          <ContactForm />
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-700">Visit Us</h2>
            <p className="text-sm text-slate-600">
              Chamunda Residency, Godadra, Surat, Gujarat 395010
            </p>
            <Link
              href="https://www.bing.com/maps/search?FORM=HDRSC6&q=chamunda+residency+godadra+surat&cp=21.170050%7E72.874313&lvl=16&style=r"
              className="mt-2 inline-flex text-sm font-semibold text-brand-600"
            >
              View on Bing Maps →
            </Link>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-700">Call or Email</h2>
            <p className="text-sm text-slate-600">Phone: +91 98765 43210</p>
            <p className="text-sm text-slate-600">Email: admissions@aksharkids.edu.in</p>
            <p className="text-sm text-slate-600">Office hours: Mon–Sat, 9:00 AM – 5:00 PM</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-700">Downloads</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/downloads/prospectus.pdf" className="text-brand-600">
                  Prospectus
                </Link>
              </li>
              <li>
                <Link href="/downloads/academic-calendar.pdf" className="text-brand-600">
                  Academic Calendar
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
