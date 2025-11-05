import Link from 'next/link';
import { format } from 'date-fns';
import { hero, valueProps, tuitionHighlights, upcomingEvents, quickLinks } from '@/src/data/content';
import { getNotices } from '@/src/services/notices';
import { getTestimonials } from '@/src/services/testimonials';

export const revalidate = 0;

type NoticeBoardProps = {
  notices: Awaited<ReturnType<typeof getNotices>>;
};

function NoticeBoard({ notices }: NoticeBoardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Blackboard Notices</p>
          <p className="text-sm text-slate-300">Stay updated with the latest announcements.</p>
        </div>
        <Link
          href="/notices"
          className="rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-100 hover:bg-slate-800"
        >
          View all notices
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {notices.map((notice) => (
          <article key={notice.id} className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              {format(new Date(notice.date), 'dd MMM yyyy')}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">{notice.title}</p>
            <p className="mt-2 text-sm text-slate-300">{notice.body}</p>
          </article>
        ))}
        {notices.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-300">
            No announcements right now. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Awaited<ReturnType<typeof getTestimonials>> }) {
  if (testimonials.length === 0) {
    return null;
  }

  const featured = testimonials.slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="container-edge">
        <h2 className="section-title">What our community says</h2>
        <p className="section-subtitle">Voices from parents, alumni, and learners celebrating everyday wins.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((testimonial) => (
            <blockquote
              key={testimonial.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <p className="text-slate-700">“{testimonial.message}”</p>
              <footer className="mt-6 text-sm font-medium text-slate-600">
                <p className="text-brand-700">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [notices, testimonials] = await Promise.all([
    getNotices().then((items) => items.slice(0, 3)),
    getTestimonials()
  ]);

  return (
    <div className="space-y-20 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-12 top-20 h-72 w-72 rounded-full bg-amber-300/40 blur-3xl mix-blend-screen"></div>
          <div className="absolute right-[-3rem] top-[-6rem] h-80 w-80 rounded-full bg-brand-300/40 blur-3xl mix-blend-screen"></div>
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-white/30 bg-white/10 shadow-[0_0_40px_-12px_rgba(255,255,255,0.8)] backdrop-blur-sm"></div>
        </div>
        <div className="container-edge relative z-10 grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Now Enrolling</p>
            <h1 className="text-4xl font-bold sm:text-5xl">{hero.title}</h1>
            <p className="max-w-2xl text-lg text-brand-100">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              {hero.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition ${
                    action.variant === 'primary'
                      ? 'bg-white text-brand-700 hover:bg-brand-100'
                      : 'border border-white/70 text-white hover:bg-white/10'
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <NoticeBoard notices={notices} />
        </div>
      </section>

      <section className="container-edge" id="why-our-school">
        <h2 className="section-title">Why families choose Akshar Kids</h2>
        <p className="section-subtitle">
          A future-ready education experience balancing rigorous academics with creativity, values, and whole-child support.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {valueProps.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-700">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16" id="tuition">
        <div className="container-edge grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="section-title">After-School Tuition</h2>
            <p className="section-subtitle">{tuitionHighlights.summary}</p>
            <div className="mt-6">
              <Link
                href={tuitionHighlights.cta.href}
                className="inline-flex rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                {tuitionHighlights.cta.label}
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">Subjects & Highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-brand-800">
              <li>Mathematics problem-solving clinics</li>
              <li>Science experiments and lab skills workshops</li>
              <li>English communication and creative writing labs</li>
              <li>Social Studies projects & current affairs forums</li>
              <li>Weekly progress updates for parents</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-edge" id="events">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">Catch the energy from our gallery of events and community celebrations.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article key={event.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={event.cover} alt={event.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-sm uppercase tracking-wide text-brand-500">
                  {format(new Date(event.date), 'dd MMM yyyy')}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h3>
                <Link href={`/gallery/${event.slug}`} className="mt-4 inline-flex text-sm font-medium text-brand-600">
                  View album →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="bg-white py-16">
        <div className="container-edge">
          <h2 className="section-title">Quick Links</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
